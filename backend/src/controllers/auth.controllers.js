const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// --- ĐĂNG KÝ ---
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // 1. Kiểm tra user tồn tại
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email đã tồn tại' });
        }

        // 2. Hash mật khẩu
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 3. Lưu vào DB
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });
        await newUser.save();

        res.status(201).json({ message: 'Đăng ký thành công' });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// --- ĐĂNG NHẬP ---
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Tìm user
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: 'Sai email hoặc mật khẩu' });

        // 2. So sánh mật khẩu (Hash)
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Sai email hoặc mật khẩu' });

        // 3. Tạo Token (JWT) để xác thực phiên
        const token = jwt.sign({ id: user._id }, 'SECRET_KEY_CUA_BAN', { expiresIn: '1d' });

        res.json({
            message: 'Đăng nhập thành công',
            token,
            user: { id: user._id, name: user.name, email: user.email }
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};