/**
 * LOVBITES CAFÉ & KITCHEN - OFFICIAL JAVASCRIPT
 * Dhanbad, Jharkhand | Where Every Bite Feels Like Love
 */

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initFloatingParticles();
  initHeaderScroll();
  initMobileNav();
  initMenuFilters();
  initOrderTray();
  initBookingForm();
  initHeartClickFx();
});

/* ===================================================================
   1. PRELOADER & LOADING PAGE ANIMATION
   =================================================================== */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  const progressFill = document.querySelector('.loader-bar-fill');
  const percentText = document.querySelector('.loader-percent');
  const phraseEl = document.querySelector('.loader-phrase');
  const circleProgress = document.querySelector('.progress-ring-circle');
  const skipBtn = document.querySelector('.loader-skip-btn');
  const replayBtn = document.getElementById('replayLoaderBtn');

  if (!preloader) return;

  const totalCircumference = 2 * Math.PI * 100; // ~628px for r=100

  const phrases = [
    "Waking up the espresso machine... ☕",
    "Slow-cooking our signature Dum Biryani... 🍗",
    "Baking sizzling chocolate brownies... 🍫",
    "Infusing love into every single bite... ❤️",
    "Preparing your cozy corner table... ✨",
    "Welcome to LovBites Dhanbad! 🎉"
  ];

  let progress = 0;
  let phraseIdx = 0;
  let isDone = false;

  // Lock scroll during preloader
  document.body.classList.add('loading-locked');

  function updateProgress() {
    if (isDone) return;

    // Smooth incremental step
    const increment = Math.max(1, Math.floor(Math.random() * 4) + 1);
    progress = Math.min(100, progress + increment);

    if (progressFill) progressFill.style.width = `${progress}%`;
    if (percentText) percentText.textContent = `${progress}%`;

    // SVG stroke offset
    if (circleProgress) {
      const offset = totalCircumference - (progress / 100) * totalCircumference;
      circleProgress.style.strokeDashoffset = offset;
    }

    // Update phrase based on progress quartiles
    const targetPhraseIdx = Math.min(
      phrases.length - 1,
      Math.floor((progress / 100) * phrases.length)
    );

    if (targetPhraseIdx !== phraseIdx && phraseEl) {
      phraseIdx = targetPhraseIdx;
      phraseEl.style.opacity = '0';
      setTimeout(() => {
        phraseEl.textContent = phrases[phraseIdx];
        phraseEl.style.opacity = '1';
      }, 150);
    }

    if (progress < 100) {
      const delay = Math.random() * 35 + 25;
      setTimeout(updateProgress, delay);
    } else {
      finishPreloader();
    }
  }

  function finishPreloader() {
    if (isDone) return;
    isDone = true;

    // Small celebration delay before revealing website
    setTimeout(() => {
      preloader.classList.add('loaded');
      document.body.classList.remove('loading-locked');

      // Trigger hero entrance
      const hero = document.querySelector('.hero-content');
      if (hero) hero.classList.add('animate-in');
    }, 400);
  }

  // Skip button
  if (skipBtn) {
    skipBtn.addEventListener('click', () => {
      progress = 100;
      if (progressFill) progressFill.style.width = '100%';
      if (percentText) percentText.textContent = '100%';
      if (circleProgress) circleProgress.style.strokeDashoffset = '0';
      finishPreloader();
    });
  }

  // Replay button in footer
  if (replayBtn) {
    replayBtn.addEventListener('click', (e) => {
      e.preventDefault();
      replayPreloader();
    });
  }

  window.replayPreloader = function() {
    isDone = false;
    progress = 0;
    phraseIdx = 0;
    if (progressFill) progressFill.style.width = '0%';
    if (percentText) percentText.textContent = '0%';
    if (circleProgress) circleProgress.style.strokeDashoffset = totalCircumference;
    if (phraseEl) phraseEl.textContent = phrases[0];

    preloader.classList.remove('loaded');
    document.body.classList.add('loading-locked');
    window.scrollTo({ top: 0, behavior: 'instant' });

    setTimeout(updateProgress, 300);
  };

  // Start progress
  setTimeout(updateProgress, 200);
}

/* ===================================================================
   2. FLOATING PARTICLES (HEARTS & SPARKLES IN PRELOADER)
   =================================================================== */
function initFloatingParticles() {
  const container = document.querySelector('.loader-particles');
  if (!container) return;

  const heartIcons = ['❤️', '💖', '✨', '☕', '🍰'];

  for (let i = 0; i < 16; i++) {
    const p = document.createElement('div');
    p.className = 'particle-heart';
    p.textContent = heartIcons[Math.floor(Math.random() * heartIcons.length)];
    p.style.left = `${Math.random() * 100}%`;
    p.style.animationDuration = `${3 + Math.random() * 4}s`;
    p.style.animationDelay = `${Math.random() * 3}s`;
    p.style.fontSize = `${14 + Math.random() * 16}px`;
    container.appendChild(p);
  }
}

/* ===================================================================
   3. HEADER SCROLL & MOBILE DRAWER
   =================================================================== */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

function initMobileNav() {
  const toggle = document.querySelector('.mobile-nav-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  const links = document.querySelectorAll('.mobile-drawer .nav-link, .mobile-drawer .btn-primary');

  if (!toggle || !drawer) return;

  function toggleDrawer() {
    toggle.classList.toggle('active');
    drawer.classList.toggle('open');
    document.body.classList.toggle('loading-locked');
  }

  toggle.addEventListener('click', toggleDrawer);

  links.forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      drawer.classList.remove('open');
      document.body.classList.remove('loading-locked');
    });
  });
}

/* ===================================================================
   4. MENU CATEGORY FILTER
   =================================================================== */
function initMenuFilters() {
  const tabBtns = document.querySelectorAll('.menu-tab-btn');
  const cards = document.querySelectorAll('.menu-card');

  if (!tabBtns.length || !cards.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.opacity = '1';
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ===================================================================
   5. INTERACTIVE ORDER TRAY (WhatsApp Integration)
   =================================================================== */
let orderTray = [];

function initOrderTray() {
  const trayBtn = document.querySelector('.floating-tray-btn');
  const overlay = document.querySelector('.tray-overlay');
  const closeBtn = document.querySelector('.tray-close-btn');
  const addButtons = document.querySelectorAll('.btn-add-tray');
  const whatsappBtn = document.querySelector('.btn-whatsapp-order');

  if (trayBtn) {
    trayBtn.addEventListener('click', () => {
      overlay.classList.add('active');
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      overlay.classList.remove('active');
    });
  }

  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('active');
      }
    });
  }

  addButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = btn.closest('.menu-card');
      const id = card.getAttribute('data-id') || btn.getAttribute('data-name');
      const name = card.querySelector('.menu-item-title').textContent.trim();
      const priceText = card.querySelector('.menu-price').textContent.trim().replace(/[^\d]/g, '');
      const price = parseInt(priceText, 10) || 0;

      addToTray(id, name, price);
      showToast(`Added "${name}" to your tray! 🍽️`);

      // Micro heart pop at button
      createHeartPop(e.clientX, e.clientY);
    });
  });

  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', () => {
      sendTrayWhatsApp();
    });
  }
}

function addToTray(id, name, price) {
  const existing = orderTray.find(item => item.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    orderTray.push({ id, name, price, qty: 1 });
  }
  renderTray();
}

function updateItemQty(id, delta) {
  const item = orderTray.find(i => i.id === id);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    orderTray = orderTray.filter(i => i.id !== id);
  }
  renderTray();
}

function renderTray() {
  const listEl = document.querySelector('.tray-items-list');
  const countBadge = document.querySelector('.tray-badge-count');
  const totalPriceEl = document.querySelector('.tray-total-price');

  if (!listEl) return;

  const totalItems = orderTray.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = orderTray.reduce((sum, item) => sum + item.price * item.qty, 0);

  if (countBadge) countBadge.textContent = totalItems;
  if (totalPriceEl) totalPriceEl.textContent = `₹${totalPrice}`;

  if (orderTray.length === 0) {
    listEl.innerHTML = `
      <div class="tray-empty-state">
        <div class="tray-empty-icon">🍽️</div>
        <h4>Your tray is empty</h4>
        <p>Explore our menu and tap "Add to Tray" to craft your feast!</p>
      </div>
    `;
    return;
  }

  listEl.innerHTML = '';
  orderTray.forEach(item => {
    const row = document.createElement('div');
    row.className = 'tray-item-card';
    row.innerHTML = `
      <div class="tray-item-info">
        <h5>${item.name}</h5>
        <span>₹${item.price} × ${item.qty} = ₹${item.price * item.qty}</span>
      </div>
      <div class="tray-item-controls">
        <button class="qty-btn" onclick="updateItemQty('${item.id}', -1)">−</button>
        <span style="font-weight:700; width: 18px; text-align: center;">${item.qty}</span>
        <button class="qty-btn" onclick="updateItemQty('${item.id}', 1)">+</button>
      </div>
    `;
    listEl.appendChild(row);
  });
}

window.updateItemQty = updateItemQty;

function sendTrayWhatsApp() {
  if (orderTray.length === 0) {
    showToast('Please add items to your tray first!');
    return;
  }

  const itemsText = orderTray
    .map(i => `• ${i.name} × ${i.qty} (₹${i.price * i.qty})`)
    .join('\n');
  const total = orderTray.reduce((sum, i) => sum + i.price * i.qty, 0);

  const message = `*Hello LovBites Café & Kitchen!* ❤️\nI would like to place an order from your website:\n\n${itemsText}\n\n*Total Amount: ₹${total}*\n\nPlease confirm availability & prep time! 🍽️`;
  
  const encoded = encodeURIComponent(message);
  // Default WhatsApp link to cafe contact
  window.open(`https://wa.me/918288847444?text=${encoded}`, '_blank');
}

/* ===================================================================
   6. TABLE RESERVATION / PARTY BOOKING FORM
   =================================================================== */
function initBookingForm() {
  const form = document.getElementById('reservationForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('[name="name"]').value;
    const phone = form.querySelector('[name="phone"]').value;
    const guests = form.querySelector('[name="guests"]').value;
    const date = form.querySelector('[name="date"]').value;
    const time = form.querySelector('[name="time"]').value;
    const occasion = form.querySelector('[name="occasion"]').value;
    const notes = form.querySelector('[name="notes"]').value;

    const message = `*New Table / Celebration Booking at LovBites!* 🥂\n\n• *Name:* ${name}\n• *Phone:* ${phone}\n• *Guests:* ${guests}\n• *Date:* ${date}\n• *Time Slot:* ${time}\n• *Occasion:* ${occasion}\n• *Notes:* ${notes || 'None'}\n\nPlease confirm my reservation! ❤️`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/918288847444?text=${encoded}`, '_blank');

    showToast('Reservation request sent via WhatsApp! ✨');
    form.reset();
  });
}

/* ===================================================================
   7. TOAST NOTIFICATIONS & MICRO-INTERACTIONS
   =================================================================== */
function showToast(message) {
  let toast = document.querySelector('.toast-notice');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<span>✨</span><span>${message}</span>`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

function initHeartClickFx() {
  document.addEventListener('click', (e) => {
    if (e.target.closest('.nav-brand') || e.target.closest('.loader-logo-inner')) {
      createHeartPop(e.clientX, e.clientY);
    }
  });
}

function createHeartPop(x, y) {
  if (!x || !y) return;
  const heart = document.createElement('div');
  heart.textContent = '❤️';
  heart.style.position = 'fixed';
  heart.style.left = `${x}px`;
  heart.style.top = `${y}px`;
  heart.style.transform = 'translate(-50%, -50%) scale(0.5)';
  heart.style.pointerEvents = 'none';
  heart.style.zIndex = '999999';
  heart.style.fontSize = '22px';
  heart.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
  document.body.appendChild(heart);

  requestAnimationFrame(() => {
    heart.style.transform = `translate(-50%, -100px) scale(${1.2 + Math.random() * 0.4}) rotate(${(Math.random() - 0.5) * 40}deg)`;
    heart.style.opacity = '0';
  });

  setTimeout(() => {
    heart.remove();
  }, 800);
}
