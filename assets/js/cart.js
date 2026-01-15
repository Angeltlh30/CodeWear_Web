document.addEventListener('DOMContentLoaded', () => {
    renderCart();
    updateCartCount(); 
});

// Hàm xóa sản phẩm
window.removeItem = function(index) {
    if (!confirm("Bạn có chắc muốn xóa sản phẩm này?")) return;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    
    renderCart();
    updateCartCount();
}

// Hàm cập nhật số lượng
window.updateQty = function(index, newQty) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let qty = parseInt(newQty);

    if (isNaN(qty) || qty < 1) qty = 1;
    
    cart[index].quantity = qty;
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    updateCartCount();
}

// Hàm hiển thị giỏ hàng
function renderCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const container = document.getElementById('cart-items-list');
    const subtotalEl = document.getElementById('subtotal');
    const finalTotalEl = document.getElementById('final-total');

    if (cart.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 60px 20px;">
                <img src="../assets/image/shopping-cart.png" style="width: 80px; opacity: 0.3; margin-bottom: 20px;">
                <h3 style="color: #555; margin-bottom: 10px; font-size: 20px;">Giỏ hàng của bạn đang trống</h3>
                <p style="color: #888; margin-bottom: 30px;">Hãy dạo một vòng và chọn những món đồ ưng ý nhé!</p>
                <a href="products.html" style="
                    background: #1e40af; 
                    color: white; 
                    padding: 12px 35px; 
                    border-radius: 30px; 
                    text-decoration: none; 
                    font-weight: 600; 
                    box-shadow: 0 4px 15px rgba(30, 64, 175, 0.3);
                    transition: 0.3s;
                " onmouseover="this.style.transform='translateY(-2px)'" 
                  onmouseout="this.style.transform='translateY(0)'">
                    Tiếp tục mua sắm
                </a>
            </div>
        `;
        subtotalEl.innerText = '0đ';
        finalTotalEl.innerText = '0đ';
        return;
    }
    // ========================================================

    let html = '';
    let total = 0;

    cart.forEach((item, index) => {
        let itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        let imgSrc = item.image;
        if (imgSrc && imgSrc.startsWith('./')) {
            imgSrc = '.' + imgSrc; 
        }

        html += `
            <div class="cart-item" style="display: flex; align-items: center; justify-content: space-between; padding: 20px 0; border-bottom: 1px solid #eee;">
                <div class="item-info" style="display: flex; align-items: center; gap: 15px; flex: 2;">
                    <img src="${imgSrc}" style="width: 70px; height: 70px; object-fit: cover; border-radius: 10px; border: 1px solid #f0f0f0;">
                    <div>
                        <h4 style="margin: 0 0 5px 0; font-size: 16px; color: #333;">${item.name}</h4>
                        <span style="font-size: 13px; color: #ff4d4d; cursor: pointer; font-weight: 500; display: inline-flex; align-items: center; gap: 5px;" 
                              onclick="window.removeItem(${index})">
                              <i class="fas fa-trash-alt"></i> Xóa
                        </span>
                    </div>
                </div>
                
                <div class="item-price" style="flex: 1; color: #555; font-weight: 500;">${item.price.toLocaleString()}đ</div>
                
                <div class="item-qty" style="flex: 1;">
                    <input type="number" min="1" value="${item.quantity}" 
                           onchange="window.updateQty(${index}, this.value)" 
                           style="width: 60px; padding: 5px 10px; border-radius: 8px; border: 1px solid #ddd; outline: none; text-align: center;">
                </div>

                <div class="item-total" style="flex: 1; font-weight: bold; color: #1e40af; font-size: 16px;">
                    ${itemTotal.toLocaleString()}đ
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
    
    const shipping = 30000;
    const discount = 40000; 
    
    let finalAmount = total + shipping - discount;
    if (finalAmount < 0) finalAmount = 0;

    subtotalEl.innerText = total.toLocaleString() + 'đ';
    finalTotalEl.innerText = finalAmount.toLocaleString() + 'đ';
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badge = document.getElementById('cart-count');
    if (badge) {
        badge.innerText = totalCount;
        badge.style.display = totalCount > 0 ? 'block' : 'none';
    }
}

// Xử lý Đặt hàng
window.handleCheckout = function() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if(cart.length === 0) {
        alert("Giỏ hàng của bạn đang trống! Vui lòng thêm sản phẩm trước khi đặt hàng.");
        return; 
    }

    alert("🎉 Đặt hàng thành công! Cảm ơn bạn đã mua sắm tại CodeWear.");

    localStorage.removeItem('cart'); 
    renderCart();
    updateCartCount();
}