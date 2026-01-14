/* =======================================================
   TRANG GIỎ HÀNG (LOGIC UI)
   ======================================================= */
const SHIPPING_FEE = 30000;
const DISCOUNT_AMOUNT = 40000;

document.addEventListener('DOMContentLoaded', () => {
    // Load giỏ hàng lần đầu
    renderCartUI();
});

function renderCartUI() {
    // Lấy dữ liệu từ Storage
    const cart = CartStorage.getCart(); // Gọi từ localStorage.js
    const listContainer = document.getElementById('cart-items-list');
    
    if (cart.length === 0) {
        listContainer.innerHTML = `
            <div style="text-align: center; padding: 50px; color: #888;">
                <i class="fa-solid fa-box-open" style="font-size: 3rem; margin-bottom: 15px; display: block;"></i>
                <p>Giỏ hàng trống</p>
                <a href="products.html" style="color: #28a745;">Tiếp tục mua sắm</a>
            </div>`;
        updateSummary(cart);
        return;
    }

    listContainer.innerHTML = cart.map(item => {
        const totalItemPrice = item.price * item.quantity;
        const imgSrc = item.image ? item.image : '../assets/image/thun1.png';
        return `
        <div class="product-card">
            <div class="product-info">
                <img src="${imgSrc}" onerror="this.src='../assets/image/thun1.png'">
                <div class="product-details">
                    <h3>${item.name}</h3>
                    <div class="quantity-box">
                        <button onclick="changeQty('${item.id}', -1)">-</button>
                        <input type="text" value="${item.quantity}" readonly>
                        <button onclick="changeQty('${item.id}', 1)">+</button>
                    </div>
                </div>
            </div>
            <div class="unit-price">${item.price.toLocaleString()}đ</div>
            <div class="total-item-price">${totalItemPrice.toLocaleString()}đ</div>
            <button class="delete-item" onclick="removeItem('${item.id}')"><i class="fa fa-trash"></i></button>
        </div>`;
    }).join('');

    updateSummary(cart);
}

function updateSummary(cart) {
    let subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let finalTotal = subtotal > 0 ? (subtotal + SHIPPING_FEE - DISCOUNT_AMOUNT) : 0;
    if (finalTotal < 0) finalTotal = 0;

    document.getElementById('subtotal').innerText = subtotal.toLocaleString() + 'đ';
    document.getElementById('final-total').innerText = finalTotal.toLocaleString() + 'đ';
}

// --- CÁC HÀM XỬ LÝ SỰ KIỆN (GẮN VÀO WINDOW) ---

window.changeQty = (id, delta) => {
    CartStorage.updateQuantity(id, delta); // Gọi Storage xử lý logic
    renderCartUI(); // Vẽ lại giao diện
};

window.removeItem = (id) => {
    if(confirm("Xóa sản phẩm này?")) {
        CartStorage.removeItem(id); // Gọi Storage xử lý logic
        renderCartUI(); // Vẽ lại giao diện
    }
};

window.handleCheckout = () => {
    const cart = CartStorage.getCart();
    if (cart.length === 0) {
        alert("Giỏ hàng trống!");
        return;
    }
    const total = document.getElementById('final-total').innerText;
    alert(`Đặt hàng thành công! Tổng: ${total}`);
    
    CartStorage.clearCart(); // Xóa Storage
    renderCartUI(); // Vẽ lại giao diện
};