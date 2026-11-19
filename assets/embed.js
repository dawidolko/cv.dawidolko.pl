/*
 * Embed mode: when the CV is shown inside another site's iframe (olkodawid.dawidolko.pl/resume/), the page drops its
 * own language switch and reader panel (the host has both), opens links in a new tab instead of inside the frame, and
 * tells the host its height whenever it changes, so the host can size the frame with no inner scroll bar.
 * The message is {type: "cv:height", height}. Outside a frame the script does nothing.
 */
(function () {
  if (window.self === window.top) return;
  document.documentElement.classList.add("embed");
  var post = function () {
    var height = Math.ceil(document.documentElement.getBoundingClientRect().height);
    window.parent.postMessage({ type: "cv:height", height: height }, "*");
  };
  var ready = function () {
    document.querySelectorAll("a[href]").forEach(function (link) {
      if (link.hasAttribute("download") || link.getAttribute("href").charAt(0) === "#") return;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    });
    post();
    if ("ResizeObserver" in window) new ResizeObserver(post).observe(document.documentElement);
    window.addEventListener("load", post);
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", ready);
  else ready();
})();
