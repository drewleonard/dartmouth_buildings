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
    var containerH = container.height(),
        imgId = container.attr("id"),
        imgW = dims[imgId]["w"],
        imgH = dims[imgId]["h"];
    var containerW = (imgW / imgH) * containerH;
    if (containerW < ($(".story-container-item").width())) {
        container.width(containerW + "px");
    }
    if (containerW >= ($(".story-container-item").width())) {
        container.width($(".story-container-item").width() + "px");
    }
}

/**
 * Dictionary of image heights and widths
 */

dims = {
    "gold-coast-half": { "w": 2934, "h": 3359 },
    "gold-coast-full": { "w": 5829, "h": 3517 }
}