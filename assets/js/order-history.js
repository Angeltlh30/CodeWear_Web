document.addEventListener("DOMContentLoaded", () => {
    // 1. KIỂM TRA LOGIN (Bảo vệ trang)
    // Nếu chưa đăng nhập thì đuổi về trang login ngay
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        alert("Vui lòng đăng nhập để xem lịch sử đơn hàng!");
        window.location.href = "login.html";
        return;
    }

    // 2. Lấy dữ liệu đơn hàng từ LocalStorage
    const userOrderKey = `orders_${user.id}`;
    const orders = JSON.parse(localStorage.getItem(userOrderKey)) || [];

    // Tìm thẻ chứa danh sách (Table Body)
    // Đảm bảo file HTML của bạn có thẻ <tbody id="order-history-body">
    const tableBody = document.querySelector('tbody'); 
    
    // Nếu không tìm thấy bảng thì dừng (tránh lỗi)
    if (!tableBody) return;

    // 3. XỬ LÝ KHI CHƯA CÓ ĐƠN HÀNG
    if (orders.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="5" style="text-align: center; padding: 20px;">
                    Bạn chưa có đơn hàng nào. <a href="products.html">Mua sắm ngay!</a>
                </td>
            </tr>
        `;
        return;
    }

    // 4. RENDER GIAO DIỆN (Vẽ từng dòng)
    tableBody.innerHTML = ''; // Xóa nội dung cũ
    
    orders.forEach(order => {
        // Tạo danh sách tên sản phẩm rút gọn
        const productNames = order.items.map(item => `${item.name} (x${item.quantity})`).join(', ');

        // HTML cho từng dòng
        const row = `
            <tr>
                <td>#${order.id}</td>
                <td>${order.date}</td>
                <td class="product-col">${productNames}</td>
                <td style="color: #d0011b; font-weight: bold;">${order.total.toLocaleString()}đ</td>
                <td>
                    <span class="status-badge pending">${order.status}</span>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
});
