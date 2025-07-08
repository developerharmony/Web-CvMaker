import { showErrorToast } from './script.js';

export function initializeModals() {
  const modals = {
    photoCrop: {
      modal: document.getElementById('photo-crop-modal'),
      openTriggers: [],
      closeTriggers: [document.getElementById('close-crop-modal'), document.getElementById('cancel-crop')],
    },
    exportPdf: {
      modal: document.getElementById('export-pdf-modal'),
      openTriggers: [document.getElementById('export-pdf-btn')],
      closeTriggers: [document.getElementById('close-export-modal'), document.getElementById('cancel-export')],
    },
    download: {
      modal: document.getElementById('download-modal'),
      openTriggers: [document.getElementById('download-btn')],
      closeTriggers: [document.getElementById('close-download-modal'), document.getElementById('cancel-download')],
    },
    preview: {
      modal: document.getElementById('preview-modal'),
      openTriggers: [document.getElementById('preview-btn')],
      closeTriggers: [document.getElementById('close-preview-modal'), document.getElementById('close-preview')],
    },
    help: {
      modal: document.getElementById('help-modal'),
      openTriggers: [document.getElementById('help-btn'),document.getElementById('help-text')],
      closeTriggers: [document.getElementById('close-help-modal'), document.getElementById('close-help')],
    },
  };


  Object.entries(modals).forEach(([key, { modal, openTriggers, closeTriggers }]) => {
    if (!modal) {
      console.warn(`${key} modalı bulunamadı.`);
      return;
    }
    if (openTriggers.some(trigger => !trigger)) {
      console.warn(`${key} modalı için açma tetikleyici bulunamadı.`);
    }
    if (closeTriggers.some(trigger => !trigger)) {
      console.warn(`${key} modalı için kapatma tetikleyici bulunamadı.`);
    }
  });


  function openModal(modal) {
    try {
      if (!modal) {
        throw new Error('Modal elementi bulunamadı.');
      }
      modal.classList.remove('hidden');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden'; 
    } catch (error) {
      console.error('Modal açma hatası:', error);
      showErrorToast('Modal açılırken bir hata oluştu.');
    }
  }

  function closeModal(modal) {
    try {
      if (!modal) {
        throw new Error('Modal elementi bulunamadı.');
      }
      modal.classList.add('hidden');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';


      if (modal.id === 'preview-modal') {
        const previewContent = document.getElementById('preview-content');
        if (previewContent) {
          previewContent.innerHTML = ''; 
        }
      }
    } catch (error) {
      console.error('Modal kapatma hatası:', error);
      showErrorToast('Modal kapatılırken bir hata oluştu.');
    }
  }

  function handleOutsideClick(e, modal) {
    try {
      if (e.target === modal) {
        closeModal(modal);
      }
    } catch (error) {
      console.error('Modal dış tıklama hatası:', error);
      showErrorToast('Modal kapatılırken bir hata oluştu.');
    }
  }

  async function handleExport(format, name, activeTemplate) {
    let container = null;
    try {
      container = document.createElement('div');
      container.style.width = '210mm';
      container.style.padding = '20mm';
      container.style.backgroundColor = '#ffffff';
      container.style.boxSizing = 'border-box';
      container.style.fontFamily = document.getElementById('cv-preview').style.fontFamily || "'Inter', sans-serif";
      container.style.position = 'absolute';
      container.style.left = '-9999px';

      const templateClone = activeTemplate.cloneNode(true);
      templateClone.style.width = '100%';
      templateClone.style.maxWidth = '170mm';
      templateClone.style.backgroundColor = '#ffffff';
      templateClone.style.color = '#000000';
      templateClone.style.position = 'relative';
      templateClone.style.overflow = 'visible';

      const skillBars = templateClone.querySelectorAll('.skill-progress');
      skillBars.forEach(bar => {
        bar.style.backgroundColor = getComputedStyle(bar).backgroundColor;
      });

      const darkElements = templateClone.querySelectorAll('.dark\\:text-gray-200, .dark\\:text-gray-400');
      darkElements.forEach(el => {
        el.style.color = '#000000';
      });

      const darkBorders = templateClone.querySelectorAll('.dark\\:border-gray-700');
      darkBorders.forEach(el => {
        el.style.borderColor = '#000000';
      });

      container.appendChild(templateClone);
      document.body.appendChild(container);

      if (format === 'pdf') {
        if (typeof window.jspdf === 'undefined' || !window.jspdf.jsPDF) {
          throw new Error('jsPDF kütüphanesi yüklü değil.');
        }
        const { jsPDF } = window.jspdf;
        const pageSize = document.querySelector('input[name="page-size"]:checked')?.value || 'a4';
        const canvas = await html2canvas(container, {
          scale: 3,
          useCORS: true,
          letterRendering: true,
          backgroundColor: '#ffffff',
          windowWidth: 210 * 3.7795,
          windowHeight: 297 * 3.7795,
        });

        const imgData = canvas.toDataURL('image/jpeg', 0.95);
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: pageSize,
        });

        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

        let heightLeft = imgHeight;
        let position = 0;

        while (heightLeft > 0) {
          pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeight);
          heightLeft -= pdfHeight;
          position -= pdfHeight;
          if (heightLeft > 0) {
            pdf.addPage();
          }
        }

        pdf.save(`${name}.pdf`);
      } else if (format === 'png') {
        const canvas = await html2canvas(container, {
          scale: 2,
          useCORS: true,
          letterRendering: true,
          backgroundColor: '#ffffff',
        });
        canvas.toBlob(function (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${name}.png`;
          a.click();
          URL.revokeObjectURL(url);
        }, 'image/png');
      }

      closeModal(modals.download.modal);
    } catch (error) {
      console.error('Dışa aktarma hatası:', error);
      showErrorToast(`Dışa aktarma sırasında bir hata oluştu: ${error.message}`);
    } finally {
      if (container && container.parentNode) {
        container.parentNode.removeChild(container);
      }
    }
  }

  function updatePreviewContent() {
    try {
      const activeTemplate = document.querySelector('.cv-preview-template.active');
      if (!activeTemplate) {
        throw new Error('Aktif CV şablonu bulunamadı.');
      }
      const previewContent = document.getElementById('preview-content');
      if (previewContent) {
        previewContent.innerHTML = '';
        previewContent.appendChild(activeTemplate.cloneNode(true));
      }
      openModal(modals.preview.modal);
    } catch (error) {
      console.error('Önizleme hatası:', error);
      showErrorToast('Önizleme hazırlanırken bir hata oluştu.');
    }
  }

  Object.values(modals).forEach(({ modal, openTriggers, closeTriggers }) => {
    if (!modal) return;

    openTriggers.forEach(trigger => {
      if (trigger) {
        trigger.addEventListener('click', () => {
          if (trigger.id === 'preview-btn') {
            updatePreviewContent();
          } else if (trigger.id === 'download-btn') {
            const firstName = document.getElementById('firstName')?.value || '';
            const lastName = document.getElementById('lastName')?.value || '';
            const defaultName = (firstName + '_' + lastName).trim() || 'CV';
            const fileNameInput = document.getElementById('file-name');
            if (fileNameInput) fileNameInput.value = defaultName;
            openModal(modal);
          } else {
            openModal(modal);
          }
        });
      }
    });

    closeTriggers.forEach(trigger => {
      if (trigger) {
        trigger.addEventListener('click', () => closeModal(modal));
      }
    });

    modal.addEventListener('click', (e) => handleOutsideClick(e, modal));
  });

  const confirmExport = document.getElementById('confirm-download');
  if (confirmExport) {
    confirmExport.addEventListener('click', async () => {
      const format = document.querySelector('input[name="file-format"]:checked')?.value;
      const name = document.getElementById('file-name')?.value || 'CV';
      const activeTemplate = document.querySelector('.cv-preview-template.active');
      if (!format || !activeTemplate) {
        showErrorToast('Dosya formatı veya aktif şablon bulunamadı.');
        return;
      }
      await handleExport(format, name, activeTemplate);
    });
  }

  const previewDownloadBtn = document.getElementById('preview-download-btn');
  if (previewDownloadBtn) {
    previewDownloadBtn.addEventListener('click', () => {
      closeModal(modals.preview.modal);
      modals.download.openTriggers[0]?.click();
    });
  }

  const fileFormatRadios = document.getElementsByName('file-format');
  const pdfOptions = document.getElementById('pdf-options');
  if (fileFormatRadios && pdfOptions) {
    fileFormatRadios.forEach(radio => {
      radio.addEventListener('change', () => {
        if (radio.value === 'pdf') {
          pdfOptions.classList.remove('hidden');
        } else {
          pdfOptions.classList.add('hidden');
        }
      });
    });
  }

  

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      Object.values(modals).forEach(({ modal }) => {
        if (modal && !modal.classList.contains('hidden')) {
          closeModal(modal);
        }
      });
    }
  });
}