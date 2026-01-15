/* =======================================================
   TRANG SẢN PHẨM
   ======================================================= */

const productGrid = document.querySelector('.product-grid');

// Cấu hình ID sản phẩm nào sẽ đóng vai trò là điểm neo (Anchor)
// Ví dụ: Sản phẩm ID "4" sẽ là điểm bắt đầu của mục "tshirt"
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

// Thứ tự hiển thị mong muốn của sản phẩm theo ID
const displayOrder = ["4", "5", "7", "1", "2", "3", "15", "9", "8", "14", "6", "10", "12", "11", "13"];

// --- 1. KHỞI TẠO TRANG ---
async function initProductPage() {
    // Cập nhật số giỏ hàng
    if (typeof updateCartCount === 'function') updateCartCount();

    if (productGrid) {
        productGrid.innerHTML = '<p style="text-align:center; width:100%; margin-top:20px;">Đang tải dữ liệu...</p>';
    }

    try {
        // Lấy data từ MockAPI
        const data = await MockAPI.getAllProducts();

        if (data && data.length > 0) {
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
        let formattedPrice = parseInt(product.price).toLocaleString('vi-VN');
        const imageSrc = product.image ? product.image : '../assets/image/thun1.png';
        const detailLink = `product-detail.html?id=${product.id}`;

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
                        onclick="handleAddToCart('${product.id}', '${product.name}', ${product.price}, '${imageSrc}')">
                        Thêm vào giỏ hàng
                    </button>
                </div>
            </div>
        `;
        productGrid.innerHTML += html;
    });
}

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

document.addEventListener('DOMContentLoaded', initProductPage);