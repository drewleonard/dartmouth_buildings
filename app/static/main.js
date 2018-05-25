/**
 * TODO
 * 1. Animate buildings over many years
 * 2. Edit timeline sidebar
 *     => UI
 *     => Controls
 * 3. Style all main cards (stories + map) the same
 *     => border-redius
 * 4. Develop other pages
 *     => about page
 *     => landing page
 * 5. FIX ALL DESCRIPTIONS
 * 6. Add "similar to" for other examples of stories
 */

for (i = 1765; i < 2015; i++) {
    $.each(meacham, function(key, value) {
        if (value.length === 175) {
            for (val in value) {
                if (value[val].properties.dateAddedStart === i) {
                    console.log(value[val].properties.dateAddedStart);
                    console.log(value[val].properties.Name);
                }
            }
        }
    });
}


/**
 * GLOBAL SETTINGS
 */

var startDate = 1765,
    endDate = 2000,
    thisDate = startDate,
    thisDateEnd = endDate,
    numYears = 10;

var stepTime = 50,
    slideTime = 100,
    slideDelay = 25;

var secondaryIndex = 1, // current story pane
    primaryIndex = 1; // current story

const storyDict = {
    1765: {
        "title": "Introduction",
        "items": {
            "1": "This project",
            "2": "Going forward"
        }
    },
    1990: {
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
// 
var campusStyle = {
    color: "#dc322f",
    fillColor: "#dc322f",
    weight: 3,
    opacity: 0.95,
    fillOpacity: 0.25,
};

var tiles = new L.StamenTileLayer("toner-lite");
var map = new L.Map("map", {
    center: new L.LatLng(43.7053222, -72.2875),
    zoom: 16
});

tiles.addTo(map);

// Add feature layer to map object
var featureLayer = new L.GeoJSON();
var onEachFeature = function(feature, layer) {
    layer.setStyle(campusStyle);
    layer.on('click', mapClick);
}
featureLayer = L.geoJson(meacham, {
    onEachFeature: onEachFeature,
});

// function that is called when line is clicked
function mapClick(e) { // e is a leaflet Event object
    console.log(e.target.feature.properties.Name);
}

map.addLayer(featureLayer);

/**
 * STYLING OPTIONS
 */

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

// function createStoryItem(number, title) {

//     if (number == 1) {

//         var $thisStoryDivItem = $("<div/>")
//             .attr("id", "story-div-item")
//             .addClass("story-div-item-current")
//             .html("<div></div>");

//         var $thisItemNumber = $("<div/>")
//             .attr("id", "item-number")
//             .addClass("item-number-current")
//             .html("<div>" + number + "</div>");

//         var $thisItemTitle = $("<div/>")
//             .attr("id", "item-title")
//             .addClass("item-title-current")
//             .html("<div>" + title + "</div>");

//         currentStoryItem = $thisStoryDivItem;

//     } else {

//         var $thisStoryDivItem = $("<div/>")
//             .attr("id", "story-div-item")
//             .addClass("story-div-item")
//             .html("<div></div>");

//         var $thisItemNumber = $("<div/>")
//             .attr("id", "item-number")
//             .addClass("item-number")
//             .html("<div>" + number + "</div>");

//         var $thisItemTitle = $("<div/>")
//             .attr("id", "item-title")
//             .addClass("item-title")
//             .html("<div>" + title + "</div>");

//     }

//     $thisStoryDivItem.append($thisItemNumber);
//     $thisStoryDivItem.append($thisItemTitle);

//     return $thisStoryDivItem;

// }

// function createStoryTitle(title) {

//     // Story title
//     var $thisStoryDivTitle = $("<div/>")
//         .attr("id", "story-div-title")
//         .addClass("story-div-title")
//         .html("<div>" + title + "</div>");

//     // Add story title to container
//     return $thisStoryDivTitle;

// }

// function createSidebarStory(key) {

//     // Story container
//     var $thisStoryDiv = $("<div/>")
//         .attr("id", "story-div")
//         .addClass("story-div")

//         .html("<div></div>");

//     $thisStoryDiv.append(createStoryTitle(storyDict[key]["title"]));

//     for (var itemKey in storyDict[key]["items"]) {
//         $thisStoryDiv.append(createStoryItem(itemKey, storyDict[key]["items"][itemKey]));
//     }

//     return $thisStoryDiv;

// }

/**
 * REMOVE YEARS FROM SIDEBAR
 */

// function removeSidebarYears() {
//     $("#sidebar-year-container").empty();
// }

/**
 * POPULATE SIDEBAR WITH YEARS
 */

// function populateSidebarYears(yearStart, yearEnd, thisDateEnd) {

//     // console.log(yearStart);

//     for (i = yearStart; i <= yearEnd; i++) {

//         // Add story if available
//         for (var key in storyDict) {
//             if (i == key) {
//                 $("#sidebar-year-container")
//                     .append(createSidebarStory(key));
//             }
//         }

//         // Record sidebar height
//         var sidebarHeight = $("#sidebar").height();

//         if (i == thisDate && yearStart !== parseInt(thisDateEnd)) {
//             var $thisYearDivContainer = $("<div/>")
//                 .attr("id", "current-year-item")
//                 .addClass("current-year-item")
//                 .html("<div></div>");
//         } else {
//             var $thisYearDivContainer = $("<div/>")
//                 .attr("id", "sidebar-year-item")
//                 .addClass("sidebar-year-item")
//                 .html("<div></div>");
//         }

//         var $thisYearDivIcon = $("<div/>")
//             .attr("id", "year-div-icon")
//             .addClass("year-div-icon")
//             .html("<div></div>");

//         var $thisYearDivYear = $("<div/>")
//             .attr("id", "year-div-year")
//             .addClass("year-div-year")
//             .html("<div>" + i + "</div>");

//         $thisYearDivContainer.append($thisYearDivIcon);
//         $thisYearDivContainer.append($thisYearDivYear);
//         $("#sidebar-year-container").append($thisYearDivContainer);

//         // Set sidebar height
//         $("#sidebar").height(sidebarHeight);

//     }

// }

// populateSidebarYears(thisDate, thisDate + numYears, startDate);

/**
 * Increment primary index (whole stories)
 */
function incrementPrimaryIndex() {
    primaryIndex++;
}

/**
 * Decrement primary index (whole stories)
 */
function decrementPrimaryIndex() {
    primaryIndex--;
}

/**
 * Increment secondary index (substories)
 */
function incrementSecondaryIndex() {
    secondaryIndex++;
}

/**
 * Decrement secondary index (substories)
 */
function decrementSecondaryIndex() {
    secondaryIndex--;
}

/**
 * Return story card item div reference
 * @param  {int} secondaryIndex Story card index
 * @param  {int} offset         Number to offset div
 * @return {div}                Story card div
 */
function getPrimaryItem(secondaryIndex, offset) {
    secondaryIndex += offset;
    return $("#story-card-" + secondaryIndex.toString());
}

/**
 * Return sidebar item div reference
 * @param  {int} secondaryIndex Sidebar item index
 * @param  {int} offset         Number to offset div
 * @return {div}                Sidebar item div
 */
function getSecondaryItem(secondaryIndex, offset) {
    secondaryIndex += offset;
    return $("#sidebar-story-item-" + secondaryIndex.toString());
}

/**
 * Slide forward between story cards
 */
function storyToStoryForward() {

    $thisPrimary = getPrimaryItem(secondaryIndex, 0);
    $nextPrimary = getPrimaryItem(secondaryIndex, 1);

    $thisSecondary = getSecondaryItem(secondaryIndex, 0);
    $nextSecondary = getSecondaryItem(secondaryIndex, 1);

    $thisPrimary.toggle("slide", {
        direction: "right"
    }, slideTime)

    setTimeout(function() {
        $nextPrimary.toggle("slide", {
            direction: "left"
        }, slideTime)
    }, slideTime + slideDelay);

    $thisSecondary.removeClass("sidebar-story-card-item-active");
    $thisSecondary.find("i").replaceWith("<i class='material-icons md-18'>check_box</i>");
    $nextSecondary.addClass("sidebar-story-card-item-active");

    incrementSecondaryIndex();

}

/**
 * Slide backward between story cards
 */
function storyToStoryBackward() {

    $thisPrimary = getPrimaryItem(secondaryIndex, 0);
    $prevPrimary = getPrimaryItem(secondaryIndex, -1);

    $thisSecondary = getSecondaryItem(secondaryIndex, 0);
    $prevSecondary = getSecondaryItem(secondaryIndex, -1);

    $thisPrimary.toggle("slide", {
        direction: "left"
    }, slideTime)

    setTimeout(function() {
        $prevPrimary.toggle("slide", {
            direction: "right"
        }, slideTime)
    }, slideTime + slideDelay);

    $thisSecondary.removeClass("sidebar-story-card-item-active");
    $prevSecondary.addClass("sidebar-story-card-item-active");
    $prevSecondary.find("i").replaceWith("<i class='material-icons md-18'>check_box_outline_blank</i>");

    decrementSecondaryIndex();

}

/**
 * ANIMATE MAP ON JUMP
 */

function storyToMapForward() {

    // Slide current card out for map
    $thisParent = $("#story-card-" + secondaryIndex.toString());

    $thisParent.toggle("slide", {
        direction: "right"
    }, slideTime);

    setTimeout(function() {
        $("#map").toggle("slide", {
            direction: "left"
        }, slideTime)
    }, slideTime + slideDelay);

    $thisSidebarItem = $("#sidebar-story-item-" + secondaryIndex.toString());
    $thisSidebarItem.removeClass("sidebar-story-card-item-active");
    $thisSidebarItem.addClass("sidebar-story-card-item");

    $thisSidebarItem.find("i").replaceWith("<i class='material-icons md-18'>check_box</i>");

    // Depress current sidebar story card
    $thisSidebarCard = $("#sidebar-story-card-" + primaryIndex.toString());
    $thisSidebarCard.removeClass("sidebar-story-card-active");
    $thisSidebarCard.addClass("sidebar-story-card");

    // Find next year to jump to
    thisDateEnd = Object.keys(storyDict).sort()[primaryIndex];
    step();

}

function mapToStoryForward() {

    incrementPrimaryIndex();
    incrementSecondaryIndex();

    $thisParent = getPrimaryItem(secondaryIndex, 0);

    $("#map").toggle("slide", {
        direction: "right"
    }, slideTime);

    setTimeout(function() {
        $thisParent.toggle("slide", {
            direction: "left"
        }, slideTime)
    }, slideTime + slideDelay);

}

function storyToMapBackward() {

    // $thisParent = $(thisParent).parent().parent();
    $thisParent = $("#story-card-" + secondaryIndex.toString());

    // Set the primaryIndex and secondaryIndex
    primaryIndex--;
    secondaryIndex--;

    $thisParent.toggle("slide", {
        direction: "left"
    }, slideTime);

    setTimeout(function() {
        $("#map").toggle("slide", {
            direction: "right"
        }, slideTime)
    }, slideTime + slideDelay);

}

/**
 * ANIMATION OVER YEARS
 */

// function step() {

//     // Resize window due to fix hidden display issues
//     window.dispatchEvent(new Event('resize'));

//     console.log("Step: " + thisDate);

//     map.removeLayer(featureLayer);

//     var onEachFeature = function(feature, layer) {
//         if (thisDate == feature.properties.dateAddedStart) {

//             var thisOpacity = 0,
//                 thisFillOpacity = 0;

//             var thisSetStyle = 0,
//                 setStyleEnd = 1000;

//             function stepStyle() {

//                 var campusStyleFade = {
//                     color: "#dc322f",
//                     fillColor: "#dc322f",
//                     weight: 3,
//                     opacity: thisOpacity,
//                     fillOpacity: thisFillOpacity,
//                     className: "campus"
//                 }

//                 thisOpacity = thisOpacity + (0.95 / 1000);
//                 thisFillOpacity = thisFillOpacity + (0.25 / 1000);

//                 layer.setStyle(campusStyleFade);

//                 thisSetStyle++;
//                 if (thisSetStyle < setStyleEnd) {
//                     setTimeout(stepStyle, 1)
//                 }

//             }

//             stepStyle();

//         } else if (thisDate > feature.properties.dateAddedStart) {
//             layer.setStyle(campusStyle);
//         } else {
//             layer.setStyle(hiddenStyle);
//         };
//     };

//     featureLayer = L.geoJson(meacham, {
//         onEachFeature: onEachFeature,
//     });

//     featureLayer.on('click', function(e) { console.log(e) });

//     map.addLayer(featureLayer);

//     removeSidebarYears();
//     populateSidebarYears(thisDate, thisDate + numYears, thisDateEnd);

//     thisDate++;
//     if (thisDate <= thisDateEnd) {
//         setTimeout(step, stepTime);
//     } else {
//         $("#map-button-story").show();
//     }

// }

/**
 * MATERIAL DESIGN BUTTON
 */
// const buttonRipple = new MDCRipple(document.querySelector('.mdc-button'));
// let drawer = new mdc.drawer.MDCTemporaryDrawer(document.querySelector('.mdc-drawer--temporary'));
// document.querySelector('.menu').addEventListener('click', () => drawer.open = true);