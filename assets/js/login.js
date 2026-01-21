const loginBtn = document.getElementById("loginBtn");
const emailInput = document.getElementById("emailInput");
<<<<<<< HEAD
const passwordInput = document.getElementById("passwordInput");

if (loginBtn) {
    loginBtn.addEventListener("click", async function (e) {
        e.preventDefault(); 

        // 1. Lấy giá trị từ ô nhập
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        // 2. Validate cơ bản
        if (!email || !password) {
            alert("Vui lòng nhập đầy đủ Email và Mật khẩu!");
            return;
        }

        // 3. Gọi API Đăng nhập
        try {
            loginBtn.innerText = "Đang xử lý...";
            loginBtn.disabled = true;

            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                // --- QUAN TRỌNG: Lưu phiên đăng nhập ---
                // Lưu object user vào bộ nhớ trình duyệt để dùng ở các trang khác
                localStorage.setItem("user", JSON.stringify(data.user)); 
                
                alert("Đăng nhập thành công!");
                
                // Chuyển hướng về trang chủ 
                window.location.href = "../index.html"; 
            } else {
                alert(data.error || "Đăng nhập thất bại! Kiểm tra lại email/password.");
            }
        } catch (error) {
            console.error("Lỗi kết nối:", error);
        } finally {
            loginBtn.innerText = "SIGN IN";
            loginBtn.disabled = false;
        }
    });
}
=======

loginBtn.addEventListener("click", function () {
  const email = emailInput.value.trim();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email) {
    alert("Vui lòng nhập email");
    return;
  }

  if (!emailRegex.test(email)) {
    alert("Email không đúng định dạng");
    return;
  }

  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("userEmail", email);

  window.location.href = "../index.html";
});
>>>>>>> 412153e7ee6a94b1b2ab610f12f6b7a56ae885a3
