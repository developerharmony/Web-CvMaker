import { initializeTheme } from "./theme.js";
import { initializeMobileMenu } from "./mobileMenu.js";
import { initializeForm } from "./form.js";
import { initializeEducation } from "./education.js";
import { initializeExperience } from "./experience.js";
import { initializeOptionalSections } from "./optionalSections.js";
import { initializeCustomization } from "./customization.js";
import { initializePhoto } from "./photo.js";
import { initializeModals } from "./modals.js";

document.addEventListener("DOMContentLoaded", () => {
  try {
    initializeTheme();
    initializeMobileMenu();
    initializeForm();
    initializeEducation();
    initializeExperience();
    initializeOptionalSections();
    initializeCustomization();
    initializePhoto();
    initializeModals();
  } catch (error) {
    console.error("Initialization failed:", error);
  }
});

function showErrorToast(message) {
  const toast = document.getElementById("error-toast");
  if (toast) {
    toast.textContent = message;
    toast.classList.remove("hidden");
    setTimeout(() => toast.classList.add("hidden"), 3000);
  } else {
    alert(message);
  }
}

export { showErrorToast };
