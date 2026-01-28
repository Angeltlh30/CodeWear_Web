document.addEventListener('DOMContentLoaded', () => {
    // Lấy nút đăng nhập
    const loginBtn = document.getElementById('loginBtn');

    if (loginBtn) {
        loginBtn.addEventListener('click', async (e) => {
            e.preventDefault(); 

            // Lấy dữ liệu từ input
            const email = document.getElementById('emailInput').value.trim();
            const password = document.getElementById('passwordInput').value.trim();

            // 1. Kiểm tra dữ liệu nhập
            if (!email || !password) {
                alert("Vui lòng nhập đầy đủ Email và Mật khẩu!");
                return;
            }

            // Lưu lại chữ ban đầu ("SIGN IN") để dùng lại sau
            const originalText = loginBtn.innerText; 

            // 2. Gọi API đăng nhập
            try {
                // Hiệu ứng loading
                loginBtn.innerText = "Đang xử lý...";
                loginBtn.disabled = true;

                // Sử dụng biến CONFIG
                const res = await fetch(`${CONFIG.API_BASE_URL}/api/auth/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });

                const data = await res.json();

                if (res.ok) {
                    // Đăng nhập thành công -> Lưu thông tin
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('user', JSON.stringify(data.user)); //

                    alert("Đăng nhập thành công!");
                    
                    // Chuyển về trang chủ (Lùi ra 1 cấp thư mục)
                    window.location.href = "../index.html"; 
                } else {
                    // Đăng nhập thất bại (Sai mật khẩu/Email không tồn tại)
                    // Hiện thông báo lỗi từ server trả về
                    alert(data.message || "Email hoặc mật khẩu không đúng!");
                }
            } catch (error) {
                console.error("Lỗi:", error);
                alert("Lỗi kết nối Server! Vui lòng thử lại sau.");
            } finally {
                loginBtn.innerText = originalText; 
                loginBtn.disabled = false;
            }
        });
    }
});