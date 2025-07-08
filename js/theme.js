import { showErrorToast } from './script.js';

export function initializeTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;
  const sunIcon = themeToggleBtn?.querySelector('.ri-sun-line');
  const moonIcon = themeToggleBtn?.querySelector('.ri-moon-line');

  if (!themeToggleBtn || !sunIcon || !moonIcon) {
    throw new Error('Tema bileşenleri bulunamadı.');
  }

  function updateTheme(isDark) {
    if (isDark) {
      htmlElement.classList.add('dark');
      sunIcon.classList.add('hidden');
      moonIcon.classList.remove('hidden');
    } else {
      htmlElement.classList.remove('dark');
      sunIcon.classList.remove('hidden');
      moonIcon.classList.add('hidden');
    }
  }

  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  updateTheme(systemPrefersDark);

  themeToggleBtn.addEventListener('click', () => {
     console.log("Butona Tıklandı.")
    try {
      const isDark = !htmlElement.classList.contains('dark');
      updateTheme(isDark);
    } catch (error) {
      console.error('Tema değiştirme hatası:', error);
      showErrorToast('Tema değiştirilirken bir hata oluştu.');
    }
  });

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    try {
      updateTheme(e.matches);
    } catch (error) {
      console.error('Sistem teması değiştirme hatası:', error);
      showErrorToast('Sistem teması değiştirilirken bir hata oluştu.');
    }
  });
}

