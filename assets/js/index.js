function toggleHorizontal() {
    $('#menu .custom-can-transform').each(function(index, el) {
        //el.classList.toggle('pure-menu-horizontal');
        $(this).toggleClass('pure-menu-horizontal');
    });
}

function closeMenu(e) {
    var menu = $('#menu');
    if (menu.hasClass('open')) {
        toggleMenu(e);
    }
}

function toggleMenu(e) {
    var menu = $('#menu');
    if (menu.hasClass('open')) {
        setTimeout(toggleHorizontal, 500);
    } else {
        toggleHorizontal();
    }
    menu.toggleClass('open');
    $('#toggle').toggleClass('x');
}

$('#toggle').click(function(e) {
    // When the toggle is clicked, dont jump page
    e.preventDefault();
    toggleMenu(e);
});

// whenever a menu item or logo is clicked, close the menu
$('#menu .pure-menu-link').click(closeMenu);
$('#menu .custom-brand').click(closeMenu);

// close the menu when the window size changes
var WINDOW_CHANGE_EVENT = ('onorientationchange' in window) ? 'orientationchange':'resize';
window.addEventListener(WINDOW_CHANGE_EVENT, closeMenu);

// Gallery stuff
$.getJSON("https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&photoset_id=72157647621851886&api_key=0071972bc79f11895b062c153d0d1f27&user_id=127041978@N04&format=json&jsoncallback=?", function (data) {
    var list = $("<ul class='flickr-container'></ul>");
    $.each(data.photoset.photo, function (i, item) {
        //build the url of the photo in order to link to it
        var photoURL = 'http://farm' + item.farm + '.static.flickr.com/' + item.server + '/' + item.id + '_' + item.secret + '_m.jpg';
        var photo = $("<img/>").attr("src", photoURL)
        .attr("class", "item flickr-photo");
        var li = $("<li/>").append(photo);
        $(list).append(li);
    });
    $("#flickr-set").append(list);

    var $grid = $('.flickr-container').isotope({
      // main isotope options
      itemSelector: '.item',
      // set layoutMode
      layoutMode: 'masonry',
      isInitLayout: false,
      masonry: {
          gutter: 5
      }
    });
    $grid.imagesLoaded().progress( function() {
        $grid.isotope('layout');
    });
});
