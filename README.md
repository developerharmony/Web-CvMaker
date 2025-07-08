# CV Oluşturucu

Bu proje, kullanıcıların özelleştirilebilir özgeçmiş (CV) oluşturmasını sağlayan bir web uygulamasıdır. Kullanıcı dostu bir arayüzle kişisel bilgiler, eğitim, iş deneyimi, yetenekler, diller, projeler, referanslar ve hobiler gibi bölümleri ekleyip düzenleyebilir, CV'lerini PDF veya PNG formatında dışa aktarabilir. Açık/koyu tema desteği, fotoğraf yükleme/kırpma ve özelleştirme seçenekleri (şablon, yazı tipi, renk) gibi özellikler sunar.

## Özellikler

- **Kişisel Bilgiler**: Ad, soyad, ünvan, özet, e-posta, telefon, adres, web sitesi ve LinkedIn bilgilerini ekleme ve doğrulama.
- **Eğitim ve İş Deneyimi**: Eğitim ve iş geçmişi ekleme, silme ve düzenleme.
- **Opsiyonel Bölümler**: Yetenekler, diller, projeler, referanslar ve hobiler ekleme.
- **Yetenek/Dil Görselleştirme**: Yetenek ve dil seviyelerini çubuk, yıldız, nokta veya metin formatında gösterme.
- **Fotoğraf Yükleme ve Kırpma**: Fotoğraf yükleme, Cropper.js ile kırpma ve önizleme.
- **Tema Desteği**: Açık ve koyu tema arasında geçiş, sistem temasına otomatik uyum.
- **Özelleştirme**: Farklı CV şablonları, yazı tipi (Inter, Poppins, Roboto) ve renk seçenekleri.
- **Dışa Aktarma**: CV'yi PDF (jsPDF) veya PNG (html2canvas) formatında indirme.
- **Mobil Uyumluluk**: Mobil cihazlar için menü ve responsive tasarım.
- **Hata Bildirimi**: Kullanıcıya toast mesajlarıyla hata bildirimleri.

## Dosya Yapısı

```
project/
├── css/
│   └── styles.css              # Genel stil tanımları (tema, form elemanları, modallar)
├── js/
│   ├── script.js               # Ana başlatıcı ve hata bildirimi
│   ├── theme.js                # Açık/koyu tema yönetimi
│   ├── mobileMenu.js           # Mobil menü açma/kapama
│   ├── form.js                 # Kişisel bilgi formu yönetimi
│   ├── education.js            # Eğitim bilgileri yönetimi
│   ├── experience.js           # İş deneyimi yönetimi
│   ├── optionalSections.js     # Opsiyonel bölümler (yetenekler, diller, projeler, vb.)
│   ├── customization.js        # Şablon, yazı tipi ve renk özelleştirme
│   ├── photo.js                # Fotoğraf yükleme ve kırpma
│   └── modals.js               # Modal yönetimi ve dışa aktarma
├── index.html                  # Ana HTML dosyası
└── README.md                   # Proje dokümantasyonu
```

## Kurulum

1. **Depoyu Klonlayın**:
   ```bash
   git clone https://github.com/<kullanici-adi>/<repo-adi>.git
   cd <repo-adi>
   ```

2. **Bağımlılıkları Yükleyin**:
   Proje, aşağıdaki harici kütüphaneleri kullanır:
   - Cropper.js (fotoğraf kırpma)
   - jsPDF (PDF dışa aktarma)
   - html2canvas (PNG dışa aktarma)
   
   Bunları HTML dosyasına CDN üzerinden ekleyebilirsiniz veya npm ile yükleyebilirsiniz:
   ```bash
   npm install cropperjs jspdf html2canvas
   ```

3. **Geliştirme Sunucusu Başlatın**:
   Basit bir HTTP sunucusu kullanarak projeyi çalıştırın:
   ```bash
   npx http-server
   ```
   Ya da `index.html` dosyasını doğrudan bir tarayıcıda açabilirsiniz (ancak bazı özellikler için sunucu gerekebilir).

4. **Tarayıcıda Açın**:
   Tarayıcınızda `http://localhost:8080` adresine gidin (veya sunucunuzun varsayılan portuna).

## Kullanım

1. **Tema Değiştirme**:
   - Sağ üstteki tema butonuna tıklayarak açık/koyu tema arasında geçiş yapın.
   - Sistem temasına göre otomatik ayar yapılır.

2. **Kişisel Bilgiler**:
   - Form bölümünden ad, soyad, ünvan, özet, e-posta, telefon, adres, web sitesi ve LinkedIn bilgilerinizi girin.
   - Girişler anında önizlemeye yansır.

3. **Eğitim ve İş Deneyimi**:
   - "Eğitim Ekle" veya "Deneyim Ekle" butonlarıyla yeni girişler ekleyin.
   - Okul, bölüm, tarih, iş unvanı, şirket gibi bilgileri doldurun ve gerektiğinde silin.

4. **Opsiyonel Bölümler**:
   - Yetenekler, diller, projeler, referanslar veya hobileri etkinleştirin.
   - Her bölüm için öğeler ekleyin (ör. yetenek adı ve seviye) ve seviyeleri çubuk, yıldız, nokta veya metin olarak gösterin.

5. **Fotoğraf Yükleme**:
   - Fotoğraf bölümünden bir resim seçin veya sürükleyip bırakın.
   - Cropper.js ile fotoğrafı kırpın ve önizlemeye uygulayın.

6. **Özelleştirme**:
   - Şablon sekmesinden farklı CV düzenleri seçin.
   - Yazı tipi (Inter, Poppins, Roboto) ve renk seçeneklerini ayarlayın.

7. **Dışa Aktarma**:
   - "İndir" butonuna tıklayın, dosya formatını (PDF veya PNG) seçin ve dosya adını belirleyin.
   - PDF için sayfa boyutu (A4, Letter) seçebilirsiniz.

8. **Önizleme**:
   - "Önizle" butonuyla CV'nin tam halini görün.
   - Önizlemeden doğrudan indirme yapabilirsiniz.

## Bağımlılıklar

- **Cropper.js**: Fotoğraf kırpma için. [CDN](https://cdnjs.com/libraries/cropperjs)
- **jsPDF**: PDF dışa aktarma için. [CDN](https://cdnjs.com/libraries/jspdf)
- **html2canvas**: PNG dışa aktarma için. [CDN](https://cdnjs.com/libraries/html2canvas)
- **Remixicon**: İkonlar için. [CDN](https://cdnjs.com/libraries/remixicon)

## Katkı Sağlama

1. Depoyu fork edin.
2. Yeni bir branch oluşturun: `git checkout -b feature/yeni-ozellik`
3. Değişikliklerinizi yapın ve commit edin: `git commit -m "Yeni özellik eklendi"`
4. Branch'i push edin: `git push origin feature/yeni-ozellik`
5. Bir Pull Request açın.

Lütfen katkılarınızda kod kalite standartlarına uyun ve değişiklikleri açıklayıcı şekilde belgeleyin.


## Lisans

Bu proje [MIT Lisansı](LICENSE) altında lisanslanmıştır.

## İletişim

Sorularınız veya önerileriniz için [GitHub Issues](https://github.com/<kullanici-adi>/<repo-adi>/issues) üzerinden iletişime geçebilirsiniz.
- **Geliştirici**: Harmony
- **GitHub**: [developerharmony](https://github.com/developerharmony)