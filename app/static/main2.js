/**
 * TODO:
 * 1. Place buttons on first open of story
 * 2. Find other Rauner names
 * 3. Add tooltip for unavailable map
 * 4. Raise shadows on nav buttons
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
        "citation": "Image: Dartmouth Digital Collections. Caption: written by Drew N. Leonard, sourced from Scott Meacham, 'Notes toward a Catalog of the Buildings and Landscapes of Dartmouth College,' Dartmo.: The Buildings of Dartmouth College (updated 2001), at http://www.dartmo.com.",
        "shape-names": ["Streeter Hall", "Gile Hall", "Lord Hall"],
        "story-item-number": 0
    },
    "gold-coast-2": {
        "w": 2538,
        "h": 2046,
        "title": "Bankrolling the campus: Gold Coast. Room prices, 1930. ",
        "caption": "The Gold Coast cluster earned its reputation and attendant namesake for offering the most expensive rooms to rent on campus. Dartmouth's then-named Office of the Bursar mainted these prices in its annual 'Dormitory Floor Plans and Room Charges' publication.",
        "citation": "Image: Dormitory Floor Plans and Room Charges, 1930. Caption: written by Drew N. Leonard, sourced from Scott Meacham, 'Notes toward a Catalog of the Buildings and Landscapes of Dartmouth College,' Dartmo.: The Buildings of Dartmouth College (updated 2001), at http://www.dartmo.com.",
        "shape-names": ["Streeter Hall", "Gile Hall", "Lord Hall"],
        "story-item-number": 0
    },
    "dicks-house-1": {
        "w": 5888,
        "h": 4688,
        "title": "In memory of: Dick Hall. Dick's House, 1929.",
        "caption": "Many campus buildings bear namesakes of passed-away members of the Dartmouth College community. In 1927, Edward and Sally Hall gifted funds to build an infirmary in memory of their son, Richard (Dick) Hall '27, who passed away prior to graduating.",
        "citation": "Image: Dartmouth Digital Collections. Caption: written by Drew N. Leonard, sourced from Scott Meacham, 'Notes toward a Catalog of the Buildings and Landscapes of Dartmouth College,' Dartmo.: The Buildings of Dartmouth College (updated 2001), at http://www.dartmo.com.",
        "shape-names": ["Dick Hall's House"],
        "story-item-number": 1
    },
    "pest-house-1": {
        "w": 4153,
        "h": 2848,
        "title": "Doing good: replacing Isolation Hospital. Isolation Hospital, undated.",
        "caption": "Beyond memorializing their son, Sally and Edward Hall built Dick's House to provide students good, comfortable, and convenient health care. Previously, students recieved care in the Isolation Hospital: nicknamed Pest House and remembered for its poor conditions. In this context, Isolation Hospital's Dr. Kingsford claimed that 'Dick's House was the best thing that ever happened to Dartmouth College.'",
        "citation": "Image: Dartmouth Digital Collections. Caption: written by Drew N. Leonard, sourced from Dartmouth Alumni Magazine, May 1948 and April 1967.",
        "shape-names": [],
        "story-item-number": 1
    },
    "webster-1": {
        "w": 4865,
        "h": 3597,
        "title": "Double dipping: Webster Hall's namesakes. Webster Hall, 1907.",
        "caption": "Many students know the building pictured as Rauner Special Collections Library, but that name applies to the building's interior-library only. The building itself is Webster Hall, and circa 1999, philanthropist Bruce Rauner '78 and others donated funds to convert its interior from an auditorium to a library that houses the College's special collections.",
        "citation": "Image: Dartmouth Digital Collections.",
        "shape-names": ["Webster Hall"],
        "story-item-number": 2
    },
    "rauner-1": {
        "w": 6094,
        "h": 4889,
        "title": "Rauner Library's naming opportunities. Rauner Library design, undated.",
        "caption": "Often, namesakes are attached to entire buildings, but the College offers philanthropic and naming opportunities at many levels. Rauner Library typifies this, with each of its component parts named for individual donors: The Freund Room for John Freund '54, for example. Dartmouth College sold namesakes for the reading room at $1,000,000, the exhibit gallery at $500,000, and seminar rooms for $250,000 (each), among other selections.",
        "citation": "Image: Dartmouth Digital Collections",
        "shape-names": ["Webster Hall"],
        "story-item-number": 2
    },
    "thornton-1": {
        "w": 6150,
        "h": 4811,
        "title": "Establishing direction: Sylvanus Thayer '07 (1807). Thornton Hall, 1884.",
        "caption": "In many cases, the College requests gifts for upcoming or ongoing projects, and attaches donors' namesakes to buildings in return. The story behind the Thayer School of Engineering's funding is different: Sylvanus Thayer approached the College in 1867 with both $40,000 and hopes of establishing 'a School or Department of Architecture and Civil Engineering'. Rather than attaching his namesake to a building envisioned by the College, Thayer pioneered an additional direction for the College. Thayer did not fund any of the school's buildings, but his name remains attached the school itself, pointing to the significant and hands-on role he played in its founding. Pictured here is Thornton Hall, the original home of the Thayer School.",
        "citation": "Image: Dartmouth Digital Collections. Caption: written by Drew N. Leonard, sourced from Thayer School of Engineering at Dartmouth website.",
        "shape-names": ["Thornton Hall"],
        "story-item-number": 3
    }
}

/**
 * GLOBAL SETTINGS
 */

var lat = 43.7053222,
    long = -72.2875,
    zoom = 16;

var campusStyle = {
    color: "#dc322f",
    fillColor: "#dc322f",
    weight: 2,
    opacity: 0.95,
    fillOpacity: 0.25,
};

var highlightStyle = {
    color: "#2962FF",
    fillColor: "#2962FF",
    weight: 2,
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

/**
 * STORY MODE
 */

/**
 * Global variables
 */

var cardIndex;
var storyCardItems;

function resizeWindowDelayed() {
    setTimeout(function() {
        window.dispatchEvent(new Event('resize'));
    }, 200);
}

/**
 * Toggle into story mode
 * Used in toolbar icon event (click)
 */
function toggleStoryMode() {
    if (!$(".container-bottom-story").hasClass("mode--active")) {
        $(".container-bottom-map").removeClass("mode--active");
        $(".container-bottom-map").toggle();
        $(".container-bottom-story").addClass("mode--active");
        $(".container-bottom-story").toggle();
    }
    resizeWindowDelayed();
}

/**
 * Toggle into map mode
 * Used in toolbar icon event (click)
 */
function toggleMapMode() {
    if (!$(".container-bottom-map").hasClass("mode--active")) {
        $(".container-bottom-story").removeClass("mode--active");
        $(".container-bottom-story").toggle();
        $(".container-bottom-map").addClass("mode--active");
        $(".container-bottom-map").toggle();
    }
    resizeWindowDelayed();
}

/**
 * Clicking secondary story card to activate new story
 * @param  {div} card       Selected secondary card div
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
        // Activate first secondary story card (sidebar) item
        toggleSecondaryCardItem(0);
    }
}

/**
 * Sliding out and deactivating currently active story,
 * & sliding in and activating newly-selected story
 * @param  {int} cardIndex      Index of selected secondary card
 */
function togglePrimaryCardContainer(cardIndex) {
    // Find and slide out currently active card container
    $(".story-container-right .story-container-items--active")
        .toggle();
    // Inactivate currently active card container
    $(".story-container-right .story-container-items--active")
        .removeClass('story-container-items--active');
    // Activate new card container with index
    $(".story-container-right .story-container-items").eq(cardIndex + 1).addClass('story-container-items--active');
    // Activate first item, inactivate all others
    $(".story-container-right .story-container-items--active").children().each(function(index, value) {
        if (index === 0) {
            $(this).addClass("story-container-item--active");
        } else {
            $(this).removeClass("story-container-item--active");
        }
    });
    // Show first item, hide all others
    setTimeout(function() {
        $(".story-container-right .story-container-items--active").children().each(function(index, value) {
            if (index === 0) {
                $(this).show();
            } else {
                $(this).hide();
            }
        })
    }, 200);
    // Slide in new container with index    
    setTimeout(function() {
        $(".story-container-right .story-container-items").eq(cardIndex + 1).toggle();
        scaleWidth($(".story-container-items--active .story-container-item--active"));
    }, 200);
    resizeWindowDelayed();
}

/**
 * Toggling 'active' class of secondard story card
 * @param  {div} card       card div to toggle 'active' class of
 */
function toggleSecondaryStoryCard(card) {
    // Inactivate all items within secondary card 
    $(".story-container-left .story-card-secondary-item-active")
        .removeClass("story-card-secondary-item-active");
    $(".story-container-left .story-card-secondary-icon")
        .replaceWith("<i class='story-card-secondary-icon material-icons md-18'>radio_button_unchecked</i>");
    // Inactivate currently selected card
    $(".story-container-left .story-card-secondary--active")
        .toggleClass("story-card-secondary--active");
    // Activate selected secondary card
    $(card).toggleClass("story-card-secondary--active");
}

/**
 * Toggling 'active' class of secondary story card item
 * @param  {div} index      index of list item to toggle
 */
function toggleSecondaryCardItem(index) {
    $thisItem = $(".story-card-secondary--active .story-card-secondary-items").children().eq(index);
    if (!$thisItem.hasClass("story-card-secondary-item-active")) {
        $thisItem.addClass("story-card-secondary-item-active");
        $thisItem
            .find(".story-card-secondary-icon")
            .replaceWith("<i class='story-card-secondary-icon material-icons md-18'>radio_button_checked</i>");
    } else {
        $thisItem.removeClass("story-card-secondary-item-active");
        $thisItem
            .find(".story-card-secondary-icon")
            .replaceWith("<i class='story-card-secondary-icon material-icons md-18'>radio_button_unchecked</i>");
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
    $thisSibling.hide();
    $thisSibling.toggleClass("story-container-item--active");
    // Slide in and activate next story container item
    // $nextSibling.show();
    $nextSibling.toggleClass("story-container-item--active");
    $(".story-container-items--active .story-container-item--active").show();
    // Scale width of new container to preserve aspect ratio
    scaleWidth($nextSibling);
    // Secondary card (sidebar) activation and deactivation
    if (ground_truth[$nextSibling.attr("id")]["story-item-number"] !==
        ground_truth[$thisSibling.attr("id")]["story-item-number"]) {
        toggleSecondaryCardItem(ground_truth[$thisSibling.attr("id")]["story-item-number"]);
        toggleSecondaryCardItem(ground_truth[$nextSibling.attr("id")]["story-item-number"]);
    }
}

/**
 * Use nav buttons to move backward in story
 */
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
    // Secondary card (sidebar) activation and deactivation
    if (ground_truth[$prevSibling.attr("id")]["story-item-number"] !==
        ground_truth[$thisSibling.attr("id")]["story-item-number"]) {
        toggleSecondaryCardItem(ground_truth[$prevSibling.attr("id")]["story-item-number"]);
        toggleSecondaryCardItem(ground_truth[$thisSibling.attr("id")]["story-item-number"]);
    }
}

/**
 * Scale width of image container to preserve aspect ratio
 * Relies on dictionary of ground truth image dimensions
 * @param  {div} container          image container
 */
function scaleWidth(container) {
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
    var id = $(".story-container-items--active .story-container-item--active").attr("id"),
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
    var $activeImage = $(".story-container-items--active .story-container-item--active .story-container-item-image");
    $activeImage.append(captionDiv);
    $imageCaption = $(".story-container-items--active .story-container-item--active .image-caption");
    var topPos = $activeImage.offset()["top"],
        leftPos = $activeImage.offset()["left"],
        imgWidth = $activeImage.width(),
        imgHeight = $activeImage.height(),
        captionHeight = $imageCaption.height(),
        captionWidth = imgWidth - 10;
    $imageCaption.width(captionWidth);
    $imageCaption.offset({
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
    var id = $(".story-container-items--active .story-container-item--active").attr("id"),
        shapeNames = ground_truth[id]["shape-names"];
    var mapDiv = $("<div/>")
        .attr("id", "this-image-map")
        .addClass("image-map")
        .html("<div></div>");
    var $activeImage = $(".story-container-items--active .story-container-item--active .story-container-item-image");
    $activeImage.append(mapDiv);
    var $imageMap = $(".story-container-items--active .story-container-item--active .image-map");
    var topPos = $activeImage.offset()["top"],
        leftPos = $activeImage.offset()["left"],
        imgWidth = $activeImage.width(),
        imgHeight = $activeImage.height();
    $imageMap.width(imgWidth);
    $imageMap.height(imgHeight);
    $imageMap.offset({
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

/**
 * MAP MODE
 */

/**
 * Map for 'map mode'
 */

// New map variable
var mapModeMap = new L.Map("map-mode-map", {
    center: new L.LatLng(lat, long),
    zoom: zoom
});

// Add tiles to ap
var tiles = new L.StamenTileLayer("toner-lite");
tiles.addTo(mapModeMap);

function populateTooltip(e) {
    var $thisTooltip = $(".map-mode-tooltip");
    if ($(".map-mode-tooltip--title-intro") !== null) {
        $(".map-mode-tooltip--title-intro").remove();
    }
    if ($(".map-mode-tooltip--text") !== null) {
        $(".map-mode-tooltip--text").remove();
    }
    if ($(".map-mode-tooltip").find(".map-mode-tooltip--title").length === 0) {
        var thisDiv = $("<div/>")
            .addClass("map-mode-tooltip--title")
            .html("<div></div>");
        $thisTooltip.append(thisDiv);
    }
    if ($(".map-mode-tooltip").find(".map-mode-tooltip--date").length === 0) {
        var thisDiv = $("<div/>")
            .addClass("map-mode-tooltip--date")
            .html("<div></div>");
        $thisTooltip.append(thisDiv);
    }
    if ($(".map-mode-tooltip").find(".map-mode-tooltip--description").length === 0) {
        var thisDiv = $("<div/>")
            .addClass("map-mode-tooltip--description")
            .html("<div></div>");
        $thisTooltip.append(thisDiv);
    }
    $(".map-mode-tooltip--title").html(e.target.feature.properties.Name);
    $(".map-mode-tooltip--date").html("<span class='map-mode-tooltip--date-title'>Date built:&ensp;</span>" + e.target.feature.properties.dateAddedStart);
    $(".map-mode-tooltip--description").html(e.target.feature.properties.Description);
}

function centerMap(e) {
    mapModeMap.fitBounds(
        e.target.getBounds(), { padding: [150, 150] }
    );
}

function highlightMap(e) {
    featureLayer.setStyle(campusStyle);
    e.target.setStyle(highlightStyle);
}

function onEachFeature(feature, layer) {
    layer.setStyle(campusStyle);
    layer.on('click', populateTooltip);
    layer.on('click', centerMap);
    layer.on('click', highlightMap);
}

var featureLayer = new L.GeoJSON(meacham, {
    onEachFeature: onEachFeature,
});

mapModeMap.addLayer(featureLayer);

/**
 * Position map mode's tooltip container
 * Happens on load (and maybe resize)
 */
function positionTooltipContainer() {
    var $map = $(".map-mode-map"),
        $tooltip = $(".map-mode-tooltip"),
        mapW = $map.width(),
        mapLeft = $map.offset()["left"],
        tooltipW = $tooltip.width();
    $tooltip.offset({ left: mapW - tooltipW + 10 });

}
positionTooltipContainer();