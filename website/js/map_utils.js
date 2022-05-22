function get_markers_links_and_jumps_of_year(selected_edition, stages, locations) {

    var markers = [];
    var links = [];
    var jumps = [];

    var origins = []
    var destinations = []



    var selected_edition_stages = stages.filter(stage => {
        return stage.year == selected_edition;
    })


    selected_edition_stages.forEach(element => {
        var origin = locations.filter(location => {
            return location.location == element.Origin
        })[0]
        origins.push(origin)
        var destination = locations.filter(location => {
            return location.location == element.Destination
        })[0]
        destinations.push(destination);
    })

    const used_markers = new Set();
    for (var i = 0; i < origins.length; i++) {
        try {
            var source = [+origins[i].long, +origins[i].lat];
            var target = [+destinations[i].long, +destinations[i].lat];

            var link = { source: source, target: target, type: selected_edition_stages[i].Type };
            links.push(link);

            if (i < origins.length - 1 && (destinations[i].location != origins[i + 1].locations)) {
                var jump_source = target;
                var jump_target = [+origins[i + 1].long, +origins[i + 1].lat]
                var jump = { source: jump_source, target: jump_target }
                jumps.push(jump)

            }

            if (!used_markers.has(origins[i].location)) {
                var marker = { long: +origins[i].lat, lat: origins[i].long };
                markers.push(marker);
                used_markers.add(origins[i].location);
            }
            if (!used_markers.has(destinations[i].location)) {
                var marker = { long: +destinations[i].lat, lat: destinations[i].long };
                markers.push(marker);
                used_markers.add(destinations[i].location);
            }

        } catch (error) {
            console.log(origins[i]);
            console.log(destinations[i]);
        }
    }

    return [markers, links, jumps]
}

var linkGen = d3.linkHorizontal();

function draw_markers_links_and_jumps_on_map(markers, links, jumps) {

    d3.select("#map").select("svg").selectAll("*").remove();
    d3.select("#map")
        .select("svg")
        .selectAll("markers")
        .data(markers)
        .enter()
        .append("circle")
        .attr("cx", function(d) {
            return map.latLngToLayerPoint([d.lat, d.long]).x;
        })
        .attr("cy", function(d) {
            return map.latLngToLayerPoint([d.lat, d.long]).y;
        })
        .attr("r", 8)
        .style("fill", "red")
        .attr("stroke", "red")
        .attr("stroke-width", 3)
        .attr("fill-opacity", 0.4);

    //Draw links between locations
    d3.select("#map")
        .select("svg")
        .selectAll("links")
        .data(links)
        .join("path")
        .attr("d", function(d) {
            var source = map.latLngToLayerPoint(d.source);
            source = [source.x, source.y];

            var target = map.latLngToLayerPoint(d.target);
            target = [target.x, target.y];

            return linkGen({ source: source, target: target });
        })
        .attr("fill", "none")
        .attr("stroke-width", 3)
        .attr("stroke", function(d) {
            var color = type_to_color[d.type];
            if (!color) {
                console.log(d.type);
            }
            return color
        });


    d3.select("#map")
        .select("svg")
        .selectAll("jumps")
        .data(jumps)
        .join("path")
        .attr("d", function(d) {
            var source = map.latLngToLayerPoint(d.source);
            source = [source.x, source.y];

            var target = map.latLngToLayerPoint(d.target);
            target = [target.x, target.y];

            return linkGen({ source: source, target: target });
        })
        .attr("fill", "none")
        .attr("stroke-width", 3)
        .style("stroke-dasharray", ("3, 3"))
        .attr("stroke", "black");
}


var type_to_color = { "Individual time trial": "cyan", "Flat stage": "green", "Plain stage": "green", "Stage with mountain(s)": "red", "Stage with mountain": "red", "Medium mountain stage": "red", "High mountain stage": "blue", "Mountain stage": "purple", "Flat cobblestone stage": "grey" }