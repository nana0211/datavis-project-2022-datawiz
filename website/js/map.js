var map = L.map("map").setView([47, 2], 6);

// Add a tile to the map = a background. Comes from OpenStreetmap
L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png", {
        attribution: "Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ",
        maxZoom: 16,
        detectRetina: true,
    }
).addTo(map);

L.svg().addTo(map);



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
sidebar.on("content", function(ev) {
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