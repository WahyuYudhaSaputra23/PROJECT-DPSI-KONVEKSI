const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');
const ManagementReport = require('../models').ManagementReport;

// Endpoint untuk menambahkan laporan manajemen baru
router.post('/', authenticate, authorize(['admin', 'pemilik']), async (req, res, next) => {
    try {
        const { NameManager, Description } = req.body;
        const newManagementReport = await ManagementReport.create({ NameManager, Description });
        res.status(201).json(newManagementReport);
    } catch (err) {
        next(err);
    }
});

// Endpoint untuk menampilkan semua laporan manajemen
router.get('/', authenticate, authorize(['admin', 'pemilik', 'karyawan']), async (req, res, next) => {
    try {
        const managementReports = await ManagementReport.findAll();
        res.json(managementReports);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
