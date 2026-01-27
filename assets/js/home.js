document.addEventListener('DOMContentLoaded', () => {
	updateCartCount();
	setupUserMenu();
	loadFeaturedProducts();
});

// --- 1. TẢI SẢN PHẨM MỚI NHẤT (Dùng Config) ---
async function loadFeaturedProducts() {
	const container = document.getElementById('featured-products-container');
	if (!container) return;

	try {
		// SỬ DỤNG CONFIG TỪ FILE config.js
		const res = await fetch(`${CONFIG.API_BASE_URL}/api/products`);
		const products = await res.json();

		if (products && products.length > 0) {
			container.innerHTML = '';
			const featuredProducts = products.slice(0, 8);

			featuredProducts.forEach(product => {
				let imageSrc = product.image || './assets/image/logoFCode.png';
				if (imageSrc.startsWith('../')) imageSrc = imageSrc.replace('../', './');

				const html = `
                  <div class="product-card">
                    <a href="./pages/product-detail.html?id=${product._id}">
                        <div class="product-image">
                            <img src="${imageSrc}" alt="${product.name}" 
                                 style="width:100%; height:100%; object-fit:contain;"
                                 onerror="this.src='./assets/image/logoFCode.png'" />
                        </div>
                    </a>
                    <div class="product-info">
                      <h3>
                          <a href="./pages/product-detail.html?id=${product._id}" style="text-decoration: none; color: inherit;">
                              ${product.name}
                          </a>
                      </h3>
                      <p class="price">${product.price.toLocaleString()}đ</p>
                      <button class="add-to-cart" 
                        onclick="addToCartLocalHome('${product._id}', '${product.name}', ${product.price}, '${imageSrc}')">
                        Thêm vào giỏ hàng
                      </button>
                    </div>
                  </div>
                `;
				container.innerHTML += html;
			});
		} else {
			container.innerHTML = '<p style="color:white; text-align:center; grid-column: 1/-1;">Chưa có sản phẩm.</p>';
		}
	} catch (err) {
		console.error("Lỗi:", err);
		container.innerHTML = '<p style="color:red; text-align:center; grid-column: 1/-1;">Lỗi kết nối Server!</p>';
	}
}

// --- 2. THÊM VÀO GIỎ HÀNG (Dành cho trang chủ) ---
window.addToCartLocalHome = (id, name, price, image) => {
	const user = JSON.parse(localStorage.getItem('user'));
	if (!user) {
		if (confirm("Bạn cần đăng nhập để mua hàng.")) window.location.href = "./pages/login.html";
		return;
	}
	let cart = JSON.parse(localStorage.getItem('cart')) || [];
	const existing = cart.find(item => item.id === id);
	if (existing) existing.quantity += 1;
	else cart.push({
		id,
		name,
		price,
		image,
		quantity: 1,
		size: "Free Size"
	});
	localStorage.setItem('cart', JSON.stringify(cart));
	updateCartCount();
	alert(`Đã thêm "${name}" vào giỏ hàng!`);
};

// --- 3. CẬP NHẬT SỐ LƯỢNG GIỎ HÀNG ---
function updateCartCount() {
	const cart = JSON.parse(localStorage.getItem('cart')) || [];
	const count = cart.reduce((sum, item) => sum + item.quantity, 0);
	const badge = document.getElementById('cart-count');
	if (badge) {
		badge.innerText = count;
		badge.style.display = count > 0 ? 'block' : 'none';
	}
}

// --- 4. XỬ LÝ MENU USER ---
function setupUserMenu() {
	const userIcon = document.getElementById('user-icon');
	const dropdown = document.getElementById('user-dropdown');
	const loginLink = document.getElementById('login-link');
	const registerLink = document.getElementById('register-link');
	const historyLink = document.getElementById('history-link');
	const logoutBtn = document.getElementById('logout-btn');
	const userNameDisplay = document.getElementById('user-name');
	const user = JSON.parse(localStorage.getItem('user'));

	if (user) {
		if (loginLink) loginLink.style.display = 'none';
		if (registerLink) registerLink.style.display = 'none';
		if (historyLink) historyLink.style.display = 'block';
		if (logoutBtn) logoutBtn.style.display = 'block';
		if (userNameDisplay) {
			userNameDisplay.style.display = 'block';
			userNameDisplay.innerText = `Hi, ${user.name}!`;
		}
	} else {
		if (loginLink) loginLink.style.display = 'block';
		if (registerLink) registerLink.style.display = 'block';
		if (historyLink) historyLink.style.display = 'none';
		if (logoutBtn) logoutBtn.style.display = 'none';
		if (userNameDisplay) userNameDisplay.style.display = 'none';
	}

	if (userIcon && dropdown) {
		const newIcon = userIcon.cloneNode(true);
		userIcon.parentNode.replaceChild(newIcon, userIcon);
		newIcon.addEventListener('click', (e) => {
			e.stopPropagation();
			dropdown.classList.toggle('show');
		});
		document.addEventListener('click', (e) => {
			if (!newIcon.contains(e.target) && !dropdown.contains(e.target)) dropdown.classList.remove('show');
		});
	}
	if (logoutBtn) {
		const newLogout = logoutBtn.cloneNode(true);
		logoutBtn.parentNode.replaceChild(newLogout, logoutBtn);
		newLogout.addEventListener('click', (e) => {
			e.preventDefault();
			localStorage.removeItem('user');
			localStorage.removeItem('token');
			alert('Đã đăng xuất!');
			window.location.reload();
		});
	}
}