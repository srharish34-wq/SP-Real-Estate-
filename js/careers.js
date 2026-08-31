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