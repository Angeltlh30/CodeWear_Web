/* =======================================================
<<<<<<< HEAD
   TRANG SẢN PHẨM - LOGIC HIỂN THỊ & MUA HÀNG
=======
   TRANG SẢN PHẨM
>>>>>>> 412153e7ee6a94b1b2ab610f12f6b7a56ae885a3
   ======================================================= */

const productGrid = document.querySelector('.product-grid');

// Cấu hình ID sản phẩm nào sẽ đóng vai trò là điểm neo (Anchor)
<<<<<<< HEAD
=======
// Ví dụ: Sản phẩm ID "4" sẽ là điểm bắt đầu của mục "tshirt"
>>>>>>> 412153e7ee6a94b1b2ab610f12f6b7a56ae885a3
const categoryAnchors = {
    "4": "tshirt", 
    "1": "hoodie", 
    "3": "totebag", 
    "9": "phonecase", 
    "8": "sticker", 
    "14": "laptop-sticker", 
    "6": "mousepad", 
    "10": "keychain", 
    "12": "notebook", 
    "11": "pen", 
    "13": "combo"
};

<<<<<<< HEAD
// Thứ tự hiển thị mong muốn
=======
// Thứ tự hiển thị mong muốn của sản phẩm theo ID
>>>>>>> 412153e7ee6a94b1b2ab610f12f6b7a56ae885a3
const displayOrder = ["4", "5", "7", "1", "2", "3", "15", "9", "8", "14", "6", "10", "12", "11", "13"];

// --- 1. KHỞI TẠO TRANG ---
async function initProductPage() {
<<<<<<< HEAD
    // Cập nhật số giỏ hàng trên Header (nếu có hàm này)
=======
    // Cập nhật số giỏ hàng
>>>>>>> 412153e7ee6a94b1b2ab610f12f6b7a56ae885a3
    if (typeof updateCartCount === 'function') updateCartCount();

    if (productGrid) {
        productGrid.innerHTML = '<p style="text-align:center; width:100%; margin-top:20px;">Đang tải dữ liệu...</p>';
    }

    try {
<<<<<<< HEAD
        // Lấy data từ MockAPI 
        const data = await MockAPI.getAllProducts();

        if (data && data.length > 0) {
            // Sắp xếp sản phẩm theo ý muốn
=======
        // Lấy data từ MockAPI
        const data = await MockAPI.getAllProducts();

        if (data && data.length > 0) {
>>>>>>> 412153e7ee6a94b1b2ab610f12f6b7a56ae885a3
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
        productGrid.innerHTML = '<p style="text-align:center; color:red;">Lỗi kết nối dữ liệu!</p>';
    }
}

// --- 2. RENDER SẢN PHẨM ---
function renderProducts(products) {
    if (!productGrid) return;
    productGrid.innerHTML = ''; 
    
    products.forEach(product => {
<<<<<<< HEAD
        // Format giá tiền
=======
>>>>>>> 412153e7ee6a94b1b2ab610f12f6b7a56ae885a3
        let formattedPrice = parseInt(product.price).toLocaleString('vi-VN');
        const imageSrc = product.image ? product.image : '../assets/image/thun1.png';
        const detailLink = `product-detail.html?id=${product.id}`;

<<<<<<< HEAD
        // Tạo id để cuộn trang (Anchor)
=======
>>>>>>> 412153e7ee6a94b1b2ab610f12f6b7a56ae885a3
        let anchorAttr = categoryAnchors[product.id] ? `id="${categoryAnchors[product.id]}"` : '';

        const html = `
            <div class="product-card" ${anchorAttr} style="scroll-margin-top: 120px;">
                <div class="product-image">
                    <a href="${detailLink}">
                        <img src="${imageSrc}" alt="${product.name}" style="width:100%; height:100%; object-fit:contain;">
                    </a>
                </div>
                <div class="product-info">
                    <h3><a href="${detailLink}">${product.name}</a></h3>
                    <p class="price">${formattedPrice}đ</p>
<<<<<<< HEAD
                    
=======
>>>>>>> 412153e7ee6a94b1b2ab610f12f6b7a56ae885a3
                    <button class="add-to-cart" 
                        onclick="handleAddToCart('${product.id}', '${product.name}', ${product.price}, '${imageSrc}')">
                        Thêm vào giỏ hàng
                    </button>
                </div>
            </div>
        `;
        productGrid.innerHTML += html;
    });
}

<<<<<<< HEAD
// --- 3. XỬ LÝ SỰ KIỆN MUA HÀNG ---
window.handleAddToCart = (id, name, price, image) => {
    
    // BƯỚC 1: KIỂM TRA ĐĂNG NHẬP
    // Lấy thông tin user từ bộ nhớ trình duyệt
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
        // Nếu chưa đăng nhập -> Thông báo và hỏi chuyển trang
        if(confirm("Bạn cần đăng nhập để mua hàng. Đến trang đăng nhập ngay?")) {
            window.location.href = "login.html"; 
        }
        return; // Dừng lại, không thêm vào giỏ
    }

    // BƯỚC 2: THỰC HIỆN THÊM VÀO GIỎ
    // Kiểm tra xem hàm addToCart (trong home.js) có tồn tại không
    if (typeof addToCart === 'function') {
        // Gọi hàm bên home.js để xử lý logic lưu vào localStorage
        addToCart(name, price, image); 
    } else {
        // Fallback nếu không tìm thấy file home.js
        console.warn("Không tìm thấy hàm addToCart, đang xử lý thủ công...");
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ name, price, image, quantity: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`Đã thêm "${name}" vào giỏ hàng!`);
        if(typeof updateCartCount === 'function') updateCartCount();
    }
};

// Chạy khởi tạo khi trang tải xong
=======
// --- 3. XỬ LÝ SỰ KIỆN ---
window.handleAddToCart = (id, name, price, image) => {
    if (typeof addToCart === 'function') {
        addToCart({ id, name, price, image, quantity: 1 });
    } else {
        alert("Chức năng giỏ hàng chưa sẵn sàng.");
    }
};

// Tìm kiếm đơn giản 
const searchInput = document.getElementById('search-input');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const keyword = e.target.value.toLowerCase();
        const cards = document.querySelectorAll('.product-card');
        cards.forEach(card => {
            const text = card.innerText.toLowerCase();
            if(text.includes(keyword)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

>>>>>>> 412153e7ee6a94b1b2ab610f12f6b7a56ae885a3
document.addEventListener('DOMContentLoaded', initProductPage);