const loginBtn = document.getElementById("loginBtn");
const emailInput = document.getElementById("emailInput");

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
