const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');
const RawMaterials = require('../models').RawMaterials; 

// Endpoint untuk menambahkan bahan baku baru
router.post('/', authenticate, authorize(['admin', 'pemilik']), async (req, res, next) => {
    try {
        const { RawMaterialName, Price, Total, idProduction } = req.body;
        const newRawMaterial = await RawMaterials.create({
            RawMaterialName,
            Price,
            Total,
            idProduction
        });
        res.status(201).json(newRawMaterial);
    } catch (err) {
        next(err);
    }
});

// Endpoint untuk menampilkan semua bahan baku
router.get('/', authenticate, authorize(['admin', 'pemilik', 'karyawan']), async (req, res, next) => {
    try {
        const rawMaterials = await RawMaterials.findAll();
        res.json(rawMaterials);
    } catch (err) {
        next(err);
    }
});

// Endpoint untuk menampilkan bahan baku berdasarkan ID
router.get('/:id', authenticate, authorize(['admin', 'pemilik', 'karyawan']), async (req, res, next) => {
    try {
        const rawMaterial = await RawMaterials.findByPk(req.params.id);
        if (rawMaterial) {
            res.json(rawMaterial);
        } else {
            res.status(404).json({ message: 'Raw Material not found' });
        }
    } catch (err) {
        next(err);
    }
});

// Endpoint untuk memperbarui bahan baku berdasarkan ID
router.put('/:id', authenticate, authorize(['admin', 'pemilik']), async (req, res, next) => {
    try {
        const { RawMaterialName, Price, Total, idProduction } = req.body;
        const rawMaterial = await RawMaterials.findByPk(req.params.id);
        if (rawMaterial) {
            rawMaterial.RawMaterialName = RawMaterialName;
            rawMaterial.Price = Price;
            rawMaterial.Total = Total;
            rawMaterial.idProduction = idProduction;
            await rawMaterial.save();
            res.json(rawMaterial);
        } else {
            res.status(404).json({ message: 'Raw Material not found' });
        }
    } catch (err) {
        next(err);
    }
});

// Endpoint untuk menghapus bahan baku berdasarkan ID
router.delete('/:id', authenticate, authorize(['admin', 'pemilik']), async (req, res, next) => {
    try {
        const rawMaterial = await RawMaterials.findByPk(req.params.id);
        if (rawMaterial) {
            await rawMaterial.destroy();
            res.json({ message: 'Raw Material deleted' });
        } else {
            res.status(404).json({ message: 'Raw Material not found' });
        }
    } catch (err) {
        next(err);
    }
});

module.exports = router;
