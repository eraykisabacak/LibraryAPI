# Kütüphane Yönetim Sistemi

Bu proje, bir kütüphane için üyeleri ve kitapların ödünç alınması işlemlerini yönetebilen bir uygulamayı içermektedir. Projenin çalıştırılabilmesi için bilgisayarınızda Docker'ın kurulu olması gerekmektedir. Docker Compose dosyası kullanılarak PostgreSQL veritabanı ayağa kaldırılacaktır. Proje, Express.js, Joi validator, Knex ORM, PostgreSQL veritabanı, Moment.js, HTTP-status ve dotenv gibi teknolojileri içermektedir. Veritabanında "users", "books" ve "borrowed_books" tabloları bulunmaktadır. Test klasöründe basit testler yazılmıştır. Database dumpını bulabilirsiniz. 

## Kullanılan Teknolojiler

- Express.js
- Joi Validator
- Knex ORM
- PostgreSQL Database
- Moment.js
- HTTP-Status
- Dotenv
- Nodemon (Dev Dependency)

## Veritabanı Tabloları

### Books:

- id
- name
- available

### Users:

- id
- name
### Borrowed Books:

- id
- user_id
- book_id
- returned_at
- score

### Veri Tabanı Yapısı 
![](/Users/eray/WebstormProjects/LibraryAPI/database_design.png)

## Kurulum
Gerekli bağımlılıkları yükleyin:
```bash
npm install
```

Docker ile PostgreSQL'yi başlatın:
```bash
docker-compose up -d
```
Proje kök dizininde aşağıdaki komutu kullanarak tabloları migrate etmelisiniz:
```bash
npx knex migrate:latest
```
Projeyi başlatın.
```bash
npm start
```


## Kullanım

Aşağıda proje tarafından sunulan API'lerin kullanımı hakkında bilgiler bulunmaktadır.

### Get All Users

**Endpoint:** `/users` (GET)

**Açıklama:** Bu endpoint, sistemde kayıtlı olan bütün kullanıcıları listelemek için kullanılır.

### Get User 

**Endpoint:** `/users/:id` (GET)

**Açıklama:** Belirtilen ID'ye sahip kullanıcının bilgilerine erişim sağlar. Aynı zamanda bu kullanıcının geçmişte ödünç aldığı kitaplar ve şu anda ödünç aldığı kitapları görüntüler.

### Create User

**Endpoint:** `/users` (POST)

**Açıklama:** Yeni bir kullanıcı oluşturmak için kullanılır.

**Parametreler:**
- `name` (zorunlu)

-----------
### Get All Books

**Endpoint:** `/books` (GET)

**Açıklama:** Bu endpoint, sistemde kayıtlı olan bütün kitapları listelemek için kullanılır.

### Get Book

**Endpoint:** `/books/:id` (GET)

**Açıklama:** Belirtilen ID'ye sahip kitabın bilgilerine erişim sağlar. Aynı zamanda bu kitabın ortalama değerlendirme puanını görüntüler.


### Create Book

**Endpoint:** `/books` (POST)

**Açıklama:** Bir kullanıcının bilgilerini getirir

**Parametreler:**
- `name` (zorunlu)
-----------
### Borrow Book

**Endpoint:** `/users/:user_id/borrow/:book_id` (POST)

**Açıklama:** Belirtilen kullanıcı tarafından belirtilen kitabı ödünç almak için kullanılır.

### Return and Rate Book

**Endpoint:** `/users/:user_id/return/:book_id` (POST)

**Açıklama:** Belirtilen kullanıcı tarafından ödünç alınan ve belirtilen kitabı iade etmek, aynı zamanda kitaba bir değerlendirme puanı vermek için kullanılır.

**Parametreler:**
- `score` (zorunlu)

