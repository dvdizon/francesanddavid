/*
    By David Dizon, daviddizon.com
 */

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
