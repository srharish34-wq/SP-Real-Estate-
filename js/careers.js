document.addEventListener('DOMContentLoaded', function () {

  /* ===== Scroll-reveal for perk cards & job cards ===== */
  var revealItems = document.querySelectorAll('.perk-card.reveal, .job-card');

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
      item.style.transitionDelay = (index % 6) * 60 + 'ms';
      revealObserver.observe(item);
    });
  } else {
    revealItems.forEach(function (item) {
      item.classList.add('in-view');
    });
  }

  /* ===== "Apply Now" on a job card pre-fills the role + scrolls to form ===== */
  var applyButtons = document.querySelectorAll('.job-apply-btn');
  var roleSelect = document.getElementById('applyRoleSelect');
  var applySection = document.getElementById('apply');

  applyButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var role = btn.getAttribute('data-role');

      if (roleSelect && role) {
        var matched = false;
        for (var i = 0; i < roleSelect.options.length; i++) {
          if (roleSelect.options[i].text === role) {
            roleSelect.selectedIndex = i;
            matched = true;
            break;
          }
        }
        if (!matched) {
          roleSelect.selectedIndex = roleSelect.options.length - 1; // "Other / Not listed"
        }
      }

      if (applySection) {
        applySection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* ===== Application form submit (front-end only placeholder) ===== */
  var applyForm = document.getElementById('careerApplyForm');
  var applyNote = document.getElementById('applyNote');

  if (applyForm) {
    applyForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = applyForm.querySelector('input[name="name"]').value.trim();
      var phone = applyForm.querySelector('input[name="phone"]').value.trim();

      if (!name || !phone) {
        if (applyNote) {
          applyNote.textContent = 'Please fill in your name and phone number.';
        }
        return;
      }

      // TODO: wire this up to your backend / form service (e.g. fetch POST to an API endpoint)
      if (applyNote) {
        applyNote.textContent = 'Thank you, ' + name + '! Your application has been received. Our HR team will call you shortly.';
      }
      applyForm.reset();
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
