/* =======================================================
   QUẢN LÝ KẾT NỐI API (MOCKAPI)
   ======================================================= */

const BASE_URL = 'https://696216ffd9d64c761906ead2.mockapi.io/products';

// Tạo object MockAPI chứa các hàm gọi dữ liệu
const MockAPI = {
    // Hàm lấy tất cả sản phẩm
    getAllProducts: async () => {
        try {
            const response = await fetch(BASE_URL);
            if (!response.ok) throw new Error('Lỗi kết nối API');
            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            return []; // Trả về mảng rỗng nếu lỗi
        }
    },

    //Hàm lấy 1 sản phẩm theo ID
    getProductById: async (id) => {
        try {
            const response = await fetch(`${BASE_URL}/${id}`);
            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            return null;
        }
    }
};