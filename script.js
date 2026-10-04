(() => {
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const sidebar = document.getElementById('sidebar');
  const backdrop = document.getElementById('backdrop');
  const menuBtn = document.getElementById('menuBtn');
  const sidebarClose = document.getElementById('sidebarClose');
  const storageKey = 'pulse-theme';

  function setTheme(theme, save = true) {
    root.dataset.theme = theme;
    if (save) localStorage.setItem(storageKey, theme);
    if (themeToggle) {
      themeToggle.textContent = theme === 'dark' ? '☀' : '☾';
      themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
      themeToggle.title = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
    }
  }

  const savedTheme = localStorage.getItem(storageKey);
  if (savedTheme === 'dark' || savedTheme === 'light') setTheme(savedTheme, false);
  else setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light', false);

  themeToggle?.addEventListener('click', () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));

  function setMenu(open) {
    sidebar?.classList.toggle('open', open);
    backdrop?.classList.toggle('show', open);
    document.body.classList.toggle('menu-open', open);
    menuBtn?.setAttribute('aria-expanded', String(open));
    sidebar?.setAttribute('aria-hidden', String(!open));
  }

  menuBtn?.setAttribute('aria-expanded', 'false');
  sidebar?.setAttribute('aria-hidden', window.innerWidth <= 1023 ? 'true' : 'false');
  menuBtn?.addEventListener('click', () => setMenu(true));
  sidebarClose?.addEventListener('click', () => setMenu(false));
  backdrop?.addEventListener('click', () => setMenu(false));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1023) setMenu(false);
    sidebar?.setAttribute('aria-hidden', window.innerWidth <= 1023 ? String(!sidebar.classList.contains('open')) : 'false');
  });

  const navLinks = [...document.querySelectorAll('.nav-link')];
  navLinks.forEach(link => link.addEventListener('click', () => {
    navLinks.forEach(item => item.classList.remove('active'));
    link.classList.add('active');
    setMenu(false);
  }));

  document.querySelectorAll('.period button').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.period button').forEach(item => item.classList.remove('selected'));
      button.classList.add('selected');
      showToast(`Showing ${button.textContent} performance.`);
    });
  });

  const chartButton = document.querySelector('.legend button');
  const chartRanges = ['Last 7 days', 'Last 30 days', 'Last 90 days', 'This year'];
  let chartIndex = 0;
  chartButton?.addEventListener('click', () => {
    chartIndex = (chartIndex + 1) % chartRanges.length;
    chartButton.textContent = `${chartRanges[chartIndex]} ⌄`;
    showToast(`Chart range changed to ${chartRanges[chartIndex].toLowerCase()}.`);
  });

  document.querySelector('.workspace-switch')?.addEventListener('click', () => showToast('Nova Studio · Professional workspace selected.'));
  document.querySelector('.search input')?.addEventListener('keydown', e => {
    if (e.key === 'Enter' && e.currentTarget.value.trim()) {
      showToast(`Searching for “${e.currentTarget.value.trim()}”`);
      e.currentTarget.blur();
    }
  });
  document.querySelectorAll('.demo-action').forEach(button => button.addEventListener('click', () => showToast(button.dataset.message || 'Action completed.')));

  const showAll = document.querySelector('.text-link[href="#activity"]');
  showAll?.addEventListener('click', e => { e.preventDefault(); showToast('All recent activity is already visible.'); });

  let toastTimer;
  function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
  }
})();
