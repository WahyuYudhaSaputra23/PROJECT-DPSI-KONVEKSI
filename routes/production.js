const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');
const Production = require('../models').Production; 

// Endpoint untuk menambahkan produksi baru - Hanya Admin yang dapat menambahkan produksi
router.post('/', authenticate, authorize(['admin']), async (req, res, next) => {
    try {
        const { ProductionStatus, idEmployees } = req.body;
        const newProduction = await Production.create({ ProductionStatus, idEmployees });
        res.status(201).json(newProduction);
    } catch (err) {
        next(err);
    }
});

// Endpoint untuk menampilkan semua produksi - Semua peran dapat melihat produksi
router.get('/', authenticate, authorize(['admin', 'pemilik', 'karyawan']), async (req, res, next) => {
    try {
        const production = await Production.findAll();
        res.json(production);
    } catch (err) {
        next(err);
    }
});

// Endpoint untuk menampilkan produksi berdasarkan ID - Semua peran dapat melihat produksi
router.get('/:id', authenticate, authorize(['admin', 'pemilik', 'karyawan']), async (req, res, next) => {
    try {
        const production = await Production.findByPk(req.params.id);
        if (production) {
            res.json(production);
        } else {
            res.status(404).json({ message: 'Production not found' });
        }
    } catch (err) {
        next(err);
    }
});

// Endpoint untuk memperbarui produksi berdasarkan ID - Hanya Admin yang dapat memperbarui produksi
router.put('/:id', authenticate, authorize(['admin']), async (req, res, next) => {
    try {
        const { ProductionStatus, idEmployees } = req.body;
        const production = await Production.findByPk(req.params.id);
        if (production) {
            production.ProductionStatus = ProductionStatus;
            production.idEmployees = idEmployees;
            await production.save();
            res.json(production);
        } else {
            res.status(404).json({ message: 'Production not found' });
        }
    } catch (err) {
        next(err);
    }
});

// Endpoint untuk menghapus produksi berdasarkan ID - Hanya Admin yang dapat menghapus produksi
router.delete('/:id', authenticate, authorize(['admin']), async (req, res, next) => {
    try {
        const production = await Production.findByPk(req.params.id);
        if (production) {
            await production.destroy();
            res.json({ message: 'Production deleted' });
        } else {
            res.status(404).json({ message: 'Production not found' });
        }
    } catch (err) {
        next(err);
    }
});

module.exports = router;
