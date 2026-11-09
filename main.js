// Returns a price as text, e.g. 480 -> "$480"
function formatPrice(amount) {
  return "$" + amount.toLocaleString("en-US");
}

// Saves any value in localStorage (as JSON).
// try/catch: storage can be blocked in private mode.
function saveData(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn("Could not save data:", key);
  }
}

// Reads a value from localStorage and returns it,
// or returns the fallback value if nothing is saved.

  function loadData(key, fallback) {
    try {
      const saved = localStorage.getItem(key);
      if (saved === null) {
        return fallback;
      }
      const data = JSON.parse(saved);
      if (Array.isArray(fallback)) {
        return Array.isArray(data) ? data : fallback;
      }
      if (typeof fallback === "string") {
        return typeof data === "string" ? data : fallback;
      }
      return data ?? fallback;
    } catch (error) {
      return fallback;
    }
  }


// Shows a short notification at the bottom of the screen
function showToast(text) {
  let toast = document.querySelector("#toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast-message";
    toast.setAttribute("role", "status");
    document.body.appendChild(toast);
  }
  toast.textContent = text;
  toast.classList.add("visible");
  clearTimeout(toast.hideTimer);
  toast.hideTimer = setTimeout(function () {
    toast.classList.remove("visible");
  }, 2200);
}

/* Theme switcher */

function applyTheme(theme) {
  const button = document.querySelector("#theme-toggle");
  if (theme === "dark") {
    document.body.classList.add("dark-theme");
  } else {
    document.body.classList.remove("dark-theme");
  }
  if (button) {
    button.textContent = theme === "dark" ? "☀ Light" : "☾ Dark";
    button.setAttribute("aria-pressed", theme === "dark");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // 1. Theme: load the saved choice and react to clicks
  let currentTheme = loadData("nomadica-theme", "light");
  applyTheme(currentTheme);

  const themeButton = document.querySelector("#theme-toggle");
  if (!themeButton) { return; }
  themeButton.addEventListener("click", function () {
    currentTheme = currentTheme === "dark" ? "light" : "dark";
    applyTheme(currentTheme);
    saveData("nomadica-theme", currentTheme);
  });
});



/* jQuery: mobile menu and back-to-top  */

$(document).ready(function () {
  const $nav = $("#main-nav");             // ID selector
  const $menuButton = $("#nav-toggle");

  // Mobile menu: slide the navigation open / closed
  $menuButton.on("click", function () {
    $nav.slideToggle(250);
    const isOpen = $(this).attr("aria-expanded") === "true";
    $(this).attr("aria-expanded", !isOpen).text(isOpen ? "☰ Menu" : "✕ Close");
  });

  // Keyboard: Escape closes the mobile menu
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && $menuButton.attr("aria-expanded") === "true") {
      $menuButton.trigger("click");
    }
  });

  // When the window becomes wide again, remove the inline display style
  $(window).on("resize", function () {
    if (window.innerWidth >= 992) {
      $nav.css("display", "");
      $menuButton.attr("aria-expanded", "false").text("☰ Menu");
    }
  });

  // Back-to-top: only show after the user scrolls down
  const $backTop = $(".back-top");         // class selector
  $backTop.hide();
  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 400) {
      $backTop.fadeIn(200);
    } else {
      $backTop.fadeOut(200);
    }
  });

  // Smooth scroll to the top with animate()
  $backTop.on("click", function (event) {
    event.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, 400);
  });
});
