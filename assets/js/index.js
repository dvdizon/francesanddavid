/*
    By David Dizon, daviddizon.com
 */

// Gallery stuff
$.getJSON("https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&photoset_id=72157647621851886&api_key=0071972bc79f11895b062c153d0d1f27&user_id=127041978@N04&format=json&jsoncallback=?", function (data) {
    var list = $("<ul class='flickr-container'></ul>");
    $.each(data.photoset.photo, function (i, item) {
        //build the url of the photo in order to link to it
        var photoURL = 'https://farm' + item.farm + '.static.flickr.com/' + item.server + '/' + item.id + '_' + item.secret + '_m.jpg';
        var bigPhotoURL = 'https://farm' + item.farm + '.static.flickr.com/' + item.server + '/' + item.id + '_' + item.secret + '.jpg';
        var photo = $('<img/>').attr('src', photoURL)
        .attr('class', 'item flickr-photo');
        var a = $('<a href="' + bigPhotoURL + '" class="imagelightbox"/>');
        var li = $('<li/>').append(a);
        a.append(photo);
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

    var activityIndicatorOn = function() {
            $( '<div id="imagelightbox-loading"><div></div></div>' ).appendTo( 'body' );
        },
        activityIndicatorOff = function() {
            $( '#imagelightbox-loading' ).remove();
        },
        overlayOn = function() {
            $( '<div id="imagelightbox-overlay"></div>' ).appendTo( 'body' );
        },
        overlayOff = function() {
            $( '#imagelightbox-overlay' ).remove();
        },
        closeButtonOn = function( instance ) {
        $( '<button type="button" id="imagelightbox-close" title="Close"></button>' ).appendTo( 'body' ).on( 'click touchend', function(){ $( this ).remove(); instance.quitImageLightbox(); return false; });
        },
        closeButtonOff = function() {
            $( '#imagelightbox-close' ).remove();
        };

    var instanceC = $('a.imagelightbox').imageLightbox({
        quitOnDocClick:    false,
        onStart:            function() { overlayOn(); closeButtonOn( instanceC ); },
        onEnd:              function() { overlayOff(); closeButtonOff(); activityIndicatorOff(); },
        onLoadStart:        function() { activityIndicatorOn(); },
        onLoadEnd:          function() { activityIndicatorOff(); }
    });
});

// Maps, Thanks St. John!
// inspired by laurenandstjohn.com
var maps = {
    map: 0,
    start: new google.maps.LatLng(37.5418658, -122.0403038),
    locs: {
        'winery': {
            title: 'Palm Event Center in the Vineyard',
            addr: '1184 Vineyard Ave, Pleasanton, CA 94566',
            link: 'http://www.palmeventcenter.com/',
            phone: '(925) 426-8666',
            logo: 'winery.jpg',
            icon: 'wedding.png',
            loc: new google.maps.LatLng(37.6544662, -121.8227174)
        },
        'air-sfo': {
            title: 'San Francisco Airport (SFO)',
            addr: '275 S Airport Blvd, San Francisco, CA',
            link: 'http://www.kayak.com/San_Francisco-San-Francisco-Airport.SFO.ap.html',
            phone: '(650) 821-8211',
            logo: 'air-sfo.gif',
            icon: 'airport.png',
            loc: new google.maps.LatLng(37.6468459, -122.404285)
        },
        'air-sjc': {
            title: 'San Jose International Airport (SJC)',
            addr: '1661 Airport Blvd, San Jose, CA',
            link: 'http://www.kayak.com/San_Jose-San-Jose-Airport.SJC.ap.html',
            phone: '(408) 501-0979',
            logo: 'air-sjc.gif',
            icon: 'airport.png',
            loc: new google.maps.LatLng(37.357818, -121.917322)
        },
        'air-oak': {
            title: 'Oakland International Airport (OAK)',
            addr: '1 Airport Dr, Oakland, CA',
            link: 'http://www.kayak.com/Oakland-Oakland-Airport.OAK.ap.html',
            phone: '(510) 563-3300',
            logo: 'air-oak.jpg',
            icon: 'airport.png',
            loc: new google.maps.LatLng(37.7125689, -122.2197428)
        },
        'hot-crt': {
            title: 'Courtyard Livermore',
            addr: '2929 Constitution Drive, Livermore, CA 94551',
            link: 'http://www.marriott.com/meeting-event-hotels/group-corporate-travel/groupCorp.mi?resLinkData=Duldulao-Dizon%20Wedding%5Eoaklm%60DULDULA%7CDULDULB%60129.00%60USD%60false%604%605/20/16%605/22/16%604/22/16&app=resvlink&stop_mobi=yes',
            phone: '(925) 243-1000',
            logo: 'hot-crt.jpg',
            icon: 'villa-tourism.png',
            loc: new google.maps.LatLng(37.7034248, -121.8171543)
        },
        'hot-hmp': {
            title: 'Hampton Inn Livermore',
            addr: '2850 Constitution Dr, Livermore, CA 94550',
            link: 'http://hamptoninn3.hilton.com/en/hotels/california/hampton-inn-livermore-LVKCAHX/index.html',
            phone: '(925) 606-6400',
            logo: 'hot-hmp.jpg',
            icon: 'villa-tourism.png',
            loc: new google.maps.LatLng(37.7028258, -121.8173644)
        }
    },
    markers: {},
    infos: {},
    open: function(index) {
        if (this.locs[index]) {
            $.each(this.infos, function(index, value) {
                value.close();
            })
            this.map.panTo(this.locs[index].loc);
            this.infos[index].open(this.map, this.markers[index]);
        }

        return false;
    },
    load: function() {
        this.map = new google.maps.Map(
            document.getElementById("wedding-map"), {
                zoom: 9,
                disableDefaultUI: true,
                scrollwheel: false,
                center: this.start,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });

        $.each(this.locs, function(index, value) {
            maps.infos[index] = new google.maps.InfoWindow({
                content: '<div id="mapcontent"><img src="assets/images/' + value.logo +
                    '" width="50" height="50" alt="' + value.title + '" />' +
                    '<div class="map-inner-content"><h1>' + value.title + '</h1>' +
                    '<div class="address">' + value.addr + '</div>' +
                    '<div class="phone">' + value.phone + '</div>' +
                    '<span><a href="' + value.link + '" target="_blank" class="txt">' +
                    'More Information</a></span></div></div>'
            });
            maps.markers[index] = new google.maps.Marker({
                position: value.loc,
                map: maps.map,
                icon: 'https://google-maps-icons.googlecode.com/files/' + value.icon,
                title: value.title
            });
            google.maps.event.addListener(maps.markers[index], 'click', function() {
                $.each(maps.infos, function(index, value) {
                    value.close();
                })
                maps.map.panTo(maps.locs[index].loc);
                maps.infos[index].open(maps.map, maps.markers[index]);
            });
        });
    }
}

$(window).load(function() {
    if (document.getElementById("wedding-map")) {
        maps.load();
    }
});

var scrollSections = Array.prototype.slice.call(document.querySelectorAll('[data-scroll-section]'));
var revealTargets = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));
var scrollTicking = false;
var heroSection = document.querySelector('.hero-video');
var heroContent = heroSection ? heroSection.querySelector('.hero-video-content') : null;

var clamp = function(value, min, max) {
    return Math.min(Math.max(value, min), max);
};

var updateScrollPanels = function() {
    var viewportHeight = window.innerHeight || document.documentElement.clientHeight;

    scrollSections.forEach(function(section) {
        var foreground = section.querySelector('[data-scroll-foreground]');
        if (!foreground) {
            return;
        }

        var rect = section.getBoundingClientRect();
        var progress = (viewportHeight - rect.top) / (rect.height + viewportHeight);
        var clampedProgress = clamp(progress, 0, 1);
        var offset = (0.5 - clampedProgress) * 140;

        foreground.style.setProperty('--scroll-offset', offset.toFixed(1) + 'px');
    });

    scrollTicking = false;
};

var requestScrollUpdate = function() {
    if (!scrollTicking) {
        window.requestAnimationFrame(updateScrollPanels);
        scrollTicking = true;
    }
};

if (scrollSections.length) {
    window.addEventListener('scroll', requestScrollUpdate, { passive: true });
    window.addEventListener('resize', requestScrollUpdate);
    requestScrollUpdate();
}

if (heroSection && heroContent) {
    var updateHeroVisibility = function() {
        heroSection.classList.toggle('hero-video--clear', window.scrollY > 40);
    };

    window.addEventListener('scroll', updateHeroVisibility, { passive: true });
    updateHeroVisibility();
} else if (heroSection) {
    heroSection.classList.add('hero-video--clear');
}

if (revealTargets.length) {
    var revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    revealTargets.forEach(function(target) {
        revealObserver.observe(target);
    });
}

var proposalTrigger = document.querySelector('[data-proposal-trigger]');
if (proposalTrigger) {
    proposalTrigger.addEventListener('click', function() {
        var proposalVideo = document.querySelector('[data-proposal-video]');
        if (proposalVideo) {
            var autoplaySrc = proposalVideo.getAttribute('data-autoplay-src');
            if (autoplaySrc && proposalVideo.src !== autoplaySrc) {
                proposalVideo.src = autoplaySrc;
            }
        }

        var vimeoHero = document.getElementById('vimeo-hero');
        if (vimeoHero && vimeoHero.contentWindow) {
            vimeoHero.contentWindow.postMessage(JSON.stringify({ method: 'pause' }), '*');
        }
    });
}
