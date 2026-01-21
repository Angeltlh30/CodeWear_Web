/* =======================================================
   QUẢN LÝ GIỎ HÀNG VỚI LOCALSTORAGE
   ======================================================= */

const CART_KEY = 'cart';

const CartStorage = {
    // 1. Lấy toàn bộ giỏ hàng
    getCart: () => {
        const cart = localStorage.getItem(CART_KEY);
        return cart ? JSON.parse(cart) : [];
    },

    // 2. Lưu giỏ hàng
    saveCart: (cartData) => {
        localStorage.setItem(CART_KEY, JSON.stringify(cartData));
        CartStorage.updateHeaderIcon();
    },

    // 3. Thêm sản phẩm vào giỏ
    addItem: (product) => {
        let cart = CartStorage.getCart();
        let existingItem = cart.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        CartStorage.saveCart(cart);
        alert(`Đã thêm "${product.name}" vào giỏ hàng!`);
    },

    // 4. Cập nhật số lượng (dùng cho trang Cart)
    updateQuantity: (id, delta) => {
        let cart = CartStorage.getCart();
        let index = cart.findIndex(item => item.id === id);

        if (index !== -1) {
            let newQty = cart[index].quantity + delta;
            if (newQty < 1) newQty = 1;
            cart[index].quantity = newQty;
            CartStorage.saveCart(cart);
        }
        return CartStorage.getCart();
    },

    // 5. Xóa sản phẩm
    removeItem: (id) => {
        let cart = CartStorage.getCart();
        cart = cart.filter(item => item.id !== id);
        CartStorage.saveCart(cart);
        return cart;
    },

    // 6. Xóa sạch giỏ hàng 
    clearCart: () => {
        localStorage.removeItem(CART_KEY);
        CartStorage.updateHeaderIcon();
    },

    // 7. Cập nhật Badge số lượng trên Header (Dùng chung cho cả web)
    updateHeaderIcon: () => {
        let cart = CartStorage.getCart();
        let totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

        const cartIconLink = document.querySelector('.header-icons a[href*="cart"]');
        if (cartIconLink) {
            let badge = cartIconLink.querySelector('.cart-badge');
            if (!badge) {
                badge = document.createElement('span');
                badge.className = 'cart-badge';
                cartIconLink.appendChild(badge);
            }
            badge.innerText = totalCount;
            badge.style.display = totalCount === 0 ? 'none' : 'flex';
        }
    }
};