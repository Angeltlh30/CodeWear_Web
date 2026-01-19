document.addEventListener("DOMContentLoaded", () => {
  // Nút mua lại
  const buyAgainBtns = document.querySelectorAll(".btn-danger");

  buyAgainBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      alert("Đã thêm sản phẩm vào giỏ hàng!");
    });
  });

  // Nút hoàn tiền
  const refundBtns = document.querySelectorAll(".btn-outline");

  refundBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      alert("Yêu cầu hoàn tiền đã được gửi!");
    });
  });
});
