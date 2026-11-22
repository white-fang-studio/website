(function () {
  "use strict";

  // footer year
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // mobile nav
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("nav");
  function closeNav() {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }
  toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  nav.addEventListener("click", function (e) {
    if (e.target.tagName === "A") closeNav();
  });

  // reveal on scroll
  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("in"); });
  }

  // screenshots carousel arrows
  var track = document.getElementById("shotsTrack");
  document.querySelectorAll(".arrow").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var dir = Number(btn.dataset.dir);
      track.scrollBy({ left: dir * track.clientWidth * 0.8, behavior: "smooth" });
    });
  });

  // lightbox
  var shots = Array.prototype.slice.call(document.querySelectorAll(".shot img"));
  var lb = document.getElementById("lightbox");
  var lbImg = document.getElementById("lbImg");
  var current = 0;
  var lastFocus = null;

  function show(i) {
    current = (i + shots.length) % shots.length;
    lbImg.src = shots[current].src;
    lbImg.alt = shots[current].alt;
  }
  function open(i) {
    lastFocus = document.activeElement;
    show(i);
    lb.hidden = false;
    document.body.style.overflow = "hidden";
    lb.querySelector(".lb-close").focus();
  }
  function close() {
    lb.hidden = true;
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }

  shots.forEach(function (img, i) {
    img.parentElement.addEventListener("click", function () { open(i); });
  });
  lb.querySelector(".lb-close").addEventListener("click", close);
  lb.querySelector(".lb-prev").addEventListener("click", function () { show(current - 1); });
  lb.querySelector(".lb-next").addEventListener("click", function () { show(current + 1); });
  lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
  document.addEventListener("keydown", function (e) {
    if (lb.hidden) return;
    if (e.key === "Escape") close();
    else if (e.key === "ArrowLeft") show(current - 1);
    else if (e.key === "ArrowRight") show(current + 1);
  });
})();
