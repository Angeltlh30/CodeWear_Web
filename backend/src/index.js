const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Kết nối MongoDB 
const MONGO_URI = 'mongodb+srv://thaihuyxbox_db_user:KfJFl76X6tDM7UnR@cluster0.lxu1hfi.mongodb.net/CodeWear_Web?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ Đã kết nối MongoDB'))
    .catch(err => console.error('❌ Lỗi DB:', err));

// Routes
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Server chạy tại http://localhost:${PORT}`);
});