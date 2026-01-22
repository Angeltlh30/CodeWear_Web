const Product = require('../models/product.model');
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findOne({ id: req.params.id });
        if (!product) return res.status(404).json({ error: 'Không tìm thấy sản phẩm' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// --- HÀM SEED DỮ LIỆU (CẬP NHẬT) ---
exports.seedProducts = async (req, res) => {
    try {
        console.log("⏳ Đang bắt đầu nạp dữ liệu (Seed)...");

        // 1. Dữ liệu mẫu chuẩn
        const sampleProducts = [
  {
    "name": "Hoodie F-Code (Pullover)",
    "price": 280000,
    "image": "../assets/image/hoddie1.png",
    "category": "Hoodie",
    "id": "1",
    "desc": "Mẫu hoodie F-Code bản chui đầu (Pullover) nổi bật với thiết kế tối giản, hiện đại, mang phong cách trẻ trung và năng động. Logo F-Code được in lớn ở trung tâm áo, sắc nét và hài hòa về màu sắc, truyền tải tinh thần 'Code the dream' đầy cảm hứng.<br><br>Chất liệu nỉ cotton mềm mại, co giãn nhẹ, thấm hút mồ hôi tốt, phù hợp cho sinh hoạt hằng ngày, học tập hoặc tham gia các hoạt động cộng đồng công nghệ. Kiểu dáng hoodie chui đầu kết hợp mũ trùm và túi trước tiện lợi, dễ phối đồ và tạo cảm giác thoải mái khi vận động.",
    "info": "- <b>Xuất xứ:</b> Việt Nam<br>- <b>Chất liệu:</b> Nỉ cotton mềm mại, co giãn nhẹ.<br>- <b>Kiểu dáng:</b> Hoodie chui đầu, mũ trùm.<br>- <b>Họa tiết:</b> Logo F-Code in lớn trung tâm.<br>- <b>Ứng dụng:</b> Đi học, đi làm, sự kiện.",
    "gallery": [
      "../assets/image/hoddie1.png",
      "../assets/image/hoddie1.2.png",
      "../assets/image/hoddie1.3.png"
    ]
  },
  {
    "name": "Hoodie F-Code (Zip)",
    "price": 280000,
    "image": "../assets/image/hoddie2.png",
    "category": "Hoodie",
    "id": "2",
    "desc": "Mẫu hoodie F-Code bản khóa kéo (Zip hoodie) gây ấn tượng với thiết kế gọn gàng, linh hoạt và mang tính ứng dụng cao. Logo F-Code được in nhỏ ở ngực trái, tinh tế nhưng vẫn nổi bật bản sắc thương hiệu.<br><br>Chất liệu nỉ cotton dày dặn, giữ ấm tốt, phù hợp cho thời tiết se lạnh hoặc mặc khoác ngoài khi đi học, đi làm. Thiết kế khóa kéo toàn thân giúp dễ dàng điều chỉnh khi mặc, form áo basic năng động, mang lại sự tiện lợi và thoải mái.",
    "info": "- <b>Xuất xứ:</b> Việt Nam<br>- <b>Chất liệu:</b> Nỉ cotton dày dặn, giữ ấm tốt.<br>- <b>Kiểu dáng:</b> Zip hoodie (Khóa kéo).<br>- <b>Họa tiết:</b> Logo nhỏ tinh tế ngực trái.<br>- <b>Tiện ích:</b> Túi trước, mũ trùm 2 lớp.",
    "gallery": [
      "../assets/image/hoddie2.png",
      "../assets/image/hoddie2.2.png",
      "../assets/image/hoddie2.3.png"
    ]
  },
  {
    "name": "Túi Tote F-Code (Trắng)",
    "price": 120000,
    "image": "../assets/image/tote1.png",
    "category": "Tote Bag",
    "id": "3",
    "desc": "Mẫu túi tote F-Code phiên bản màu trắng gây ấn tượng với thiết kế thanh lịch, trẻ trung và mang tính ứng dụng cao. Logo F-Code cùng dòng chữ 'Code the dream' được in sắc nét ở chính giữa mặt trước, tạo điểm nhấn nổi bật và truyền tải trọn vẹn tinh thần sáng tạo của câu lạc bộ.<br><br>Chất liệu vải canvas dày dặn, đường may chắc chắn, phù hợp để đựng tài liệu, giáo trình hay các vật dụng cá nhân khi đi học, đi làm. Thiết kế quai đeo mềm mại với độ dài tiêu chuẩn.",
    "info": "- <b>Xuất xứ:</b> Việt Nam<br>- <b>Chất liệu:</b> Vải Canvas trắng bền bỉ.<br>- <b>Kiểu dáng:</b> Chữ nhật basic, quai đeo vai.<br>- <b>Họa tiết:</b> In màu sắc nét, không phai.<br>- <b>Ứng dụng:</b> Đựng laptop, tài liệu.",
    "gallery": [
      "../assets/image/tote1.png",
      "../assets/image/tote1.2.png",
      "../assets/image/tote1.3.png"
    ]
  },
  {
    "name": "Áo Polo Trắng F-Code",
    "price": 150000,
    "image": "../assets/image/thun2.png",
    "category": "T-Shirt",
    "id": "4",
    "desc": "Áo thun polo F-Code màu trắng mang phong cách lịch sự, tinh tế nhưng vẫn trẻ trung. Logo được thêu/in sắc nét ở ngực trái, phù hợp cho môi trường làm việc, gặp gỡ đối tác hoặc sự kiện chuyên môn.<br><br>Chất liệu cotton cao cấp giúp áo đứng form, thoáng mát và tạo cảm giác thoải mái suốt ngày dài. Đây là lựa chọn hoàn hảo cho những coder muốn giữ hình ảnh chuyên nghiệp nhưng vẫn thể hiện cá tính thương hiệu.",
    "info": "- <b>Xuất xứ:</b> Việt Nam<br>- <b>Chất liệu:</b> Cotton cao cấp, đứng form.<br>- <b>Kiểu dáng:</b> Polo cổ bẻ lịch sự.<br>- <b>Họa tiết:</b> Logo F-Code thêu ngực trái.<br>- <b>Ứng dụng:</b> Văn phòng, gặp đối tác.",
    "gallery": [
      "../assets/image/thun2.png",
      "../assets/image/thun2.2.png",
      "../assets/image/thun2.3.png"
    ]
  },
  {
    "name": "Áo Sweatshirt Trắng",
    "price": 150000,
    "image": "../assets/image/thun5.png",
    "category": "T-Shirt",
    "id": "5",
    "desc": "Áo sweatshirt F-Code màu trắng mang phong cách tối giản, hiện đại, phù hợp cho cả môi trường học tập lẫn làm việc công nghệ. Logo F-Code được in tinh tế bên ngực trái, tạo điểm nhấn vừa đủ nhưng vẫn giữ được sự chuyên nghiệp.<br><br>Chất liệu nỉ cotton mềm mại, dày dặn, giữ form tốt và mang lại cảm giác ấm áp, thoải mái khi mặc cả ngày. Đây là lựa chọn lý tưởng cho coder, sinh viên IT hoặc những ai yêu thích phong cách clean – minimal.",
    "info": "- <b>Xuất xứ:</b> Việt Nam<br>- <b>Chất liệu:</b> Nỉ cotton mềm, dày dặn.<br>- <b>Kiểu dáng:</b> Dài tay, cổ tròn.<br>- <b>Phong cách:</b> Tối giản (Minimalism).<br>- <b>Ứng dụng:</b> Đi học, đi làm.",
    "gallery": [
      "../assets/image/thun5.png",
      "../assets/image/thun5.2.png",
      "../assets/image/thun5.3.png"
    ]
  },
  {
    "name": "Lót chuột F-Code",
    "price": 80000,
    "image": "../assets/image/lotchuot1.png",
    "category": "Accessories",
    "id": "6",
    "desc": "Mẫu lót chuột F-Code gây ấn tượng với bề mặt đen tuyền chuyên nghiệp, tạo cảm hứng làm việc đầy phấn khích. Thiết kế bề mặt vải cao cấp giúp tối ưu hóa độ chính xác cho cảm biến chuột, đặc biệt phù hợp cho các lập trình viên cần sự mượt mà khi xử lý code.<br><br>Phần đế cao su chống trượt giúp cố định lót chuột trên bàn làm việc, mang lại sự ổn định và thoải mái tối đa.",
    "info": "- <b>Xuất xứ:</b> Việt Nam<br>- <b>Chất liệu:</b> Vải mượt + Đế cao su.<br>- <b>Kiểu dáng:</b> Hình chữ nhật bo góc.<br>- <b>Đặc điểm:</b> Chống trượt, tối ưu cảm biến.<br>- <b>Ứng dụng:</b> Dev, Gamer, Designer.",
    "gallery": [
      "../assets/image/lotchuot1.png",
      "../assets/image/lotchuot1.2.png",
      "../assets/image/lotchuot1.3.png"
    ]
  },
  {
    "name": "Áo thun F-Code (Đen)",
    "price": 150000,
    "image": "../assets/image/thun3.png",
    "category": "T-Shirt",
    "id": "7",
    "desc": "Áo thun đen F-Code mang phong cách hiện đại, đậm chất công nghệ với các đường line xanh – vàng chạy chéo đầy cá tính. Logo nhỏ ở ngực trái giúp tổng thể áo trông gọn gàng nhưng vẫn nổi bật.<br><br>Chất liệu vải mềm, nhẹ, thoáng khí, phù hợp mặc hằng ngày hoặc tham gia workshop, hackathon, sự kiện công nghệ. Thiết kế này đặc biệt phù hợp với những ai yêu thích phong cách tech-wear, mạnh mẽ và khác biệt.",
    "info": "- <b>Xuất xứ:</b> Việt Nam<br>- <b>Chất liệu:</b> Cotton mềm, thoáng khí.<br>- <b>Kiểu dáng:</b> Form hiện đại, Tech-wear.<br>- <b>Họa tiết:</b> Line xanh – vàng chéo.<br>- <b>Ứng dụng:</b> Hackathon, sự kiện công nghệ.",
    "gallery": [
      "../assets/image/thun3.png",
      "../assets/image/thun3.1.png",
      "../assets/image/thun3.2.png"
    ]
  },
  {
    "name": "Bộ Sticker 'Code Passion'",
    "price": 30000,
    "image": "../assets/image/sticker1.2.png",
    "category": "Sticker",
    "id": "8",
    "desc": "Bộ sticker F-Code gây ấn tượng với những thiết kế mang đậm 'chất' lập trình và ngôn ngữ sáng tạo đặc trưng của dân công nghệ. Từ những dòng lệnh 'Hello, world!' kinh điển đến các biểu tượng hài hước như 'I turn coffee into code'.<br><br>Mỗi sticker đều được in sắc nét trên chất liệu decal cao cấp, chống thấm nước và bền màu. Đây là món phụ kiện linh hoạt, lý tưởng để trang trí laptop, sổ tay hay bình nước.",
    "info": "- <b>Xuất xứ:</b> Việt Nam<br>- <b>Chất liệu:</b> Decal nhựa chống nước.<br>- <b>Đặc điểm:</b> Cán màng chống trầy.<br>- <b>Số lượng:</b> Set 5 hình khác nhau.<br>- <b>Ứng dụng:</b> Dán Laptop, mũ bảo hiểm.",
    "gallery": [
      "../assets/image/sticker1.2.png",
      "../assets/image/stiker1.3.png"
    ]
  },
  {
    "name": "Ốp lưng F-Code",
    "price": 35000,
    "image": "../assets/image/phonecase1.png",
    "category": "Phonecase",
    "id": "9",
    "desc": "Mẫu ốp lưng F-Code gây ấn tượng với diện mạo tối giản, hiện đại và mang tính thẩm mỹ cao. Logo F-Code cùng slogan 'Code the dream' được in nổi bật ở chính giữa mặt lưng trên nền trắng thanh lịch.<br><br>Chất liệu nhựa dẻo cao cấp, ôm sát thân máy giúp chống va đập và trầy xước hiệu quả, đồng thời mang lại cảm giác cầm nắm chắc chắn, thoải mái.",
    "info": "- <b>Xuất xứ:</b> Việt Nam<br>- <b>Chất liệu:</b> Nhựa dẻo TPU cao cấp.<br>- <b>Kiểu dáng:</b> Ôm sát, chống sốc.<br>- <b>Họa tiết:</b> Logo F-Code in UV.<br>- <b>Tương thích:</b> Các dòng iPhone.",
    "gallery": [
      "../assets/image/phonecase1.png",
      "../assets/image/phonecase1.2.png",
      "../assets/image/phonecase1.3.png"
    ]
  },
  {
    "name": "Móc khóa F-Code",
    "price": 25000,
    "image": "../assets/image/mockhoa1.png",
    "category": "Keychain",
    "id": "10",
    "desc": "Mẫu móc khóa F-Code gây ấn tượng với thiết kế được cắt gọn theo hình dáng logo thương hiệu, nhỏ nhắn nhưng vô cùng tinh tế.<br><br>Sản phẩm được làm từ chất liệu mica (acrylic) trong suốt, cứng cáp, bảo vệ lớp in logo và slogan sắc nét, không lo bong tróc hay phai màu theo thời gian. Với quai móc kim loại chắc chắn, đây là phụ kiện hoàn hảo để tạo điểm nhấn cho chìa khóa, balo hay túi xách.",
    "info": "- <b>Xuất xứ:</b> Việt Nam<br>- <b>Chất liệu:</b> Mica (Acrylic) trong suốt.<br>- <b>Phụ kiện:</b> Khoen kim loại chống gỉ.<br>- <b>Họa tiết:</b> In 2 mặt sắc nét.<br>- <b>Ứng dụng:</b> Treo chìa khóa, Balo.",
    "gallery": [
      "../assets/image/mockhoa1.png",
      "../assets/image/mockhoa1.2.png",
      "../assets/image/mockhoa1.3.png"
    ]
  },
  {
    "name": "Bộ bút CodeWear",
    "price": 5000,
    "image": "../assets/image/category1.png",
    "category": "Stationery",
    "id": "11",
    "desc": "Bộ bút CodeWear gây ấn tượng với thiết kế hiện đại, mang đậm phong cách công nghệ. Thân bút phối màu đen – trắng – vàng nổi bật, logo CodeWear được in rõ ràng, thể hiện cá tính và tinh thần sáng tạo.<br><br>Chất liệu nhựa cao cấp kết hợp kim loại, cầm chắc tay, mực ra đều và êm, phù hợp cho học tập, làm việc và ghi chép hằng ngày.",
    "info": "- <b>Xuất xứ:</b> Việt Nam<br>- <b>Chất liệu:</b> Nhựa cao cấp + Kim loại.<br>- <b>Loại bút:</b> Bút bi mực Gel.<br>- <b>Màu mực:</b> Xanh / Đen.<br>- <b>Ngòi bút:</b> 0.5mm êm ái.",
    "gallery": [
      "../assets/image/category1.png",
      "../assets/image/category1.2.png",
      "../assets/image/category1.3.png"
    ]
  },
  {
    "name": "Vở CodeWear",
    "price": 18000,
    "image": "../assets/image/category1.2.png",
    "category": "Stationery",
    "id": "12",
    "desc": "Vở CodeWear thiết kế dành riêng cho dân lập trình. Bìa vở cứng cáp in họa tiết công nghệ độc đáo. Chất liệu giấy chống lóa, định lượng cao giúp viết êm, không thấm mực sang trang sau.",
    "info": "- <b>Xuất xứ:</b> Việt Nam<br>- <b>Kích thước:</b> B5 (17.6 x 25 cm).<br>- <b>Số trang:</b> 120 trang.<br>- <b>Loại giấy:</b> Chống lóa, định lượng 80gsm.<br>- <b>Quy cách:</b> Gáy lò xo.",
    "gallery": [
      "../assets/image/category1.2.png",
      "../assets/image/category1.3.png",
      "../assets/image/category1.png"
    ]
  },
  {
    "name": "Combo Vở + Bút",
    "price": 21000,
    "image": "../assets/image/category1.3.png",
    "category": "Combo",
    "id": "13",
    "desc": "Combo tiết kiệm bao gồm 1 Vở CodeWear và 1 Bút CodeWear. Đây là bộ đôi hoàn hảo để khởi đầu kỳ học mới hoặc làm quà tặng cho bạn bè trong CLB F-Code với mức giá ưu đãi hơn mua lẻ.",
    "info": "- <b>Bao gồm:</b> 1 Vở B5 + 1 Bút CodeWear.<br>- <b>Ưu đãi:</b> Tiết kiệm 2.000đ.<br>- <b>Đóng gói:</b> Túi Zip bảo quản.<br>- <b>Ứng dụng:</b> Quà tặng, đồ dùng học tập.",
    "gallery": [
      "../assets/image/category1.3.png",
      "../assets/image/category1.png",
      "../assets/image/category1.2.png"
    ]
  },
  {
    "name": "Laptop Sticker Lớn",
    "price": 15000,
    "image": "../assets/image/stiker1.3.png",
    "category": "Sticker",
    "id": "14",
    "desc": "Sticker kích thước lớn, thích hợp dán trang trí mặt lưng laptop. Họa tiết Logo F-Code cách điệu hoặc slogan 'Code The Dream' giúp chiếc Laptop của bạn trở nên độc nhất vô nhị và dễ dàng nhận diện.",
    "info": "- <b>Xuất xứ:</b> Việt Nam<br>- <b>Kích thước:</b> 10cm x 10cm.<br>- <b>Chất liệu:</b> Decal 3 lớp cao cấp.<br>- <b>Bề mặt:</b> Cán mờ (Matte) sang trọng.<br>- <b>Độ bền:</b> Chống nước, không bay màu.",
    "gallery": [
      "../assets/image/stiker1.3.png",
      "../assets/image/sticker1.2.png"
    ]
  },
  {
    "name": "Túi Tote F-Code (Đen)",
    "price": 120000,
    "image": "../assets/image/tote2.png",
    "category": "Tote Bag",
    "id": "15",
    "desc": "Mẫu túi tote F-Code phiên bản màu đen gây ấn tượng với vẻ ngoài mạnh mẽ, hiện đại và vô cùng chuyên nghiệp. Logo F-Code với gam màu xanh - vàng đặc trưng được in lớn tại trung tâm, tạo sự tương phản ấn tượng trên nền đen.<br><br>Chất liệu vải bố cao cấp, chịu lực tốt và chống bám bẩn, là người bạn đồng hành lý tưởng cho các 'coder' khi cần mang theo laptop nhẹ, máy tính bảng.",
    "info": "- <b>Xuất xứ:</b> Việt Nam<br>- <b>Chất liệu:</b> Vải bố đen dày dặn.<br>- <b>Màu sắc:</b> Đen tuyền.<br>- <b>Tính năng:</b> Chịu lực tốt, ít bám bẩn.<br>- <b>Ứng dụng:</b> Đựng Laptop, sách vở.",
    "gallery": [
      "../assets/image/tote2.png",
      "../assets/image/tote2.2.png",
      "../assets/image/tote2.3.png"
    ]
  }
];

        // 2. Xóa dữ liệu cũ (quan trọng để tránh lỗi trùng ID)
        await Product.deleteMany({});
        console.log("✅ Đã xóa dữ liệu cũ.");

        // 3. Thêm dữ liệu mới
        await Product.insertMany(sampleProducts);
        console.log("✅ Đã thêm dữ liệu mới thành công.");

        // 4. Trả về kết quả
        return res.status(200).json({ message: "Nạp dữ liệu (Seed) thành công!" });

    } catch (err) {
        console.error("❌ LỖI SEED:", err); // Xem dòng này ở Terminal nếu vẫn lỗi
        return res.status(500).json({ error: err.message });
    }
};