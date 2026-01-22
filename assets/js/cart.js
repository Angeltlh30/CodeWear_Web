// File: assets/js/cart.js

document.addEventListener('DOMContentLoaded', () => {
    renderCart();
    updateCartCount();
    
    // Gán sự kiện click bằng JS
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', handleCheckout);
    }
});

function renderCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const container = document.getElementById('cart-items-list');
    const subtotalEl = document.getElementById('subtotal');
    const finalTotalEl = document.getElementById('final-total');

    // Nếu giỏ trống
    if (cart.length === 0) {
        if (container) {
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
        }
        if(subtotalEl) subtotalEl.innerText = '0đ';
        if(finalTotalEl) finalTotalEl.innerText = '0đ';
        return;
    }

    let html = '';
    let total = 0;
    cart.forEach((item, index) => {
        let itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        let img = item.image;
        if(img && !img.startsWith('../') && !img.startsWith('http')) img = '../' + img;

        // --- CẬP NHẬT: Hiển thị Size ---
        // Nếu item có size thì tạo badge hiển thị, nếu không thì để trống
        let sizeBadge = item.size 
            ? `<span style="display:inline-block; font-size: 12px; color: #555; background: #f0f0f0; padding: 2px 8px; border-radius: 4px; margin-top: 5px;">Size: <strong>${item.size}</strong></span>` 
            : '';

        html += `
            <div class="cart-item" style="display:flex; justify-content:space-between; align-items:center; padding:15px 0; border-bottom:1px solid #eee;">
                <div style="flex:2; display:flex; gap:15px; align-items:center;">
                    <img src="${img}" style="width:70px; height:70px; object-fit:cover; border-radius:4px; border:1px solid #eee;">
                    <div>
                        <h4 style="margin:0; font-size:16px; font-weight:500;">${item.name}</h4>
                        ${sizeBadge} <div style="margin-top:5px;">
                            <span style="color:red; cursor:pointer; font-size:13px;" onclick="removeItem(${index})"><i class="fas fa-trash"></i> Xóa</span>
                        </div>
                    </div>
                </div>
                <div style="flex:1; text-align:center;">${item.price.toLocaleString()}đ</div>
                <div style="flex:1; text-align:center;">
                    <input type="number" value="${item.quantity}" min="1" style="width:50px; text-align:center; padding:5px; border:1px solid #ddd; border-radius:4px;" onchange="updateQty(${index}, this.value)">
                </div>
                <div style="flex:1; font-weight:bold; text-align:right; color:#1e40af;">${itemTotal.toLocaleString()}đ</div>
            </div>
        `;
    });

    if(container) container.innerHTML = html;
    
    const shipping = 30000;
    const discount = 40000;
    let final = total + shipping - discount;
    if(final < 0) final = 0;

    if(subtotalEl) subtotalEl.innerText = total.toLocaleString() + 'đ';
    if(finalTotalEl) finalTotalEl.innerText = final.toLocaleString() + 'đ';
}

window.removeItem = (index) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart(); updateCartCount();
};

window.updateQty = (index, qty) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if(qty < 1) qty = 1;
    cart[index].quantity = parseInt(qty);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart(); updateCartCount();
};

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((sum, i) => sum + i.quantity, 0);
    const badge = document.getElementById('cart-count');
    if(badge) { 
        badge.innerText = count; 
        badge.style.display = count > 0 ? 'flex' : 'none'; // Flex để căn giữa số
    }
}

// --- XỬ LÝ THANH TOÁN ---
async function handleCheckout() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        alert("Vui lòng đăng nhập!");
        window.location.href = "login.html";
        return;
    }

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        alert("Giỏ hàng trống!");
        return;
    }

    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const btn = document.getElementById('checkoutBtn'); 
    
    if (btn) {
        btn.innerText = "Đang xử lý...";
        btn.disabled = true;
    }

    try {
        const res = await fetch('http://localhost:3000/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: user.id || user._id,
                items: cart, // Gửi toàn bộ cart (đã bao gồm field size) lên server
                totalAmount: totalAmount
            })
        });

        if (res.ok) {
            alert("🎉 Đặt hàng thành công!");
            localStorage.removeItem('cart');
            window.location.href = "order-history.html";
        } else {
            const data = await res.json();
            alert("Lỗi: " + (data.error || "Không thể đặt hàng"));
        }
    } catch (err) {
        console.error(err);
        alert("Lỗi kết nối Server! (Hãy chắc chắn bạn đã chạy 'node src/index.js')");
    } finally {
        if (btn) {
            btn.innerText = "THANH TOÁN";
            btn.disabled = false;
        }
    }
}