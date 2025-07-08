import { showErrorToast } from "./script.js";

export function initializeMobileMenu() {
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  if (!mobileMenuBtn || !mobileMenu) {
    throw new Error("Mobil menü bileşenleri bulunamadı.");
  }

  mobileMenuBtn.addEventListener("click", () => {
    try {
      mobileMenu.classList.toggle("hidden");
    } catch (error) {
      console.error("Mobil menü açma/kapama hatası:", error);
      showErrorToast("Mobil menü açılırken bir hata oluştu.");
    }
  });
}
