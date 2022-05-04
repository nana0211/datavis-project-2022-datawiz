//On each map movement, this function is called to update the positions of the D3.js elements
function update() {
  d3.selectAll("circle")
    .attr("cx", function (d) {
      return map.latLngToLayerPoint([d.lat, d.long]).x;
    })
    .attr("cy", function (d) {
      return map.latLngToLayerPoint([d.lat, d.long]).y;
    });

  d3.selectAll("path").attr("d", function (d) {
    var source = map.latLngToLayerPoint(d.source);
    source = [source.x, source.y];

    var target = map.latLngToLayerPoint(d.target);
    target = [target.x, target.y];

    return linkGen({ source: source, target: target });
  });
}

var map = L.map("map").setView([47, 2], 6);

// Add a tile to the map = a background. Comes from OpenStreetmap
L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png",
  {
    attribution: "Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ",
    maxZoom: 16,
    detectRetina: true,
  }
).addTo(map);

L.svg().addTo(map);

var linkGen = d3.linkHorizontal();

// If the user change the map (zoom or drag), I update circle position:
map.on("moveend", update);

var sidebar = L.control
  .sidebar({
    container: "sidebar",
  })
  .addTo(map)
  .open("home");

// add panels dynamically to the sidebar
sidebar
  .addPanel({
    id: "edition",
    tab: '<i class="fa-solid fa-g"></i><i class="fa-solid fa-c"></i>',
    title: "Edition",
    pane: '<p>This tab contains information on the currently selected edition.<p>',
  })
  .addPanel({
    id: "stages",
    tab: '<i class="fa-solid fa-s"></i><i class="fa-solid fa-t"></i>',
    title: "Stages",
    pane: '<p>This tab contains information on the stages for the selected edition'
  })
  .addPanel({
    id: "information",
    tab: '<i class="fa-solid fa-circle-info"></id>',
    title: "Information",
    pane: '<p>Here you can find information on the Tour de France.'
  })

// be notified when a panel is opened
sidebar.on("content", function (ev) {
  switch (ev.id) {
    case "autopan":
      sidebar.options.autopan = true;
      break;
    default:
      sidebar.options.autopan = false;
  }
});

var userid = 0;

function addUser() {
  sidebar.addPanel({
    id: "user" + userid++,
    tab: '<i class="fa fa-user"></i>',
    title: "User Profile " + userid,
    pane: "<p>user ipsum dolor sit amet</p>",
  });
}


//D3.JS on Leaflet
Promise.all([
  d3.csv(
    "https://raw.githubusercontent.com/com-480-data-visualization/datavis-project-2022-datawiz/master/data/locations.csv"
  ),
]).then(function (initialize) {
  let locations = initialize[0];

  var markers = [];
  var links = [];

  for (var i = 0; i < 10; i++) {
    source = [+locations[i].long, +locations[i].lat];
    target = [+locations[i + 1].long, +locations[i + 1].lat];

    link = { source: source, target: target };
    links.push(link);

    marker = { long: +locations[i].lat, lat: locations[i].long };
    markers.push(marker);

    if (i == 9) {
      marker = { long: +locations[i + 1].lat, lat: locations[i + 1].long };
      markers.push(marker);
    }
  }

  //Draw circles on locations
  d3.select("#map")
    .select("svg")
    .selectAll("myCircles")
    .data(markers)
    .enter()
    .append("circle")
    .attr("cx", function (d) {
      return map.latLngToLayerPoint([d.lat, d.long]).x;
    })
    .attr("cy", function (d) {
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
    .selectAll("path")
    .data(links)
    .join("path")
    .attr("d", function (d) {
      var source = map.latLngToLayerPoint(d.source);
      source = [source.x, source.y];

      var target = map.latLngToLayerPoint(d.target);
      target = [target.x, target.y];

      return linkGen({ source: source, target: target });
    })
    .attr("fill", "none")
    .attr("stroke", "black");
});
