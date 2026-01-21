﻿const registerBtn = document.getElementById("registerBtn"); 
const nameInput = document.getElementById("fullname");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const rePasswordInput = document.getElementById("re-password");
const registerForm = document.getElementById("register-form");

// Hàm xử lý đăng ký
async function handleRegister(e) {
    e.preventDefault(); // Chặn load lại trang

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const rePassword = rePasswordInput.value.trim();

    // 1. Validate logic
    if (!name || !email || !password) {
        alert("Vui lòng điền đầy đủ thông tin!");
        return;
    }
    
    // Kiểm tra định dạng email (Regex đơn giản)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Email không đúng định dạng!");
        return;
    }

    if (password.length < 6) {
        alert("Mật khẩu phải có ít nhất 6 ký tự!");
        return;
    }
    
    if (password !== rePassword) {
        alert("Mật khẩu nhập lại không khớp!");
        return;
    }

    // 2. Gọi API Đăng ký
    try {
        // Khóa nút để tránh bấm liên tục
        registerBtn.innerText = "Đang xử lý...";
        registerBtn.disabled = true;

        const response = await fetch('http://localhost:3000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();

        if (response.ok) {
            alert("Đăng ký thành công! Hãy đăng nhập ngay.");
            
            window.location.href = "login.html"; 
            
        } else {
            // Hiển thị lỗi chính xác từ Server trả về (VD: "Email đã tồn tại")
            alert(data.error || "Đăng ký thất bại.");
        }
    } catch (error) {
        console.error("Lỗi:", error);
    } finally {
        // Mở lại nút bấm dù thành công hay thất bại
        registerBtn.innerText = "REGISTER";
        registerBtn.disabled = false;
    }
}

// Ưu tiên bắt sự kiện submit của Form để hỗ trợ phím ENTER
if (registerForm) {
    registerForm.addEventListener("submit", handleRegister);
} else if (registerBtn) {
    registerBtn.addEventListener("click", handleRegister);
}
