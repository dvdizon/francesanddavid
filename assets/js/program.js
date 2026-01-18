$(window).on('load', function(){
    $('#pleaseNoPhotos').modal('show');
});

var revealTargets = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));

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
