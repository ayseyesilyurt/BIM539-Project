# BIM539-Project
YAZILIM KALITE GUVENCESI VE TESTI PROJESI

Bu proje, Yazılım Kalite Güvencesi ve Testi dersi kapsamında geliştirilmiş, REST mimarisine uygun, veritabanı destekli bir Node.js (Express) API uygulamasıdır.

API; kullanıcılar, ürünler, kategoriler, siparişler ve yorumlar gibi birden fazla kaynağı yönetir ve bu kaynaklar arasında ilişkiler içerir (örneğin User–Order, Product–Review).

Proje boyunca birim testleri (unit), entegrasyon testleri (integration) ve uçtan uca testler (E2E) yazılmış, %60 üzeri code coverage hedefi başarıyla aşılmıştır.

Kullanılan Teknolojiler
Node.js
Express.js
PostgreSQL
Jest (Unit, Integration, E2E testler)
Supertest
Swagger / OpenAPI 3.0
dotenv
GitHub Actions (CI)

Proje Yapısı 
src/
 ├─ app.js
 ├─ server.js
 ├─ config/
 │   ├─ db.js
 │   └─ env.js
 ├─ routes/
 ├─ controllers/
 ├─ services/
 ├─ repositories/
 ├─ validators/
 └─ docs/
     └─ swagger.js

tests/
 ├─ unit/
 ├─ integration/
 ├─ e2e/
 └─ helpers/


Kurulum Talimatları

1) Repository’i klonlayın
git clone https://github.com/<github-kullanici-adi>/BIM539-Project.git
cd BIM539-Project

2) Bağımlılıkları yükleyin
npm install

3) Ortam değişkenlerini ayarlayın
Proje kök dizininde .env dosyası oluşturun:

PORT=3000
DATABASE_URL=postgresql://username:password@localhost:5432/kalite_db
NODE_ENV=development

4) Uygulamayı Çalıştırma
npm run dev


API Kaynakları

API aşağıdaki kaynakları içerir:
Users
Categories
Products
Orders
Reviews

Her kaynak için şu HTTP metodları desteklenmektedir:
GET (liste ve tekil)
POST
PATCH
DELETE
Uygun HTTP durum kodları kullanılmaktadır (200, 201, 400, 404).

| Method | Endpoint         | Açıklama                                  |
| ------ | ---------------- | ----------------------------------------- |
| GET    | `/api/health/db` | Veritabanı bağlantı durumunu kontrol eder |

OR: GET /api/health/db

Users (Kullanıcılar)

| Method | Endpoint         | Açıklama                   |
| ------ | ---------------- | -------------------------- |
| POST   | `/api/users`     | Yeni kullanıcı oluşturur   |
| GET    | `/api/users`     | Tüm kullanıcıları listeler |
| GET    | `/api/users/:id` | Kullanıcı detayını getirir |
| PATCH  | `/api/users/:id` | Kullanıcıyı günceller      |
| DELETE | `/api/users/:id` | Kullanıcıyı siler          |

POST /api/users
{
  "email": "user@test.com",
  "fullName": "Test User"
}


Categories (Kategoriler)

| Method | Endpoint              | Açıklama                  |
| ------ | --------------------- | ------------------------- |
| POST   | `/api/categories`     | Kategori oluşturur        |
| GET    | `/api/categories`     | Tüm kategorileri listeler |
| GET    | `/api/categories/:id` | Kategori detayını getirir |
| PATCH  | `/api/categories/:id` | Kategoriyi günceller      |
| DELETE | `/api/categories/:id` | Kategoriyi siler          |

POST /api/categories
{
  "name": "Electronics"
}


Products (Ürünler)

| Method | Endpoint            | Açıklama              |
| ------ | ------------------- | --------------------- |
| POST   | `/api/products`     | Ürün oluşturur        |
| GET    | `/api/products`     | Tüm ürünleri listeler |
| GET    | `/api/products/:id` | Ürün detayını getirir |
| PATCH  | `/api/products/:id` | Ürünü günceller       |
| DELETE | `/api/products/:id` | Ürünü siler           |


POST /api/products
{
  "name": "Laptop",
  "price": 25000,
  "categoryId": 1
}

Orders (Siparişler)

| Method | Endpoint          | Açıklama                   |
| ------ | ----------------- | -------------------------- |
| POST   | `/api/orders`     | Sipariş oluşturur          |
| GET    | `/api/orders`     | Tüm siparişleri listeler   |
| GET    | `/api/orders/:id` | Sipariş detayını getirir   |
| PATCH  | `/api/orders/:id` | Sipariş durumunu günceller |
| DELETE | `/api/orders/:id` | Siparişi siler             |

POST /api/orders
{
  "userId": 1,
  "total": 1500.75,
  "status": "pending"
}

Reviews (Yorumlar)

| Method | Endpoint           | Açıklama               |
| ------ | ------------------ | ---------------------- |
| POST   | `/api/reviews`     | Ürün yorumu oluşturur  |
| GET    | `/api/reviews`     | Tüm yorumları listeler |
| GET    | `/api/reviews/:id` | Yorum detayını getirir |
| PATCH  | `/api/reviews/:id` | Yorumu günceller       |
| DELETE | `/api/reviews/:id` | Yorumu siler           |

POST /api/reviews
{
  "userId": 1,
  "productId": 1,
  "rating": 5,
  "comment": "Çok kaliteli bir ürün."
}


Swagger / OpenAPI Dokümantasyonu
Swagger UI üzerinden tüm endpoint’lere erişilebilir:
http://localhost:3000/api-docs

Swagger dokümantasyonu:
OpenAPI 3.0 standardına uygundur. Tüm endpoint’ler Request / response şemaları Parametreler detaylı şekilde tanımlanmıştır.

TESTLER
Projede üç seviyede test bulunmaktadır:

1. Birim Testleri (Unit Tests)
Validation (schema) testleri
Pozitif ve negatif senaryolar
15+ test

2. Entegrasyon Testleri (Integration Tests)
API endpoint testleri
CRUD işlemleri
İlişkili kaynaklar
Hata senaryoları

3. Sistem / E2E Testleri
Gerçek kullanım senaryoları
Birden fazla kaynağı kapsayan akışlar
Bağımsız test verileri

Testleri Çalıştırma
Test Yapısı

Unit Tests
Sadece Joi schema doğrulamaları test edilir
npm run test:unit

Integration Tests
Controller, service ve repository katmanları birlikte test edilir
Gerçek HTTP istekleri kullanılır

End-to-End (E2E) Tests
Gerçek kullanıcı senaryoları test edilir
Birden fazla endpoint zincirleme çalıştırılır
(örneğin: kullanıcı oluştur → ürün oluştur → sipariş oluştur)

Test Coverage
Coverage ölçümü Jest ile yapılmıştır:
npm run test:cov

Coverage Sonuçları
Statements: %83+
Branches: %63+
Functions: %97+
Lines: %88+

Tüm testler: npm test


CI / GitHub Actions
Proje, GitHub Actions ile CI pipeline içerir:
Her push ve pull request’te testler otomatik çalışır
Tüm test sonuçları action loglarında görülebilir
Workflow dosyası:
.github/workflows/tests.yml

Teslim Notları:
Repository public durumdadır
README.md dosyası yönergede istenen tüm bilgileri içerir
Swagger dokümantasyonu aktiftir
Tüm testler başarıyla geçmektedir
Code coverage gereksinimi sağlanmıştır

Öğrenci Bilgileri
Ad Soyad: Ayşe Yeşilyurt
Öğrenci No: 4010930252
