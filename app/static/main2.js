/**
 * Map for 'map mode'
 */

// Map settings for 'map mode'
var lat = 43.7053222,
    long = -72.2875,
    zoom = 16;

var campusStyle = {
    color: "#dc322f",
    fillColor: "#dc322f",
    weight: 3,
    opacity: 0.95,
    fillOpacity: 0.25,
};

// New map variable
var map = new L.Map("map", {
    center: new L.LatLng(lat, long),
    zoom: zoom
});

// Add tiles to ap
var tiles = new L.StamenTileLayer("toner-lite");
tiles.addTo(map);

function mapClick(e) { // e is a leaflet Event object
    console.log(e.target.feature.properties.Name);
}

function onEachFeature(feature, layer) {
    layer.setStyle(campusStyle);
    layer.on('click', mapClick);
}

var featureLayer = new L.GeoJSON(meacham, {
    onEachFeature: onEachFeature,
});

map.addLayer(featureLayer);

/**
 * Clicking secondary story card
 * @param {div} card 	Selected secondary card div
 */
function selectSecondaryStoryCard(card) {
    var items = $(card).find(".mdc-list-item");
}