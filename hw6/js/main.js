/* MercyMed – page behaviour: mobile menu, language switch, booking prototype. */
(function () {
  "use strict";

  // Clinic WhatsApp number in international format, digits only (e.g. "996555123456").
  // Left empty until MercyMed confirms it, so the prototype never sends anything.
  var WHATSAPP_NUMBER = "";

  var dict = window.MM_I18N || {};
  var current = "en";

  /* ---------- Mobile menu ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");

  function closeMenu() {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }
  toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  nav.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", closeMenu); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenu(); });

  /* ---------- Languages ---------- */
  // English is read from the page itself, so index.html stays the single source.
  var english = {};
  document.querySelectorAll("[data-i18n]").forEach(function (el) {
    var key = el.getAttribute("data-i18n");
    if (!(key in english)) english[key] = el.textContent;
  });

  function t(key) {
    if (current !== "en" && dict[current] && dict[current][key]) return dict[current][key];
    if (dict.en && dict.en[key]) return dict.en[key];
    return english[key] || "";
  }

  function setLanguage(lang) {
    if (!(lang === "en" || dict[lang])) lang = "en";
    current = lang;
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = t(el.getAttribute("data-i18n"));
    });
    document.querySelectorAll(".lang-switch button").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.lang === lang));
    });
    document.querySelector(".translation-note").hidden = lang === "en";
    if (!preview.hidden) buildMessage();
    try { localStorage.setItem("mm-lang", lang); } catch (e) { /* storage unavailable */ }
  }

  document.querySelectorAll(".lang-switch button").forEach(function (b) {
    b.addEventListener("click", function () { setLanguage(b.dataset.lang); });
  });

  /* ---------- Active nav link while scrolling ---------- */
  var links = Array.prototype.slice.call(document.querySelectorAll(".site-nav ul a"));
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (l) {
          l.classList.toggle("active", l.getAttribute("href") === "#" + entry.target.id);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    document.querySelectorAll("main section[id]").forEach(function (s) { io.observe(s); });
  }

  /* ---------- Booking prototype (WhatsApp) ---------- */
  var form = document.getElementById("book-form");
  var error = document.getElementById("form-error");
  var preview = document.getElementById("preview");
  var previewText = document.getElementById("preview-text");
  var waLink = document.getElementById("wa-link");

  function buildMessage() {
    var name = form.name.value.trim();
    var dob = form.dob.value;
    var phone = form.phone.value.trim();
    var msg = t("msgHello") + "\n" +
      t("msgName") + ": " + name + "\n" +
      t("msgDob") + ": " + dob + "\n" +
      t("msgPhone") + ": " + phone;
    previewText.textContent = msg;

    if (WHATSAPP_NUMBER) {
      waLink.href = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(msg);
      waLink.target = "_blank";
      waLink.rel = "noopener";
      waLink.removeAttribute("aria-disabled");
    }
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var ok = form.name.value.trim() && form.dob.value && form.phone.value.trim();
    error.hidden = !!ok;
    if (!ok) return;
    buildMessage();
    preview.hidden = false;
  });

  document.querySelectorAll('[aria-disabled="true"]').forEach(function (el) {
    el.addEventListener("click", function (e) {
      if (el.getAttribute("aria-disabled") === "true") e.preventDefault();
    });
  });

  /* ---------- Start ---------- */
  var saved = null;
  try { saved = localStorage.getItem("mm-lang"); } catch (e) { /* ignore */ }
  setLanguage(saved || "en");
})();
