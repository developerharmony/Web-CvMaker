import { showErrorToast } from "./script.js";

export function initializeEducation() {
  const addEducationBtn = document.getElementById("add-education-btn");
  const educationItems = document.getElementById("education-items");
  const previewEducationItems = document.getElementById(
    "preview-education-items"
  );
  const previewEducationItems2 = document.getElementById(
    "preview-education-items-2"
  );
  let educationCounter = 1;

  if (
    !addEducationBtn ||
    !educationItems ||
    !previewEducationItems ||
    !previewEducationItems2
  ) {
    throw new Error("Eğitim bileşenleri bulunamadı.");
  }

  function addEducationItem(data = {}) {
    educationCounter++;
    const educationItem = document.createElement("div");
    educationItem.className =
      "education-item border border-gray-200 dark:border-gray-700 rounded-lg p-4";
    educationItem.innerHTML = `
      <div class="flex justify-between items-start mb-3">
        <h3 class="font-medium">Eğitim #${educationCounter}</h3>
        <div class="flex space-x-2">
          <button class="p-1.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors education-delete-btn">
            <i class="ri-delete-bin-line"></i>
          </button>
        </div>
      </div>
      <div class="space-y-3">
        <div>
          <label class="block text-sm font-medium mb-1">Okul Adı</label>
          <input type="text" class="education-school w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="İstanbul Üniversitesi" value="${
            data.school || ""
          }" required>
          <p class="education-school-error text-red-500 text-xs mt-1 hidden">Okul adı zorunludur.</p>
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Bölüm</label>
          <input type="text" class="education-degree w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Bilgisayar Mühendisliği" value="${
            data.degree || ""
          }" required>
          <p class="education-degree-error text-red-500 text-xs mt-1 hidden">Bölüm alanı zorunludur.</p>
        </div>
        <div class="flex flex-col sm:flex-row gap-3">
          <div class="w-full sm:w-1/2">
            <label class="block text-sm font-medium mb-1">Başlangıç Tarihi</label>
            <input type="month" class="education-start w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50" value="${
              data.startDate || ""
            }" required>
            <p class="education-start-error text-red-500 text-xs mt-1 hidden">Başlangıç tarihi zorunludur.</p>
          </div>
          <div class="w-full sm:w-1/2">
            <label class="block text-sm font-medium mb-1">Bitiş Tarihi</label>
            <input type="month" class="education-end w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50" value="${
              data.endDate || ""
            }">
            <p class="education-end-error text-red-500 text-xs mt-1 hidden">Bitiş tarihi, başlangıç tarihinden önce olamaz.</p>
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Açıklama</label>
          <textarea class="education-description w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50" rows="2" placeholder="Eğitiminiz hakkında kısa bir açıklama...">${
            data.description || ""
          }</textarea>
        </div>
      </div>
    `;
    educationItems.appendChild(educationItem);

    const deleteBtn = educationItem.querySelector(".education-delete-btn");
    deleteBtn.addEventListener("click", () => {
      educationItem.remove();
      updateEducationPreview();
    });

    const inputs = educationItem.querySelectorAll("input, textarea");
    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        validateEducationItem(educationItem);
        updateEducationPreview();
      });
    });
  }

  function validateEducationItem(item) {
    const school = item.querySelector(".education-school");
    const degree = item.querySelector(".education-degree");
    const start = item.querySelector(".education-start");
    const end = item.querySelector(".education-end");
    const schoolError = item.querySelector(".education-school-error");
    const degreeError = item.querySelector(".education-degree-error");
    const startError = item.querySelector(".education-start-error");
    const endError = item.querySelector(".education-end-error");

    let isValid = true;
    if (!school.value.trim()) {
      schoolError.classList.remove("hidden");
      isValid = false;
    } else {
      schoolError.classList.add("hidden");
    }
    if (!degree.value.trim()) {
      degreeError.classList.remove("hidden");
      isValid = false;
    } else {
      degreeError.classList.add("hidden");
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

  function updateEducationPreview() {
    try {
      previewEducationItems.innerHTML = "";
      previewEducationItems2.innerHTML = "";
      document.querySelectorAll(".education-item").forEach((item) => {
        const school = item.querySelector(".education-school").value;
        const degree = item.querySelector(".education-degree").value;
        const startDate = item.querySelector(".education-start").value;
        const endDate = item.querySelector(".education-end").value;
        const description = item.querySelector(".education-description").value;

        if (school || degree) {
          const startYear = startDate ? new Date(startDate).getFullYear() : "";
          const endYear = endDate ? new Date(endDate).getFullYear() : "";
          const dateRange =
            startYear || endYear
              ? `${startYear || ""} - ${endYear || "Devam Ediyor"}`
              : "";

          const previewItem = document.createElement("div");
          previewItem.className = "mb-3";
          previewItem.innerHTML = `
            <div class="flex justify-between mb-1">
              <h3 class="font-medium">${school || "Okul Adı"}</h3>
              <span class="text-sm text-gray-600 dark:text-gray-400">${dateRange}</span>
            </div>
            <p class="text-sm mb-1">${degree || "Bölüm"}</p>
            ${
              description
                ? `<p class="text-xs text-gray-600 dark:text-gray-400">${description}</p>`
                : ""
            }
          `;
          previewEducationItems.appendChild(previewItem);
          previewEducationItems2.appendChild(previewItem.cloneNode(true));
        }
      });
    } catch (error) {
      console.error("Eğitim önizleme hatası:", error);
      showErrorToast("Eğitim bilgileri güncellenirken bir hata oluştu.");
    }
  }

  addEducationBtn.addEventListener("click", () => {
    try {
      addEducationItem();
      updateEducationPreview();
    } catch (error) {
      console.error("Eğitim ekleme hatası:", error);
      showErrorToast("Eğitim eklenirken bir hata oluştu.");
    }
  });

  document.querySelectorAll(".education-delete-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      try {
        btn.closest(".education-item").remove();
        updateEducationPreview();
      } catch (error) {
        console.error("Eğitim silme hatası:", error);
        showErrorToast("Eğitim silinirken bir hata oluştu.");
      }
    });
  });

  document
    .querySelectorAll(".education-item input, .education-item textarea")
    .forEach((input) => {
      input.addEventListener("input", () => {
        try {
          validateEducationItem(input.closest(".education-item"));
          updateEducationPreview();
        } catch (error) {
          console.error("Eğitim giriş hatası:", error);
          showErrorToast("Eğitim bilgileri güncellenirken bir hata oluştu.");
        }
      });
    });
}
