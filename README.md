# Fabrika Otomasyonu Proje Açıklaması

Bu proje, Node.js, React ve MySQL kullanılarak geliştirilmiş bir full stack uygulamasıdır. Aşağıda, projenin kurulumu ve çalıştırılması için adımlar bulunmaktadır.

## Kurulum Adımları

1. **Gereksinimlerin Kurulumu**
   
   - Node.js ve npm: [Resmi web sitesinden](https://nodejs.org) indirin ve kurun.


2. **Sunucu Kısmının Kurulumu**
   ```bash
   #backend klasörüne gidin
   cd backend
   #node modüllerini kurun
   npm install
   #Projeyi başlatın
   npm start
   ```

4. **İstemci Kısmının Kurulumu**
   
   ```bash
   #client klasörüne gidin
   cd client
   #node modüllerini kurun
   npm install
   #Projeyi başlatın
   npm run dev
   ```

5. **Tarayıcıda Görüntüleme**
   
   Tarayıcınızda `http://localhost:5173` adresine giderek uygulamayı görüntüleyebilirsiniz.

## Proje Yapısı

Proje, sunucu ve istemci olmak üzere iki ana bölümden oluşmaktadır.

- **Sunucu:** Node.js ile geliştirilmiş olan sunucu kısmıdır. API'leri yönetir ve MySQL veritabanıyla etkileşim sağlar.
- **İstemci:** React kullanılarak geliştirilmiş olan istemci kısmıdır. Kullanıcı arayüzünü oluşturur ve sunucu ile iletişim kurar.

## Kullanılan Teknolojiler

- **Sunucu:**
  - Node.js
  - Express.js
  - MySQL
  - Jwt
  - Bcrypt

- **İstemci:**
  - React
  - React Router
  - Axios
  - Antd

## Özellikler

- Kullanıcı oturum açılması.
- Kullanıcıların belirli öğeleri listeleme ve detaylarını görüntüleme.
- CRUD işlemleri (Oluşturma, Okuma, Güncelleme, Silme) için API'ler.
### Giriş Yap Ekranı
<img title="a title" alt="Alt text" src="/img/girisyap.png">

### Ekleme ve Düzenleme Ekranı
<img title="a title" alt="Alt text" src="/img/calısan ekle.png">

## SQL Tabloları

### Çalışanlar Tablosu

| Alan Adı      | Veri Türü  | Açıklama         |
|---------------|------------|------------------|
| id            | INT        | Otomatik artan, Anahtar |
| adi           | VARCHAR(45)| Çalışanın Adı   |
| soyadi        | VARCHAR(45)| Çalışanın Soyadı|
| maas          | INT        | Çalışanın Maaşı |
| medeni_durum  | VARCHAR(6) | Medeni Durumu   |
| tel_no        | VARCHAR(45)| Telefon Numarası|
| adres         | VARCHAR(200)| Adres           |

### Hammadde Tablosu

| Alan Adı  | Veri Türü  | Açıklama         |
|-----------|------------|------------------|
| id        | INT        | Otomatik Artan, Anahtar |
| adi       | VARCHAR(45)| Adı              |

### Kullanıcılar Tablosu

| Alan Adı    | Veri Türü  | Açıklama               |
|-------------|------------|------------------------|
| id          | INT        | Otomatik Artan, Anahtar|
| eposta      | VARCHAR(100)| E-posta Adresi        |
| sifre       | VARCHAR(200)| Şifre                  |
| calisanlar_id | INT      | Çalışan ID             |
| rol_id      | INT        | Rol ID                 |

### Müşteri Tablosu

| Alan Adı     | Veri Türü  | Açıklama             |
|--------------|------------|----------------------|
| id           | INT        | Otomatik Artan, Anahtar|
| adi          | VARCHAR(45)| Müşteri Adı         |
| soyadi       | VARCHAR(45)| Müşteri Soyadı      |
| firma_adi    | VARCHAR(100)| Firma Adı           |
| firma_adres  | VARCHAR(250)| Firma Adresi        |

### Rol Tablosu

| Alan Adı | Veri Türü  | Açıklama               |
|----------|------------|------------------------|
| id       | INT        | Otomatik Artan, Anahtar|
| rol_tipi | VARCHAR(45)| Rol Tipi               |

### Siparis Tablosu

| Alan Adı     | Veri Türü  | Açıklama               |
|--------------|------------|------------------------|
| id           | INT        | Otomatik Artan, Anahtar|
| calisanlar_id| INT        | Çalışanlar ID          |
| musteri_id   | INT        | Müşteri ID             |

### Sipariş Icerik Tablosu

| Alan Adı      | Veri Türü  | Açıklama               |
|---------------|------------|------------------------|
| id            | INT        | Otomatik Artan, Anahtar|
| siparis_id    | INT        | Sipariş ID             |
| urun_id       | INT        | Ürün ID                |
| siparis_miktar| INT        | Sipariş Miktarı        |

### Üretim Tablosu

| Alan Adı         | Veri Türü  | Açıklama               |
|------------------|------------|------------------------|
| id               | INT        | Otomatik Artan, Anahtar|
| calisan_id       | INT        | Çalışan ID             |
| hammadde_id      | INT        | Hammade ID             |
| urun_id          | INT        | Ürün ID                |
| uretilen_miktar  | INT        | Üretilen Miktar        |

### Ürün Tablosu

| Alan Adı  | Veri Türü  | Açıklama             |
|-----------|------------|----------------------|
| id        | INT        | Otomatik Artan, Anahtar|
| adi       | VARCHAR(45)| Ürün Adı            |
| fiyat     | VARCHAR(45)| Ürün Fiyatı         |
| miktar    | INT        | Ürün Miktarı        |