/* ============================================================
   Sunnova Medical Supplies — front-end behavior
   1. Sticky header: transparent at top → solid white on scroll
   2. Mobile nav toggle
   ============================================================ */

(function () {
  "use strict";

  /* ---------- 0. CSRF: inject the session token into POST forms + fetch ---------- */
  function csrfToken() {
    var m = document.querySelector('meta[name="csrf-token"]');
    return m ? m.getAttribute("content") : "";
  }
  function injectCsrf(form) {
    if (!form || (form.getAttribute("method") || "get").toLowerCase() !== "post") return;
    if (form.querySelector('input[name="csrf_token"]')) return;
    var i = document.createElement("input");
    i.type = "hidden"; i.name = "csrf_token"; i.value = csrfToken();
    form.appendChild(i);
  }
  document.querySelectorAll("form").forEach(injectCsrf);
  document.addEventListener("submit", function (e) {
    if (e.target && e.target.tagName === "FORM") injectCsrf(e.target);
  }, true);

  const header = document.getElementById("siteHeader");
  const navToggle = document.getElementById("navToggle");
  const navList = document.getElementById("navList");

  /* ---------- 1. Sticky header background on scroll ---------- */
  // Add .is-scrolled once the user moves past this many pixels.
  const SCROLL_THRESHOLD = 10;

  function syncHeaderState() {
    if (!header) return;
    if (window.scrollY > SCROLL_THRESHOLD) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  }

  // requestAnimationFrame keeps the scroll handler cheap/smooth.
  let ticking = false;
  window.addEventListener(
    "scroll",
    function () {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          syncHeaderState();
          ticking = false;
        });
        ticking = true;
      }
    },
    { passive: true }
  );

  // Run once on load in case the page is refreshed mid-scroll.
  syncHeaderState();

  /* ---------- 2. Mobile navigation toggle ---------- */
  if (navToggle && navList) {
    navToggle.addEventListener("click", function () {
      const isOpen = navList.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Close the menu after tapping any link (mobile UX).
    navList.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navList.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- 3. "Who We Serve" accordion ---------- */
  // One panel open at a time. Animates via max-height so the CSS
  // transition has a concrete value to tween to.
  document.querySelectorAll(".accordion").forEach(function (accordion) {
    const items = Array.prototype.slice.call(
      accordion.querySelectorAll(".accordion__item")
    );

    function openItem(item) {
      const panel = item.querySelector(".accordion__panel");
      const header = item.querySelector(".accordion__header");
      item.classList.add("is-open");
      header.setAttribute("aria-expanded", "true");
      panel.style.maxHeight = panel.scrollHeight + "px";
    }

    function closeItem(item) {
      const panel = item.querySelector(".accordion__panel");
      const header = item.querySelector(".accordion__header");
      item.classList.remove("is-open");
      header.setAttribute("aria-expanded", "false");
      panel.style.maxHeight = null;
    }

    items.forEach(function (item) {
      // Expand whichever item was flagged .is-open in the markup.
      if (item.classList.contains("is-open")) openItem(item);

      item
        .querySelector(".accordion__header")
        .addEventListener("click", function () {
          const wasOpen = item.classList.contains("is-open");
          items.forEach(closeItem); // collapse all first
          if (!wasOpen) openItem(item); // then re-open the clicked one
        });
    });

    // Keep an open panel's height correct if the viewport reflows.
    window.addEventListener("resize", function () {
      const open = accordion.querySelector(".accordion__item.is-open");
      if (open) {
        const panel = open.querySelector(".accordion__panel");
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  });

  /* ---------- 4. Product page: quantity stepper ---------- */
  document.querySelectorAll("[data-qty]").forEach(function (qty) {
    const input = qty.querySelector(".qty__input");

    function clamp(n) {
      return isNaN(n) || n < 1 ? 1 : n;
    }

    qty.querySelectorAll("[data-action]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const step = btn.dataset.action === "inc" ? 1 : -1;
        input.value = clamp(parseInt(input.value, 10) + step);
      });
    });

    // Sanitize manual typing to whole numbers >= 1.
    input.addEventListener("input", function () {
      input.value = input.value.replace(/[^0-9]/g, "");
    });
    input.addEventListener("blur", function () {
      input.value = clamp(parseInt(input.value, 10));
    });
  });

  /* ---------- 5. Product page: gallery thumbnail swap ---------- */
  document.querySelectorAll("[data-gallery]").forEach(function (gallery) {
    const mainImg = gallery.querySelector("[data-main-image]");
    const thumbs = gallery.querySelectorAll(".thumb");

    thumbs.forEach(function (thumb) {
      thumb.addEventListener("click", function () {
        const full = thumb.dataset.full;
        if (full) mainImg.src = full;
        thumbs.forEach(function (t) {
          t.classList.remove("is-active");
        });
        thumb.classList.add("is-active");
      });
    });
  });

  /* ---------- 6. Product catalog accordion (mobile only) ---------- */
  // Collapsed navy bars; tapping a header expands it (one open at a time).
  // The collapse styling lives in a max-width:600px block, so on desktop
  // every category stays fully expanded regardless of the is-open class.
  document.querySelectorAll("[data-catalog]").forEach(function (root) {
    const items = Array.prototype.slice.call(root.querySelectorAll(".catcat"));
    items.forEach(function (item, idx) {
      const head = item.querySelector(".catcat__head");
      if (!head) return;
      head.setAttribute("role", "button");
      head.setAttribute("tabindex", "0");
      if (idx === 0) item.classList.add("is-open");
      head.setAttribute("aria-expanded", String(idx === 0));

      function toggle() {
        const isOpen = item.classList.contains("is-open");
        items.forEach(function (other) {
          other.classList.remove("is-open");
          const h = other.querySelector(".catcat__head");
          if (h) h.setAttribute("aria-expanded", "false");
        });
        if (!isOpen) {
          item.classList.add("is-open");
          head.setAttribute("aria-expanded", "true");
        }
      }

      head.addEventListener("click", toggle);
      head.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggle();
        }
      });
    });
  });
})();
