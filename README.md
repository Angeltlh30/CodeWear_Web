# 👕 CodeWear by F-Code

### Tech-Themed Clothing Pre-order Website (Frontend + Backend)

## 📌 Giới thiệu

**CodeWear by F-Code** là dự án website bán áo thun và phụ kiện mang phong cách **Code & Công nghệ**, được xây dựng nhằm phục vụ **chiến dịch pre-order gây quỹ cho CLB F-Code**.

Dự án mô phỏng một **hệ thống thương mại điện tử cơ bản**, bao gồm cả **Frontend** và **Backend**, giúp sinh viên thực hành:

- Thiết kế giao diện (UI/UX)
- Xây dựng website bằng HTML/CSS/JavaScript
- Kết nối frontend – backend
- Quản lý mã nguồn với Git & GitHub
- Làm việc nhóm theo mô hình phân vai

---

## 🎯 Mục tiêu dự án

- Xây dựng website giới thiệu & bán sản phẩm CodeWear
- Minh họa quy trình: **Thiết kế → Lập trình → Mở rộng Backend**
- Thực hành phát triển **Frontend Web**
- Làm quen với **Backend NodeJS + MongoDB**
- Phục vụ chiến dịch **pre-order gây quỹ cho CLB**

---

## 🎨 Concept sản phẩm

- **Áo thun – Hoodie** chủ đề lập trình (Code, Git, Debug, Developer quotes)
- **Phụ kiện công nghệ**: sổ tay, lót chuột, móc khóa, túi tote
- Phong cách tối giản – hiện đại – hướng tới sinh viên IT

---

## 🛠️ Công nghệ sử dụng

### 🔹 Frontend

- **HTML5**
- **CSS3**
- **JavaScript (Vanilla JS)**
- **localStorage** (lưu giỏ hàng phía client)
- **GitHub Pages** (deploy frontend)

### 🔹 Backend

- **NodeJS**
- **ExpressJS**
- **MongoDB**
- **Mongoose**
- **dotenv**
- **nodemon**

> Backend hiện tập trung xử lý **đăng ký / đăng nhập người dùng** và lưu trữ dữ liệu vào database.

---

## 📂 Cấu trúc dự án

```text
CodeWear_Web/
│
├── index.html
│
├── pages/
│   ├── products.html
│   ├── product-detail.html
│   ├── cart.html
│   ├── order-history.html
│   ├── about.html
│   ├── contact.html
│   ├── login.html
│   └── signup.html
│
├── assets/
│   ├── css/
│   │   ├── base.css
│   │   ├── layout.css
│   │   ├── home.css
│   │   ├── products.css
│   │   ├── product-detail.css
│   │   ├── cart.css
│   │   ├── order-history.css
│   │   ├── auth.css
│   │   └── contact.css
│   │
│   ├── js/
│   │   ├── api/              # Gọi API (MockAPI / Backend)
│   │   ├── storage/          # localStorage (cart, user)
│   │   │   └── localStorage.js
│   │   │
│   │   ├── home.js
│   │   ├── products.js
│   │   ├── product-detail.js
│   │   ├── cart.js
│   │   ├── order-history.js
│   │   ├── login.js
│   │   └── signup.js
│   │
│   └── image/
│
├── backend/
│   ├── node_modules/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── auth.controllers.js
│   │   ├── models/
│   │   │   └── user.model.js
│   │   └── routes/
│   │       └── index.js
│   │
│   ├── .env
│   ├── nodemon.json
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
└── README.md
```

---

## ⚙️ Chức năng chính

### 🔹 Frontend

- Trang chủ giới thiệu thương hiệu CodeWear
- Danh sách sản phẩm (fetch từ MockAPI)
- Trang chi tiết sản phẩm theo `productId`
- Giỏ hàng:
  - Thêm / xoá sản phẩm
  - Cập nhật số lượng
  - Tính tổng tiền
  - Lưu bằng `localStorage`

- Trang lịch sử đơn hàng (demo UI)
- Trang đăng nhập / đăng ký
- Hiệu ứng hover, transition, responsive cơ bản

### 🔹 Backend

- API đăng ký người dùng
- API đăng nhập người dùng
- Lưu trữ dữ liệu người dùng bằng MongoDB
- Cấu trúc MVC (Model – Controller – Route)

---

## ▶️ Cách chạy dự án

### 1️⃣ Chạy Frontend

```bash
Mở file index.html bằng trình duyệt
```

> Frontend sử dụng MockAPI → cần kết nối Internet

---

### 2️⃣ Chạy Backend

```bash
cd backend
npm install
npm run dev
```

> Đảm bảo đã cấu hình file `.env` để kết nối MongoDB

---

## ⚠️ Lưu ý

- Đây là **dự án học tập & gây quỹ**
- Không có thanh toán online thật
- Backend chưa xử lý đặt hàng & thanh toán
- MockAPI chỉ dùng để demo dữ liệu sản phẩm

---

## 📌 Tổng kết

**CodeWear by F-Code** là dự án mô phỏng website thương mại điện tử, giúp sinh viên:

- Rèn luyện kỹ năng **Frontend Web**
- Làm quen với **Backend NodeJS**
- Hiểu cách kết nối frontend – backend
- Thực hành làm việc nhóm với Git/GitHub
- Trải nghiệm quy trình phát triển sản phẩm thực tế

Dự án phục vụ cho **chiến dịch pre-order gây quỹ CLB F-Code**, đồng thời là **sản phẩm demo cho học tập và thuyết trình**.

---

✨ _Cảm ơn bạn đã quan tâm và ủng hộ CodeWear by F-Code!_

---
