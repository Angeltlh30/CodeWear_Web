/* =======================================================
   KẾT NỐI MOCKAPI VÀ XỬ LÝ SCROLL DANH MỤC
   ======================================================= */

const API_URL = 'https://696216ffd9d64c761906ead2.mockapi.io/products'; 
const productGrid = document.querySelector('.product-grid');

// 2. BẢNG KHỚP NỐI: ID Sản phẩm -> ID HTML 
const categoryAnchors = {
    "4": "tshirt", "1": "hoodie", "3": "totebag", "9": "phonecase", 
    "8": "sticker", "14": "laptop-sticker", "6": "mousepad", 
    "10": "keychain", "12": "notebook", "11": "pen", "13": "combo"
};

// 3. THỨ TỰ SẮP XẾP HIỂN THỊ SẢN PHẨM
const displayOrder = ["4", "5", "7", "1", "2", "3", "15", "9", "8", "14", "6", "10", "12", "11", "13"];

// --- HÀM CHÍNH ---
async function getProducts() {
    updateCartCount(); // Cập nhật icon giỏ hàng khi tải trang

    try {
        productGrid.innerHTML = '<p style="text-align:center; color:#fff;">Đang tải dữ liệu...</p>';
        
        const response = await fetch(API_URL);
        const data = await response.json();
        
        // Sắp xếp dữ liệu
        const sortedData = data.sort((a, b) => {
            return displayOrder.indexOf(a.id) - displayOrder.indexOf(b.id);
        });

        renderProducts(sortedData);

    } catch (error) {
        console.error('Lỗi:', error);
        productGrid.innerHTML = '<p style="text-align:center; color:red;">Lỗi tải dữ liệu.</p>';
    }
}

// --- HÀM VẼ GIAO DIỆN ---
function renderProducts(products) {
    productGrid.innerHTML = ''; 

    products.forEach(product => {
        // 1. Xử lý giá tiền
        let realPrice = product.price;
        if (realPrice < 1000) realPrice = realPrice * 1000;
        let formattedPrice = realPrice.toLocaleString('vi-VN');

        // 2. Xử lý ảnh
        const imageSrc = product.image ? product.image : '../assets/image/thun1.png';

        // 3. Tạo ID neo
        let anchorAttr = categoryAnchors[product.id] ? `id="${categoryAnchors[product.id]}"` : '';

        // 4. Tạo HTML sản phẩm
        const html = `
            <div class="product-card" ${anchorAttr}>
                <div class="card-image">
                    <img src="${imageSrc}" 
                         alt="${product.name}" 
                         class="product-image"
                         onerror="this.src='../assets/image/thun1.png'">
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="price">${formattedPrice}đ</p>
                    
                    <button class="add-to-cart" 
                        onclick="addToCart('${product.id}', '${product.name}', ${realPrice}, '${imageSrc}')">
                        Thêm vào giỏ hàng
                    </button>
                </div>
            </div>
        `;

        productGrid.innerHTML += html;
    });
}

/* =======================================================
   LOGIC GIỎ HÀNG (LOCALSTORAGE)
   ======================================================= */

function addToCart(id, name, price, image) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let existingProduct = cart.find(item => item.id === id);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({
            id: id,
            name: name,
            price: price,
            image: image,
            quantity: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`Đã thêm "${name}" vào giỏ hàng!`);
    
    updateCartCount(); // Gọi hàm cập nhật icon
}

// --- HÀM CẬP NHẬT ICON GIỎ HÀNG ---
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    // Tìm icon giỏ hàng
    const cartIconLink = document.querySelector('.header-icons a[href*="cart"]');
    
    if (cartIconLink) {
        let badge = cartIconLink.querySelector('.cart-badge');
        
        // Nếu chưa có badge thì tạo mới
        if (!badge) {
            badge = document.createElement('span');
            badge.className = 'cart-badge'; 
            cartIconLink.appendChild(badge);
        }

        // Cập nhật số lượng
        badge.innerText = totalCount;

        // Ẩn đi nếu số lượng là 0
        if (totalCount === 0) {
            badge.style.display = 'none';
        } else {
            badge.style.display = 'flex';
        }
    }
}

// Chạy ứng dụng
getProducts();