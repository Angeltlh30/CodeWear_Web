const Order = require('../models/order.model');

// Tạo đơn hàng mới
exports.createOrder = async (req, res) => {
    try {
        const { userId, items, totalAmount } = req.body;
        const newOrder = new Order({ userId, items, totalAmount });
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Lấy lịch sử đơn hàng theo User ID
exports.getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.userId }).sort({ _id: -1 }); // Mới nhất lên đầu
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};