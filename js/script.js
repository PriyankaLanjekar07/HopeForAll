
document.addEventListener('DOMContentLoaded', function () {

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var href = link.getAttribute('href');
      if (!href || href === '#') return;
      var target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      var headerOffset = 80; 
      var elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
      var offsetPosition = elementPosition - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
   
      if (document.querySelector('.nav').classList.contains('open')) {
        toggleMobileMenu(false);
      }
    });
  });

  
  var menuBtn = document.querySelector('.menu-btn');
  var nav = document.querySelector('.nav');
  if (menuBtn) {
    menuBtn.addEventListener('click', function () {
      var expanded = menuBtn.getAttribute('aria-expanded') === 'true';
      toggleMobileMenu(!expanded);
    });
  }

  function toggleMobileMenu(open) {
    if (!nav || !menuBtn) return;
    if (open) {
      nav.classList.add('open');
      menuBtn.setAttribute('aria-expanded', 'true');
      nav.style.display = 'block';
    } else {
      nav.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
      nav.style.display = '';
    }
  }

  function toggleMenu() {
    document.getElementById("mainNav").classList.toggle("active");
  }

  const form = document.getElementById('donationForm');
  const amountField = form.querySelector('input[name="amount"]');
  const modeField = form.querySelector('select[name="mode"]');


  modeField.addEventListener('change', function () {
    if (this.value === "volunteer") {
      amountField.disabled = true;
      amountField.value = "0"; 
      amountField.style.opacity = "0.6"; 
    } else {
      amountField.disabled = false;
      amountField.value = ""; 
      amountField.style.opacity = "1";
    }
  });


  form.addEventListener('submit', function(e) {
    if (!this.checkValidity()) {
      e.preventDefault();
      this.querySelectorAll('input, select').forEach(field => {
        const errorEl = field.parentElement.querySelector('.error');
        if (errorEl) {
          if (!field.validity.valid) {
            errorEl.style.display = 'block';
          } else {
            errorEl.style.display = 'none';
          }
        }
      });
    }
  });
});
