document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.header');
  // Privacy-friendly event hooks. Connect a GA4 Measurement ID or Tag Manager container to activate external analytics.
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({event:'page_view',page_title:document.title,page_path:location.pathname});
  document.querySelectorAll('a[href*="wa.me"], a[href*="instagram.com"], a[href*="facebook.com"]').forEach(link => link.addEventListener('click', () => {
    window.dataLayer.push({event:'outbound_click',outbound_url:link.href});
  }));
  // Theme preference: explicit saved choice wins; otherwise follow the operating-system preference.
  const themeButton = document.getElementById('themeToggle');
  const savedTheme = (() => { try { return localStorage.getItem('ish-theme'); } catch (_) { return null; } })();
  const systemTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  const applyTheme = theme => {
    document.documentElement.dataset.theme = theme;
    const light = theme === 'light';
    if (themeButton) {
      themeButton.setAttribute('aria-label', light ? 'Switch to dark mode' : 'Switch to light mode');
      themeButton.setAttribute('title', light ? 'Switch to dark mode' : 'Switch to light mode');
      const icon = themeButton.querySelector('.theme-icon'); if (icon) icon.textContent = light ? '☾' : '☼';
    }
    const metaTheme = document.querySelector('meta[name="theme-color"]'); if (metaTheme) metaTheme.content = light ? '#f7f5f2' : '#0b0912';
  };
  applyTheme(savedTheme || systemTheme);
  themeButton?.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(next); try { localStorage.setItem('ish-theme', next); } catch (_) {}
    window.dataLayer.push({event:'theme_change',theme:next});
  });
  const loader = document.getElementById('siteLoader');
  window.addEventListener('load', () => { setTimeout(() => loader?.classList.add('is-hidden'), 250); });

  const onScroll = () => header?.classList.toggle('scrolled', window.scrollY > 20);
  onScroll(); window.addEventListener('scroll', onScroll, { passive: true });

  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');
  menuToggle?.addEventListener('click', () => {
    const open = mainNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  mainNav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    mainNav.classList.remove('open'); menuToggle?.setAttribute('aria-expanded', 'false');
  }));

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); }
    }), { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
    revealItems.forEach(item => revealObserver.observe(item));
  } else revealItems.forEach(item => item.classList.add('visible'));

  // Selected Work filters: keep visual state and accessibility state in sync.
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projects = document.querySelectorAll('.project-card');
  filterButtons.forEach(button => {
    button.setAttribute('aria-pressed', String(button.classList.contains('active')));
    button.addEventListener('click', () => {
      const filter = button.dataset.filter || 'all';

      filterButtons.forEach(item => {
        const active = item === button;
        item.classList.toggle('active', active);
        item.setAttribute('aria-pressed', String(active));
      });

      let visibleCount = 0;
      projects.forEach(project => {
        const show = filter === 'all' || project.dataset.category === filter;
        project.classList.toggle('is-hidden', !show);
        if (show) visibleCount += 1;
      });

      // Analytics event contains the selected category and count only; no personal data.
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'portfolio_filter',
        portfolio_category: filter,
        visible_project_count: visibleCount
      });
    });
  });

  const form = document.getElementById('enquiryForm');
  form?.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const name = document.getElementById('clientName').value.trim();
    const service = document.getElementById('clientService').value;
    const brief = document.getElementById('clientBrief').value.trim();
    const budget = document.getElementById('clientBudget')?.value || 'Not specified';
    const message = `Hello Ish Studios,\n\nMy name is ${name}.\nI'm interested in: ${service}.\nEstimated budget: ${budget}.\n\nProject details: ${brief || 'I would like to discuss this further.'}\n\nPlease let me know the next steps.`;
    window.dataLayer = window.dataLayer || []; window.dataLayer.push({event:'generate_lead',lead_service:service,lead_budget:budget});
    window.open(`https://wa.me/94719566533?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  });

  const dialog = document.getElementById('videoDialog');
  const video = document.getElementById('introVideo');
  document.getElementById('openVideo')?.addEventListener('click', () => {
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', '');
    video?.play().catch(() => {});
  });
  const closeDialog = () => { video?.pause(); if (dialog.open) dialog.close(); else dialog.removeAttribute('open'); };
  document.getElementById('closeVideo')?.addEventListener('click', closeDialog);
  dialog?.addEventListener('click', event => { if (event.target === dialog) closeDialog(); });
  dialog?.addEventListener('close', () => video?.pause());
});

// Track project enquiry and primary conversion actions without collecting personal form values.
document.querySelectorAll('.nav-cta, .button-primary, .instagram-follow').forEach(el => el.addEventListener('click', () => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({event:'cta_click',cta_text:(el.textContent || '').trim().slice(0,80)});
}));
setTimeout(() => document.getElementById('siteLoader')?.classList.add('is-hidden'), 2200);
