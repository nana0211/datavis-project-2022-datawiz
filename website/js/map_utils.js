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

    for (var i = 0; i < origins.length; i++) {
        try {
            var source = [+origins[i].long, +origins[i].lat];
            var target = [+destinations[i].long, +destinations[i].lat];
            var link = { source: source, target: target, type: selected_edition_stages[i].Type, stage_id: selected_edition_stages[i].Id };
            links.push(link);

            if (i < origins.length - 1 && (destinations[i].location != origins[i + 1].locations)) {
                var jump_source = target;
                var jump_target = [+origins[i + 1].long, +origins[i + 1].lat]
                var jump = { source: jump_source, target: jump_target }
                jumps.push(jump)

            }

            var marker = { long: +origins[i].lat, lat: origins[i].long };
            markers.push(marker);

            var marker = { long: +destinations[i].lat, lat: destinations[i].long };
            markers.push(marker);


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
        .attr("stroke-width", 4)
        .attr("stage_id", function(d) {
            return d.stage_id;
        })
        .attr("stroke", function(d) {
            var color = type_to_color[d.type];
            d3.select(this).attr("original_color", color)
            return color
        }).attr("pointer-events", "visiblePainted")
        .attr("class", "leaflet-interactive")
        .attr("clicked", false)
        .on("mouseover", function() {
            if (d3.select(this).attr("clicked") == "false") {
                d3.select(this).attr("stroke", pSBC(0.4, d3.select(this).attr("stroke")))
            }
        })
        .on("mouseout", function() {
            if (d3.select(this).attr("clicked") == "false") {
                d3.select(this).attr("stroke", d3.select(this).attr("original_color"))
            }

        })
        .on("click", function(d) {
            d3.selectAll("path").attr("stroke", function() {
                var color = d3.select(this).attr("original_color")
                if (color) {
                    return color
                }
                return "black"
            }).attr("clicked", false)
            d3.select(this).attr("clicked", true)
            d3.select(this).attr("stroke", pSBC(0.4, d3.select(this).attr("stroke")))
            sidebar.open("stages")
            selected_stage = stages.filter(stage => {
                return stage.Id == d3.select(this).attr("stage_id");
            })[0]
            $("#stages_pane").html(JSON.stringify(selected_stage))
        })


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
        .attr("stroke-width", 4)
        .style("stroke-dasharray", ("3, 3"))
        .attr("stroke", "black")


    d3.select("#map")
        .select("svg")
        .selectAll("markers")
        .data(markers.slice(1, markers.length - 1))
        .enter()
        .append("circle")
        .attr("cx", function(d) {
            return map.latLngToLayerPoint([d.lat, d.long]).x;
        })
        .attr("cy", function(d) {
            return map.latLngToLayerPoint([d.lat, d.long]).y;
        })
        .attr("r", 4)
        .style("fill", "black")


    d3.select("#map")
        .select("svg")
        .selectAll("start")
        .data(markers.slice(0, 1))
        .enter()
        .append("circle")
        .attr("cx", function(d) {
            return map.latLngToLayerPoint([d.lat, d.long]).x;
        })
        .attr("cy", function(d) {
            return map.latLngToLayerPoint([d.lat, d.long]).y;
        })
        .attr("r", 8)
        .style("fill", "green")
        .attr("stroke", "green")
        .attr("stroke-width", 3)
        .attr("fill-opacity", 0.4)


    d3.select("#map")
        .select("svg")
        .selectAll("start")
        .data(markers.slice(markers.length - 1, markers.length))
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
        .attr("fill-opacity", 0.4)
}

var type_to_color = { "Flat stage": "#03C700", "Mountain stage": "#5d00c7", "Individual time trial": "#00b3c7", "Team time trial": "#007bc7", "Hilly stage": "#b300c7", "High mountain stage": "#c79c00" }