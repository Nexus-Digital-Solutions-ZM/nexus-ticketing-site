/*! Cookie consent for the Nexus marketing site.
 *  Optional cookies (analytics) load only after the visitor accepts.
 *  Set GA_ID below, or leave it empty if you do not use Google Analytics.
 */
(function () {
  "use strict";

  var GA_ID = ""; // e.g. "G-XXXXXXXXXX". Leave empty if unused.
  var KEY = "cookie_consent"; // "accepted" | "rejected"
  var POLICY_URL = "/cookies"; // vercel.json has cleanUrls on, so no .html

  function read() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function write(v) {
    try { localStorage.setItem(KEY, v); } catch (e) {}
  }

  function loadAnalytics() {
    if (!GA_ID || document.getElementById("ga-loader")) return;
    var s = document.createElement("script");
    s.id = "ga-loader";
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(GA_ID);
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", GA_ID, { anonymize_ip: true });
  }

  function removeBanner() {
    var el = document.getElementById("cookie-banner");
    if (el) el.parentNode.removeChild(el);
  }

  function choose(value) {
    write(value);
    removeBanner();
    if (value === "accepted") {
      loadAnalytics();
    } else if (read() === "rejected" && window.__gaWasLoaded) {
      // A page reload clears any analytics script that was already running.
      window.location.reload();
    }
  }

  function injectStyles() {
    if (document.getElementById("cookie-banner-css")) return;
    // Brand Kit v1.0: navy #0A1628, gold #E8A020, Courier New Bold labels, Arial body.
    var css =
      "#cookie-banner{position:fixed;left:0;right:0;bottom:0;z-index:99999;" +
      "background:#0A1628;color:#fff;border-top:2px solid #E8A020;" +
      "box-shadow:0 -4px 16px rgba(0,0,0,.35);padding:16px;" +
      "font:14px/1.5 Arial,Helvetica,sans-serif}" +
      "#cookie-banner .cb-inner{max-width:960px;margin:0 auto;display:flex;" +
      "flex-wrap:wrap;gap:12px;align-items:center;justify-content:space-between}" +
      "#cookie-banner p{margin:0;flex:1 1 320px}" +
      "#cookie-banner a{color:#00AACC;text-decoration:underline}" +
      "#cookie-banner .cb-actions{display:flex;gap:8px}" +
      "#cookie-banner button{cursor:pointer;border-radius:4px;padding:9px 18px;" +
      "font:700 13px/1 'Courier New',Courier,monospace;letter-spacing:.04em;" +
      "border:1px solid #1A3C6E;background:transparent;color:#fff}" +
      "#cookie-banner button:hover{border-color:#00AACC}" +
      "#cookie-banner button.cb-accept{background:#E8A020;border-color:#E8A020;color:#0A1628}" +
      "#cookie-banner button:focus-visible{outline:2px solid #00AACC;outline-offset:2px}";
    var style = document.createElement("style");
    style.id = "cookie-banner-css";
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
  }

  function showBanner() {
    if (document.getElementById("cookie-banner")) return;
    injectStyles();
    var el = document.createElement("div");
    el.id = "cookie-banner";
    el.setAttribute("role", "dialog");
    el.setAttribute("aria-label", "Cookie consent");
    el.innerHTML =
      '<div class="cb-inner">' +
      "<p>We use essential cookies to run this site. With your consent we also " +
      "use analytics cookies to improve it. " +
      '<a href="' + POLICY_URL + '">Cookie Policy</a></p>' +
      '<div class="cb-actions">' +
      '<button type="button" class="cb-reject">Reject</button>' +
      '<button type="button" class="cb-accept">Accept</button>' +
      "</div></div>";
    document.body.appendChild(el);
    el.querySelector(".cb-reject").addEventListener("click", function () { choose("rejected"); });
    el.querySelector(".cb-accept").addEventListener("click", function () { choose("accepted"); });
  }

  // Footer link: <a href="#" data-cookie-settings>Cookie settings</a>
  window.openCookieSettings = function () {
    try { localStorage.removeItem(KEY); } catch (e) {}
    showBanner();
  };

  function init() {
    var stored = read();
    if (stored === "accepted") {
      window.__gaWasLoaded = true;
      loadAnalytics();
    } else if (stored !== "rejected") {
      showBanner();
    }
    document.addEventListener("click", function (e) {
      var t = e.target;
      while (t && t !== document) {
        if (t.hasAttribute && t.hasAttribute("data-cookie-settings")) {
          e.preventDefault();
          window.openCookieSettings();
          return;
        }
        t = t.parentNode;
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
