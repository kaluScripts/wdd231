const menuButton = document.querySelector("#menu");
const navList = document.querySelector("#nav-list");

menuButton.addEventListener("click", () => {
  const isOpen = navList.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", isOpen);
  menuButton.textContent = isOpen ? "\u2715" : "\u2630";
});