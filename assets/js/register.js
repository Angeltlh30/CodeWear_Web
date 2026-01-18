const loginBtn = document.getElementById("loginBtn");
const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput"); 

loginBtn.addEventListener("click", function () {
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

   /*check*/
    if (!name) {
        alert("Vui lòng nhập tên của bạn");
        return;
    }

    if (!email) {
        alert("Vui lòng nhập email");
        return;
    }
    if (!emailRegex.test(email)) {
        alert("Email không đúng định dạng");
        return;
    }

    if (!password) {
        alert("Vui lòng nhập mật khẩu");
        return;
    }
    if (password.length < 6) {
        alert("Mật khẩu phải có ít nhất 6 ký tự");
        return;
    }

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userName", name);
    localStorage.setItem("userEmail", email);

  
    window.location.href = "../index.html";
});