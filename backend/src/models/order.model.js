const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    items: [
        {
            id: String, 
            name: String,
            price: Number,
            quantity: Number,
            image: String,
            size: { type: String, default: "" } 
        }
    ],
    totalAmount: Number,
    date: { type: String, default: () => new Date().toLocaleDateString('vi-VN') },
    status: { type: String, default: 'Đang xử lý' }
});

module.exports = mongoose.model('Order', orderSchema);