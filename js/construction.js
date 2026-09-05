document.addEventListener('DOMContentLoaded', function () {

  /* ===== Scroll-reveal for service rows & why-cards ===== */
  var revealItems = document.querySelectorAll(
    '.service-row-media.reveal, .service-row-content.reveal, .why-card.reveal'
  );

  if (revealItems.length && 'IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealItems.forEach(function (item, index) {
      item.style.transitionDelay = (index % 4) * 80 + 'ms';
      revealObserver.observe(item);
    });
  } else {
    revealItems.forEach(function (item) {
      item.classList.add('in-view');
    });
  }

  /* ===== Animated stat counters ===== */
  var statNums = document.querySelectorAll('.stat-num[data-count]');

  function animateCount(el) {
    var target = parseInt(el.getAttribute('data-count'), 10) || 0;
    var duration = 1400;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      el.textContent = Math.floor(eased * target);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    }
    requestAnimationFrame(step);
  }

  if (statNums.length && 'IntersectionObserver' in window) {
    var statObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          statObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    statNums.forEach(function (el) { statObserver.observe(el); });
  } else {
    statNums.forEach(function (el) {
      el.textContent = el.getAttribute('data-count');
    });
  }

  /* ===== FAQ accordion ===== */
  var faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function (item) {
    var question = item.querySelector('.faq-question');
    question.addEventListener('click', function () {
      var isActive = item.classList.contains('active');

      faqItems.forEach(function (other) {
        other.classList.remove('active');
      });

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  /* ===== Prefill "Select a service" from Enquire links (service context) ===== */
  var enquireLinks = document.querySelectorAll('.service-enquire');
  enquireLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      var service = link.getAttribute('data-service');
      if (service) {
        sessionStorage.setItem('enquiryService', service);
      }
    });
  });
  // ===== Phone Number Validation (auto-added) =====
document.addEventListener('input', function (e) {
  if (e.target.matches('input[type="tel"], input[name="phone"]')) {
    e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10);
  }
});

document.addEventListener('submit', function (e) {
  const phoneInput = e.target.querySelector('input[type="tel"], input[name="phone"]');
  if (!phoneInput) return;

  const phoneRegex = /^[6-9]\d{9}$/;
  const existingNote = e.target.querySelector('.form-note');

  if (!phoneRegex.test(phoneInput.value.trim())) {
    e.preventDefault();
    e.stopImmediatePropagation();
    if (existingNote) {
      existingNote.textContent = 'Please enter a valid 10-digit mobile number.';
      existingNote.style.color = '#c0392b';
    } else {
      alert('Please enter a valid 10-digit mobile number.');
    }
    phoneInput.focus();
  }
}, true); // capture phase, runs before other submit listeners

});
