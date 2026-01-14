// =========================================================
// CẤU HÌNH VÀ KHỞI TẠO
// =========================================================
const SHIPPING_FEE = 30000;
const DISCOUNT_AMOUNT = 40000; 

// Biến lưu trữ giỏ hàng
let cart = [];

// Khởi chạy khi trang tải xong
document.addEventListener('DOMContentLoaded', () => {
    loadCartData();
});

/**
 * 1. TẢI DỮ LIỆU TỪ LOCALSTORAGE
 */
function loadCartData() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    } else {
        cart = [];
    }
    renderCart();
}

/**
 * 2. HIỂN THỊ GIAO DIỆN
 */
function renderCart() {
    const listContainer = document.getElementById('cart-items-list');
    
    // Nếu giỏ hàng trống
    if (cart.length === 0) {
        listContainer.innerHTML = `
            <div style="text-align: center; padding: 50px; color: #888;">
                <i class="fa-solid fa-box-open" style="font-size: 3rem; margin-bottom: 15px; display: block;"></i>
                <p style="font-size: 1.2rem; font-weight: 500;">Giỏ hàng trống</p>
                <a href="products.html" style="color: #28a745; text-decoration: none; font-size: 0.9rem;">Tiếp tục mua sắm</a>
            </div>
        `;
        updateSummary(); 
        return;
    }

    // Nếu có sản phẩm
    listContainer.innerHTML = cart.map((item) => {
        const totalItemPrice = item.price * item.quantity;
        const imgSrc = item.image ? item.image : '../assets/image/thun1.png';

        return `
        <div class="product-card" data-id="${item.id}">
            <div class="product-info">
                <img src="${imgSrc}" alt="${item.name}" onerror="this.src='../assets/image/thun1.png'">
                <div class="product-details">
                    <h3>${item.name}</h3>
                    <p style="color: #666; font-size: 0.9rem;">Mã SP: #${item.id}</p>
                    
                    <div class="quantity-box">
                        <span>Số lượng:</span>
                        <button onclick="changeQty('${item.id}', -1)">-</button>
                        <input type="text" value="${item.quantity}" readonly>
                        <button onclick="changeQty('${item.id}', 1)">+</button>
                    </div>
                </div>
            </div>
            
            <div class="unit-price">${item.price.toLocaleString()}đ</div>
            
            <div class="total-item-price">
                ${totalItemPrice.toLocaleString()}đ
            </div>
            
            <button class="delete-item" onclick="removeProduct('${item.id}')">
                <i class="fa fa-trash"></i>
            </button>
        </div>
        `;
    }).join('');

    updateSummary();
}

/**
 * 3. TÍNH TỔNG TIỀN
 */
function updateSummary() {
    let subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const shipping = subtotal > 0 ? SHIPPING_FEE : 0;
    const discount = subtotal > 0 ? DISCOUNT_AMOUNT : 0;
    
    let finalTotal = subtotal + shipping - discount;
    if (finalTotal < 0) finalTotal = 0;

    const subtotalEl = document.getElementById('subtotal');
    const finalTotalEl = document.getElementById('final-total');

    if(subtotalEl) subtotalEl.innerText = subtotal.toLocaleString() + 'đ';
    if(finalTotalEl) finalTotalEl.innerText = finalTotal.toLocaleString() + 'đ';
}

/**
 * 4. THAY ĐỔI SỐ LƯỢNG
 */
window.changeQty = function(id, delta) {
    const itemIndex = cart.findIndex(product => product.id === id);
    if (itemIndex !== -1) {
        let newQty = cart[itemIndex].quantity + delta;
        if (newQty < 1) newQty = 1;
        cart[itemIndex].quantity = newQty;
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }
};

/**
 * 5. XÓA SẢN PHẨM
 */
window.removeProduct = function(id) {
    if(confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
        cart = cart.filter(product => product.id !== id);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }
};

/**
 * 6. XỬ LÝ ĐẶT HÀNG 
 */
window.handleCheckout = function() {
    // Nếu giỏ hàng trống thì chặn lại
    if (cart.length === 0) {
        alert("Giỏ hàng trống, vui lòng chọn sản phẩm!");
        return;
    }

    const total = document.getElementById('final-total').innerText;
    
    // 1. Thông báo thành công
    alert(`Đặt hàng thành công! Đơn hàng trị giá ${total} đang được xử lý.`);
    
    // 2. Xóa dữ liệu trong biến
    cart = [];

    // 3. Xóa dữ liệu trong LocalStorage 
    localStorage.setItem('cart', JSON.stringify([]));

    // 4. Vẽ lại giao diện giỏ hàng
    renderCart();
};