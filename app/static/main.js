/**
 * GLOBAL SETTINGS
 */

var thisDate = 1765,
    dateEnd = 1785;

var stepTime = 500;

/**
 * MAP
 */

// Add tile layer to map object
var tiles = new L.StamenTileLayer("toner-lite");
var map = new L.Map("map", {
    center: new L.LatLng(43.7043222, -72.2875),
    zoom: 16
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
 * POPULATE SIDEBAR WITH YEARS
 */

function populateSidebarYears(yearStart, yearEnd) {

    for (i = yearStart; i <= yearEnd; i++) {

        // Record sidebar height
        var sidebarHeight = $("#sidebar").height();

        var $thisYearDivContainer = $("<div/>")
            .attr("id", "sidebar-year-item")
            .addClass("sidebar-year-item")
            .html("<div></div>");

        // if (i == thisDate) {
        //     var $thisYearDivContainer = $("<div/>")
        //         .attr("id", "current-year-item")
        //         .addClass("current-year-item")
        //         .html("<div></div>");
        // } else {
        //     var $thisYearDivContainer = $("<div/>")
        //         .attr("id", "sidebar-year-item")
        //         .addClass("sidebar-year-item")
        //         .html("<div></div>");
        // }

        var $thisYearDivIcon = $("<div/>")
            .attr("id", "year-div-icon")
            .addClass("year-div-icon")
            .html("<div></div>");

        var $thisYearDivYear = $("<div/>")
            .attr("id", "year-div-year")
            .addClass("year-div-year")
            .html("<div>" + i + "</div>");

        $thisYearDivContainer.append($thisYearDivIcon);
        $thisYearDivContainer.append($thisYearDivYear);
        $("#sidebar-year-container").append($thisYearDivContainer);

        // Set sidebar height
        $("#sidebar").height(sidebarHeight);

    }

}

function createStoryItem(number, title) {

    if (number == 1) {

        var $thisStoryDivItem = $("<div/>")
            .attr("id", "story-div-item")
            .addClass("story-div-item-current")
            .html("<div></div>");

        var $thisItemNumber = $("<div/>")
            .attr("id", "item-number")
            .addClass("item-number-current")
            .html("<div>" + number + "</div>");

        var $thisItemTitle = $("<div/>")
            .attr("id", "item-title")
            .addClass("item-title-current")
            .html("<div>" + title + "</div>");

    } else {

        var $thisStoryDivItem = $("<div/>")
            .attr("id", "story-div-item")
            .addClass("story-div-item")
            .html("<div></div>");

        var $thisItemNumber = $("<div/>")
            .attr("id", "item-number")
            .addClass("item-number")
            .html("<div>" + number + "</div>");

        var $thisItemTitle = $("<div/>")
            .attr("id", "item-title")
            .addClass("item-title")
            .html("<div>" + title + "</div>");

    }

    $thisStoryDivItem.append($thisItemNumber);
    $thisStoryDivItem.append($thisItemTitle);

    return $thisStoryDivItem;

}

function createStoryTitle(title) {

    // Story title
    var $thisStoryDivTitle = $("<div/>")
        .attr("id", "story-div-title")
        .addClass("story-div-title")
        .html("<div>" + title + "</div>");

    // Add story title to container
    return $thisStoryDivTitle;

}

function createSidebarStory() {

    // Story container
    var $thisStoryDiv = $("<div/>")
        .attr("id", "story-div")
        .addClass("story-div")
        .html("<div></div>");

    $thisStoryDiv.append(createStoryTitle("Introduction"));
    $thisStoryDiv.append(createStoryItem(1, "This project"));
    $thisStoryDiv.append(createStoryItem(2, "Going forward"));

    // Add story to container
    $("#sidebar-year-container").append($thisStoryDiv);

}

createSidebarStory();
populateSidebarYears(thisDate, 1781);

/**
 * ANIMATION OVER YEARS
 */

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