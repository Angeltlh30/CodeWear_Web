const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String, default: "other" },
    desc: { type: String, default: "" }, // Mô tả chi tiết
    info: { type: String, default: "" }, // Thông số kỹ thuật
    gallery: { type: [String], default: [] } // Album ảnh
});

module.exports = mongoose.model('Product', productSchema);