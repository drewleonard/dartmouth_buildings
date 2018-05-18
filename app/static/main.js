/**
 * MAP
 */

// Add tile layer to map object
var tiles = new L.StamenTileLayer("toner-lite");
var map = new L.Map("map", {
    center: new L.LatLng(43.7043222, -72.2875),
    zoom: 17
});

// Add feature layer to map object
var featureLayer = new L.GeoJSON();

/**
 * STYLING OPTIONS
 */

var campusStyle = {
    color: "#dc322f",
    fillColor: "#dc322f",
    weight: 3,
    opacity: 0.95,
    fillOpacity: 0.25,
};

var hiddenStyle = {
    color: "#fdf6e3",
    fillColor: "#fdf6e3",
    weight: 3,
    opacity: 0.95,
    fillOpacity: 0.25
}

var highlightStyle = {
    color: '#ff7800',
    fillColor: '#ff7800',
    weight: 1,
    opacity: 0.95,
    fillOpacity: 0.25
};

/**
 * ANIMATION OVER YEARS
 */

var thisDate = 1769,
    dateEnd = 1777,
    stepTime = 1000;

function step() {

    console.log("Step: " + thisDate);

    map.removeLayer(featureLayer);

    var onEachFeature = function(feature, layer) {
        if (thisDate == feature.properties.dateAddedStart) {

            var thisOpacity = 0,
                thisFillOpacity = 0;

            var thisSetStyle = 0,
                setStyleEnd = 100;

            function stepStyle() {

                var campusStyleFade = {
                    color: "#dc322f",
                    fillColor: "#dc322f",
                    weight: 3,
                    opacity: thisOpacity,
                    fillOpacity: thisFillOpacity,
                    className: "campus"
                }

                thisOpacity = thisOpacity + (0.95 / 100);
                thisFillOpacity = thisFillOpacity + (0.25 / 100);

                layer.setStyle(campusStyleFade);

                thisSetStyle++;
                if (thisSetStyle < setStyleEnd) {
                    setTimeout(stepStyle, 10)
                }

            }

            stepStyle();

        } else if (thisDate > feature.properties.dateAddedStart) {
            layer.setStyle(campusStyle);
        } else {
            layer.setStyle(hiddenStyle);
        };
    };

    featureLayer = L.geoJson(thisCampus, {
        onEachFeature: onEachFeature
    });

    map.addLayer(featureLayer);

    thisDate++;
    if (thisDate < dateEnd) {
        setTimeout(step, stepTime);
    }
}
step();