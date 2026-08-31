/* ===== contact.js — Contact page interactions ===== */
document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Scroll reveal for quick-contact cards ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---------- FAQ accordion ---------- */
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    var question = item.querySelector('.faq-question');
    var answer = item.querySelector('.faq-answer');

    // Collapsed by default
    answer.style.maxHeight = null;

    question.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');

      // Close all other open items
      faqItems.forEach(function (other) {
        if (other !== item) {
          other.classList.remove('open');
          other.querySelector('.faq-answer').style.maxHeight = null;
        }
      });

      // Toggle this one
      if (isOpen) {
        item.classList.remove('open');
        answer.style.maxHeight = null;
      } else {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  /* ---------- Contact / enquiry form ---------- */
  var contactForm = document.getElementById('contactForm');
  var formNote = document.getElementById('formNote');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = contactForm.name.value.trim();
      var phone = contactForm.phone.value.trim();
      var phonePattern = /^[0-9+\-\s]{10,15}$/;

      if (!name || !phone) {
        showNote(formNote, 'Please fill in your name and phone number.', true);
        return;
      }
      if (!phonePattern.test(phone)) {
        showNote(formNote, 'Please enter a valid phone number.', true);
        return;
      }

      // Simulate submission (replace with real endpoint / fetch call)
      showNote(formNote, 'Thank you! Our team will get back to you shortly.', false);
      contactForm.reset();
    });
  }

  /* ---------- Booking modal ---------- */
  var bookingModal = document.getElementById('bookingModal');
  var openBookingBtn = document.getElementById('openBookingBtn');
  var openBookingBtn3 = document.getElementById('openBookingBtn3');
  var closeModalBtn = document.getElementById('closeModal');
  var bookingForm = document.getElementById('bookingForm');
  var bookingNote = document.getElementById('bookingNote');

  function openModal() {
    if (!bookingModal) return;
    bookingModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!bookingModal) return;
    bookingModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  [openBookingBtn, openBookingBtn3].forEach(function (btn) {
    if (btn) btn.addEventListener('click', openModal);
  });

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);

  // Close when clicking the overlay (outside the modal box)
  if (bookingModal) {
    bookingModal.addEventListener('click', function (e) {
      if (e.target === bookingModal) closeModal();
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && bookingModal && bookingModal.classList.contains('active')) {
      closeModal();
    }
  });

  if (bookingForm) {
    bookingForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = bookingForm.name.value.trim();
      var phone = bookingForm.phone.value.trim();
      var phonePattern = /^[0-9+\-\s]{10,15}$/;

      if (!name || !phone) {
        showNote(bookingNote, 'Please fill in your name and phone number.', true);
        return;
      }
      if (!phonePattern.test(phone)) {
        showNote(bookingNote, 'Please enter a valid phone number.', true);
        return;
      }

      // Simulate submission (replace with real endpoint / fetch call)
      showNote(bookingNote, 'Booking received! We will call you shortly to confirm.', false);
      bookingForm.reset();

      setTimeout(closeModal, 1800);
    });
  }

  /* ---------- Helper: show form note ---------- */
  function showNote(el, message, isError) {
    if (!el) return;
    el.textContent = message;
    el.style.color = isError ? '#c0392b' : '#2e7d32';
  }

});