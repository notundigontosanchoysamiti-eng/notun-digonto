/* Presentation-only adapter. RPC, field validation, permissions and workflows stay original. */
(function () {
  'use strict';
  var mobile = window.matchMedia('(max-width: 980px)');
  var sidebar = document.getElementById('sidebar');
  var toggle = document.getElementById('menuToggle');
  var main = document.querySelector('.main');
  var app = document.getElementById('appView');
  var modalRoot = document.getElementById('modalRoot');
  var backdrop = document.createElement('button');
  backdrop.id = 'ndDrawerBackdrop';
  backdrop.type = 'button';
  backdrop.hidden = true;
  backdrop.tabIndex = -1;
  backdrop.setAttribute('aria-label', 'Close menu / মেনু বন্ধ');
  document.body.appendChild(backdrop);
  var close = document.createElement('button');
  close.id = 'ndDrawerClose';
  close.type = 'button';
  close.textContent = '×';
  close.setAttribute('aria-label', 'Close menu / মেনু বন্ধ');
  sidebar.appendChild(close);
  var locked = false, scrollY = 0, lastDialog = null, returnFocus = null;

  function closeDrawer() {
    sidebar.classList.remove('open');
    sync();
    if (mobile.matches && !app.classList.contains('hidden')) toggle.focus({preventScroll:true});
  }
  backdrop.addEventListener('click', closeDrawer);
  close.addEventListener('click', closeDrawer);

  // The original uses <980 in JS but <=980 in CSS. Keep one mobile boundary.
  var originalPreference = window.applySidebarPreference;
  window.applySidebarPreference = function () {
    if (mobile.matches) sidebar.classList.remove('collapsed');
    else originalPreference();
    sync();
  };
  var originalToggle = window.toggleSidebarMode;
  window.toggleSidebarMode = function () {
    if (!mobile.matches) return originalToggle();
    sidebar.classList.toggle('open');
    sync();
    if (sidebar.classList.contains('open')) close.focus({preventScroll:true});
  };
  var originalActiveNav = window.setActiveNav;
  window.setActiveNav = function (page) {
    originalActiveNav(page);
    if (mobile.matches) sidebar.classList.remove('open');
    sync();
  };

  function sync() {
    var isMobile = mobile.matches;
    var dialog = modalRoot.querySelector('.modal');
    var open = isMobile && !app.classList.contains('hidden') && sidebar.classList.contains('open');
    backdrop.hidden = !open;
    sidebar.inert = isMobile && (!open || !!dialog);
    main.inert = isMobile && (open || !!dialog);
    if (isMobile) {
      toggle.setAttribute('aria-controls', 'sidebar');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', 'Menu / মেনু');
    } else {
      toggle.removeAttribute('aria-expanded');
    }
    sidebar.querySelectorAll('.nav-item').forEach(function (item) {
      if (isMobile) { item.tabIndex = 0; item.setAttribute('role', 'button'); }
      else { item.removeAttribute('tabindex'); item.removeAttribute('role'); }
    });
    var shouldLock = isMobile && (open || !!dialog);
    if (shouldLock && !locked) {
      scrollY = window.scrollY;
      document.body.style.setProperty('--nd-scroll-y', -scrollY + 'px');
      document.body.classList.add('nd-mobile-locked');
      locked = true;
    } else if (!shouldLock && locked) {
      document.body.classList.remove('nd-mobile-locked');
      document.body.style.removeProperty('--nd-scroll-y');
      locked = false;
      window.scrollTo(0, scrollY);
    }
    if (isMobile && dialog !== lastDialog) {
      if (dialog) {
        if (!lastDialog) returnFocus = document.activeElement;
        dialog.tabIndex = -1;
        dialog.focus({preventScroll:true});
      } else if (returnFocus && returnFocus.isConnected && !returnFocus.closest('[inert]')) {
        returnFocus.focus({preventScroll:true});
        returnFocus = null;
      }
    }
    lastDialog = dialog;
  }
  document.addEventListener('keydown', function (event) {
    if (!mobile.matches) return;
    var dialog = modalRoot.querySelector('.modal');
    var open = sidebar.classList.contains('open') && !app.classList.contains('hidden');
    if (!dialog && open && event.key === 'Escape') { event.preventDefault(); closeDrawer(); return; }
    if (!dialog && open && (event.key === 'Enter' || event.key === ' ') && event.target.matches('.nav-item')) {
      event.preventDefault(); event.target.click(); return;
    }
    if (event.key !== 'Tab') return;
    var scope = dialog || (open ? sidebar : null);
    if (!scope) return;
    var items = Array.from(scope.querySelectorAll('button:not(:disabled),a[href],input:not(:disabled),select:not(:disabled),textarea:not(:disabled),[tabindex="0"]')).filter(function (item) { return item.getClientRects().length && !item.closest('[inert]'); });
    if (!items.length) { event.preventDefault(); return; }
    var first = items[0], last = items[items.length - 1];
    if (event.shiftKey && (document.activeElement === first || !items.includes(document.activeElement))) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && (document.activeElement === last || !items.includes(document.activeElement))) { event.preventDefault(); first.focus(); }
  });
  new MutationObserver(sync).observe(sidebar, {attributes:true,attributeFilter:['class']});
  new MutationObserver(sync).observe(document.getElementById('nav'), {childList:true});
  new MutationObserver(sync).observe(app, {attributes:true,attributeFilter:['class']});
  new MutationObserver(sync).observe(modalRoot, {childList:true});
  mobile.addEventListener('change', function () { window.applySidebarPreference(); });
  sync();
})();
