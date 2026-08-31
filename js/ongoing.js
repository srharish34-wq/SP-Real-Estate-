document.addEventListener('DOMContentLoaded', function () {

  /* ===== Scroll-reveal + progress bar fill for project cards ===== */
  var cards = document.querySelectorAll('.project-card');

  function animateCard(card) {
    card.classList.add('in-view');
    var fill = card.querySelector('.progress-fill');
    if (fill) {
      var target = fill.getAttribute('data-progress') || 0;
      // slight delay so the card settles in before the bar animates
      setTimeout(function () {
        fill.style.width = target + '%';
      }, 200);
    }
  }

  if (cards.length && 'IntersectionObserver' in window) {
    var cardObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCard(entry.target);
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
      animateCard(card);
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