document.addEventListener('DOMContentLoaded', function () {

  /* ===== Scroll-reveal for value cards & timeline items ===== */
  var revealItems = document.querySelectorAll('.value-card.reveal, .timeline-item.reveal');

  if (revealItems.length && 'IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    revealItems.forEach(function (item, index) {
      // small stagger so items don't all pop in at once
      item.style.transitionDelay = (index % 6) * 60 + 'ms';
      revealObserver.observe(item);
    });
  } else {
    // Fallback: no IntersectionObserver support, just show everything
    revealItems.forEach(function (item) {
      item.classList.add('in-view');
    });
  }

});