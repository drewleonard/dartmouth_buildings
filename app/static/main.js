/**
 * GLOBAL SETTINGS
 */

var startDate = 1765,
    endDate = 2000,
    thisDate = startDate,
    thisDateEnd;

var stepTime = 500;

currentStoryIndex = 0;

const storyDict = {
    1765: {
        "title": "Introduction",
        "items": {
            "1": "This project",
            "2": "Going forward"
        }
    },
    1800: {
        "title": "Second Story",
        "items": {
            "1": "2nd project",
            "2": "2nd forward"
        }
    }
};

var currentStoryItem;

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
 * CREATE SIDERBAR STORIES
 */

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

        currentStoryItem = $thisStoryDivItem;

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

function createSidebarStory(key) {

    // Story container
    var $thisStoryDiv = $("<div/>")
        .attr("id", "story-div")
        .addClass("story-div")
        .html("<div></div>");

    $thisStoryDiv.append(createStoryTitle(storyDict[key]["title"]));

    for (var itemKey in storyDict[key]["items"]) {
        $thisStoryDiv.append(createStoryItem(itemKey, storyDict[key]["items"][itemKey]));
    }

    return $thisStoryDiv;

}

/**
 * POPULATE SIDEBAR WITH YEARS
 */

function populateSidebarYears(yearStart, yearEnd) {

    for (i = yearStart; i <= yearEnd; i++) {

        // Add story if available
        for (var key in storyDict) {
            if (i == key) {
                $("#sidebar-year-container")
                    .append(createSidebarStory(key));
            }
        }

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

populateSidebarYears(thisDate, endDate);

/**
 * ANIMATE MAP ON JUMP
 */

function animateMap(thisParent) {

    // Slide the map in
    var slideTime = 100,
        delay = 25;

    $thisParent = $(thisParent).parent().parent();

    $thisParent.toggle("slide", {
        direction: "right"
    }, slideTime);

    setTimeout(function() {
        $("#map").toggle("slide", {
            direction: "left"
        }, slideTime)
    }, slideTime + delay);

    // Set the currentStoryIndex
    currentStoryIndex++;

    // Find next year to jump to
    thisNextYear = Object.keys(storyDict).sort();

}

/**
 * JUMP BETWEEN CARDS
 */

function jumpFoward(thisParent) {

    var slideTime = 100,
        delay = 25;

    $thisParent = $(thisParent).parent().parent();
    $buttonParentIndex = $thisParent.attr("id").slice(-1);
    nextIndex = parseInt($buttonParentIndex) + 1;
    $nextParent = $("#" + $thisParent.attr("id").slice(0, -1) + nextIndex);

    $thisParent.toggle("slide", {
        direction: "right"
    }, slideTime)

    setTimeout(function() {
        $nextParent.toggle("slide", {
            direction: "left"
        }, slideTime)
    }, slideTime + delay);

    // Remove classing from current story item
    currentStoryItem.removeClass("story-div-item-current");
    currentStoryItem.addClass("story-div-item");
    currentStoryItem.find("#item-number").removeClass("item-number-current");
    currentStoryItem.find("#item-number").addClass("item-number");
    currentStoryItem.find("#item-title").removeClass("item-title-current");
    currentStoryItem.find("#item-title").addClass("item-title");

    console.log(currentStoryItem);

    // Set new currentStoryItem
    currentStoryItem = currentStoryItem.next();

    console.log(currentStoryItem);

    // Add classing to next story item
    currentStoryItem.removeClass("story-div-item");
    currentStoryItem.addClass("story-div-item-current");
    currentStoryItem.find("#item-number").removeClass("item-number");
    currentStoryItem.find("#item-number").addClass("item-number-current");
    currentStoryItem.find("#item-title").removeClass("item-title");
    currentStoryItem.find("#item-title").addClass("item-title-current");

}

function jumpBackward(thisParent) {

    var slideTime = 100,
        delay = 25;

    $thisParent = $(thisParent).parent().parent();
    $buttonParentIndex = $thisParent.attr("id").slice(-1);
    nextIndex = parseInt($buttonParentIndex) - 1;
    $nextParent = $("#" + $thisParent.attr("id").slice(0, -1) + nextIndex);

    $thisParent.toggle("slide", {
        direction: "left"
    }, slideTime)

    setTimeout(function() {
        $nextParent.toggle("slide", {
            direction: "right"
        }, slideTime)
    }, slideTime + delay);

    // Remove classing from current story item
    currentStoryItem.removeClass("story-div-item-current");
    currentStoryItem.addClass("story-div-item");
    currentStoryItem.find("#item-number").removeClass("item-number-current");
    currentStoryItem.find("#item-number").addClass("item-number");
    currentStoryItem.find("#item-title").removeClass("item-title-current");
    currentStoryItem.find("#item-title").addClass("item-title");

    // // Set new currentStoryItem
    currentStoryItem = currentStoryItem.prev();

    // Add classing to next story item
    currentStoryItem.removeClass("story-div-item");
    currentStoryItem.addClass("story-div-item-current");
    currentStoryItem.find("#item-number").removeClass("item-number");
    currentStoryItem.find("#item-number").addClass("item-number-current");
    currentStoryItem.find("#item-title").removeClass("item-title");
    currentStoryItem.find("#item-title").addClass("item-title-current");

}

/**
 * ANIMATION OVER YEARS
 */

function step() {

    // console.log("Step: " + thisDate);

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
    if (thisDate < endDate) {
        setTimeout(step, stepTime);
    }

}

/**
 * MATERIAL DESIGN BUTTON
 */
// const buttonRipple = new MDCRipple(document.querySelector('.mdc-button'));