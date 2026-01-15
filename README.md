#  CodeWear by F-Code – Tech-Themed Clothing Pre-order Website

## Giới thiệu

**CodeWear by F-Code** là một dự án website bán áo thun và phụ kiện mang phong cách **code & công nghệ**, được xây dựng nhằm phục vụ **chiến dịch pre-order gây quỹ cho CLB**.

Dự án mô phỏng một website thương mại điện tử cơ bản, tập trung vào:

* Trải nghiệm người dùng (UI/UX)
* Quy trình thiết kế → prototype → code
* Làm việc nhóm với Git & GitHub
* Triển khai website thực tế (deploy)

**DEMO** : https://angeltlh30.github.io/CodeWear_Web/
---

##  Mục tiêu dự án

* Xây dựng website giới thiệu & bán sản phẩm CodeWear
* Minh họa quy trình thiết kế sản phẩm số (Figma → Code)
* Thực hành frontend web (HTML/CSS/JavaScript)
* Gây quỹ cho CLB thông qua hình thức **pre-order**
* Làm việc nhóm theo mô hình phân vai rõ ràng

---

##  Concept sản phẩm

* **Áo thun code design** (Debug, Git, Developer quotes,…)
* **Accessories tech-themed** (notebook, sticker, phụ kiện IT)
  
---

##  Công nghệ sử dụng

* **Figma**: thiết kế UI, design system, prototype
* **HTML**
* **CSS**
* **JavaScript**
* **MockAPI**: giả lập dữ liệu sản phẩm
* **localStorage**: lưu giỏ hàng
* **Deploy**

---

## 📂 Project Structure

```text
CodeWear_Web/
│
├── index.html
│
├── pages/
│   ├── products.html
│   ├── product-detail.html
│   ├── about.html
│   ├── cart.html
│   ├── contact.html
│   └── login.html
│
├── assets/
│   ├── css/
│   │   ├── productDetail.css
│   │   ├── contact.css
│   │   ├── home.css
│   │   ├── products.css
│   │   ├── cart.css
│   │   └── auth.css
│   │
│   ├── js/
│   │   ├── api/
│   │   │   └── mockapi.js
│   │   ├── storage/
│   │   │   └── localStorage.js
│   │   ├── home.js
│   │   ├── products.js
│   │   ├── product-detail.js
│   │   ├── cart.js
│   │   └── login.js
│   │
│   └── images/
│
├── README.md
```

##  Chức năng chính

* Trang chủ giới thiệu thương hiệu CodeWear
* Danh sách sản phẩm (fetch từ MockAPI)
* Chi tiết sản phẩm theo `productId`
* Giỏ hàng:

  * Thêm / xoá sản phẩm
  * Cập nhật số lượng
  * Tính tổng tiền
  * Lưu bằng localStorage
* Trang liên hệ với form validate cơ bản
* Trang giới thiệu
* Animation cơ bản (hover, transition)

---
##  Cách chạy project

1. Clone repository:

```bash
git clone <repo-url>
```

2. Mở file `index.html` bằng trình duyệt (Chrome/Edge)

Vì dùng MockAPI nên cần **kết nối Internet** để fetch dữ liệu.

---

##  Lưu ý

* Đây là dự án học tập & gây quỹ
* Không có thanh toán thật
* Không có backend xử lý đơn hàng
* MockAPI chỉ dùng cho demo

---

##  Tổng kết

**CodeWear by F-Code** là dự án website frontend mô phỏng một hệ thống bán hàng đơn giản, giúp thành viên CLB:

* Rèn luyện kỹ năng thiết kế UI/UX
* Thực hành frontend web
* Làm việc nhóm với Git/GitHub
* Trải nghiệm quy trình làm sản phẩm thực tế

Dự án phục vụ cho **chiến dịch pre-order gây quỹ CLB**, đồng thời là sản phẩm demo để học tập và thuyết trình.

---

*Cảm ơn các bạn đã theo dõi và ủng hộ CodeWear by F-Code!*

---

