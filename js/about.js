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
