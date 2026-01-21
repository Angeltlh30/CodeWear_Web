/* =======================================================
   LOGIC CHI TIẾT SẢN PHẨM (3 FRAME)
   ======================================================= */

document.addEventListener('DOMContentLoaded', async () => {
    CartStorage.updateHeaderIcon();

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const products = await MockAPI.getAllProducts();
    const product = products.find(p => p.id === productId);

    if (product) {
        renderMainProduct(product);
        renderRelatedProducts(products, productId);
    } else {
        document.getElementById('main-product-detail').innerHTML = 
            `<h2>Không tìm thấy sản phẩm! <a href="products.html">Quay lại</a></h2>`;
    }
});

function renderMainProduct(product) {
    const container = document.getElementById('main-product-detail');
    
    // Xử lý giá tiền & Ảnh
    let realPrice = product.price < 1000 ? product.price * 1000 : product.price;
    let formattedPrice = realPrice.toLocaleString('vi-VN');
    let oldPrice = (realPrice * 1.3).toLocaleString('vi-VN');
    const imageSrc = product.image ? product.image : '../assets/image/thun1.png';

    // 1. LẤY DỮ LIỆU TỪ API
    const detailedDesc = product.desc || "Đang cập nhật mô tả...";
    const shortInfo = product.info || "Đang cập nhật thông tin...";
    
    const gallery = product.gallery && product.gallery.length > 0 
        ? product.gallery 
        : [imageSrc, '../assets/image/logoFCode.png', imageSrc]; 

    // 2. KIỂM TRA LOẠI SẢN PHẨM
    const isShirt = /áo|shirt|hoodie|raglan/i.test(product.name);

    // 3. HTML NÚT SIZE (Chỉ hiện nếu là Áo)
    let sizeHtml = '';
    if (isShirt) {
        sizeHtml = `
            <div class="option-group">
                <p>Size</p>
                <div id="size-options">
                    <button class="size-btn shirt-mode active" onclick="selectSize(this)">S</button>
                    <button class="size-btn shirt-mode" onclick="selectSize(this)">M</button>
                    <button class="size-btn shirt-mode" onclick="selectSize(this)">L</button>
                </div>
            </div>
        `;
    }

    // 4. HTML PHẦN KÉO THẢ (Scroll)
    // Mặc định luôn có 2 khung đầu tiên (Mô tả & Thông tin)
    let scrollContent = `
        <div class="info-card">
            <h3><i class="fas fa-align-left"></i> Mô tả chi tiết</h3>
            <p>${detailedDesc}</p>
        </div>
        <div class="info-card">
            <h3><i class="fas fa-info-circle"></i> Thông số sản phẩm</h3>
            <p>${shortInfo}</p>
        </div>
    `;

    // Nếu là ÁO -> Thêm Khung thứ 3 (Bảng Size)
    if (isShirt) {
        scrollContent += `
            <div class="info-card">
                <h3><i class="fas fa-ruler-combined"></i> Bảng Size</h3>
                <table class="size-table">
                    <thead>
                        <tr>
                            <th>Size</th><th>Dài (cm)</th><th>Rộng (cm)</th><th>Cân nặng</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>S</td><td>65</td><td>48</td><td>45-55kg</td></tr>
                        <tr><td>M</td><td>68</td><td>51</td><td>55-65kg</td></tr>
                        <tr><td>L</td><td>71</td><td>54</td><td>65-75kg</td></tr>
                    </tbody>
                </table>
            </div>
        `;
    }

    // --- RENDER FULL HTML ---
    container.innerHTML = `
        <div class="product-top-section">
            <div class="images">
                <div class="main-img-container">
                    <img src="${imageSrc}" class="main-img" id="zoom-img">
                </div>
                <div class="thumbs">
                    ${gallery.map(src => `
                        <img src="${src}" onclick="changeImage(this.src)" onerror="this.src='${imageSrc}'">
                    `).join('')}
                </div>
            </div>

            <div class="info">
                <h1>${product.name}</h1>
                <div class="price">
                    <span class="new">${formattedPrice}vnđ</span>
                    <span class="old">${oldPrice}vnđ</span>
                </div>

                ${sizeHtml}

                <div class="option-group">
                    <p>Số lượng</p>
                    <div class="quantity-selector">
                        <button class="qty-btn" onclick="updateQty(-1)">-</button>
                        <input type="text" id="qty-input" class="qty-input" value="1" readonly>
                        <button class="qty-btn" onclick="updateQty(1)">+</button>
                    </div>
                </div>

                <button class="buy-btn" onclick="handleBuyNow('${product.id}', '${product.name}', ${realPrice}, '${imageSrc}')">
                    Mua ngay
                </button>
            </div>
        </div>
        
        <div class="product-bottom-section">
             <div class="info-scroll-container" id="drag-scroll">
                ${scrollContent}
            </div>
        </div>
    `;

    enableDragScroll();
}

// --- LOGIC KÉO THẢ & TƯƠNG TÁC (Giữ nguyên) ---
function enableDragScroll() {
    const slider = document.getElementById('drag-scroll');
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener('mouseleave', () => { isDown = false; slider.classList.remove('active'); });
    slider.addEventListener('mouseup', () => { isDown = false; slider.classList.remove('active'); });
    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
    });
}

function renderRelatedProducts(allProducts, currentId) {
    const listContainer = document.getElementById('related-products-list');
    const related = allProducts.filter(p => p.id !== currentId).slice(0, 4);

    listContainer.innerHTML = related.map(p => {
        let price = p.price < 1000 ? p.price * 1000 : p.price;
        const img = p.image ? p.image : '../assets/image/thun1.png';
        return `
            <div class="product-card">
                <a href="product-detail.html?id=${p.id}">
                    <img src="${img}" style="height: 250px; object-fit: cover;" onerror="this.src='../assets/image/thun1.png'">
                </a>
                <h3 style="font-size: 16px; margin: 10px 0;">
                    <a href="product-detail.html?id=${p.id}" style="text-decoration:none; color:inherit">${p.name}</a>
                </h3>
                <p class="price" style="justify-content:center; margin-bottom:0;">${price.toLocaleString()}vnđ</p>
            </div>
        `;
    }).join('');
}

window.changeImage = (src) => document.getElementById('zoom-img').src = src;
window.selectSize = (btn) => {
    document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
};
window.updateQty = (delta) => {
    const input = document.getElementById('qty-input');
    let val = parseInt(input.value) + delta;
    if (val < 1) val = 1;
    input.value = val;
};
window.handleBuyNow = (id, name, price, image) => {
    const qty = parseInt(document.getElementById('qty-input').value);
    for(let i=0; i<qty; i++) {
        CartStorage.addItem({ id, name, price, image });
    }
};