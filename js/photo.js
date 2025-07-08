import { showErrorToast } from './script.js';

export function initializePhoto() {
  const photoDropzone = document.getElementById('photo-dropzone');
  const photoInput = document.getElementById('photo-input');
  const photoSelectBtn = document.getElementById('photo-select-btn');
  const previewPhoto = document.getElementById('preview-photo');
  const previewPhoto2 = document.getElementById('preview-photo-2');
  const photoCropModal = document.getElementById('photo-crop-modal');
  const cropImage = document.getElementById('crop-image');
  const closeCropModal = document.getElementById('close-crop-modal');
  const cancelCrop = document.getElementById('cancel-crop');
  const applyCrop = document.getElementById('apply-crop');
  let cropper = null;

  if (!photoDropzone || !photoInput || !photoSelectBtn || !previewPhoto || !previewPhoto2 || !photoCropModal || !cropImage || !closeCropModal || !cancelCrop || !applyCrop) {
    throw new Error('Fotoğraf bileşenleri bulunamadı.');
  }

  function handleFileSelect(file) {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = function (e) {
        try {
          cropImage.src = e.target.result;
          photoCropModal.classList.remove('hidden');
          if (cropper) {
            cropper.destroy();
          }
          cropper = new Cropper(cropImage, {
            aspectRatio: 1,
            viewMode: 2,
            autoCropArea: 1,
            restore: false,
            modal: true,
            guides: true,
            highlight: true,
            cropBoxMovable: true,
            cropBoxResizable: true,
            minContainerWidth: 300,
            minContainerHeight: 300,
            minCropBoxWidth: 100,
            minCropBoxHeight: 100,
            background: true,
            responsive: true,
            checkOrientation: true,
          });
        } catch (error) {
          console.error('Cropper başlatma hatası:', error);
          showErrorToast('Fotoğraf kırpma aracı başlatılırken bir hata oluştu.');
        }
      };
      reader.onerror = function () {
        showErrorToast('Dosya okunurken bir hata oluştu.');
      };
      reader.readAsDataURL(file);
    } else {
      showErrorToast('Lütfen geçerli bir resim dosyası seçin.');
    }
  }

  function applyCroppedImage() {
    try {
      if (cropper) {
        const canvas = cropper.getCroppedCanvas({
          width: 300,
          height: 300,
          imageSmoothingEnabled: true,
          imageSmoothingQuality: 'high',
        });
        if (!canvas) {
          throw new Error('Kırpılmış görüntü oluşturulamadı.');
        }
        const croppedImageUrl = canvas.toDataURL('image/jpeg/webp', 0.9);
        previewPhoto.src = croppedImageUrl;
        previewPhoto2.src = croppedImageUrl;
        photoCropModal.classList.add('hidden');
        cropper.destroy();
        cropper = null;
      }
    } catch (error) {
      console.error('Fotoğraf kırpma hatası:', error);
      showErrorToast('Fotoğraf kırpılırken bir hata oluştu.');
    }
  }

  function resetPhotoInput() {
    try {
      photoInput.value = '';
      if (cropper) {
        cropper.destroy();
        cropper = null;
      }
      cropImage.src = '';
      photoCropModal.classList.add('hidden');
    } catch (error) {
      console.error('Fotoğraf girişi sıfırlama hatası:', error);
      showErrorToast('Fotoğraf girişi sıfırlanırken bir hata oluştu.');
    }
  }

  photoSelectBtn.addEventListener('click', () => {
    try {
      photoInput.click();
    } catch (error) {
      console.error('Fotoğraf seçme butonu hatası:', error);
      showErrorToast('Fotoğraf seçme butonuna tıklanırken bir hata oluştu.');
    }
  });

  photoInput.addEventListener('change', () => {
    try {
      if (photoInput.files && photoInput.files[0]) {
        handleFileSelect(photoInput.files[0]);
      }
    } catch (error) {
      console.error('Fotoğraf seçme hatası:', error);
      showErrorToast('Fotoğraf seçilirken bir hata oluştu.');
    }
  });

  photoDropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    photoDropzone.classList.add('border-primary');
  });

  photoDropzone.addEventListener('dragleave', () => {
    photoDropzone.classList.remove('border-primary');
  });

  photoDropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    photoDropzone.classList.remove('border-primary');
    try {
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFileSelect(e.dataTransfer.files[0]);
      } else {
        showErrorToast('Sürüklenen dosya geçerli değil.');
      }
    } catch (error) {
      console.error('Fotoğraf bırakma hatası:', error);
      showErrorToast('Fotoğraf bırakılırken bir hata oluştu.');
    }
  });

  closeCropModal.addEventListener('click', resetPhotoInput);
  cancelCrop.addEventListener('click', resetPhotoInput);

  applyCrop.addEventListener('click', applyCroppedImage);

  photoCropModal.addEventListener('click', (e) => {
    try {
      if (e.target === photoCropModal) {
        resetPhotoInput();
      }
    } catch (error) {
      console.error('Modal kapatma hatası:', error);
      showErrorToast('Modal kapatılırken bir hata oluştu.');
    }
  });
}