const express = require('express');
const router = express.Router();
const ProductDataManagement = require('../models').ProductDataManagement; 

// Endpoint untuk menambahkan product data management baru
router.post('/', async (req, res, next) => {
    try {
        const { ManagementData_id, Products_id } = req.body;
        const newProductDataManagement = await ProductDataManagement.create({ ManagementData_id, Products_id });
        res.status(201).json(newProductDataManagement);
    } catch (err) {
        next(err);
    }
});

// Endpoint untuk menampilkan semua product data management
router.get('/', async (req, res, next) => {
    try {
        const productDataManagement = await ProductDataManagement.findAll();
        res.json(productDataManagement);
    } catch (err) {
        next(err);
    }
});

// Endpoint untuk menampilkan product data management berdasarkan ID
router.get('/:id', async (req, res, next) => {
    try {
        const productDataManagement = await ProductDataManagement.findByPk(req.params.id);
        if (productDataManagement) {
            res.json(productDataManagement);
        } else {
            res.status(404).json({ message: 'Product Data Management not found' });
        }
    } catch (err) {
        next(err);
    }
});

// Endpoint untuk memperbarui product data management berdasarkan ID
router.put('/:id', async (req, res, next) => {
    try {
        const { ManagementData_id, Products_id } = req.body;
        const productDataManagement = await ProductDataManagement.findByPk(req.params.id);
        if (productDataManagement) {
            productDataManagement.ManagementData_id = ManagementData_id;
            productDataManagement.Products_id = Products_id;
            await productDataManagement.save();
            res.json(productDataManagement);
        } else {
            res.status(404).json({ message: 'Product Data Management not found' });
        }
    } catch (err) {
        next(err);
    }
});

// Endpoint untuk menghapus product data management berdasarkan ID
router.delete('/:id', async (req, res, next) => {
    try {
        const productDataManagement = await ProductDataManagement.findByPk(req.params.id);
        if (productDataManagement) {
            await productDataManagement.destroy();
            res.json({ message: 'Product Data Management deleted' });
        } else {
            res.status(404).json({ message: 'Product Data Management not found' });
        }
    } catch (err) {
        next(err);
    }
});

module.exports = router;
