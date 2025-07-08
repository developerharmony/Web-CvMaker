import { showErrorToast } from "./script.js";

export function initializeExperience() {
  const addExperienceBtn = document.getElementById("add-experience-btn");
  const experienceItems = document.getElementById("experience-items");
  const previewExperienceItems = document.getElementById(
    "preview-experience-items"
  );
  const previewExperienceItems2 = document.getElementById(
    "preview-experience-items-2"
  );
  let experienceCounter = 1;

  if (
    !addExperienceBtn ||
    !experienceItems ||
    !previewExperienceItems ||
    !previewExperienceItems2
  ) {
    throw new Error("İş deneyimi bileşenleri bulunamadı.");
  }

  function addExperienceItem(data = {}) {
    experienceCounter++;
    const experienceItem = document.createElement("div");
    experienceItem.className =
      "experience-item border border-gray-200 dark:border-gray-700 rounded-lg p-4";
    experienceItem.innerHTML = `
      <div class="flex justify-between items-start mb-3">
        <h3 class="font-medium">Deneyim #${experienceCounter}</h3>
        <div class="flex space-x-2">
          <button class="p-1.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors experience-delete-btn">
            <i class="ri-delete-bin-line"></i>
          </button>
        </div>
      </div>
      <div class="space-y-3">
        <div>
          <label class="block text-sm font-medium mb-1">Şirket Adı</label>
          <input type="text" class="experience-company w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="ABC Teknoloji" value="${
            data.company || ""
          }" required>
          <p class="experience-company-error text-red-500 text-xs mt-1 hidden">Şirket adı zorunludur.</p>
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Pozisyon</label>
          <input type="text" class="experience-position w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Kıdemli Yazılım Geliştirici" value="${
            data.position || ""
          }" required>
          <p class="experience-position-error text-red-500 text-xs mt-1 hidden">Pozisyon alanı zorunludur.</p>
        </div>
        <div class="flex flex-col sm:flex-row gap-3">
          <div class="w-full sm:w-1/2">
            <label class="block text-sm font-medium mb-1">Başlangıç Tarihi</label>
            <input type="month" class="experience-start w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50" value="${
              data.startDate || ""
            }" required>
            <p class="experience-start-error text-red-500 text-xs mt-1 hidden">Başlangıç tarihi zorunludur.</p>
          </div>
          <div class="w-full sm:w-1/2">
            <label class="block text-sm font-medium mb-1">Bitiş Tarihi</label>
            <input type="month" class="experience-end w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50" ${
              data.current ? "disabled" : ""
            } value="${data.endDate || ""}">
            <p class="experience-end-error text-red-500 text-xs mt-1 hidden">Bitiş tarihi, başlangıç tarihinden önce olamaz.</p>
          </div>
        </div>
        <div>
          <label class="custom-checkbox">
            <input type="checkbox" class="experience-current" ${
              data.current ? "checked" : ""
            }>
            <span class="checkmark"></span>
            Şu anda burada çalışıyorum
          </label>
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Açıklama</label>
          <textarea class="experience-description w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50" rows="3" placeholder="İş sorumluluklarınız ve başarılarınız...">${
            data.description || ""
          }</textarea>
        </div>
      </div>
    `;
    experienceItems.appendChild(experienceItem);

    const deleteBtn = experienceItem.querySelector(".experience-delete-btn");
    deleteBtn.addEventListener("click", () => {
      experienceItem.remove();
      updateExperiencePreview();
    });

    const inputs = experienceItem.querySelectorAll("input, textarea");
    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        validateExperienceItem(experienceItem);
        updateExperiencePreview();
      });
    });

    const currentCheckbox = experienceItem.querySelector(".experience-current");
    const endDateInput = experienceItem.querySelector(".experience-end");
    currentCheckbox.addEventListener("change", () => {
      if (currentCheckbox.checked) {
        endDateInput.disabled = true;
        endDateInput.value = "";
      } else {
        endDateInput.disabled = false;
      }
      updateExperiencePreview();
    });
  }

  function validateExperienceItem(item) {
    const company = item.querySelector(".experience-company");
    const position = item.querySelector(".experience-position");
    const start = item.querySelector(".experience-start");
    const end = item.querySelector(".experience-end");
    const companyError = item.querySelector(".experience-company-error");
    const positionError = item.querySelector(".experience-position-error");
    const startError = item.querySelector(".experience-start-error");
    const endError = item.querySelector(".experience-end-error");

    let isValid = true;
    if (!company.value.trim()) {
      companyError.classList.remove("hidden");
      isValid = false;
    } else {
      companyError.classList.add("hidden");
    }
    if (!position.value.trim()) {
      positionError.classList.remove("hidden");
      isValid = false;
    } else {
      positionError.classList.add("hidden");
    }
    if (!start.value) {
      startError.classList.remove("hidden");
      isValid = false;
    } else {
      startError.classList.add("hidden");
    }
    if (
      end.value &&
      start.value &&
      new Date(end.value) < new Date(start.value)
    ) {
      endError.classList.remove("hidden");
      isValid = false;
    } else {
      endError.classList.add("hidden");
    }
    return isValid;
  }

  function updateExperiencePreview() {
    try {
      previewExperienceItems.innerHTML = "";
      previewExperienceItems2.innerHTML = "";
      document.querySelectorAll(".experience-item").forEach((item) => {
        const company = item.querySelector(".experience-company").value;
        const position = item.querySelector(".experience-position").value;
        const startDate = item.querySelector(".experience-start").value;
        const endDate = item.querySelector(".experience-end").value;
        const current = item.querySelector(".experience-current").checked;
        const description = item.querySelector(".experience-description").value;

        if (company || position) {
          const startYear = startDate ? new Date(startDate).getFullYear() : "";
          const endYear = current
            ? "Günümüz"
            : endDate
            ? new Date(endDate).getFullYear()
            : "";
          const dateRange =
            startYear || endYear
              ? `${startYear || ""} - ${endYear || "Devam Ediyor"}`
              : "";

          const previewItem = document.createElement("div");
          previewItem.className = "mb-4";
          previewItem.innerHTML = `
            <div class="flex justify-between mb-1">
              <h3 class="font-medium">${position || "Pozisyon"}</h3>
              <span class="text-sm text-gray-600 dark:text-gray-400">${dateRange}</span>
            </div>
            <p class="text-sm mb-1">${company || "Şirket Adı"}</p>
            ${
              description
                ? `<p class="text-xs text-gray-600 dark:text-gray-400">${description}</p>`
                : ""
            }
          `;
          previewExperienceItems.appendChild(previewItem);
          previewExperienceItems2.appendChild(previewItem.cloneNode(true));
        }
      });
    } catch (error) {
      console.error("Deneyim önizleme hatası:", error);
      showErrorToast("Deneyim bilgileri güncellenirken bir hata oluştu.");
    }
  }

  addExperienceBtn.addEventListener("click", () => {
    try {
      addExperienceItem();
      updateExperiencePreview();
    } catch (error) {
      console.error("Deneyim ekleme hatası:", error);
      showErrorToast("Deneyim eklenirken bir hata oluştu.");
    }
  });

  document.querySelectorAll(".experience-delete-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      try {
        btn.closest(".experience-item").remove();
        updateExperiencePreview();
      } catch (error) {
        console.error("Deneyim silme hatası:", error);
        showErrorToast("Deneyim silinirken bir hata oluştu.");
      }
    });
  });

  document
    .querySelectorAll(".experience-item input, .experience-item textarea")
    .forEach((input) => {
      input.addEventListener("input", () => {
        try {
          validateExperienceItem(input.closest(".experience-item"));
          updateExperiencePreview();
        } catch (error) {
          console.error("Deneyim giriş hatası:", error);
          showErrorToast("Deneyim bilgileri güncellenirken bir hata oluştu.");
        }
      });
    });

  document.querySelectorAll(".experience-current").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      try {
        const endDateInput = checkbox
          .closest(".experience-item")
          .querySelector(".experience-end");
        if (checkbox.checked) {
          endDateInput.disabled = true;
          endDateInput.value = "";
        } else {
          endDateInput.disabled = false;
        }
        updateExperiencePreview();
      } catch (error) {
        console.error("Mevcut iş durumu hatası:", error);
        showErrorToast("Mevcut iş durumu güncellenirken bir hata oluştu.");
      }
    });
  });
}
