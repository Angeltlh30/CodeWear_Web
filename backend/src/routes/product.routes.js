const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controllers');

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/seed', productController.seedProducts);

module.exports = router;