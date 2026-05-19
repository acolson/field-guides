/* Field Guide — shared site behaviors.
   Loaded by every page. Handles:
   1. City switcher dropdown in the topbar
   2. Mobile filter drawer (slide-out, only active on pages with .sidebar)
   3. Closes both on Escape, outside-click, etc.
*/
(function(){
  'use strict';

  // ============================================================
  // 1. CITY SWITCHER (topbar dropdown)
  // ============================================================
  function setupCitySwitcher(){
    var switchers = document.querySelectorAll('.city-switcher');
    if (!switchers.length) return;

    function closeAll(){
      switchers.forEach(function(s){ s.setAttribute('data-open', 'false'); });
    }

    document.addEventListener('click', function(e){
      var trigger = e.target.closest && e.target.closest('.city-switcher-trigger');
      var inside = e.target.closest && e.target.closest('.city-switcher-menu');
      if (trigger) {
        e.preventDefault();
        var sw = trigger.closest('.city-switcher');
        var isOpen = sw.getAttribute('data-open') === 'true';
        closeAll();
        if (!isOpen) sw.setAttribute('data-open', 'true');
      } else if (!inside) {
        closeAll();
      }
    });

    document.addEventListener('keydown', function(e){
      if (e.key === 'Escape') closeAll();
    });
  }

  // ============================================================
  // 2. MOBILE FILTER DRAWER
  // ============================================================
  function setupDrawer(){
    var sidebar = document.querySelector('aside.sidebar');
    if (!sidebar) return;  // pages without a sidebar (landing, placeholders)

    // Trigger button — always created; CSS hides it on desktop
    var trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'drawer-trigger';
    trigger.setAttribute('aria-label', 'Open filters and table of contents');
    trigger.innerHTML =
      '<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<line x1="2" y1="4" x2="14" y2="4"/>' +
      '<line x1="4" y1="8" x2="12" y2="8"/>' +
      '<line x1="6" y1="12" x2="10" y2="12"/>' +
      '</svg>' +
      '<span>Filters &amp; TOC</span>';
    document.body.appendChild(trigger);

    // Overlay
    var overlay = document.createElement('div');
    overlay.className = 'drawer-overlay';
    document.body.appendChild(overlay);

    // Close button inside sidebar
    var closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'drawer-close';
    closeBtn.setAttribute('aria-label', 'Close filters');
    closeBtn.innerHTML = '&times;';
    sidebar.insertBefore(closeBtn, sidebar.firstChild);

    function open(){
      sidebar.classList.add('drawer-open');
      overlay.classList.add('open');
      document.body.classList.add('drawer-locked');
    }
    function close(){
      sidebar.classList.remove('drawer-open');
      overlay.classList.remove('open');
      document.body.classList.remove('drawer-locked');
    }

    trigger.addEventListener('click', open);
    overlay.addEventListener('click', close);
    closeBtn.addEventListener('click', close);

    document.addEventListener('keydown', function(e){
      if (e.key === 'Escape' && sidebar.classList.contains('drawer-open')) close();
    });

    // Tapping a TOC link or filter chip should close the drawer on mobile
    sidebar.addEventListener('click', function(e){
      var isMobile = window.matchMedia('(max-width: 1024px)').matches;
      if (!isMobile) return;
      if (e.target.closest('.toc a') || e.target.closest('.filter-chip')) {
        // Small delay so the click's primary action (filter apply, anchor scroll) happens first
        setTimeout(close, 220);
      }
    });
  }

  // ============================================================
  // Boot
  // ============================================================
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function(){
      setupCitySwitcher();
      setupDrawer();
    });
  } else {
    setupCitySwitcher();
    setupDrawer();
  }
})();
