// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
const stickyCta = document.getElementById('sticky-cta');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
    stickyCta.classList.add('show');
  } else {
    navbar.classList.remove('scrolled');
    stickyCta.classList.remove('show');
  }
});

// ===== INTERSECTION OBSERVER (scroll animations) =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const delay = el.dataset.delay ? parseInt(el.dataset.delay) : 0;
      setTimeout(() => el.classList.add('visible'), delay);
      observer.unobserve(el);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('[data-aos], .pain-card, .benefit-card, .ing-card, .step-card').forEach(el => {
  observer.observe(el);
});

// ===== FAQ TOGGLE =====
function toggleFaq(el) {
  const isOpen = el.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
  if (!isOpen) el.classList.add('open');
}

// ===== SELECT PACKAGE FROM PRICING =====
function selectPackage(val) {
  const select = document.getElementById('package');
  if (select) select.value = val;
}

// ===== ORDER FORM =====
const form = document.getElementById('orderForm');
const successMsg = document.getElementById('success-msg');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();
    const pkg = document.getElementById('package').value;

    if (!name || !phone || !address || !pkg) {
      alert('দয়া করে সকল তথ্য পূরণ করুন।');
      return;
    }

    const btn = document.getElementById('submit-btn');
    btn.textContent = 'প্রসেস হচ্ছে...';
    btn.disabled = true;

    // Simulate submission (replace with real API call)
    setTimeout(() => {
      form.style.display = 'none';
      successMsg.style.display = 'block';
    }, 1200);
  });
}

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
