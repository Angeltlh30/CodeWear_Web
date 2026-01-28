require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/product.model'); // Đảm bảo đường dẫn đúng tới model
const products = require('./data/products.json');  // Load dữ liệu từ file json

// Lấy link DB từ file .env
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/codewear_local';

const seedProducts = async () => {
  try {
    // 1. Kết nối MongoDB
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB...');

    // 2. Xóa sạch dữ liệu cũ (để tránh trùng lặp khi chạy nhiều lần)
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products...');

    // 3. Thêm dữ liệu mới
    await Product.insertMany(products);
    console.log(`🌱 Seeded ${products.length} products successfully!`);

    process.exit();
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

seedProducts();