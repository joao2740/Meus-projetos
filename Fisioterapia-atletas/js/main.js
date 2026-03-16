/**
 * FisioAtleta – Main JavaScript
 * Navbar, carousel, form, counters, chat UI, scroll effects
 */

document.addEventListener('DOMContentLoaded', () => {

  // Init Lucide icons
  lucide.createIcons();

  // ── 1. NAVBAR ──────────────────────────────────────────────────
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
    document.getElementById('scrollTopBtn').classList.toggle('visible', window.scrollY > 400);
    updateActiveNav();
  }, { passive: true });

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  // Close mobile menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ── Active nav link on scroll ──
  const sections = ['hero', 'sobre', 'servicos', 'como-funciona', 'depoimentos', 'contato'];
  const navMap   = { 'hero': 'nav-hero', 'sobre': 'nav-sobre', 'servicos': 'nav-servicos', 'como-funciona': 'nav-como', 'depoimentos': 'nav-dep', 'contato': 'nav-contato' };

  function updateActiveNav() {
    let current = 'hero';
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= 100) current = id;
    });
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    const activeEl = document.getElementById(navMap[current]);
    if (activeEl) activeEl.classList.add('active');
  }

  // ── 2. SCROLL TO TOP ──────────────────────────────────────────
  document.getElementById('scrollTopBtn').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ── 3. COUNTER ANIMATION ──────────────────────────────────────
  function animateCounter(el, target, duration = 1800) {
    let start = 0;
    const step = timestamp => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    };
    requestAnimationFrame(step);
  }

  const countersObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        animateCounter(el, target);
        countersObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-number').forEach(el => countersObserver.observe(el));

  // ── 4. REVEAL ON SCROLL ───────────────────────────────────────
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.servico-card, .depoimento-card, .processo-step, .contato-card, .sobre-img-wrapper, .sobre-content, .agendamento-info, .agendamento-form-wrapper').forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${(i % 4) * 0.08}s`;
    revealObserver.observe(el);
  });

  // ── 5. DEPOIMENTOS CAROUSEL ───────────────────────────────────
  const track    = document.getElementById('depoimentosTrack');
  const prevBtn  = document.getElementById('prevBtn');
  const nextBtn  = document.getElementById('nextBtn');
  const dotsWrap = document.getElementById('carouselDots');

  if (track) {
    const cards = track.querySelectorAll('.depoimento-card');
    let current = 0;
    let perView = getPerView();

    function getPerView() {
      return window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3;
    }

    const total = cards.length;
    const maxIdx = total - perView;

    // Build dots
    function buildDots() {
      dotsWrap.innerHTML = '';
      const dotCount = maxIdx + 1;
      for (let i = 0; i <= maxIdx; i++) {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot' + (i === current ? ' active' : '');
        dot.setAttribute('aria-label', `Depoimento ${i + 1}`);
        dot.addEventListener('click', () => goTo(i));
        dotsWrap.appendChild(dot);
      }
    }

    function goTo(idx) {
      current = Math.max(0, Math.min(idx, maxIdx));
      const cardWidth = cards[0].offsetWidth + 24;
      track.style.transform = `translateX(-${current * cardWidth}px)`;
      dotsWrap.querySelectorAll('.carousel-dot').forEach((d, i) => {
        d.classList.toggle('active', i === current);
      });
    }

    prevBtn.addEventListener('click', () => goTo(current - 1));
    nextBtn.addEventListener('click', () => goTo(current + 1));

    // Auto-advance
    let autoTimer = setInterval(() => goTo(current + 1 > maxIdx ? 0 : current + 1), 5000);
    track.addEventListener('mouseenter', () => clearInterval(autoTimer));
    track.addEventListener('mouseleave', () => {
      autoTimer = setInterval(() => goTo(current + 1 > maxIdx ? 0 : current + 1), 5000);
    });

    // Touch/swipe support
    let touchStartX = 0;
    track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', e => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) goTo(diff > 0 ? current + 1 : current - 1);
    });

    window.addEventListener('resize', () => {
      perView = getPerView();
      buildDots();
      goTo(0);
    });

    buildDots();
    goTo(0);
  }

  // ── 6. FORM ───────────────────────────────────────────────────
  const form    = document.getElementById('agendamentoForm');
  const success = document.getElementById('formSuccess');
  const newForm = document.getElementById('btn-new-form');

  // Phone mask
  const telInput = document.getElementById('telefone');
  if (telInput) {
    telInput.addEventListener('input', e => {
      let v = e.target.value.replace(/\D/g, '');
      if (v.length > 11) v = v.slice(0, 11);
      if (v.length > 6) v = `(${v.slice(0,2)}) ${v.slice(2,7)}-${v.slice(7)}`;
      else if (v.length > 2) v = `(${v.slice(0,2)}) ${v.slice(2)}`;
      else if (v.length > 0) v = `(${v}`;
      e.target.value = v;
    });
  }

  function validateField(id, errorId, test, msg) {
    const el = document.getElementById(id);
    const fg = document.getElementById(`fg-${id}`);
    const er = document.getElementById(`err-${id}`);
    if (!el || !fg || !er) return true;
    const valid = test(el.value.trim());
    fg.classList.toggle('error', !valid);
    er.textContent = valid ? '' : msg;
    er.style.display = valid ? 'none' : 'block';
    return valid;
  }

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const v1 = validateField('nome', 'err-nome', v => v.length >= 3, 'Por favor, insira seu nome completo.');
      const v2 = validateField('email', 'err-email', v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), 'E-mail inválido.');
      const v3 = validateField('telefone', 'err-telefone', v => v.replace(/\D/g,'').length >= 10, 'Telefone inválido.');
      const v4 = validateField('esporte', 'err-esporte', v => v !== '', 'Selecione sua modalidade.');
      const v5 = validateField('queixa', 'err-queixa', v => v.length >= 10, 'Descreva brevemente sua situação (mín. 10 caracteres).');

      if (v1 && v2 && v3 && v4 && v5) {
        const btn = document.getElementById('btn-form-submit');
        btn.disabled = true;
        btn.innerHTML = '<i data-lucide="loader-2"></i> Enviando...';
        lucide.createIcons();
        setTimeout(() => {
          form.style.display = 'none';
          document.querySelector('.agendamento-form-header').style.display = 'none';
          success.style.display = 'flex';
          lucide.createIcons();
        }, 1400);
      }
    });

    // Live validation
    ['nome', 'email', 'telefone', 'esporte', 'queixa'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('blur', () => el.dispatchEvent(new Event('validate')));
    });

    if (newForm) {
      newForm.addEventListener('click', e => {
        e.preventDefault();
        success.style.display = 'none';
        form.style.display = 'flex';
        document.querySelector('.agendamento-form-header').style.display = 'block';
        form.reset();
        document.getElementById('btn-form-submit').disabled = false;
        document.getElementById('btn-form-submit').innerHTML = '<i data-lucide="send"></i> Solicitar Avaliação Gratuita';
        lucide.createIcons();
      });
    }
  }

  // ── 7. AI CHAT WIDGET ─────────────────────────────────────────
  const chatBubble   = document.getElementById('chatBubble');
  const chatWindow   = document.getElementById('chatWindow');
  const chatCloseBtn = document.getElementById('chatCloseBtn');
  const chatInput    = document.getElementById('chatInput');
  const chatSendBtn  = document.getElementById('chatSendBtn');
  const chatMessages = document.getElementById('chatMessages');
  const suggestions  = document.getElementById('chatSuggestions');

  let chatOpen = false;
  let greeted  = false;

  function toggleChat() {
    chatOpen = !chatOpen;
    chatBubble.classList.toggle('open', chatOpen);
    chatWindow.classList.toggle('open', chatOpen);
    if (chatOpen) {
      if (!greeted) { setTimeout(() => addBotMessage(INITIAL_MSG), 400); greeted = true; }
      setTimeout(() => chatInput.focus(), 300);
    }
  }

  const INITIAL_MSG = "Olá! 👋 Sou a **FisioIA**, sua assistente virtual de fisioterapia esportiva!\n\nPosso te ajudar com:\n• 📅 Agendamentos\n• 💪 Dúvidas sobre lesões\n• 📋 Nossos serviços\n• 💰 Preços e horários\n\nComo posso ajudar você hoje, atleta?";

  chatBubble.addEventListener('click', toggleChat);
  chatCloseBtn.addEventListener('click', toggleChat);

  // Close on ESC
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && chatOpen) toggleChat(); });

  function addBotMessage(text) {
    const msg = createMsgEl('bot', text);
    chatMessages.appendChild(msg);
    scrollChat();
  }

  function addUserMessage(text) {
    const msg = createMsgEl('user', text);
    chatMessages.appendChild(msg);
    scrollChat();
  }

  function createMsgEl(type, text) {
    const wrapper = document.createElement('div');
    wrapper.className = `chat-msg ${type}`;

    if (type === 'bot') {
      const av = document.createElement('div');
      av.className = 'msg-avatar';
      av.innerHTML = '<i data-lucide="bot"></i>';
      wrapper.appendChild(av);
    }

    const bubble = document.createElement('div');
    bubble.className = 'msg-bubble';
    // Convert markdown-like bold and newlines
    bubble.innerHTML = formatMsg(text);
    wrapper.appendChild(bubble);
    lucide.createIcons();
    return wrapper;
  }

  function formatMsg(text) {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br>');
  }

  function showTyping() {
    const wrapper = document.createElement('div');
    wrapper.className = 'chat-msg bot';
    wrapper.id = 'typingMsg';
    const av = document.createElement('div');
    av.className = 'msg-avatar';
    av.innerHTML = '<i data-lucide="bot"></i>';
    const bubble = document.createElement('div');
    bubble.className = 'msg-bubble';
    bubble.innerHTML = '<div class="typing-indicator"><div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div></div>';
    wrapper.appendChild(av);
    wrapper.appendChild(bubble);
    chatMessages.appendChild(wrapper);
    lucide.createIcons();
    scrollChat();
    return wrapper;
  }

  function removeTyping() {
    const el = document.getElementById('typingMsg');
    if (el) el.remove();
  }

  function scrollChat() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function sendMessage(text) {
    const trimmed = text.trim();
    if (!trimmed) return;

    addUserMessage(trimmed);
    chatInput.value = '';
    suggestions.style.display = 'none';

    const typingEl = showTyping();
    const delay = 600 + Math.random() * 800;

    setTimeout(() => {
      removeTyping();
      const response = FISIO_AI.getResponse(trimmed);
      addBotMessage(response);
    }, delay);
  }

  chatSendBtn.addEventListener('click', () => sendMessage(chatInput.value));
  chatInput.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(chatInput.value); }
  });

  // Suggestions
  document.querySelectorAll('.suggestion-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      if (!chatOpen) toggleChat();
      setTimeout(() => sendMessage(chip.dataset.msg), chatOpen ? 0 : 400);
    });
  });

  // ── 8. SMOOTH SECTION REVEAL: hero visual separately ──────────
  const heroSection = document.getElementById('hero');
  if (heroSection) {
    const heroContent = heroSection.querySelector('.hero-content');
    if (heroContent) heroContent.style.opacity = '1';
  }

  // ── 9. Body points tooltip ────────────────────────────────────
  document.querySelectorAll('.body-point').forEach(point => {
    point.addEventListener('mouseenter', e => {
      const label = e.target.getAttribute('title');
      const tip = document.createElement('div');
      tip.className = 'body-tooltip';
      tip.textContent = label;
      tip.style.cssText = `position:absolute;background:rgba(0,212,170,0.9);color:#fff;padding:4px 10px;border-radius:6px;font-size:0.75rem;font-weight:600;pointer-events:none;z-index:10;white-space:nowrap;`;
      e.target.style.position = 'relative';
      e.target.appendChild(tip);
    });
    point.addEventListener('mouseleave', e => {
      e.target.querySelectorAll('.body-tooltip').forEach(t => t.remove());
    });
  });

  // ── Re-run lucide after everything ───────────────────────────
  lucide.createIcons();
});
