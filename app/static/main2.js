/**
 * TODO:
 * 1. Place buttons on first open of story
 */

/**
 * Map of image labels to metadata
 */
ground_truth = {
    "gold-coast-1": {
        "w": 4299,
        "h": 3130,
        "title": "Bankrolling the campus: Gold Coast. Gold Coast, undated.",
        "caption": "The Gold Coast dormitory cluster was built during the early years of the Great Depression (1928-9) by trustees John Gile, John Lord, and Frank Streeter. Gold Coast's philanthropic history is typical of many College buildings: donors gave money in return for the vanity of their namesakes attached to campus spaces. The cluster's name comes from its' rooms reputations as the most expensive to rent on campus.",
        "citation": "Image: Dartmouth Digital Collections. Caption: Scott Meacham, 'Notes toward a Catalog of the Buildings and Landscapes of Dartmouth College,' Dartmo.: The Buildings of Dartmouth College (updated 2001), at http://www.dartmo.com.",
        "shape-names": ["Streeter Hall", "Gile Hall", "Lord Hall"]
    },
    "gold-coast-2": {
        "w": 2538,
        "h": 2046,
        "title": "Bankrolling the campus: Gold Coast. Room prices, 1930. ",
        "caption": "The Gold Coast cluster earned its reputation and attendant namesake for offering the most expensive rooms to rent on campus. Dartmouth's then-named Office of the Bursar mainted these prices in its annual 'Dormitory Floor Plans and Room Charges' publication.",
        "citation": "Image: Dormitory Floor Plans and Room Charges, 1930. Caption: Scott Meacham, 'Notes toward a Catalog of the Buildings and Landscapes of Dartmouth College,' Dartmo.: The Buildings of Dartmouth College (updated 2001), at http://www.dartmo.com.",
        "shape-names": ["Streeter Hall", "Gile Hall", "Lord Hall"]
    },
    "dicks-house-1": {
        "w": 5888,
        "h": 4688,
        "title": "In memory of: Dick Hall. Dick's House, 1929.",
        "caption": "To be added.",
        "citation:": "To be added.",
        "shape-names": ["Dick Hall's House"]
    },
    "pest-house-1": {
        "w": 4982,
        "h": 3032,
        "title": "Pest House",
        "caption": "To be added.",
        "citation": "To be added.",
        "shape-names": []
    }
}

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

var hiddenStyle = {
    olor: "#dc322f",
    fillColor: "#dc322f",
    weight: 0,
    opacity: 0,
    fillOpacity: 0
}

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
 * Global variables
 */

var cardIndex;
var storyCardItems;

/**
 * Clicking secondary story card to activate new story
 * @param  {div} card 		Selected secondary card div
 */
function activateStory(card) {
    // If card selected is not already selected
    if ($(card).index() !== cardIndex) {

        // Assign card's index to cardIndex
        cardIndex = $(card).index();

        // Inactivate currently active card container
        // & activate new card container
        togglePrimaryCardContainer(cardIndex);

        // Inactivate currently active secondary card
        // & activate selected secondary card
        toggleSecondaryStoryCard(card);

        // Find story card items
        storyCardItems = $(card).find(".mdc-list-item");
        // Activate first story card item
        toggleSecondaryCardItem(storyCardItems[0]);

    }
}

/**
 * Sliding out and deactivating currently active story,
 * & sliding in and activating newly-selected story
 * @param  {int} cardIndex 		Index of selected secondary card
 */
function togglePrimaryCardContainer(cardIndex) {
    // Find and slide out currently active card container
    $(".story-container-right .story-container-items--active")
        .toggle();
    // Inactivate currently active card container
    $(".story-container-right .story-container-items--active")
        .toggleClass('story-container-items--active');
    // Activate new card container with index
    $(".story-container-items").eq(cardIndex + 1).toggleClass('story-container-items--active');
    // Slide in new container with index
    setTimeout(function() {
        $(".story-container-items").eq(cardIndex + 1).toggle();
        scaleWidth($(".story-container-items--active .story-container-item--active"));
    }, 200);

    // Resize window to load map tiles properly
    setTimeout(function() {
        window.dispatchEvent(new Event('resize'));
    }, 200);

}

/**
 * Toggling 'active' class of secondard story card
 * @param  {div} card 		card div to toggle 'active' class of
 */
function toggleSecondaryStoryCard(card) {
    // Inactivate all items within secondary card 
    $(".story-container-left .story-card-secondary-item-active")
        .removeClass("story-card-secondary-item-active");
    $(".story-container-left .story-card-secondary-icon")
        .replaceWith("<i class='story-card-secondary-icon material-icons md-18'>check_box_outline_blank</i>");
    // Inactivate currently selected card
    $(".story-container-left .story-card-secondary--active")
        .toggleClass("story-card-secondary--active");
    // Activate selected secondary card
    $(card).toggleClass("story-card-secondary--active");
}

/**
 * Toggling 'active' class of secondary story card item
 * @param  {div} item 		div to toggle 'active' class of
 */
function toggleSecondaryCardItem(item) {

    $(item).toggleClass("story-card-secondary-item-active");
    if ($(item).attr("class").split(' ').includes("story-card-secondary-item-active")) {
        $(item)
            .find(".story-card-secondary-icon")
            .replaceWith("<i class='story-card-secondary-icon material-icons md-18'>check_box</i>");
    } else {
        $(item)
            .find(".story-card-secondary-icon")
            .replaceWith("<i class='story-card-secondary-icon material-icons md-18'>check_box_outline_blank</i>");
    }
}

/**
 * Use nav buttons to move forward in story
 */
function stepForward() {
    // Get currently active story container item and next sibling
    var $thisSibling = $(".story-container-items--active .story-container-item--active"),
        $nextSibling = $thisSibling.next();
    // Slide out and deactivate current active story container item
    $thisSibling.toggle();
    $thisSibling.toggleClass("story-container-item--active");
    // Slide in and activate next story container item
    $nextSibling.toggle();
    $nextSibling.toggleClass("story-container-item--active");
    // Scale width of new container to preserve aspect ratio
    scaleWidth($nextSibling);
}

function stepBackward() {
    // Get currently active story container item and previous sibling
    var $thisSibling = $(".story-container-items--active .story-container-item--active"),
        $prevSibling = $thisSibling.prev();
    // Slide out and deactivate current active story container item
    $thisSibling.toggle();
    $thisSibling.toggleClass("story-container-item--active");
    // Slide in and activate previous story container item
    $prevSibling.toggle();
    $prevSibling.toggleClass("story-container-item--active");
    // Scale width of new container to preserve aspect ratio
    scaleWidth($prevSibling);
}

/**
 * Scale width of image container to preserve aspect ratio
 * Relies on dictionary of ground truth image dimensions
 * @param  {div} container 			image container
 */
function scaleWidth(container) {
    console.log(container.attr("id"));
    var containerH = container.height(),
        imgId = container.attr("id"),
        imgW = ground_truth[imgId]["w"],
        imgH = ground_truth[imgId]["h"];
    var containerW = (imgW / imgH) * containerH;
    if (containerW < ($(".story-container-item").width())) {
        container.width(containerW + "px");
    }
    if (containerW >= ($(".story-container-item").width())) {
        container.width($(".story-container-item").width() + "px");
    }
}

/**
 * Caption images across the bottom
 */
function captionImage() {
    var id = $(".story-container-item--active").attr("id"),
        text = ground_truth[id]["caption"],
        title = ground_truth[id]["title"],
        citation = ground_truth[id]["citation"];
    var captionDiv = $("<div/>")
        .attr("id", "this-image-caption")
        .addClass("image-caption")
        .html("<div></div>"),
        titleDiv = $("<div/>")
        .addClass("image-caption-title")
        .html("<div>" + title + "</div>"),
        textDiv = $("<div/>")
        .addClass("image-caption-text")
        .html("<div>" + text + "</div>"),
        citationDiv = $("<div/>")
        .addClass("image-caption-citation")
        .html("<div>" + citation + "</div>");
    captionDiv.append(titleDiv);
    captionDiv.append(textDiv);
    captionDiv.append(citationDiv);
    $(".story-container-item--active .story-container-item-image")
        .append(captionDiv);
    var topPos = $(".story-container-item--active .story-container-item-image").offset()["top"],
        leftPos = $(".story-container-item--active .story-container-item-image").offset()["left"],
        imgWidth = $(".story-container-item--active .story-container-item-image").width(),
        imgHeight = $(".story-container-item--active .story-container-item-image").height(),
        captionHeight = $(".story-container-item--active .image-caption").height(),
        captionWidth = imgWidth - 10;
    $(".story-container-item--active .image-caption").width(captionWidth);
    $(".story-container-item--active .image-caption").offset({
        top: topPos + imgHeight - captionHeight - 5,
        left: leftPos + imgWidth - captionWidth - 5
    });
}

/**
 * Remove image caption
 */
function uncaptionImage() {
    $(".story-container-item--active .image-caption").remove();
}

/**
 * Map locations of buildings in images
 * Called when mousing over map button
 */
function mapImage() {
    var id = $(".story-container-item--active").attr("id"),
        shapeNames = ground_truth[id]["shape-names"];
    var mapDiv = $("<div/>")
        .attr("id", "this-image-map")
        .addClass("image-map")
        .html("<div></div>");
    $(".story-container-item--active .story-container-item-image")
        .append(mapDiv);
    var topPos = $(".story-container-item--active .story-container-item-image").offset()["top"],
        leftPos = $(".story-container-item--active .story-container-item-image").offset()["left"],
        imgWidth = $(".story-container-item--active .story-container-item-image").width(),
        imgHeight = $(".story-container-item--active .story-container-item-image").height();
    $(".story-container-item--active .image-map").width(imgWidth);
    $(".story-container-item--active .image-map").height(imgHeight);
    $(".story-container-item--active .image-map").offset({
        top: topPos,
        left: leftPos
    });
    var map = new L.Map("this-image-map", {
        center: new L.LatLng(lat, long),
        zoom: zoom
    });
    var tiles = new L.StamenTileLayer("toner-lite");
    tiles.addTo(map);

    function onEachFeature(feature, layer) {
        if (shapeNames.includes(feature.properties.Name)) {
            layer.setStyle(campusStyle);
        } else {
            layer.setStyle(hiddenStyle);
        }
    }
    var featureLayer = new L.GeoJSON(meacham, {
        onEachFeature: onEachFeature,
    });
    map.addLayer(featureLayer);

}

/**
 * Remove maps from images
 * Called when mousing out of map button
 */
function removeMapImage() {
    $(".story-container-item--active .image-map").remove();
}