const menuBtn = document.getElementById("menu-btn") as HTMLButtonElement | null;
const mobileMenu = document.getElementById(
  "mobile-menu"
) as HTMLDivElement | null;

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });
}
