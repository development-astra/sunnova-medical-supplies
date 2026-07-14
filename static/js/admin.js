/* ============================================================
   Sunnova Medical Supplies — Admin dashboard behavior
   Declarative, data-attribute driven so templates stay markup-only:

     [data-sidebar-toggle]          toggle mobile sidebar
     [data-menu-toggle]             toggle nearest .menu dropdown
     [data-drawer-open="id"]        open  #id drawer
     [data-drawer-close]            close open drawer
     [data-modal-open="id"]         open  #id modal
     [data-modal-close]             close open modal
     .tabs [data-tab="panelId"]     switch tab panels
     .segmented [data-segment]      toggle segmented control active state
     [data-select-all]              select every [data-row-check] + show bulk bar
   ============================================================ */

(function () {
  "use strict";

  var body = document.body;

  /* ---------- CSRF: inject the session token into every POST form + fetch ----------
     Flask-WTF's CSRFProtect requires a token on all state-changing requests. Rather
     than hand-edit every <form>, we read the token from the <meta> tag and inject a
     hidden field into each POST form (and set the X-CSRFToken header on fetch). */
  function csrfToken() {
    var m = document.querySelector('meta[name="csrf-token"]');
    return m ? m.getAttribute("content") : "";
  }
  function injectCsrf(form) {
    if (!form || (form.getAttribute("method") || "get").toLowerCase() !== "post") return;
    if (form.querySelector('input[name="csrf_token"]')) return;
    var i = document.createElement("input");
    i.type = "hidden";
    i.name = "csrf_token";
    i.value = csrfToken();
    form.appendChild(i);
  }
  document.querySelectorAll("form").forEach(injectCsrf);
  document.addEventListener("submit", function (e) {
    if (e.target && e.target.tagName === "FORM") injectCsrf(e.target);
  }, true);
  if (window.fetch) {
    var _fetch = window.fetch;
    window.fetch = function (input, init) {
      init = init || {};
      var method = (init.method || "GET").toUpperCase();
      if (method !== "GET" && method !== "HEAD") {
        var h = new Headers(init.headers || {});
        if (!h.has("X-CSRFToken")) h.set("X-CSRFToken", csrfToken());
        init.headers = h;
      }
      return _fetch(input, init);
    };
  }

  /* ---------- Helpers ---------- */
  function closest(el, selector) {
    while (el && el.nodeType === 1) {
      if (el.matches(selector)) return el;
      el = el.parentElement;
    }
    return null;
  }

  /* ---------- Sidebar (mobile) ---------- */
  var sidebar = document.getElementById("adminSidebar");
  var backdrop = document.getElementById("sidebarBackdrop");

  function openSidebar() {
    if (sidebar) sidebar.classList.add("is-open");
    if (backdrop) backdrop.classList.add("is-open");
  }
  function closeSidebar() {
    if (sidebar) sidebar.classList.remove("is-open");
    if (backdrop) backdrop.classList.remove("is-open");
  }
  if (backdrop) backdrop.addEventListener("click", closeSidebar);

  /* ---------- Drawers ---------- */
  function openDrawer(id) {
    var drawer = document.getElementById(id);
    if (!drawer) return;
    drawer.classList.add("is-open");
    var back = document.getElementById("drawerBackdrop");
    if (back) back.classList.add("is-open");
  }
  function closeDrawers() {
    document.querySelectorAll(".drawer.is-open").forEach(function (d) {
      d.classList.remove("is-open");
    });
    var back = document.getElementById("drawerBackdrop");
    if (back) back.classList.remove("is-open");
  }

  /* ---------- Modals ---------- */
  function openModal(id) {
    var modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.add("is-open");
    var back = document.getElementById("modalBackdrop");
    if (back) back.classList.add("is-open");
  }
  function closeModals() {
    document.querySelectorAll(".modal.is-open").forEach(function (m) {
      m.classList.remove("is-open");
    });
    var back = document.getElementById("modalBackdrop");
    if (back) back.classList.remove("is-open");
  }

  /* ---------- Dropdown menus ---------- */
  function closeAllMenus(except) {
    document.querySelectorAll(".menu.is-open").forEach(function (m) {
      if (m !== except) m.classList.remove("is-open");
    });
  }

  /* ---------- Global click delegation ---------- */
  document.addEventListener("click", function (e) {
    var t = e.target;

    var sideToggle = closest(t, "[data-sidebar-toggle]");
    if (sideToggle) {
      if (sidebar && sidebar.classList.contains("is-open")) closeSidebar();
      else openSidebar();
      return;
    }

    var menuToggle = closest(t, "[data-menu-toggle]");
    if (menuToggle) {
      e.stopPropagation();
      var menu = closest(menuToggle, ".menu");
      if (menu) {
        var wasOpen = menu.classList.contains("is-open");
        closeAllMenus(menu);
        menu.classList.toggle("is-open", !wasOpen);
      }
      return;
    }

    var drawerOpen = closest(t, "[data-drawer-open]");
    if (drawerOpen) {
      openDrawer(drawerOpen.getAttribute("data-drawer-open"));
      return;
    }
    if (closest(t, "[data-drawer-close]") || t.classList.contains("drawer-backdrop")) {
      closeDrawers();
      return;
    }

    var modalOpen = closest(t, "[data-modal-open]");
    if (modalOpen) {
      openModal(modalOpen.getAttribute("data-modal-open"));
      return;
    }
    if (closest(t, "[data-modal-close]") || t.classList.contains("modal-backdrop")) {
      closeModals();
      return;
    }

    /* Tabs */
    var tab = closest(t, "[data-tab]");
    if (tab) {
      var tabsWrap = closest(tab, ".tabs");
      var panelId = tab.getAttribute("data-tab");
      if (tabsWrap) {
        tabsWrap.querySelectorAll("[data-tab]").forEach(function (b) {
          b.classList.remove("is-active");
        });
        tab.classList.add("is-active");
      }
      // Panels are siblings after the .tabs bar, grouped by a shared parent.
      var scope = tabsWrap ? tabsWrap.parentElement : document;
      scope.querySelectorAll(".tab-panel").forEach(function (p) {
        p.classList.toggle("is-active", p.id === panelId);
      });
      return;
    }

    /* Segmented control */
    var seg = closest(t, ".segmented [data-segment]");
    if (seg) {
      var group = closest(seg, ".segmented");
      group.querySelectorAll("[data-segment]").forEach(function (b) {
        b.classList.remove("is-active");
      });
      seg.classList.add("is-active");
      return;
    }

    // Click outside any menu closes them.
    if (!closest(t, ".menu")) closeAllMenus(null);
  });

  /* ---------- Escape closes overlays ---------- */
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeDrawers();
      closeModals();
      closeAllMenus(null);
      closeSidebar();
    }
  });

  /* ---------- Table bulk-select ---------- */
  document.querySelectorAll("[data-table-group]").forEach(function (group) {
    var selectAll = group.querySelector("[data-select-all]");
    var rowChecks = group.querySelectorAll("[data-row-check]");
    var bulkbar = group.querySelector(".bulkbar");
    var countEl = bulkbar ? bulkbar.querySelector(".bulkbar__count") : null;

    function sync() {
      var checked = group.querySelectorAll("[data-row-check]:checked").length;
      if (bulkbar) bulkbar.classList.toggle("is-visible", checked > 0);
      if (countEl) countEl.textContent = checked + " selected";
      if (selectAll) {
        selectAll.checked = checked > 0 && checked === rowChecks.length;
        selectAll.indeterminate = checked > 0 && checked < rowChecks.length;
      }
    }

    if (selectAll) {
      selectAll.addEventListener("change", function () {
        rowChecks.forEach(function (c) { c.checked = selectAll.checked; });
        sync();
      });
    }
    rowChecks.forEach(function (c) { c.addEventListener("change", sync); });
  });

  /* ---------- Expose a tiny API (for inline onclick fallbacks) ---------- */
  window.SunnovaAdmin = {
    openDrawer: openDrawer,
    closeDrawers: closeDrawers,
    openModal: openModal,
    closeModals: closeModals,
  };
})();
