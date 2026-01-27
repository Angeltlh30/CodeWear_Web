require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/product.routes');
const orderRoutes = require('./routes/order.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Cấu hình CORS mở rộng cho mọi nguồn
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Kết nối MongoDB 
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/codewear_local';

mongoose
  .connect(MONGO_URI, { family: 4 })
  .then(() => console.log("✅ Đã kết nối MongoDB"))
  .catch((err) => {
      console.error("❌ Lỗi DB:", err.message);
      console.log("👉 Gợi ý: Hãy tạo file .env trong thư mục backend và điền MONGO_URI vào.");
  });

app.get('/', (req, res) => res.send('Server CodeWear đang chạy!'));
app.get('/ping', (req, res) => res.status(200).send('Pong!'));

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server chạy tại cổng: ${PORT}`);
});