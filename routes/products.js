const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');
const Products = require('../models').Products; 

// Endpoint untuk menambahkan produk baru dengan gambar
router.post('/', authenticate, authorize(['admin']), upload.single('image'), async (req, res, next) => {
    try {
        const { ProductName, Price, Stock, idProduction } = req.body;
        const newProduct = await Products.create({
            ProductName,
            Price,
            Stock,
            idProduction,
            Image: req.file ? req.file.filename : null 
        });
        res.status(201).json(newProduct);
    } catch (err) {
        console.error(err); 
        res.status(500).json({ error: 'Internal Server Error', details: err.message });
        next(err);
    }
});

// Endpoint untuk menampilkan semua produk
router.get('/', authenticate, authorize(['admin', 'pemilik', 'karyawan']), async (req, res, next) => {
    try {
        const products = await Products.findAll();
        res.json(products);
    } catch (err) {
        next(err);
    }
});

// Endpoint untuk menampilkan produk berdasarkan ID
router.get('/:id', authenticate, authorize(['admin', 'pemilik', 'karyawan']), async (req, res, next) => {
    try {
        const product = await Products.findByPk(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (err) {
        next(err);
    }
});

// Endpoint untuk memperbarui produk berdasarkan ID dengan gambar
router.put('/:id', authenticate, authorize(['admin']), upload.single('image'), async (req, res, next) => {
    try {
        const { ProductName, Price, Stock, idProduction } = req.body;
        const product = await Products.findByPk(req.params.id);
        if (product) {
            product.ProductName = ProductName;
            product.Price = Price;
            product.Stock = Stock;
            product.idProduction = idProduction;
            if (req.file) {
                product.Image = req.file.filename; 
            }
            await product.save();
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (err) {
        next(err);
    }
});

// Endpoint untuk menghapus produk berdasarkan ID
router.delete('/:id', authenticate, authorize(['admin']), async (req, res, next) => {
    try {
        const product = await Products.findByPk(req.params.id);
        if (product) {
            await product.destroy();
            res.json({ message: 'Product deleted' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (err) {
        next(err);
    }
});

module.exports = router;
