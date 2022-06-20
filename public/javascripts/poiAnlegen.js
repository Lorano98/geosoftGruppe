var mark = null;
var nameInput = document.getElementById('name');

// Karte mit Zentrum definieren
var map = L.map('map').setView([51.96, 7.62], 13);

// OSM Layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Toolbar zum Zeichnen von Rechtecken
var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);
var drawControl = new L.Control.Draw({
    edit: {
        featureGroup: drawnItems
    },
    draw: {
        polygon: false,
        rectangle: false,
        marker: true,
        circle: false,
        polyline: false
    }
});
map.addControl(drawControl);

// Event Listener, der aktiv wird, wenn fertig gezeichnet wurde
map.on(L.Draw.Event.CREATED, function (e) {
    mark = e.layer;
    map.addLayer(mark);

    let coords = e.layer.getLatLng();
    console.log(coords);
});

// Löschen des letzten Rectangle
map.on(L.Draw.Event.DRAWSTART, function (e) {
    if (mark != null) {
        map.removeLayer(mark);
    }
});
