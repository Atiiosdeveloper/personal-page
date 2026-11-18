/* MercyMed – page behaviour: mobile menu, languages, services/prices,
   team profiles, WhatsApp booking. Clinic data lives in js/config.js. */
(function () {
  "use strict";

  var cfg = window.MM_CONFIG || {};
  var dict = window.MM_I18N || {};
  var current = "en";

  /* ---------- WhatsApp links ---------- */
  // With a confirmed number the chat opens with the clinic directly.
  // Without one, WhatsApp opens with the text ready and asks which chat to use.
  function waUrl(text) {
    var num = String(cfg.whatsappNumber || "").replace(/\D/g, "");
    return "https://wa.me/" + num + "?text=" + encodeURIComponent(text);
  }

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

  function pick(obj) {
    if (!obj) return "";
    if (typeof obj === "string") return obj;
    return obj[current] || obj.en || "";
  }

  /* ---------- Services: prices + "ask about price" ---------- */
  function renderServices() {
    var prices = cfg.prices || {};
    document.querySelectorAll("[data-price]").forEach(function (el) {
      var p = prices[el.getAttribute("data-price")];
      el.textContent = p ? p : t("priceAsk");
      el.classList.toggle("price-known", !!p);
    });
    document.querySelectorAll("[data-ask]").forEach(function (a) {
      var key = a.getAttribute("data-ask");
      a.href = waUrl(t("msgPriceQ") + " " + t(key + "T"));
    });
    document.querySelectorAll("[data-wa-greet]").forEach(function (a) {
      a.href = waUrl(t("msgGreet"));
    });
  }

  /* ---------- Team (from config) ---------- */
  function renderTeam() {
    var grid = document.getElementById("team-grid");
    var empty = document.getElementById("team-empty");
    var team = cfg.team || [];
    grid.innerHTML = "";
    empty.hidden = team.length > 0;
    grid.hidden = team.length === 0;
    team.forEach(function (m) {
      var card = document.createElement("article");
      card.className = "person";
      var pic;
      if (m.photo) {
        pic = document.createElement("img");
        pic.className = "avatar avatar-photo";
        pic.src = m.photo;
        pic.alt = m.name || "";
        pic.loading = "lazy";
      } else {
        pic = document.createElement("div");
        pic.className = "avatar";
        pic.setAttribute("aria-hidden", "true");
        pic.textContent = (m.name || "M").replace(/^Dr\.?\s*/, "").charAt(0);
      }
      var h = document.createElement("h3"); h.textContent = m.name || "";
      var r = document.createElement("p"); r.className = "role"; r.textContent = pick(m.role);
      var b = document.createElement("p"); b.className = "bio bio-real"; b.textContent = pick(m.bio);
      card.append(pic, h, r, b);
      grid.appendChild(card);
    });
  }

  /* ---------- Instagram (from config) ---------- */
  function renderInstagram() {
    var a = document.getElementById("insta-link");
    var handle = String(cfg.instagramHandle || "").replace(/^@/, "");
    if (!handle) return;
    a.textContent = "@" + handle;
    a.href = "https://www.instagram.com/" + encodeURIComponent(handle) + "/";
    a.target = "_blank";
    a.rel = "noopener";
    a.removeAttribute("aria-disabled");
    a.removeAttribute("data-i18n");
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
    renderServices();
    renderTeam();
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

  /* ---------- Booking via WhatsApp ---------- */
  var form = document.getElementById("book-form");
  var error = document.getElementById("form-error");
  var preview = document.getElementById("preview");
  var previewText = document.getElementById("preview-text");
  var waLink = document.getElementById("wa-link");
  var copyBtn = document.getElementById("copy-btn");
  var copyOk = document.getElementById("copy-ok");

  function buildMessage() {
    var lines = [
      t("msgHello"),
      t("msgName") + ": " + form.name.value.trim(),
      t("msgDob") + ": " + form.dob.value,
      t("msgPhone") + ": " + form.phone.value.trim()
    ];
    var svc = form.service.value;
    if (svc) lines.push(t("msgService") + ": " + t(svc + "T"));
    var msg = lines.join("\n");
    previewText.textContent = msg;
    waLink.href = waUrl(msg);
    return msg;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var ok = form.name.value.trim() && form.dob.value && form.phone.value.trim();
    error.hidden = !!ok;
    if (!ok) return;
    var msg = buildMessage();
    preview.hidden = false;
    copyOk.hidden = true;
    window.open(waUrl(msg), "_blank", "noopener");
  });

  copyBtn.addEventListener("click", function () {
    var text = previewText.textContent;
    function done() { copyOk.hidden = false; }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, function () {});
    }
  });

  // Asking about a price also preselects that service in the booking form
  document.querySelectorAll("[data-ask]").forEach(function (a) {
    a.addEventListener("click", function () { form.service.value = a.getAttribute("data-ask"); });
  });

  document.querySelectorAll('[aria-disabled="true"]').forEach(function (el) {
    el.addEventListener("click", function (e) {
      if (el.getAttribute("aria-disabled") === "true") e.preventDefault();
    });
  });

  /* ---------- Start ---------- */
  renderInstagram();
  var saved = null;
  try { saved = localStorage.getItem("mm-lang"); } catch (e) { /* ignore */ }
  setLanguage(saved || "en");
})();
