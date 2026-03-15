// ===== Navigation =====
function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('open');
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }
});

// Active link
const links = document.querySelectorAll('.nav-link');
const current = window.location.pathname.split('/').pop();
links.forEach(link => {
  const href = link.getAttribute('href');
  if (href === current || (current === '' && href === 'index.html')) {
    link.classList.add('active');
  } else {
    link.classList.remove('active');
  }
});

// ===== Counter Animation =====
function animateCounter(el, target, duration = 1500) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target.toLocaleString('ar-EG');
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start).toLocaleString('ar-EG');
    }
  }, 16);
}

const counterEls = document.querySelectorAll('[data-target]');
if (counterEls.length) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        animateCounter(el, parseInt(el.dataset.target));
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counterEls.forEach(el => observer.observe(el));
}

// ===== Reveal on Scroll =====
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });
revealEls.forEach(el => revealObserver.observe(el));

// ===== Toast Notification =====
function showToast(msg) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}

// ===== Form Submission =====
document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('[type=submit], .btn-submit');
    if (btn) {
      const orig = btn.textContent;
      btn.textContent = 'جارٍ الإرسال...';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = '✓ تم الإرسال بنجاح';
        btn.style.background = '#10b981';
        showToast('تم إرسال طلبك بنجاح!');
        setTimeout(() => {
          btn.textContent = orig;
          btn.style.background = '';
          btn.disabled = false;
          form.reset();
        }, 2500);
      }, 1200);
    }
  });
});

// ===== Admin Tabs =====
const adminTabs = document.querySelectorAll('.admin-tab');
if (adminTabs.length) {
  adminTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      adminTabs.forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.admin-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const panelId = tab.dataset.panel;
      const panel = document.getElementById(panelId);
      if (panel) panel.classList.add('active');
    });
  });
}

// ===== Filter Toggle (Products) =====
const filterChks = document.querySelectorAll('.filter-option input');
filterChks.forEach(chk => {
  chk.addEventListener('change', () => {
    filterAnimals();
  });
});

function filterAnimals() {
  const cards = document.querySelectorAll('.products-grid .animal-card');
  const checked = [...document.querySelectorAll('.filter-option input:checked')].map(c => c.value);
  if (!checked.length) {
    cards.forEach(c => c.style.display = '');
    return;
  }
  cards.forEach(card => {
    const type = card.dataset.type || '';
    card.style.display = checked.some(v => type.includes(v)) ? '' : 'none';
  });
}

// ===== Sort Animals =====
const sortSel = document.querySelector('.sort-select');
if (sortSel) {
  sortSel.addEventListener('change', () => {
    showToast('تم تطبيق الترتيب');
  });
}

// ===== Smooth close mobile menu on link click =====
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('navLinks')?.classList.remove('open');
  });
});
