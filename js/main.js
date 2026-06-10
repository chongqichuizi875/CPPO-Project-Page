/* ============================================================
   CPPO — Project Page · interactions
   Token-weight strip · scroll reveal · tabs · copy BibTeX · smooth scroll
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    initLang();
    buildTokenStrip();
    initReveal();
    initTabs();
    initSmoothScroll();
});

/* ---- Language toggle (default already set in <head>; persists choice) ---- */
function initLang() {
    const btns = document.querySelectorAll('.lang-btn');
    const apply = (lang) => {
        document.documentElement.setAttribute('data-lang', lang);
        document.documentElement.setAttribute('lang', lang === 'zh' ? 'zh-CN' : 'en');
        btns.forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
        try { localStorage.setItem('cppo-lang', lang); } catch (e) {}
    };
    // reflect the current (head-resolved) language on the buttons
    apply(document.documentElement.getAttribute('data-lang') || 'en');
    btns.forEach(b => b.addEventListener('click', () => apply(b.dataset.lang)));
}

/* ---- Signature motif: render w_t = 1 - (1-wmin)/(T-1)(t-1) as a height/opacity ramp ---- */
function buildTokenStrip() {
    const strip = document.getElementById('tokenstrip');
    if (!strip) return;
    const N = 48, wmin = 0.45;
    let html = '';
    for (let i = 0; i < N; i++) {
        const w = 1 - (1 - wmin) * (i / (N - 1)); // decays early -> late
        const h = Math.round(w * 100);
        const op = (0.30 + 0.70 * w).toFixed(2);
        html += `<i style="height:${h}%;align-self:flex-end;opacity:${op}"></i>`;
    }
    strip.innerHTML = html;
}

/* ---- Scroll reveal ---- */
function initReveal() {
    const els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
        els.forEach(el => el.classList.add('in'));
        return;
    }
    const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('in');
                io.unobserve(e.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(el => io.observe(el));
}

/* ---- Tabs ---- */
function initTabs() {
    const tabs = document.querySelectorAll('.tab');
    const panels = document.querySelectorAll('.panel-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.tab;
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            panels.forEach(p => p.classList.toggle('active', p.id === target));
        });
    });
}

/* ---- Copy BibTeX ---- */
/* ---- Smooth anchor scroll ---- */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const id = link.getAttribute('href');
            if (id === '#') return;
            const t = document.querySelector(id);
            if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
        });
    });
}
