<<<<<<< HEAD
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/product.routes');
const orderRoutes = require('./routes/order.routes'); 
=======
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
>>>>>>> origin/main

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Kết nối MongoDB
<<<<<<< HEAD
const MONGO_URI = 'mongodb+srv://thaihuyxbox_db_user:KfJFl76X6tDM7UnR@cluster0.lxu1hfi.mongodb.net/CodeWear_Web?retryWrites=true&w=majority';
=======
const MONGO_URI =
  "mongodb+srv://thaihuyxbox_db_user:KfJFl76X6tDM7UnR@cluster0.lxu1hfi.mongodb.net/CodeWear_Web?retryWrites=true&w=majority";
>>>>>>> origin/main

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ Đã kết nối MongoDB"))
  .catch((err) => console.error("❌ Lỗi DB:", err));

<<<<<<< HEAD
// Route kiểm tra sức khỏe Server (Ping)
app.get('/ping', (req, res) => {
    res.status(200).send('Pong! Server is alive.');
});

// Sử dụng Routes.
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
=======
// Routes
app.use("/api/auth", authRoutes);
>>>>>>> origin/main

app.listen(PORT, () => {
  console.log(`🚀 Server chạy tại http://localhost:${PORT}`);
});
