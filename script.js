// ---------- Mobile menu ----------
const menuToggle = document.getElementById('menuToggle');
const mobileOverlay = document.getElementById('mobileOverlay');
if (menuToggle && mobileOverlay) {
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-controls', 'mobileOverlay');
  const setMenu = (open) => {
    menuToggle.classList.toggle('open', open);
    mobileOverlay.classList.toggle('open', open);
    document.body.classList.toggle('menu-open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };
  menuToggle.addEventListener('click', () => setMenu(!mobileOverlay.classList.contains('open')));
  mobileOverlay.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
  window.matchMedia('(min-width: 901px)').addEventListener('change', (e) => { if (e.matches) setMenu(false); });
}

// ---------- Active nav link ----------
document.querySelectorAll('.nav-links a, .mobile-overlay a').forEach(a => {
  const href = a.getAttribute('href');
  const file = href.split('/').pop();
  const current = window.location.pathname.split('/').pop() || 'index.html';
  if (file === current) a.classList.add('active');
});

// ---------- Scroll reveal ----------
const revealItems = document.querySelectorAll('[data-reveal]');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
revealItems.forEach(el => revealObserver.observe(el));

// ---------- Hero title word-by-word rise ----------
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
  const text = heroTitle.textContent.trim();
  heroTitle.innerHTML = text.split(' ').map(word =>
    `<span class="word"><span>${word}</span></span>`
  ).join(' ');
  requestAnimationFrame(() => setTimeout(() => heroTitle.classList.add('in'), 120));
}

// ---------- Count-up stats ----------
document.querySelectorAll('.stat-num[data-count]').forEach(el => {
  const target = parseInt(el.getAttribute('data-count'), 10);
  const suffix = el.getAttribute('data-suffix') || '';
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        let start = 0;
        const duration = 900;
        const startTime = performance.now();
        function tick(now) {
          const p = Math.min((now - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(eased * target) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.4 });
  obs.observe(el);
});

// ---------- Work list cursor-follow preview ----------
const cursorPreview = document.getElementById('cursorPreview');
const cursorImg = document.getElementById('cursorPreviewImg');
const workRows = document.querySelectorAll('.work-row[data-img]');
if (cursorPreview && workRows.length && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  let mouseX = 0, mouseY = 0, curX = 0, curY = 0, raf = null;
  const lerp = (a, b, n) => a + (b - a) * n;
  function loop() {
    curX = lerp(curX, mouseX, 0.18);
    curY = lerp(curY, mouseY, 0.18);
    cursorPreview.style.transform = `translate(${curX}px, ${curY}px) translate(-50%,-50%) scale(${cursorPreview.classList.contains('show') ? 1 : .92})`;
    raf = requestAnimationFrame(loop);
  }
  document.addEventListener('mousemove', (e) => { mouseX = e.clientX; mouseY = e.clientY; });
  workRows.forEach(row => {
    row.addEventListener('mouseenter', () => {
      cursorImg.src = row.getAttribute('data-img');
      cursorPreview.classList.add('show');
      if (!raf) loop();
    });
    row.addEventListener('mouseleave', () => cursorPreview.classList.remove('show'));
  });
}

// ---------- Contact form -> Web3Forms (mailto fallback) ----------
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  const statusEl = document.getElementById('formStatus');
  const submitBtn = contactForm.querySelector('.submit-btn');
  const submitLabel = submitBtn.querySelector('span');
  const accessKey = contactForm.dataset.accessKey || '';
  const hasKey = accessKey && !accessKey.startsWith('YOUR_');

  const setStatus = (text, type) => {
    statusEl.textContent = text;
    statusEl.className = 'form-status' + (type ? ' ' + type : '');
  };
  const openMailto = (name, email, message) => {
    const subject = encodeURIComponent('Portfolio contact from ' + name);
    const body = encodeURIComponent(message + '\n\n— ' + name + ' (' + email + ')');
    window.location.href = `mailto:tshepotubatsi@gmail.com?subject=${subject}&body=${body}`;
  };

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!hasKey) { openMailto(name, email, message); return; }

    submitBtn.disabled = true;
    submitLabel.textContent = 'Sending…';
    setStatus('', '');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          subject: 'Portfolio contact from ' + name,
          from_name: 'Portfolio website',
          name, email, message,
          botcheck: contactForm.querySelector('[name="botcheck"]').checked
        })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) throw new Error(data.message || 'Request failed');
      contactForm.reset();
      setStatus("Thanks — your message has been sent. I'll get back to you soon.", 'success');
    } catch (err) {
      setStatus('Sorry, something went wrong. Please email me directly at tshepotubatsi@gmail.com.', 'error');
    } finally {
      submitBtn.disabled = false;
      submitLabel.textContent = 'Send message';
    }
  });
}

document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());