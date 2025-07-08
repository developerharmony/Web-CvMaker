import { showErrorToast } from './script.js';

export function initializeOptionalSections() {
  const sections = {
    skills: {
      toggle: document.getElementById('skills-toggle'),
      section: document.getElementById('skills-section'),
      addBtn: document.getElementById('add-skill-btn'),
      items: document.getElementById('skills-items'),
      preview: document.getElementById('preview-skills'),
      previewItems: document.getElementById('preview-skills-items'),
      preview2: document.getElementById('preview-skills-2'),
      previewItems2: document.getElementById('preview-skills-items-2'),
    },
    languages: {
      toggle: document.getElementById('languages-toggle'),
      section: document.getElementById('languages-section'),
      addBtn: document.getElementById('add-language-btn'),
      items: document.getElementById('languages-items'),
      preview: document.getElementById('preview-languages'),
      previewItems: document.getElementById('preview-languages-items'),
      preview2: document.getElementById('preview-languages-2'),
      previewItems2: document.getElementById('preview-languages-items-2'),
    },
    projects: {
      toggle: document.getElementById('projects-toggle'),
      section: document.getElementById('projects-section'),
      addBtn: document.getElementById('add-project-btn'),
      items: document.getElementById('projects-items'),
      preview: document.getElementById('preview-projects'),
      previewItems: document.getElementById('preview-projects-items'),
      preview2: document.getElementById('preview-projects-2'),
      previewItems2: document.getElementById('preview-projects-items-2'),
    },
    references: {
      toggle: document.getElementById('references-toggle'),
      section: document.getElementById('references-section'),
      addBtn: document.getElementById('add-reference-btn'),
      items: document.getElementById('references-items'),
      preview: document.getElementById('preview-references'),
      previewItems: document.getElementById('preview-references-items'),
      preview2: document.getElementById('preview-references-2'),
      previewItems2: document.getElementById('preview-references-items-2'),
    },
    hobbies: {
      toggle: document.getElementById('hobbies-toggle'),
      section: document.getElementById('hobbies-section'),
      addBtn: document.getElementById('add-hobby-btn'),
      items: document.getElementById('hobbies-items'),
      preview: document.getElementById('preview-hobbies'),
      previewItems: document.getElementById('preview-hobbies-items'),
      preview2: document.getElementById('preview-hobbies-2'),
      previewItems2: document.getElementById('preview-hobbies-items-2'),
    },
  };

  let currentSkillStyle = 'bar';

  if (Object.values(sections).some(section => Object.values(section).some(el => !el))) {
    throw new Error('Opsiyonel bölüm bileşenleri bulunamadı.');
  }

  function addSkillItem(data = {}) {
    const skillItem = document.createElement('div');
    skillItem.className = 'skill-item border border-gray-200 dark:border-gray-700 rounded-lg p-4';
    skillItem.innerHTML = `
      <div class="flex justify-between items-center mb-3">
        <div class="flex-grow">
          <input type="text" class="skill-name w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Beceri adı" value="${data.name || ''}">
          <p class="skill-name-error text-red-500 text-xs mt-1 hidden">Beceri adı zorunludur.</p>
        </div>
        <div class="flex items-center ml-3">
          <input type="range" class="skill-level w-24 mr-2" min="0" max="100" step="5" value="${data.level || 50}">
          <span class="skill-level-text text-sm w-10 text-right">${data.level || 50}%</span>
          <button class="p-1.5 ml-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors skill-delete-btn">
            <i class="ri-delete-bin-line"></i>
          </button>
        </div>
      </div>
    `;
    sections.skills.items.appendChild(skillItem);

    const rangeInput = skillItem.querySelector('.skill-level');
    const levelText = skillItem.querySelector('.skill-level-text');
    updateRangeBackground(rangeInput);

    const deleteBtn = skillItem.querySelector('.skill-delete-btn');
    deleteBtn.addEventListener('click', () => {
      skillItem.remove();
      updateSkillsPreview();
    });

    const nameInput = skillItem.querySelector('.skill-name');
    nameInput.addEventListener('input', () => {
      validateSkillItem(skillItem);
      updateSkillsPreview();
    });

    rangeInput.addEventListener('input', () => {
      levelText.textContent = `${rangeInput.value}%`;
      updateRangeBackground(rangeInput);
      updateSkillsPreview();
    });
  }

  function addLanguageItem(data = {}) {
    const languageItem = document.createElement('div');
    languageItem.className = 'language-item border border-gray-200 dark:border-gray-700 rounded-lg p-4';
    languageItem.innerHTML = `
      <div class="flex justify-between items-center mb-3">
        <div class="flex-grow">
          <input type="text" class="language-name w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Dil adı" value="${data.name || ''}">
          <p class="language-name-error text-red-500 text-xs mt-1 hidden">Dil adı zorunludur.</p>
        </div>
        <div class="flex items-center ml-3">
          <input type="range" class="language-level w-24 mr-2" min="0" max="100" step="5" value="${data.level || 50}">
          <span class="language-level-text text-sm w-10 text-right">${data.level || 50}%</span>
          <button class="p-1.5 ml-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors language-delete-btn">
            <i class="ri-delete-bin-line"></i>
          </button>
        </div>
      </div>
    `;
    sections.languages.items.appendChild(languageItem);

    const rangeInput = languageItem.querySelector('.language-level');
    const levelText = languageItem.querySelector('.language-level-text');
    updateRangeBackground(rangeInput);

    const deleteBtn = languageItem.querySelector('.language-delete-btn');
    deleteBtn.addEventListener('click', () => {
      languageItem.remove();
      updateLanguagesPreview();
    });

    const nameInput = languageItem.querySelector('.language-name');
    nameInput.addEventListener('input', () => {
      validateLanguageItem(languageItem);
      updateLanguagesPreview();
    });

    rangeInput.addEventListener('input', () => {
      levelText.textContent = `${rangeInput.value}%`;
      updateRangeBackground(rangeInput);
      updateLanguagesPreview();
    });
  }

  function addProjectItem(data = {}) {
    const projectItem = document.createElement('div');
    projectItem.className = 'project-item border border-gray-200 dark:border-gray-700 rounded-lg p-4';
    projectItem.innerHTML = `
      <div class="flex justify-between items-start mb-3">
        <div class="flex-grow">
          <input type="text" class="project-name w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Proje adı" value="${data.name || ''}">
          <p class="project-name-error text-red-500 text-xs mt-1 hidden">Proje adı zorunludur.</p>
        </div>
        <button class="p-1.5 ml-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors project-delete-btn">
          <i class="ri-delete-bin-line"></i>
        </button>
      </div>
      <div class="space-y-3">
        <div>
          <input type="text" class="project-link w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Proje linki (opsiyonel)" value="${data.link || ''}">
        </div>
        <div>
          <textarea class="project-description w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50" rows="2" placeholder="Proje açıklaması...">${data.description || ''}</textarea>
        </div>
      </div>
    `;
    sections.projects.items.appendChild(projectItem);

    const deleteBtn = projectItem.querySelector('.project-delete-btn');
    deleteBtn.addEventListener('click', () => {
      projectItem.remove();
      updateProjectsPreview();
    });

    const inputs = projectItem.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        validateProjectItem(projectItem);
        updateProjectsPreview();
      });
    });
  }

  function addReferenceItem(data = {}) {
    const referenceItem = document.createElement('div');
    referenceItem.className = 'reference-item border border-gray-200 dark:border-gray-700 rounded-lg p-4';
    referenceItem.innerHTML = `
      <div class="flex justify-between items-start mb-3">
        <div class="flex-grow">
          <input type="text" class="reference-name w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Referans adı" value="${data.name || ''}">
          <p class="reference-name-error text-red-500 text-xs mt-1 hidden">Referans adı zorunludur.</p>
        </div>
        <button class="p-1.5 ml-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors reference-delete-btn">
          <i class="ri-delete-bin-line"></i>
        </button>
      </div>
      <div class="space-y-3">
        <div>
          <input type="text" class="reference-position w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Pozisyon" value="${data.position || ''}">
        </div>
        <div>
          <input type="text" class="reference-company w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Şirket" value="${data.company || ''}">
        </div>
        <div>
          <input type="email" class="reference-email w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="E-posta" value="${data.email || ''}">
          <p class="reference-email-error text-red-500 text-xs mt-1 hidden">Geçerli bir e-posta adresi girin.</p>
        </div>
        <div>
          <input type="tel" class="reference-phone w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Telefon" value="${data.phone || ''}">
          <p class="reference-name-error text-red-500 text-xs mt-1 hidden">Referans numarası zorunludur.</p>
          </div>
      </div>
    `;
    sections.references.items.appendChild(referenceItem);

    const deleteBtn = referenceItem.querySelector('.reference-delete-btn');
    deleteBtn.addEventListener('click', () => {
      referenceItem.remove();
      updateReferencesPreview();
    });

    const inputs = referenceItem.querySelectorAll('input');
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        validateReferenceItem(referenceItem);
        updateReferencesPreview();
      });
    });
  }

  function addHobbyItem(data = {}) {
    const hobbyItem = document.createElement('div');
    hobbyItem.className = 'hobby-item border border-gray-200 dark:border-gray-700 rounded-lg p-4';
    hobbyItem.innerHTML = `
      <div class="flex justify-between items-center">
        <div class="flex-grow">
          <input type="text" class="hobby-name w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Hobi adı" value="${data.name || ''}">
          <p class="hobby-name-error text-red-500 text-xs mt-1 hidden">Hobi adı zorunludur.</p>
        </div>
        <button class="p-1.5 ml-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors hobby-delete-btn">
          <i class="ri-delete-bin-line"></i>
        </button>
      </div>
    `;
    sections.hobbies.items.appendChild(hobbyItem);

    const deleteBtn = hobbyItem.querySelector('.hobby-delete-btn');
    deleteBtn.addEventListener('click', () => {
      hobbyItem.remove();
      updateHobbiesPreview();
    });

    const nameInput = hobbyItem.querySelector('.hobby-name');
    nameInput.addEventListener('input', () => {
      validateHobbyItem(hobbyItem);
      updateHobbiesPreview();
    });
  }

  function validateSkillItem(item) {
    const name = item.querySelector('.skill-name');
    const error = item.querySelector('.skill-name-error');
    if (!name.value.trim()) {
      error.classList.remove('hidden');
      return false;
    } else {
      error.classList.add('hidden');
      return true;
    }
  }

  function validateLanguageItem(item) {
    const name = item.querySelector('.language-name');
    const error = item.querySelector('.language-name-error');
    if (!name.value.trim()) {
      error.classList.remove('hidden');
      return false;
    } else {
      error.classList.add('hidden');
      return true;
    }
  }

  function validateProjectItem(item) {
    const name = item.querySelector('.project-name');
    const error = item.querySelector('.project-name-error');
    if (!name.value.trim()) {
      error.classList.remove('hidden');
      return false;
    } else {
      error.classList.add('hidden');
      return true;
    }
  }

  function validateReferenceItem(item) {
    const name = item.querySelector('.reference-name');
    const email = item.querySelector('.reference-email');
    const nameError = item.querySelector('.reference-name-error');
    const emailError = item.querySelector('.reference-email-error');
    let isValid = true;

    if (!name.value.trim()) {
      nameError.classList.remove('hidden');
      isValid = false;
    } else {
      nameError.classList.add('hidden');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.value && !emailRegex.test(email.value)) {
      emailError.classList.remove('hidden');
      isValid = false;
    } else {
      emailError.classList.add('hidden');
    }

    return isValid;
  }

  function validateHobbyItem(item) {
    const name = item.querySelector('.hobby-name');
    const error = item.querySelector('.hobby-name-error');
    if (!name.value.trim()) {
      error.classList.remove('hidden');
      return false;
    } else {
      error.classList.add('hidden');
      return true;
    }
  }

  function updateRangeBackground(rangeInput) {
    const value = ((rangeInput.value - rangeInput.min) / (rangeInput.max - rangeInput.min)) * 100;
    rangeInput.style.backgroundImage = `linear-gradient(to right, #4F46E5 0%, #4F46E5 ${value}%, #e5e7eb ${value}%, #e5e7eb 100%)`;
  }

  function getStarsHTML(level) {
    const stars = Math.round(level / 20);
    let html = '';
    for (let i = 0; i < 5; i++) {
      html += i < stars ? '<i class="ri-star-fill active"></i>' : '<i class="ri-star-fill"></i>';
    }
    return html;
  }

  function getDotsHTML(level) {
    const dots = Math.round(level / 20);
    let html = '';
    for (let i = 0; i < 5; i++) {
      html += i < dots ? '<span class="active"></span>' : '<span></span>';
    }
    return html;
  }

  function getLevelText(level) {
    if (level < 20) return 'Başlangıç';
    if (level < 40) return 'Temel';
    if (level < 60) return 'Orta';
    if (level < 80) return 'İyi';
    return 'İleri';
  }

  function updateSkillsPreview() {
    try {
      sections.skills.previewItems.innerHTML = '';
      sections.skills.previewItems2.innerHTML = '';
      document.querySelectorAll('.skill-item').forEach(item => {
        const name = item.querySelector('.skill-name').value;
        const level = item.querySelector('.skill-level').value;
        if (name) {
          const previewItem = document.createElement('div');
          previewItem.className = 'mb-2';
          if (currentSkillStyle === 'bar') {
            previewItem.innerHTML = `
              <div class="flex justify-between text-sm mb-1">
                <span class="skill-name">${name}</span>
                <span>${level}%</span>
              </div>
              <div class="skill-bar">
                <div class="skill-progress" style="width: ${level}%;"></div>
              </div>
            `;
          } else if (currentSkillStyle === 'stars') {
            const stars = getStarsHTML(level);
            previewItem.innerHTML = `
              <div class="flex justify-between text-sm">
                <span class="skill-name">${name}</span>
                <span class="skill-stars">${stars}</span>
              </div>
            `;
          } else if (currentSkillStyle === 'dots') {
            const dots = getDotsHTML(level);
            previewItem.innerHTML = `
              <div class="flex justify-between text-sm">
                <span class="skill-name">${name}</span>
                <span class="skill-dots">${dots}</span>
              </div>
            `;
          } else if (currentSkillStyle === 'text') {
            const levelText = getLevelText(level);
            previewItem.innerHTML = `
              <div class="flex justify-between text-sm">
                <span class="skill-name">${name}</span>
                <span>${levelText}</span>
              </div>
            `;
          }
          sections.skills.previewItems.appendChild(previewItem);
          sections.skills.previewItems2.appendChild(previewItem.cloneNode(true));
        }
      });
    } catch (error) {
      console.error('Beceri önizleme hatası:', error);
      showErrorToast('Beceri bilgileri güncellenirken bir hata oluştu.');
    }
  }

  function updateLanguagesPreview() {
    try {
      sections.languages.previewItems.innerHTML = '';
      sections.languages.previewItems2.innerHTML = '';
      document.querySelectorAll('.language-item').forEach(item => {
        const name = item.querySelector('.language-name').value;
        const level = item.querySelector('.language-level').value;
        if (name) {
          const previewItem = document.createElement('div');
          previewItem.className = 'mb-2';
          if (currentSkillStyle === 'bar') {
            previewItem.innerHTML = `
              <div class="flex justify-between text-sm mb-1">
                <span class="language-name">${name}</span>
                <span>${level}%</span>
              </div>
              <div class="skill-bar">
                <div class="skill-progress" style="width: ${level}%;"></div>
              </div>
            `;
          } else if (currentSkillStyle === 'stars') {
            const stars = getStarsHTML(level);
            previewItem.innerHTML = `
              <div class="flex justify-between text-sm">
                <span class="language-name">${name}</span>
                <span class="skill-stars">${stars}</span>
              </div>
            `;
          } else if (currentSkillStyle === 'dots') {
            const dots = getDotsHTML(level);
            previewItem.innerHTML = `
              <div class="flex justify-between text-sm">
                <span class="language-name">${name}</span>
                <span class="skill-dots">${dots}</span>
              </div>
            `;
          } else if (currentSkillStyle === 'text') {
            const levelText = getLevelText(level);
            previewItem.innerHTML = `
              <div class="flex justify-between text-sm">
                <span class="language-name">${name}</span>
                <span>${levelText}</span>
              </div>
            `;
          }
          sections.languages.previewItems.appendChild(previewItem);
          sections.languages.previewItems2.appendChild(previewItem.cloneNode(true));
        }
      });
    } catch (error) {
      console.error('Dil önizleme hatası:', error);
      showErrorToast('Dil bilgileri güncellenirken bir hata oluştu.');
    }
  }

  function updateProjectsPreview() {
    try {
      sections.projects.previewItems.innerHTML = '';
      sections.projects.previewItems2.innerHTML = '';
      document.querySelectorAll('.project-item').forEach(item => {
        const name = item.querySelector('.project-name').value;
        const link = item.querySelector('.project-link').value;
        const description = item.querySelector('.project-description').value;
        if (name) {
          const previewItem = document.createElement('div');
          previewItem.className = 'mb-3';
          previewItem.innerHTML = `
            <div class="flex items-center mb-1">
              <h3 class="font-medium">${name}</h3>
              ${link ? `<a href="${link}" target="_blank" class="ml-2 text-primary"><i class="ri-external-link-line"></i></a>` : ''}
            </div>
            ${description ? `<p class="text-xs text-gray-600 dark:text-gray-400">${description}</p>` : ''}
          `;
          sections.projects.previewItems.appendChild(previewItem);
          sections.projects.previewItems2.appendChild(previewItem.cloneNode(true));
        }
      });
    } catch (error) {
      console.error('Proje önizleme hatası:', error);
      showErrorToast('Proje bilgileri güncellenirken bir hata oluştu.');
    }
  }

  function updateReferencesPreview() {
    try {
      sections.references.previewItems.innerHTML = '';
      sections.references.previewItems2.innerHTML = '';
      document.querySelectorAll('.reference-item').forEach(item => {
        const name = item.querySelector('.reference-name').value;
        const position = item.querySelector('.reference-position').value;
        const company = item.querySelector('.reference-company').value;
        const email = item.querySelector('.reference-email').value;
        const phone = item.querySelector('.reference-phone').value;
        if (name) {
          const previewItem = document.createElement('div');
          previewItem.className = 'p-3 border border-gray-200 dark:border-gray-700 rounded-lg';
          previewItem.innerHTML = `
            <h3 class="font-medium mb-1">${name}</h3>
            ${position ? `<p class="text-sm">${position}</p>` : ''}
            ${company ? `<p class="text-sm">${company}</p>` : ''}
            <div class="mt-2 text-xs text-gray-600 dark:text-gray-400">
              ${email ? `<div class="flex items-center"><i class="ri-mail-line mr-1"></i> <span class="reference-email">${email}</span></div>` : ''}
              ${phone ? `<div class="flex items-center"><i class="ri-phone-line mr-1"></i> ${phone}</div>` : ''}
            </div>
          `;
          sections.references.previewItems.appendChild(previewItem);
          sections.references.previewItems2.appendChild(previewItem.cloneNode(true));
        }
      });
    } catch (error) {
      console.error('Referans önizleme hatası:', error);
      showErrorToast('Referans bilgileri güncellenirken bir hata oluştu.');
    }
  }

  function updateHobbiesPreview() {
    try {
      sections.hobbies.previewItems.innerHTML = '';
      sections.hobbies.previewItems2.innerHTML = '';
      document.querySelectorAll('.hobby-item').forEach(item => {
        const name = item.querySelector('.hobby-name').value;
        if (name) {
          const previewItem = document.createElement('span');
          previewItem.className = 'inline-block px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm';
          previewItem.textContent = name;
          sections.hobbies.previewItems.appendChild(previewItem);
          sections.hobbies.previewItems2.appendChild(previewItem.cloneNode(true));
        }
      });
    } catch (error) {
      console.error('Hobi önizleme hatası:', error);
      showErrorToast('Hobi bilgileri güncellenirken bir hata oluştu.');
    }
  }

  sections.skills.toggle.addEventListener('change', () => {
    try {
      if (sections.skills.toggle.checked) {
        sections.skills.section.classList.remove('hidden');
        sections.skills.addBtn.disabled = false;
        sections.skills.preview.classList.remove('hidden');
        sections.skills.preview2.classList.remove('hidden');
        if (sections.skills.items.children.length === 0) {
          addSkillItem();
        }
      } else {
        sections.skills.section.classList.add('hidden');
        sections.skills.addBtn.disabled = true;
        sections.skills.preview.classList.add('hidden');
        sections.skills.preview2.classList.add('hidden');
      }
      updateSkillsPreview();
    } catch (error) {
      console.error('Beceri bölümü hatası:', error);
      showErrorToast('Beceri bölümü açılırken bir hata oluştu.');
    }
  });

  sections.languages.toggle.addEventListener('change', () => {
    try {
      if (sections.languages.toggle.checked) {
        sections.languages.section.classList.remove('hidden');
        sections.languages.addBtn.disabled = false;
        sections.languages.preview.classList.remove('hidden');
        sections.languages.preview2.classList.remove('hidden');
        if (sections.languages.items.children.length === 0) {
          addLanguageItem();
        }
      } else {
        sections.languages.section.classList.add('hidden');
        sections.languages.addBtn.disabled = true;
        sections.languages.preview.classList.add('hidden');
        sections.languages.preview2.classList.add('hidden');
      }
      updateLanguagesPreview();
    } catch (error) {
      console.error('Dil bölümü hatası:', error);
      showErrorToast('Dil bölümü açılırken bir hata oluştu.');
    }
  });

  sections.projects.toggle.addEventListener('change', () => {
    try {
      if (sections.projects.toggle.checked) {
        sections.projects.section.classList.remove('hidden');
        sections.projects.addBtn.disabled = false;
        sections.projects.preview.classList.remove('hidden');
        sections.projects.preview2.classList.remove('hidden');
        if (sections.projects.items.children.length === 0) {
          addProjectItem();
        }
      } else {
        sections.projects.section.classList.add('hidden');
        sections.projects.addBtn.disabled = true;
        sections.projects.preview.classList.add('hidden');
        sections.projects.preview2.classList.add('hidden');
      }
      updateProjectsPreview();
    } catch (error) {
      console.error('Proje bölümü hatası:', error);
      showErrorToast('Proje bölümü açılırken bir hata oluştu.');
    }
  });

  sections.references.toggle.addEventListener('change', () => {
    try {
      if (sections.references.toggle.checked) {
        sections.references.section.classList.remove('hidden');
        sections.references.addBtn.disabled = false;
        sections.references.preview.classList.remove('hidden');
        sections.references.preview2.classList.remove('hidden');
        if (sections.references.items.children.length === 0) {
          addReferenceItem();
        }
      } else {
        sections.references.section.classList.add('hidden');
        sections.references.addBtn.disabled = true;
        sections.references.preview.classList.add('hidden');
        sections.references.preview2.classList.add('hidden');
      }
      updateReferencesPreview();
    } catch (error) {
      console.error('Referans bölümü hatası:', error);
      showErrorToast('Referans bölümü açılırken bir hata oluştu.');
    }
  });

  sections.hobbies.toggle.addEventListener('change', () => {
    try {
      if (sections.hobbies.toggle.checked) {
        sections.hobbies.section.classList.remove('hidden');
        sections.hobbies.addBtn.disabled = false;
        sections.hobbies.preview.classList.remove('hidden');
        sections.hobbies.preview2.classList.remove('hidden');
        if (sections.hobbies.items.children.length === 0) {
          addHobbyItem();
        }
      } else {
        sections.hobbies.section.classList.add('hidden');
        sections.hobbies.addBtn.disabled = true;
        sections.hobbies.preview.classList.add('hidden');
        sections.hobbies.preview2.classList.add('hidden');
      }
      updateHobbiesPreview();
    } catch (error) {
      console.error('Hobi bölümü hatası:', error);
      showErrorToast('Hobi bölümü açılırken bir hata oluştu.');
    }
  });

  sections.skills.addBtn.addEventListener('click', () => {
    try {
      addSkillItem();
      updateSkillsPreview();
    } catch (error) {
      console.error('Beceri ekleme hatası:', error);
      showErrorToast('Beceri eklenirken bir hata oluştu.');
    }
  });

  sections.languages.addBtn.addEventListener('click', () => {
    try {
      addLanguageItem();
      updateLanguagesPreview();
    } catch (error) {
      console.error('Dil ekleme hatası:', error);
      showErrorToast('Dil eklenirken bir hata oluştu.');
    }
  });

  sections.projects.addBtn.addEventListener('click', () => {
    try {
      addProjectItem();
      updateProjectsPreview();
    } catch (error) {
      console.error('Proje ekleme hatası:', error);
      showErrorToast('Proje eklenirken bir hata oluştu.');
    }
  });

  sections.references.addBtn.addEventListener('click', () => {
    try {
      addReferenceItem();
      updateReferencesPreview();
    } catch (error) {
      console.error('Referans ekleme hatası:', error);
      showErrorToast('Referans eklenirken bir hata oluştu.');
    }
  });

  sections.hobbies.addBtn.addEventListener('click', () => {
    try {
      addHobbyItem();
      updateHobbiesPreview();
    } catch (error) {
      console.error('Hobi ekleme hatası:', error);
      showErrorToast('Hobi eklenirken bir hata oluştu.');
    }
  });

  document.querySelectorAll('.skill-style-option').forEach(option => {
    option.addEventListener('click', () => {
      try {
        document.querySelectorAll('.skill-style-option').forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
        currentSkillStyle = option.dataset.style;
        updateSkillsPreview();
        updateLanguagesPreview();
      } catch (error) {
        console.error('Beceri stili değiştirme hatası:', error);
        showErrorToast('Beceri stili değiştirilirken bir hata oluştu.');
      }
    });
  });
}

