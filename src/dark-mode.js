// force dark mode on body element due to flickering when reloading the page
// https://stackoverflow.com/questions/62635314/how-to-stop-light-mode-flickering-to-darker-background-on-page-load
document.documentElement.setAttribute("data-bs-theme", "");

// Automatic bs dark mode
const storedTheme = localStorage.getItem("theme");

const getPreferredTheme = () => {
  if (storedTheme) {
    return storedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const setTheme = function (theme) {
  if (
    theme === "auto" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    document.body.setAttribute("data-bs-theme", "dark");
  } else {
    document.body.setAttribute("data-bs-theme", theme);
  }
};

setTheme(getPreferredTheme());

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", () => {
    console.log(storedTheme);
    if (storedTheme !== "light" || storedTheme !== "dark") {
      setTheme(getPreferredTheme());
    }
  });

window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-bs-theme-value]").forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const theme = toggle.getAttribute("data-bs-theme-value");
      localStorage.setItem("theme", theme);
      setTheme(theme);
    });
  });
});
