
Promise.all([
    d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_connectionmap.csv") // Position of circles
  ]).then(function (initialize) {

    let locations = initialize[0]

    console.log(locations)


})
  
var map = L
    .map('map')
    .setView([47, 2], 5);

// Add a tile to the map = a background. Comes from OpenStreetmap
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
    maxZoom: 16,
    detectRetina: true
}).addTo(map);

var sidebar = L.control.sidebar({
        container: 'sidebar'
    })
    .addTo(map)
    .open('home');

// add panels dynamically to the sidebar
sidebar
    .addPanel({
        id: 'js-api',
        tab: '<i class="fa fa-gear"></i>',
        title: 'JS API',
        pane: '<p>The Javascript API allows to dynamically create or modify the panel state.<p/><p><button onclick="sidebar.enablePanel(\'mail\')">enable mails panel</button><button onclick="sidebar.disablePanel(\'mail\')">disable mails panel</button></p><p><button onclick="addUser()">add user</button></b>',
    })
    // add a tab with a click callback, initially disabled
    .addPanel({
        id: 'mail',
        tab: '<i class="fa fa-envelope"></i>',
        title: 'Messages',
        button: function() {
            alert('opened via JS callback')
        },
        disabled: true,
    })

// be notified when a panel is opened
sidebar.on('content', function(ev) {
    switch (ev.id) {
        case 'autopan':
            sidebar.options.autopan = true;
            break;
        default:
            sidebar.options.autopan = false;
    }
});

var userid = 0

function addUser() {
    sidebar.addPanel({
        id: 'user' + userid++,
        tab: '<i class="fa fa-user"></i>',
        title: 'User Profile ' + userid,
        pane: '<p>user ipsum dolor sit amet</p>',
    });
}