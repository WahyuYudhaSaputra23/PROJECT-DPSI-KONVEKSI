const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');
const DataManagement = require('../models').DataManagement; 

// Endpoint untuk menambahkan data management baru
router.post('/', authenticate, authorize(['admin']), async (req, res, next) => {
    try {
        const { NameManager, Description } = req.body;
        const newDataManagement = await DataManagement.create({ NameManager, Description });
        res.status(201).json(newDataManagement);
    } catch (err) {
        next(err);
    }
});

// Endpoint untuk menampilkan semua data management
router.get('/', authenticate, authorize(['admin', 'pemilik', 'karyawan']), async (req, res, next) => {
    try {
        const dataManagement = await DataManagement.findAll();
        res.json(dataManagement);
    } catch (err) {
        next(err);
    }
});

// Endpoint untuk menampilkan data management berdasarkan ID
router.get('/:id', authenticate, authorize(['admin', 'pemilik', 'karyawan']), async (req, res, next) => {
    try {
        const dataManagement = await DataManagement.findByPk(req.params.id);
        if (dataManagement) {
            res.json(dataManagement);
        } else {
            res.status(404).json({ message: 'Data Management not found' });
        }
    } catch (err) {
        next(err);
    }
});

// Endpoint untuk memperbarui data management berdasarkan ID
router.put('/:id', authenticate, authorize(['admin']), async (req, res, next) => {
    try {
        const { NameManager, Description } = req.body;
        const dataManagement = await DataManagement.findByPk(req.params.id);
        if (dataManagement) {
            dataManagement.NameManager = NameManager;
            dataManagement.Description = Description;
            await dataManagement.save();
            res.json(dataManagement);
        } else {
            res.status(404).json({ message: 'Data Management not found' });
        }
    } catch (err) {
        next(err);
    }
});

// Endpoint untuk menghapus data management berdasarkan ID
router.delete('/:id', authenticate, authorize(['admin']), async (req, res, next) => {
    try {
        const dataManagement = await DataManagement.findByPk(req.params.id);
        if (dataManagement) {
            await dataManagement.destroy();
            res.json({ message: 'Data Management deleted' });
        } else {
            res.status(404).json({ message: 'Data Management not found' });
        }
    } catch (err) {
        next(err);
    }
});

module.exports = router;
