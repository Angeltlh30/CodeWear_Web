/* =======================================================
   TRANG SẢN PHẨM - LOGIC HIỂN THỊ & MUA HÀNG (MONGODB)
   ======================================================= */

document.addEventListener('DOMContentLoaded', () => {
    initProductPage();
    if(typeof updateCartCount === 'function') updateCartCount();
});

const productGrid = document.querySelector('.product-grid');

// --- CẤU HÌNH ĐIỂM NEO (ANCHOR) ---
const categoryAnchors = {
    "4": "tshirt",          // Áo thun
    "1": "hoodie",          // Hoodie F-Code
    "3": "totebag",         // Tote bag
    "9": "phonecase",       // Ốp lưng
    "8": "sticker",         // Bộ Sticker
    "14": "laptop-sticker", // Laptop sticker
    "6": "mousepad",        // Lót chuột
    "10": "keychain",       // Móc khóa
    "12": "notebook",       // Vở
    "11": "pen",            // Bút
    "13": "combo"           // Combo
};

// Thứ tự hiển thị mong muốn 
const displayOrder = ["4", "5", "7", "1", "2", "3", "15", "9", "8", "14", "6", "10", "12", "11", "13"];

// --- 1. KHỞI TẠO TRANG ---
async function initProductPage() {
    if (productGrid) {
        productGrid.innerHTML = '<p style="text-align:center; width:100%; margin-top:20px;">Đang tải dữ liệu từ Server...</p>';
    }

    try {
        // --- SỬ DỤNG CONFIG TỪ FILE config.js ---
        const response = await fetch(`${CONFIG.API_BASE_URL}/api/products`);
        const data = await response.json();

        if (data && data.length > 0) {
            // Sắp xếp sản phẩm
            const sortedData = data.sort((a, b) => {
                const idxA = displayOrder.indexOf(a.id);
                const idxB = displayOrder.indexOf(b.id);
                return (idxA === -1 ? 999 : idxA) - (idxB === -1 ? 999 : idxB);
            });
            renderProducts(sortedData);
        } else {
            productGrid.innerHTML = '<p style="text-align:center;">Không tìm thấy sản phẩm nào.</p>';
        }
    } catch (error) {
        console.error("Lỗi:", error);
        productGrid.innerHTML = '<p style="text-align:center; color:red;">Lỗi kết nối Server! Vui lòng kiểm tra lại cấu hình API.</p>';
    }
}

// --- 2. RENDER SẢN PHẨM ---
function renderProducts(products) {
    if (!productGrid) return;
    productGrid.innerHTML = ''; 
    
    products.forEach(product => {
        let formattedPrice = product.price.toLocaleString('vi-VN');
        
        let imageSrc = product.image || '../assets/image/logoFCode.png';
        if(imageSrc.startsWith('./')) {
            imageSrc = "." + imageSrc; 
        }
        
        const realId = product._id;
        const detailLink = `product-detail.html?id=${realId}`;

        let anchorId = categoryAnchors[product.id] || ""; 
        let anchorAttr = anchorId ? `id="${anchorId}"` : "";

        const html = `
            <div class="product-card" ${anchorAttr} style="scroll-margin-top: 100px;">
                <div class="product-image">
                    <a href="${detailLink}">
                        <img src="${imageSrc}" alt="${product.name}" 
                             style="width:100%; height:100%; object-fit:contain;"
                             onerror="this.src='../assets/image/logoFCode.png'">
                    </a>
                </div>
                <div class="product-info">
                    <h3>
                        <a href="${detailLink}" style="text-decoration:none; color:inherit;">
                            ${product.name}
                        </a>
                    </h3>
                    <p class="price">${formattedPrice}đ</p>
                    
                    <button class="add-to-cart" 
                        onclick="addToCartLocal('${realId}', '${product.name}', ${product.price}, '${imageSrc}')">
                        Thêm vào giỏ hàng
                    </button>
                </div>
            </div>
        `;
        productGrid.innerHTML += html;
    });
}

// --- 3. XỬ LÝ SỰ KIỆN MUA HÀNG ---
window.addToCartLocal = (id, name, price, image) => {
    // 1. Kiểm tra đăng nhập
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        if(confirm("Bạn cần đăng nhập để mua hàng. Đến trang đăng nhập ngay?")) {
            window.location.href = "login.html"; 
        }
        return;
    }

    // 2. Thêm vào giỏ hàng LocalStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, name, price, image, quantity: 1, size: "Free Size" });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    
    alert(`Đã thêm "${name}" vào giỏ hàng!`);
    
    if(typeof updateCartCount === 'function') updateCartCount();
};

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badge = document.getElementById('cart-count');
    if (badge) {
        badge.innerText = count;
        badge.style.display = count > 0 ? 'block' : 'none';
    }
}
