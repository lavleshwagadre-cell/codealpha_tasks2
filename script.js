/* =========================================================
   Lavlesh Wagadre — Portfolio
   script.js  (Vanilla ES6+)
   ========================================================= */
(() => {
  'use strict';
  /* ---------- 1. Footer year ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();
  /* ---------- 2. Navbar scroll state + mobile menu ---------- */
  const navbar = document.getElementById('navbar');
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  // Close menu on link click (mobile)
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });
  /* ---------- 3. Smooth scroll for nav anchors ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href.length <= 1) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const offset = 70; // sticky nav height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
  /* ---------- 4. Typewriter effect (Hero) ---------- */
  const phrases = [
    'B.Tech CSE Student',
    'Software Developer',
    'Frontend Engineer',
    'Cybersecurity Enthusiast'
  ];
  const tw = document.getElementById('typewriter');
  let pIndex = 0, cIndex = 0, deleting = false;
  function tick() {
    const current = phrases[pIndex];
    if (!deleting) {
      tw.textContent = current.slice(0, ++cIndex);
      if (cIndex === current.length) {
        deleting = true;
        return setTimeout(tick, 1800);
      }
    } else {
      tw.textContent = current.slice(0, --cIndex);
      if (cIndex === 0) {
        deleting = false;
        pIndex = (pIndex + 1) % phrases.length;
      }
    }
    setTimeout(tick, deleting ? 40 : 90);
  }
  tick();
  /* ---------- 5. Scroll reveal via IntersectionObserver ---------- */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  /* ---------- 6. Certificate Modal ---------- */
  const modal     = document.getElementById('certModal');
  const modalTitle= document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  const certData = {
    nptel: {
      title: 'NPTEL Elite Certification',
      body:  `<p><strong>Cryptography and Network Security</strong></p>
              <p>Awarded by IIT (NPTEL) — Elite grade. Covered symmetric &amp; asymmetric ciphers, hash functions, digital signatures, key exchange, and network attack mitigation.</p>
              <div class="cert-preview">[ Certificate Preview ]<br/>NPTEL_Cryptography_Network_Security.pdf</div>`
    },
    aws: {
      title: 'AWS Fundamentals',
      body:  `<p><strong>Fundamentals of Generative AI</strong></p>
              <p>Issued by Amazon Web Services. Foundations of generative AI, large language models, prompt engineering, and Amazon Bedrock services.</p>
              <div class="cert-preview">[ Certificate Preview ]<br/>AWS_GenAI_Fundamentals.pdf</div>`
    }
  };
  document.querySelectorAll('.cert-card').forEach(card => {
    card.addEventListener('click', () => {
      const data = certData[card.dataset.cert];
      if (!data) return;
      modalTitle.textContent = data.title;
      modalBody.innerHTML = data.body;
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
    });
  });
  // Close handlers
  modal.querySelectorAll('[data-close]').forEach(el => {
    el.addEventListener('click', closeModal);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
  }
  /* ---------- 7. Contact form ---------- */
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    if (!data.name || !data.email || !data.message) {
      status.textContent = '✗ Please fill in all fields.';
      status.style.color = 'var(--danger)';
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      status.textContent = '✗ Invalid email address.';
      status.style.color = 'var(--danger)';
      return;
    }
    // Simulate send (no backend in static portfolio)
    status.textContent = '✓ Message sent — I will reply soon!';
    status.style.color = 'var(--accent)';
    form.reset();
    setTimeout(() => (status.textContent = ''), 5000);
  });
})();
