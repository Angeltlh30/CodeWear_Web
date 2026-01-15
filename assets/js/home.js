const isLoggedIn = localStorage.getItem("isLoggedIn");

if (!isLoggedIn) {
    window.location.href = "./pages/login.html";
}

document.addEventListener('DOMContentLoaded', () => {
    // 1. Khởi tạo giỏ hàng từ LocalStorage
    updateCartCount();

    // 2. Gắn sự kiện click cho tất cả nút "Thêm vào giỏ hàng"
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Lấy dữ liệu từ thuộc tính data- trong HTML
            const product = {
                id: this.getAttribute('data-id'),
                name: this.getAttribute('data-name'),
                price: parseInt(this.getAttribute('data-price')),
                image: this.getAttribute('data-img'),
                quantity: 1
            };

            addToCart(product);
        });
    });
});

// Hàm thêm sản phẩm vào giỏ
function addToCart(productToAdd) {
    // Lấy giỏ hàng hiện tại hoặc mảng rỗng nếu chưa có
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Kiểm tra sản phẩm đã có trong giỏ chưa
    const existingProductIndex = cart.findIndex(item => item.id === productToAdd.id);

    if (existingProductIndex > -1) {
        // Nếu có rồi thì tăng số lượng
        cart[existingProductIndex].quantity += 1;
    } else {
        // Nếu chưa có thì thêm mới
        cart.push(productToAdd);
    }

    // Lưu lại vào LocalStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Cập nhật số lượng trên icon và thông báo
    updateCartCount();
    alert(`Đã thêm "${productToAdd.name}" vào giỏ hàng!`);
}

// Hàm cập nhật số lượng hiển thị trên icon giỏ hàng
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    const countElement = document.getElementById('cart-count');
    if (countElement) {
        countElement.innerText = totalCount;
        countElement.style.display = totalCount > 0 ? 'block' : 'none';
    }
}