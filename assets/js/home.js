document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    
    // Gắn sự kiện cho các nút "Thêm vào giỏ" ở trang chủ (nếu có)
    const btns = document.querySelectorAll('.add-to-cart');
    btns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Lấy dữ liệu từ data attribute
            const id = this.getAttribute('data-id');
            const name = this.getAttribute('data-name');
            const price = parseInt(this.getAttribute('data-price'));
            let image = this.getAttribute('data-img');

            // Fix ảnh cho trang chủ (Cần ./assets thay vì ../assets)
            if(image && image.startsWith('../')) {
                image = image.replace('../', './');
            }

            addToCartLocalHome(id, name, price, image);
        });
    });
});

function addToCartLocalHome(id, name, price, image) {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        if(confirm("Bạn cần đăng nhập. Đến trang đăng nhập?")) window.location.href = "./pages/login.html";
        return;
    }

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find(item => item.id === id);

    if (existing) existing.quantity += 1;
    else cart.push({ id, name, price, image, quantity: 1 });

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`Đã thêm "${name}" vào giỏ!`);
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badge = document.getElementById('cart-count');
    if (badge) {
        badge.innerText = count;
        badge.style.display = count > 0 ? 'block' : 'none';
    }
}