import { showErrorToast } from "./script.js";

export function initializeForm() {
  const inputs = {
    firstName: document.getElementById("firstName"),
    lastName: document.getElementById("lastName"),
    title: document.getElementById("title"),
    summary: document.getElementById("summary"),
    email: document.getElementById("email"),
    phone: document.getElementById("phone"),
    address: document.getElementById("address"),
    website: document.getElementById("website"),
    linkedin: document.getElementById("linkedin"),
  };

  const previews = {
    name: document.getElementById("preview-name"),
    title: document.getElementById("preview-title"),
    summary: document.getElementById("preview-summary"),
    email: document.getElementById("preview-email"),
    phone: document.getElementById("preview-phone"),
    address: document.getElementById("preview-address"),
    website: document.getElementById("preview-website"),
    linkedin: document.getElementById("preview-linkedin"),
    name2: document.getElementById("preview-name-2"),
    title2: document.getElementById("preview-title-2"),
    summary2: document.getElementById("preview-summary-2"),
    email2: document.getElementById("preview-email-2"),
    phone2: document.getElementById("preview-phone-2"),
    address2: document.getElementById("preview-address-2"),
    website2: document.getElementById("preview-website-2"),
    linkedin2: document.getElementById("preview-linkedin-2"),
  };

  const errors = {
    firstName: document.getElementById("firstName-error"),
    lastName: document.getElementById("lastName-error"),
    title: document.getElementById("title-error"),
    summary: document.getElementById("summary-error"),
    email: document.getElementById("email-error"),
    phone: document.getElementById("phone-error"),
    address: document.getElementById("address-error"),
  };

  if (
    Object.values(inputs).some((el) => !el) ||
    Object.values(previews).some((el) => !el) ||
    Object.values(errors).some((el) => !el)
  ) {
    throw new Error("Form veya önizleme bileşenleri bulunamadı.");
  }

  function validateInput(input, errorElement, errorMessage) {
    if (!input.value.trim()) {
      errorElement.textContent = errorMessage;
      errorElement.classList.remove("hidden");
      return false;
    } else {
      errorElement.classList.add("hidden");
      return true;
    }
  }

  function validateEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (inputs.email.value && !emailRegex.test(inputs.email.value)) {
      errors.email.textContent = "Geçerli bir e-posta adresi girin.";
      errors.email.classList.remove("hidden");
      return false;
    } else {
      errors.email.classList.add("hidden");
      return true;
    }
  }

  function validatePhone() {
    inputs.phone.value = inputs.phone.value.replace(/[^0-9]/g, "");
    if (inputs.phone.value.length > 15) {
      inputs.phone.value = inputs.phone.value.slice(0, 15);
      errors.phone.textContent =
        "Telefon numarası 15 karakterden fazla olamaz.";
      errors.phone.classList.remove("hidden");
      return false;
    } else if (inputs.phone.value && inputs.phone.value.length < 10) {
      errors.phone.textContent = "Telefon numarası en az 10 rakam olmalı.";
      errors.phone.classList.remove("hidden");
      return false;
    } else {
      errors.phone.classList.add("hidden");
      return true;
    }
  }

  function updatePreview() {
    try {
      const firstName = inputs.firstName.value || "";
      const lastName = inputs.lastName.value || "";
      const fullName = (firstName + " " + lastName).trim() || "Ad Soyad";
      previews.name.textContent = fullName;
      previews.title.textContent = inputs.title.value || "Ünvan";
      previews.summary.textContent =
        inputs.summary.value || "Özet bilgiler burada görünecek.";
      previews.email.textContent = inputs.email.value || "ornek@email.com";
      previews.phone.textContent = inputs.phone.value || "+90 555 123 4567";
      previews.address.textContent =
        inputs.address.value || "İstanbul, Türkiye";
      previews.website.textContent = inputs.website.value || "www.website.com";
      previews.linkedin.textContent =
        inputs.linkedin.value || "linkedin.com/in/kullaniciadi";

      previews.name2.textContent = fullName;
      previews.title2.textContent = inputs.title.value || "Ünvan";
      previews.summary2.textContent =
        inputs.summary.value || "Özet bilgiler burada görünecek.";
      previews.email2.textContent = inputs.email.value || "ornek@email.com";
      previews.phone2.textContent = inputs.phone.value || "+90 555 123 4567";
      previews.address2.textContent =
        inputs.address.value || "İstanbul, Türkiye";
      previews.website2.textContent = inputs.website.value || "www.website.com";
      previews.linkedin2.textContent =
        inputs.linkedin.value || "linkedin.com/in/kullaniciadi";
    } catch (error) {
      console.error("Önizleme güncelleme hatası:", error);
      showErrorToast("Önizleme güncellenirken bir hata oluştu.");
    }
  }

  inputs.email.addEventListener("input", () => {
    validateEmail();
    updatePreview();
  });

  inputs.phone.addEventListener("input", () => {
    validatePhone();
    updatePreview();
  });

  Object.values(inputs).forEach((input) => {
    input.addEventListener("input", () => {
      if (input.id === "firstName")
        validateInput(input, errors.firstName, "Ad alanı zorunludur.");
      if (input.id === "lastName")
        validateInput(input, errors.lastName, "Soyad alanı zorunludur.");
      if (input.id === "title")
        validateInput(input, errors.title, "Ünvan alanı zorunludur.");
      if (input.id === "summary")
        validateInput(input, errors.summary, "Özet alanı zorunludur.");
      if (input.id === "address")
        validateInput(input, errors.address, "Adres alanı zorunludur.");
      updatePreview();
    });
  });

  updatePreview();
}
