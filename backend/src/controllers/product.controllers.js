const Product = require('../models/product.model');

// Lấy tất cả sản phẩm
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Lấy 1 sản phẩm
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Thêm sản phẩm (QUAN TRỌNG: Hàm này trước đây bị thiếu)
exports.addProduct = async (req, res) => {
    const { name, price, image, description, category } = req.body;
    
    if (!name || !price) {
        return res.status(400).json({ message: "Tên và giá là bắt buộc" });
    }

    const product = new Product({
        name,
        price,
        image: image || "",
        description: description || "",
        category: category || "General"
    });

    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};