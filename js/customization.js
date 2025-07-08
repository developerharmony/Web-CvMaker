import { showErrorToast } from './script.js';

export function initializeCustomization() {
  const templateItems = document.querySelectorAll('.template-item');
  const previewTemplate1 = document.getElementById('preview-template-1');
  const previewTemplate2 = document.getElementById('preview-template-2');
  const fontOptions = document.querySelectorAll('.font-option');
  const cvPreview = document.getElementById('cv-preview');
  const colorOptions = document.querySelectorAll('.color-option');
  const root = document.documentElement;

  if (!templateItems.length || !previewTemplate1 || !previewTemplate2 || !fontOptions.length || !cvPreview || !colorOptions.length) {
    throw new Error('Özelleştirme bileşenleri bulunamadı.');
  }

  templateItems.forEach(item => {
    item.addEventListener('click', () => {
      try {
        templateItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        const template = item.dataset.template;
        if (template === '1') {
          previewTemplate1.classList.remove('hidden');
          previewTemplate1.classList.add('active');
          previewTemplate2.classList.add('hidden');
          previewTemplate2.classList.remove('active');
        } else if (template === '2') {
          previewTemplate1.classList.add('hidden');
          previewTemplate1.classList.remove('active');
          previewTemplate2.classList.remove('hidden');
          previewTemplate2.classList.add('active');
        }
      } catch (error) {
        console.error('Şablon değiştirme hatası:', error);
        showErrorToast('Şablon değiştirilirken bir hata oluştu.');
      }
    });
  });

  fontOptions.forEach(option => {
    option.addEventListener('click', () => {
      try {
        fontOptions.forEach(o => o.classList.remove('active'));
        option.classList.add('active');
        const font = option.dataset.font;
        cvPreview.style.fontFamily = font;
      } catch (error) {
        console.error('Yazı tipi değiştirme hatası:', error);
        showErrorToast('Yazı tipi değiştirilirken bir hata oluştu.');
      }
    });
  });

  colorOptions.forEach(option => {
    option.addEventListener('click', () => {
      try {
        colorOptions.forEach(o => o.classList.remove('active'));
        option.classList.add('active');
        const color = option.dataset.color;
        root.style.setProperty('--tw-color-primary', color);
        document.querySelectorAll('.text-primary, .bg-primary, .border-primary').forEach(el => {
          if (el.classList.contains('text-primary')) {
            el.style.color = color;
          }
          if (el.classList.contains('bg-primary')) {
            el.style.backgroundColor = color;
          }
          if (el.classList.contains('border-primary')) {
            el.style.borderColor = color;
          }
        });
        document.querySelectorAll('.skill-progress').forEach(el => {
          el.style.backgroundColor = color;
        });
        document.querySelectorAll('.skill-stars i.active').forEach(el => {
          el.style.color = color;
        });
        document.querySelectorAll('.skill-dots span.active').forEach(el => {
          el.style.backgroundColor = color;
        });
      } catch (error) {
        console.error('Renk değiştirme hatası:', error);
        showErrorToast('Renk değiştirilirken bir hata oluştu.');
      }
    });
  });
}

