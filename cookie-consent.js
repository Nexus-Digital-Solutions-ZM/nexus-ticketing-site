/*! Cookie consent popup for the Nexus Ticketing marketing site.
 *  Analytics load only after the visitor clicks Accept.
 *  Reject (or no choice) loads nothing optional.
 *
 *  index.html must NOT load /_vercel/insights/script.js itself.
 *  This file loads it after consent.
 *
 *  Optional: set GA_ID to also load Google Analytics after consent.
 */
(function () {
  "use strict";

  var USE_VERCEL_ANALYTICS = true;
  var GA_ID = ""; // e.g. "G-XXXXXXXXXX". Leave empty if unused.
  var KEY = "cookie_consent"; // "accepted" | "rejected"
  var POLICY_URL = "/cookies"; // vercel.json has cleanUrls on

  var analyticsLoaded = false;

  function read() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function write(v) {
    try { localStorage.setItem(KEY, v); } catch (e) {}
  }
  function clear() {
    try { localStorage.removeItem(KEY); } catch (e) {}
  }

  function loadAnalytics() {
    if (analyticsLoaded) return;
    analyticsLoaded = true;

    if (USE_VERCEL_ANALYTICS) {
      window.va = window.va || function () {
        (window.vaq = window.vaq || []).push(arguments);
      };
      var v = document.createElement("script");
      v.defer = true;
      v.src = "/_vercel/insights/script.js";
      document.head.appendChild(v);
    }

    if (GA_ID) {
      var g = document.createElement("script");
      g.async = true;
      g.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(GA_ID);
      document.head.appendChild(g);
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { window.dataLayer.push(arguments); };
      window.gtag("js", new Date());
      window.gtag("config", GA_ID, { anonymize_ip: true });
    }
  }

  function removeBanner() {
    var el = document.getElementById("cookie-banner");
    if (el && el.parentNode) el.parentNode.removeChild(el);
  }

  function choose(value) {
    write(value);
    removeBanner();
    if (value === "accepted") {
      loadAnalytics();
    } else if (analyticsLoaded) {
      // A script already running cannot be unloaded, so reload without it.
      window.location.reload();
    }
  }

  function injectStyles() {
    if (document.getElementById("cookie-banner-css")) return;
    // Brand Kit v1.0: navy #0A1628, blue #1A3C6E, cyan #00AACC, gold #E8A020.
    var css =
      "#cookie-banner{position:fixed;left:12px;right:12px;bottom:12px;z-index:99999;" +
      "margin:0 auto;max-width:560px;background:#0A1628;color:#F5F5F5;" +
      "border:1px solid #1A3C6E;border-top:3px solid #E8A020;border-radius:16px;" +
      "box-shadow:0 20px 50px -10px rgba(0,0,0,.65);padding:20px;" +
      "font:15px/1.55 Arial,Helvetica,sans-serif;" +
      "padding-bottom:calc(20px + env(safe-area-inset-bottom,0px))}" +
      "#cookie-banner h2{margin:0 0 6px;font:700 1.05rem/1.2 'Courier New','Courier Prime',Courier,monospace;color:#E8A020}" +
      "#cookie-banner p{margin:0}" +
      "#cookie-banner a{color:#00AACC;text-decoration:underline}" +
      "#cookie-banner .cb-actions{display:flex;gap:10px;margin-top:16px}" +
      "#cookie-banner button{flex:1;cursor:pointer;border-radius:10px;padding:12px 16px;" +
      "font:700 14px/1 'Courier New','Courier Prime',Courier,monospace;letter-spacing:.04em;" +
      "border:1.5px solid #1A3C6E;background:transparent;color:#F5F5F5}" +
      "#cookie-banner button:hover{border-color:#00AACC}" +
      "#cookie-banner button.cb-accept{background:#E8A020;border-color:#E8A020;color:#0A1628}" +
      "#cookie-banner button.cb-accept:hover{background:#F6BE4A;border-color:#F6BE4A}" +
      "#cookie-banner button:focus-visible,#cookie-banner a:focus-visible{outline:3px solid #E8A020;outline-offset:3px}" +
      "@media (prefers-reduced-motion:no-preference){#cookie-banner{animation:cbin .35s ease both}" +
      "@keyframes cbin{from{opacity:0;transform:translateY(16px)}}}";
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
    el.setAttribute("aria-labelledby", "cb-title");
    el.setAttribute("aria-describedby", "cb-text");
    el.innerHTML =
      '<h2 id="cb-title">Your privacy</h2>' +
      '<p id="cb-text">We set no cookies. With your OK we count visits using ' +
      "cookie-free analytics so we can improve the site. " +
      '<a href="' + POLICY_URL + '">Cookie Policy</a></p>' +
      '<div class="cb-actions">' +
      '<button type="button" class="cb-reject">Reject</button>' +
      '<button type="button" class="cb-accept">Accept</button>' +
      "</div>";
    document.body.appendChild(el);
    el.querySelector(".cb-reject").addEventListener("click", function () { choose("rejected"); });
    el.querySelector(".cb-accept").addEventListener("click", function () { choose("accepted"); });
  }

  // Footer link: <a href="#" data-cookie-settings>Cookie settings</a>
  window.openCookieSettings = function () {
    clear();
    showBanner();
  };

  function init() {
    var stored = read();
    if (stored === "accepted") {
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
