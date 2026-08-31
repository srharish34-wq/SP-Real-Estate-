document.addEventListener('DOMContentLoaded', function () {

  /* ===== Footer year ===== */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* ===== Mobile menu toggle ===== */
  var menuToggle = document.getElementById('menuToggle');
  var nav = document.getElementById('nav');
  menuToggle.addEventListener('click', function () {
    nav.classList.toggle('open');
  });

  /* Mobile dropdown accordion (Services / Projects) */
  document.querySelectorAll('.has-dropdown > a').forEach(function (link) {
    link.addEventListener('click', function (e) {
      if (window.innerWidth <= 860) {
        e.preventDefault();
        link.parentElement.classList.toggle('open');
      }
    });
  });

  /* Close mobile nav after clicking a normal link */
  document.querySelectorAll('.nav a:not(.has-dropdown > a)').forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('open');
    });
  });

  /* ===== Header shadow on scroll + back-to-top ===== */
  var header = document.getElementById('header');
  var backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 40) {
      header.style.boxShadow = '0 4px 18px rgba(0,0,0,.2)';
    } else {
      header.style.boxShadow = '0 2px 12px rgba(0,0,0,.12)';
    }
    if (window.scrollY > 500) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  });
  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ===== Active nav link on scroll ===== */
  var sections = document.querySelectorAll('main section[id], main#home');
  var navLinks = document.querySelectorAll('.nav > ul > li > a');
  window.addEventListener('scroll', function () {
    var scrollPos = window.scrollY + 140;
    sections.forEach(function (section) {
      if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + section.id) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  /* ===== Animated stat counters ===== */
  var statNums = document.querySelectorAll('.stat-num');
  var countersStarted = false;
  function animateCounters() {
    if (countersStarted) return;
    countersStarted = true;
    statNums.forEach(function (el) {
      var target = parseInt(el.getAttribute('data-count'), 10);
      var current = 0;
      var step = Math.max(1, Math.round(target / 60));
      var timer = setInterval(function () {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        el.textContent = current;
      }, 25);
    });
  }
  var statsSection = document.querySelector('.stats');
  if (statsSection) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) animateCounters();
      });
    }, { threshold: 0.4 });
    observer.observe(statsSection);
  }

  /* ===== FAQ accordion ===== */
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var question = item.querySelector('.faq-question');
    question.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(function (i) {
        i.classList.remove('open');
      });
      if (!isOpen) item.classList.add('open');
    });
  });

  /* ===== Booking modal ===== */
  var bookingModal = document.getElementById('bookingModal');
  var closeModal = document.getElementById('closeModal');
  var openers = [
    document.getElementById('openBookingBtn'),
    document.getElementById('openBookingBtn2'),
    document.getElementById('openBookingBtn3')
  ];
  var projectSelect = bookingModal.querySelector('select[name="project"]');

  function openModal(projectName) {
    bookingModal.classList.add('open');
    if (projectName) projectSelect.value = projectName;
  }
  function closeModalFn() {
    bookingModal.classList.remove('open');
  }
  openers.forEach(function (btn) {
    if (btn) btn.addEventListener('click', function () { openModal(); });
  });
  document.querySelectorAll('.enquire-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      openModal(btn.getAttribute('data-project'));
    });
  });
  closeModal.addEventListener('click', closeModalFn);
  bookingModal.addEventListener('click', function (e) {
    if (e.target === bookingModal) closeModalFn();
  });

  /* ===== Booking form submit ===== */
  var bookingForm = document.getElementById('bookingForm');
  var bookingNote = document.getElementById('bookingNote');
  bookingForm.addEventListener('submit', function (e) {
    e.preventDefault();
    bookingNote.textContent = 'Thanks! Our team will call you shortly to confirm your visit.';
    bookingForm.reset();
    setTimeout(function () {
      closeModalFn();
      bookingNote.textContent = '';
    }, 2200);
  });

  /* ===== Contact form submit ===== */
  var contactForm = document.getElementById('contactForm');
  var formNote = document.getElementById('formNote');
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    formNote.textContent = 'Thank you! We have received your enquiry and will get back to you soon.';
    contactForm.reset();
  });

});