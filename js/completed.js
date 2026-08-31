document.addEventListener('DOMContentLoaded', function () {

  /* ===== Scroll-reveal for completed project cards ===== */
  var cards = document.querySelectorAll('.completed-card');

  if (cards.length && 'IntersectionObserver' in window) {
    var cardObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          cardObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    cards.forEach(function (card, index) {
      card.style.transitionDelay = (index % 3) * 100 + 'ms';
      cardObserver.observe(card);
    });
  } else {
    // Fallback: no IntersectionObserver support, just show everything
    cards.forEach(function (card) {
      card.classList.add('in-view');
    });
  }

  /* ===== Enquire Now — opens the existing booking modal, pre-selects project ===== */
  var enquireButtons = document.querySelectorAll('.enquire-btn');
  var openBookingBtn = document.getElementById('openBookingBtn');
  var projectSelect = document.querySelector('#bookingForm select[name="project"]');

  enquireButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var projectName = btn.getAttribute('data-project');

      // Reuse the site's existing modal-opening logic
      if (openBookingBtn) {
        openBookingBtn.click();
      }

      // Pre-select the matching option in the booking form, if present
      if (projectSelect && projectName) {
        var matched = false;
        for (var i = 0; i < projectSelect.options.length; i++) {
          if (projectSelect.options[i].text === projectName) {
            projectSelect.selectedIndex = i;
            matched = true;
            break;
          }
        }
        if (!matched) {
          projectSelect.value = '';
        }
      }
    });
  });

});