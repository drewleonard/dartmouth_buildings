// Add tile layer to map object
var tiles = new L.StamenTileLayer("toner-lite");
var map = new L.Map("map", {
    center: new L.LatLng(43.7043222, -72.2875),
    zoom: 16
});
map.addLayer(tiles);

// Add feature layer to map object
var featureLayer = new L.GeoJSON();

var campusStyle = {
    "color": "#00693e",
    "fillColor": "#00693e",
    "weight": 3,
    opacity: 0.95,
    fillOpacity: 0.25
};

var highlightStyle = {
    color: '#ff7800',
    fillColor: '#ff7800',
    weight: 3,
    opacity: 0.95,
    fillOpacity: 0.25
};

var onEachFeature = function(feature, layer) {
    layer.setStyle(campusStyle);
    layer.on("mouseover", function(e) {
        layer.setStyle(highlightStyle);
        console.log(layer.feature.properties.Name)
    });
    layer.on("mouseout", function(e) {
        layer.setStyle(campusStyle)
    });
};

var featureLayer = L.geoJson(campus, {
    onEachFeature: onEachFeature
});

map.addLayer(featureLayer);