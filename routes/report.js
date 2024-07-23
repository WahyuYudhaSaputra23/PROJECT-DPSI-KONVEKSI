const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');
const Report = require('../models').Report; 

// Endpoint untuk menambahkan laporan baru - Hanya Admin dan Pemilik yang dapat menambahkan laporan
router.post('/', authenticate, authorize(['admin', 'pemilik']), async (req, res, next) => {
    try {
        const { TypeReport, dataReport, idUser } = req.body;
        const newReport = await Report.create({ TypeReport, dataReport, idUser });
        res.status(201).json(newReport);
    } catch (err) {
        next(err);
    }
});

// Endpoint untuk menampilkan semua laporan - Hanya Pemilik yang dapat melihat laporan
router.get('/', authenticate, authorize(['pemilik']), async (req, res, next) => {
    try {
        const reports = await Report.findAll();
        res.json(reports);
    } catch (err) {
        next(err);
    }
});

// Endpoint untuk menampilkan laporan berdasarkan ID - Hanya Pemilik yang dapat melihat laporan
router.get('/:id', authenticate, authorize(['pemilik']), async (req, res, next) => {
    try {
        const report = await Report.findByPk(req.params.id);
        if (report) {
            res.json(report);
        } else {
            res.status(404).json({ message: 'Report not found' });
        }
    } catch (err) {
        next(err);
    }
});

// Endpoint untuk memperbarui laporan berdasarkan ID - Hanya Admin dan Pemilik yang dapat memperbarui laporan
router.put('/:id', authenticate, authorize(['admin', 'pemilik']), async (req, res, next) => {
    try {
        const { TypeReport, dataReport, idUser } = req.body;
        const report = await Report.findByPk(req.params.id);
        if (report) {
            report.TypeReport = TypeReport;
            report.dataReport = dataReport;
            report.idUser = idUser;
            await report.save();
            res.json(report);
        } else {
            res.status(404).json({ message: 'Report not found' });
        }
    } catch (err) {
        next(err);
    }
});

// Endpoint untuk menghapus laporan berdasarkan ID - Hanya Admin dan Pemilik yang dapat menghapus laporan
router.delete('/:id', authenticate, authorize(['admin', 'pemilik']), async (req, res, next) => {
    try {
        const report = await Report.findByPk(req.params.id);
        if (report) {
            await report.destroy();
            res.json({ message: 'Report deleted' });
        } else {
            res.status(404).json({ message: 'Report not found' });
        }
    } catch (err) {
        next(err);
    }
});

module.exports = router;
