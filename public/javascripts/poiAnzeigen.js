var nameInput = document.getElementById('name');

// Karte mit Zentrum definieren
var map = L.map('map').setView([51.96, 7.62], 13);

// OSM Layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

//Fügt alle Punkte auf der Karte ein
geojson.forEach((item) => {
    let c = item.geometry.coordinates;
    let p = item.properties;

    let popupText = p.name;
    L.marker([c[1], c[0]]).addTo(map).bindPopup(popupText);
});
