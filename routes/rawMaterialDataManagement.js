const express = require('express');
const router = express.Router();
const RawMaterialDataManagement = require('../models').RawMaterialDataManagement; 

// Endpoint untuk menambahkan raw material data management baru
router.post('/', async (req, res, next) => {
    try {
        const { DataManagement_id, RawMaterial_id } = req.body;
        const newRawMaterialDataManagement = await RawMaterialDataManagement.create({ DataManagement_id, RawMaterial_id });
        res.status(201).json(newRawMaterialDataManagement);
    } catch (err) {
        next(err);
    }
});

// Endpoint untuk menampilkan semua raw material data management
router.get('/', async (req, res, next) => {
    try {
        const rawMaterialDataManagement = await RawMaterialDataManagement.findAll();
        res.json(rawMaterialDataManagement);
    } catch (err) {
        next(err);
    }
});

// Endpoint untuk menampilkan raw material data management berdasarkan ID
router.get('/:id', async (req, res, next) => {
    try {
        const rawMaterialDataManagement = await RawMaterialDataManagement.findByPk(req.params.id);
        if (rawMaterialDataManagement) {
            res.json(rawMaterialDataManagement);
        } else {
            res.status(404).json({ message: 'Raw Material Data Management not found' });
        }
    } catch (err) {
        next(err);
    }
});

// Endpoint untuk memperbarui raw material data management berdasarkan ID
router.put('/:id', async (req, res, next) => {
    try {
        const { DataManagement_id, RawMaterial_id } = req.body;
        const rawMaterialDataManagement = await RawMaterialDataManagement.findByPk(req.params.id);
        if (rawMaterialDataManagement) {
            rawMaterialDataManagement.DataManagement_id = DataManagement_id;
            rawMaterialDataManagement.RawMaterial_id = RawMaterial_id;
            await rawMaterialDataManagement.save();
            res.json(rawMaterialDataManagement);
        } else {
            res.status(404).json({ message: 'Raw Material Data Management not found' });
        }
    } catch (err) {
        next(err);
    }
});

// Endpoint untuk menghapus raw material data management berdasarkan ID
router.delete('/:id', async (req, res, next) => {
    try {
        const rawMaterialDataManagement = await RawMaterialDataManagement.findByPk(req.params.id);
        if (rawMaterialDataManagement) {
            await rawMaterialDataManagement.destroy();
            res.json({ message: 'Raw Material Data Management deleted' });
        } else {
            res.status(404).json({ message: 'Raw Material Data Management not found' });
        }
    } catch (err) {
        next(err);
    }
});

module.exports = router;
