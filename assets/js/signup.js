document.addEventListener('DOMContentLoaded', () => {
    const registerBtn = document.getElementById('registerBtn');

    if (registerBtn) {
        registerBtn.addEventListener('click', async (e) => {
            e.preventDefault();

            // 1. Lấy dữ liệu
            const nameEl = document.getElementById('nameInput');
            const emailEl = document.getElementById('emailInput');
            const passEl = document.getElementById('passwordInput');
            const rePassEl = document.getElementById('repasswordInput');

            const name = nameEl ? nameEl.value.trim() : '';
            const email = emailEl ? emailEl.value.trim() : '';
            const password = passEl ? passEl.value.trim() : '';
            const rePassword = rePassEl ? rePassEl.value.trim() : password; 

            // 2. Validate dữ liệu
            if (!name || !email || !password) {
                alert("Vui lòng điền đầy đủ thông tin!");
                return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert("Email không đúng định dạng!");
                return;
            }

            if (password.length < 6) {
                alert("Mật khẩu phải có ít nhất 6 ký tự!");
                return;
            }
            
            if (rePassEl && password !== rePassword) { 
                alert("Mật khẩu nhập lại không khớp!");
                return;
            }

            // 3. Gọi API Đăng ký
            try {
                registerBtn.innerText = "Đang xử lý...";
                registerBtn.disabled = true; 
                
                // Sử dụng CONFIG thay vì link cứng
                const res = await fetch(`${CONFIG.API_BASE_URL}/api/auth/register`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, password })
                });

                const data = await res.json();

                if (res.ok) {
                    alert("Đăng ký thành công! Hãy đăng nhập ngay.");
                    window.location.href = "login.html";
                } else {
                    alert(data.message || "Đăng ký thất bại. Email có thể đã tồn tại.");
                }
            } catch (err) {
                console.error("Lỗi:", err);
                alert("Lỗi kết nối Server! Vui lòng kiểm tra lại cấu hình API.");
            } finally {
                registerBtn.innerText = "ĐĂNG KÝ";
                registerBtn.disabled = false;
            }
        });
    }
});