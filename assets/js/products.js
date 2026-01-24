/* =======================================================
   TRANG SẢN PHẨM - LOGIC HIỂN THỊ & MUA HÀNG (MONGODB)
   ======================================================= */

const productGrid = document.querySelector('.product-grid');

// Cấu hình ID sản phẩm nào sẽ đóng vai trò là điểm neo (Anchor)
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

// Thứ tự hiển thị mong muốn
const displayOrder = ["4", "5", "7", "1", "2", "3", "15", "9", "8", "14", "6", "10", "12", "11", "13"];

// --- 1. KHỞI TẠO TRANG ---
async function initProductPage() {
    // Cập nhật số giỏ hàng trên Header
    if (typeof updateCartCount === 'function') updateCartCount();

    if (productGrid) {
        productGrid.innerHTML = '<p style="text-align:center; width:100%; margin-top:20px;">Đang tải dữ liệu từ Server...</p>';
    }

    try {
        // === THAY ĐỔI: GỌI API MONGODB ===
        const response = await fetch('http://localhost:3000/api/products');
        const data = await response.json();

        if (data && data.length > 0) {
            // Sắp xếp sản phẩm theo ý muốn (Giữ nguyên logic của bạn)
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
        productGrid.innerHTML = '<p style="text-align:center; color:red;">Lỗi kết nối Server Backend! (Hãy kiểm tra lại node src/index.js)</p>';
    }
}

// --- 2. RENDER SẢN PHẨM ---
function renderProducts(products) {
    if (!productGrid) return;
    productGrid.innerHTML = ''; 
    
    products.forEach(product => {
        // Format giá tiền
        let formattedPrice = parseInt(product.price).toLocaleString('vi-VN');
        
        // === THAY ĐỔI: FIX ĐƯỜNG DẪN ẢNH ===
        // Vì file này chạy ở /pages/products.html nên ảnh cần có ../ đằng trước
        let imageSrc = product.image;
        if(imageSrc && !imageSrc.startsWith('../') && !imageSrc.startsWith('http')) {
            imageSrc = '../' + imageSrc;
        }
        
        const detailLink = `product-detail.html?id=${product.id}`;

        // Tạo id để cuộn trang (Anchor)
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
                    
                    <button class="add-to-cart" 
                        onclick="addToCartLocal('${product.id}', '${product.name}', ${product.price}, '${imageSrc}')">
                        Thêm vào giỏ hàng
                    </button>
                </div>
            </div>
        `;
        productGrid.innerHTML += html;
    });
}

// --- 3. XỬ LÝ SỰ KIỆN MUA HÀNG (LƯU LOCALSTORAGE) ---
// Đổi tên hàm thành addToCartLocal để đồng bộ với các file khác
window.addToCartLocal = (id, name, price, image) => {
    
    // BƯỚC 1: KIỂM TRA ĐĂNG NHẬP
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
        if(confirm("Bạn cần đăng nhập để mua hàng. Đến trang đăng nhập ngay?")) {
            window.location.href = "login.html"; 
        }
        return;
    }

    // BƯỚC 2: THỰC HIỆN THÊM VÀO GIỎ (LocalStorage)
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Kiểm tra trùng sản phẩm (Dựa theo ID)
    let existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, name, price, image, quantity: 1 });
    }
    
    // Lưu lại
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Thông báo & Cập nhật icon
    alert(`Đã thêm "${name}" vào giỏ hàng!`);
    if(typeof updateCartCount === 'function') updateCartCount();
};

// Hàm cập nhật icon giỏ hàng (Để file này chạy độc lập được)
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badge = document.getElementById('cart-count');
    if (badge) {
        badge.innerText = count;
        badge.style.display = count > 0 ? 'block' : 'none';
    }
}

// Chạy khởi tạo khi trang tải xong
document.addEventListener('DOMContentLoaded', initProductPage);