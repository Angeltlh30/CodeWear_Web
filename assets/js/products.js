/* =======================================================
   TRANG SẢN PHẨM (UI LOGIC)
   ======================================================= */

const productGrid = document.querySelector('.product-grid');

// Cấu hình Neo danh mục
const categoryAnchors = {
    "4": "tshirt", "1": "hoodie", "3": "totebag", "9": "phonecase", 
    "8": "sticker", "14": "laptop-sticker", "6": "mousepad", 
    "10": "keychain", "12": "notebook", "11": "pen", "13": "combo"
};

const displayOrder = ["4", "5", "7", "1", "2", "3", "15", "9", "8", "14", "6", "10", "12", "11", "13"];

// --- HÀM CHÍNH ---
async function initProductPage() {
    // 1. Cập nhật icon giỏ hàng từ Storage
    CartStorage.updateHeaderIcon();

    // 2. Tải dữ liệu từ MockAPI
    productGrid.innerHTML = '<p style="text-align:center; color:#fff;">Đang tải dữ liệu...</p>';
    const data = await MockAPI.getAllProducts(); 

    if (data.length > 0) {
        // Sắp xếp
        const sortedData = data.sort((a, b) => displayOrder.indexOf(a.id) - displayOrder.indexOf(b.id));
        renderProducts(sortedData);
    } else {
        productGrid.innerHTML = '<p style="text-align:center; color:red;">Không tải được sản phẩm.</p>';
    }
}

// --- RENDER UI ---
function renderProducts(products) {
    productGrid.innerHTML = ''; 
    products.forEach(product => {
        let realPrice = product.price < 1000 ? product.price * 1000 : product.price;
        let formattedPrice = realPrice.toLocaleString('vi-VN');
        const imageSrc = product.image ? product.image : '../assets/image/thun1.png';
        let anchorAttr = categoryAnchors[product.id] ? `id="${categoryAnchors[product.id]}"` : '';

        // TẠO LINK CHI TIẾT
        // product-detail.html?id=1, product-detail.html?id=2 ...
        const detailLink = `product-detail.html?id=${product.id}`;

        const html = `
            <div class="product-card" ${anchorAttr}>
                <div class="card-image">
                    <a href="${detailLink}">
                        <img src="${imageSrc}" alt="${product.name}" class="product-image" onerror="this.src='../assets/image/thun1.png'">
                    </a>
                </div>
                <div class="product-info">
                    <h3>
                        <a href="${detailLink}" style="text-decoration: none; color: inherit;">
                            ${product.name}
                        </a>
                    </h3>
                    <p class="price">${formattedPrice}đ</p>
                    
                    <button class="add-to-cart" 
                        onclick="handleAddToCart('${product.id}', '${product.name}', ${realPrice}, '${imageSrc}')">
                        Thêm vào giỏ hàng
                    </button>
                </div>
            </div>
        `;
        productGrid.innerHTML += html;
    });
}

// Hàm trung gian để gọi CartStorage
window.handleAddToCart = (id, name, price, image) => {
    CartStorage.addItem({ id, name, price, image }); 
};

// Chạy trang
initProductPage();