document.addEventListener("DOMContentLoaded", async () => {
    // 1. Kiểm tra đăng nhập
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        alert("Vui lòng đăng nhập để xem đơn hàng!");
        window.location.href = "login.html";
        return;
    }

    const container = document.getElementById('order-list-container');
    if(!container) return;

    // 2. Gọi API lấy dữ liệu
    try {
        const res = await fetch(`${CONFIG.API_BASE_URL}/api/orders/${user.id || user._id}`);
        const orders = await res.json();

        // 3. Xử lý hiển thị
        if (!orders || orders.length === 0) {
            container.innerHTML = `
                <div style="text-align:center; padding:60px; background:#fff; border-radius:8px; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
                    <p style="font-size: 16px; color:#666;">Bạn chưa có đơn hàng nào.</p>
                    <a href="products.html" style="display: inline-block; margin-top:15px; padding: 10px 25px; background: #ee4d2d; color: #fff; text-decoration:none; border-radius: 4px; font-weight:500;">Mua sắm ngay</a>
                </div>`;
            return;
        }

        let html = '';
        
        orders.forEach(order => {
            const dateStr = order.createdAt ? new Date(order.createdAt).toLocaleDateString('vi-VN') : (order.date || 'Vừa xong');

            // Xử lý trạng thái
            let statusStyle = 'color: #ee4d2d;'; 
            if (order.status === 'Đã hoàn thành' || order.status === 'Hoàn thành') {
                statusStyle = 'color: #26aa99;'; 
            }
            
            // Danh sách sản phẩm
            const itemsHTML = order.items.map(item => {
                let imgPath = item.image || '../assets/image/logoFCode.png';
                if(imgPath && !imgPath.startsWith('../') && !imgPath.startsWith('http')) {
                    imgPath = '../' + imgPath;
                }
                
                let sizeInfo = item.size ? `<span style="background: #f5f5f5; color: #555; padding: 2px 6px; border-radius: 3px; font-size: 12px; margin-left: 5px;">Size: ${item.size}</span>` : '';

                return `
                    <div class="order-item" style="display: flex; padding: 15px 0; border-bottom: 1px solid #f1f1f1;">
                        <div style="width: 90px; height: 90px; flex-shrink: 0; border: 1px solid #e0e0e0; border-radius: 4px; overflow: hidden; background: #fafafa;">
                            <img src="${imgPath}" onerror="this.src='../assets/image/logoFCode.png'" 
                                 style="width: 100%; height: 100%; object-fit: contain;">
                        </div>

                        <div class="item-info" style="flex: 1; padding-left: 15px; display: flex; flex-direction: column; justify-content: center;">
                            <h4 style="margin: 0 0 5px; font-size: 16px; font-weight: 500; color: #333; line-height: 1.4;">${item.name}</h4>
                            <div style="font-size: 14px; color: #757575;">
                                Phân loại hàng: ${sizeInfo || 'Tiêu chuẩn'}
                            </div>
                            <div style="font-size: 14px; color: #333; margin-top: 5px;">x${item.quantity}</div>
                        </div>

                        <div class="item-price" style="display: flex; align-items: center; font-size: 15px; color: #ee4d2d; font-weight: 500;">
                            ${item.price.toLocaleString()}đ
                        </div>
                    </div>
                `;
            }).join('');

            // Render Card
            html += `
                <div class="order-card" style="background: #fff; margin-bottom: 20px; border-radius: 4px; box-shadow: 0 1px 2px rgba(0,0,0,0.1);">
                    
                    <div class="card-header" style="padding: 15px 20px; border-bottom: 1px solid #eaeaea; display: flex; justify-content: space-between; align-items: center;">
                        <div class="shop-info" style="display: flex; align-items: center; gap: 10px;">
                            <span style="background: #ee4d2d; color: #fff; font-size: 12px; padding: 2px 5px; border-radius: 3px;">Yêu thích</span>
                            <span style="font-weight: 600; color: #333;">CodeWear Official</span>
                            <span style="color: #ddd;">|</span>
                            <span style="color: #888; font-size: 13px;">Ngày đặt: ${dateStr}</span>
                        </div>
                        
                        <div class="order-status" style="font-size: 16px; font-weight: 700; text-transform: uppercase; ${statusStyle}">
                            ${order.status}
                        </div>
                    </div>

                    <div class="card-body" style="padding: 0 20px;">
                        ${itemsHTML}
                    </div>

                    <div class="card-footer" style="padding: 20px; background: #fffefb; border-top: 1px solid #f1f1f1; border-bottom-left-radius: 4px; border-bottom-right-radius: 4px;">
                        <div style="display: flex; justify-content: flex-end; align-items: center; gap: 10px;">
                            <span style="font-size: 14px; color: #333;">Thành tiền:</span>
                            <span style="font-size: 24px; font-weight: 600; color: #ee4d2d;">${order.totalAmount.toLocaleString()}đ</span>
                        </div>
                        
                        <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 15px;">
                            <button onclick="window.location.href='products.html'" 
                                style="min-width: 140px; padding: 10px 0; background: #ee4d2d; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 14px;">
                                Mua lại
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;

    } catch (err) {
        console.error("Lỗi tải đơn hàng:", err);
        container.innerHTML = '<p style="text-align:center; padding:40px; color:red;">Lỗi kết nối Server! Vui lòng kiểm tra lại cấu hình API.</p>';
    }
});