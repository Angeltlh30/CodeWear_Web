let currentSelectedSize = "";

document.addEventListener('DOMContentLoaded', async () => {
    if (typeof updateCartCount === 'function') updateCartCount();

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id'); // Đây là _id (Mongo ID)
    const container = document.getElementById('main-product-detail');

    if (!productId) {
        container.innerHTML = `<h2>Không tìm thấy sản phẩm! <a href="products.html">Quay lại</a></h2>`;
        return;
    }

    try {
        // --- SỬ DỤNG CONFIG TỪ FILE config.js ---
        const response = await fetch(`${CONFIG.API_BASE_URL}/api/products/${productId}`);
        
        if (!response.ok) throw new Error("Sản phẩm không tồn tại");
        const product = await response.json();

        renderMainProduct(product);
        loadRelatedProducts(productId); // Load sản phẩm liên quan

    } catch (error) {
        console.error("Lỗi:", error);
        container.innerHTML = `<h2>Sản phẩm không tồn tại hoặc lỗi kết nối! <a href="products.html">Quay lại</a></h2>`;
    }
});

function renderMainProduct(product) {
    const container = document.getElementById('main-product-detail');
    
    // --- TÍNH TOÁN GIÁ ---
    let realPrice = product.price || 0;
    
    // Giá cũ = Giá hiện tại + 36%
    let oldPriceRaw = realPrice * 1.36; 
    let formattedPrice = realPrice.toLocaleString('vi-VN');
    let oldPriceFormatted = oldPriceRaw.toLocaleString('vi-VN', { maximumFractionDigits: 0 });
    
    // Fix ảnh
    let rawImg = product.image || '';
    let cleanPath = rawImg.replace(/^(\.\/|\.\.\/)+/, ''); 
    let imageSrc = cleanPath ? `../${cleanPath}` : '../assets/image/logoFCode.png';

    let gallery = product.gallery && product.gallery.length > 0 
        ? product.gallery 
        : [imageSrc, imageSrc, imageSrc]; 

    // Kiểm tra loại sản phẩm (Áo thì hiện Size)
    const isShirt = /áo|shirt|hoodie|raglan/i.test(product.name || '');
    currentSelectedSize = "";

    // HTML Size Option
    let sizeHtml = '';
    if (isShirt) {
        sizeHtml = `
            <div class="option-group">
                <p>Size:</p>
                <div id="size-options">
                    <button class="size-btn" onclick="selectSize(this)">S</button>
                    <button class="size-btn" onclick="selectSize(this)">M</button>
                    <button class="size-btn" onclick="selectSize(this)">L</button>
                </div>
            </div>
        `;
    }

    // HTML Mô tả (Scroll Content)
    let scrollContent = `
        <div class="info-card">
            <h3>Mô tả chi tiết</h3>
            <p>${product.desc || "Đang cập nhật mô tả..."}</p>
        </div>
        <div class="info-card">
            <h3>Thông số kỹ thuật</h3>
            <p>${product.info || "Đang cập nhật..."}</p>
        </div>
    `;

    if (isShirt) {
        scrollContent += `
            <div class="info-card">
                <h3>Bảng Size</h3>
                <table class="size-table">
                    <thead><tr><th>Size</th><th>Dài</th><th>Rộng</th></tr></thead>
                    <tbody>
                        <tr><td>S</td><td>65</td><td>48</td></tr>
                        <tr><td>M</td><td>68</td><td>51</td></tr>
                        <tr><td>L</td><td>71</td><td>54</td></tr>
                    </tbody>
                </table>
            </div>
        `;
    }

    container.innerHTML = `
        <div class="product-top-section">
            <div class="images">
                <div class="main-img-container">
                    <img src="${imageSrc}" class="main-img" id="zoom-img" onerror="this.src='../assets/image/logoFCode.png'">
                </div>
                <div class="thumbs">
                    ${gallery.map(src => {
                        let tPath = src.replace(/^(\.\/|\.\.\/)+/, '');
                        let tSrc = tPath ? `../${tPath}` : imageSrc;
                        return `<img src="${tSrc}" onclick="changeImage('${tSrc}')">`;
                    }).join('')}
                </div>
            </div>

            <div class="info">
                <h1>${product.name}</h1>
                
                <div class="price">
                    <span class="old">${oldPriceFormatted}đ</span>
                    <span class="new">${formattedPrice}đ</span>
                    <span class="discount-badge">GIẢM 36%</span>
                </div>

                ${sizeHtml}

                <div class="option-group">
                    <p>Số lượng:</p>
                    <div class="quantity-selector">
                        <button class="qty-btn" onclick="updateQty(-1)">-</button>
                        <input type="text" id="qty-input" class="qty-input" value="1" readonly>
                        <button class="qty-btn" onclick="updateQty(1)">+</button>
                    </div>
                </div>

                <button class="buy-btn" onclick="handleBuyNow('${product._id}', '${product.name}', ${realPrice}, '${imageSrc}')">
                    MUA NGAY
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

async function loadRelatedProducts(currentId) {
    try {
        // --- SỬ DỤNG CONFIG TỪ FILE config.js ---
        const res = await fetch(`${CONFIG.API_BASE_URL}/api/products`);
        const allProducts = await res.json();
        const listContainer = document.getElementById('related-products-list');
        if (!listContainer) return;

        // Lọc bỏ sản phẩm hiện tại (So sánh _id)
        const related = allProducts.filter(p => p._id !== currentId).slice(0, 4);
        
        listContainer.innerHTML = related.map(p => {
            let img = p.image || '';
            let clean = img.replace(/^(\.\/|\.\.\/)+/, '');
            let src = clean ? `../${clean}` : '../assets/image/logoFCode.png';
            
            // Dùng p._id cho link
            return `
                <div class="product-card">
                    <a href="product-detail.html?id=${p._id}">
                        <img src="${src}" style="height: 250px; object-fit: contain;">
                    </a>
                    <h3 style="font-size:16px; margin:10px 0;">
                        <a href="product-detail.html?id=${p._id}" style="text-decoration:none; color:inherit">${p.name}</a>
                    </h3>
                    <p style="color:#ee4d2d; font-weight:bold;">${p.price.toLocaleString()}đ</p>
                </div>`;
        }).join('');
    } catch (err) {
        console.error("Lỗi load related:", err);
    }
}

// --- GLOBAL FUNCTIONS ---
window.changeImage = (src) => {
    const zoom = document.getElementById('zoom-img');
    if(zoom) zoom.src = src;
};

window.selectSize = (btn) => {
    document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentSelectedSize = btn.innerText;
};

window.updateQty = (delta) => {
    const input = document.getElementById('qty-input');
    let val = parseInt(input.value) + delta;
    if (val < 1) val = 1;
    input.value = val;
};

window.handleBuyNow = (id, name, price, image) => {
    // 1. Kiểm tra đăng nhập
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        if(confirm("Bạn cần đăng nhập để mua hàng!")) {
            window.location.href = "login.html";
        }
        return;
    }

    // 2. Kiểm tra chọn size (nếu có bảng size)
    const hasSize = document.querySelector('.size-btn');
    if (hasSize && !currentSelectedSize) {
        alert("Vui lòng chọn Size trước!");
        return;
    }

    // 3. Thêm vào giỏ
    const qty = parseInt(document.getElementById('qty-input').value) || 1;
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Tìm sản phẩm trùng ID và trùng Size
    let exist = cart.find(i => i.id === id && i.size === currentSelectedSize);
    
    if (exist) {
        exist.quantity += qty;
    } else {
        cart.push({ id, name, price, image, quantity: qty, size: currentSelectedSize });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    if(typeof updateCartCount === 'function') updateCartCount();
    
    // Hỏi người dùng muốn đi đâu
    if(confirm(`Đã thêm "${name}" vào giỏ!\nBạn có muốn tới giỏ hàng thanh toán ngay không?`)) {
        window.location.href = "cart.html";
    }
};

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((sum, i) => sum + i.quantity, 0);
    const badge = document.getElementById('cart-count');
    if (badge) {
        badge.innerText = count;
        badge.style.display = count > 0 ? 'flex' : 'none';
    }
}

function enableDragScroll() {
    const slider = document.getElementById('drag-scroll');
    if(!slider) return;
    let isDown = false;
    let startX, scrollLeft;
    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener('mouseleave', () => { isDown = false; });
    slider.addEventListener('mouseup', () => { isDown = false; });
    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
    });
}