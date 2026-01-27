document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('loginBtn');

    if (loginBtn) {
        loginBtn.addEventListener('click', async (e) => {
            e.preventDefault();

            // 1. Lấy dữ liệu Input
            const email = document.getElementById('emailInput').value.trim();
            const password = document.getElementById('passwordInput').value.trim();

            // 2. Validate dữ liệu
            if (!email || !password) {
                alert("Vui lòng nhập đầy đủ Email và Mật khẩu!");
                return;
            }

            // 3. Gọi API Đăng nhập
            try {
                const originalText = loginBtn.innerText;
                loginBtn.innerText = "Đang xử lý...";
                loginBtn.disabled = true;

                // Sử dụng biến CONFIG thay vì link cứng
                const res = await fetch(`${CONFIG.API_BASE_URL}/api/auth/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });

                const data = await res.json();

                if (res.ok) {
                    // 4. Đăng nhập thành công
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('user', JSON.stringify(data.user));

                    alert("Đăng nhập thành công!");
                    window.location.href = "../index.html"; 
                } else {
                    alert(data.message || "Email hoặc mật khẩu không đúng!");
                }
            } catch (error) {
                console.error("Lỗi:", error);
                alert("Lỗi kết nối Server! Vui lòng kiểm tra lại cấu hình API.");
            } finally {
                loginBtn.innerText = "ĐĂNG NHẬP"; 
                loginBtn.disabled = false;
            }
        });
    }
});
