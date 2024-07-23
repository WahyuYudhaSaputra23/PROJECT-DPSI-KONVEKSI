const express = require('express');
const router = express.Router();
const ManagementReportReport = require('../models').ManagementReportReport; 

// Endpoint untuk menambahkan management report report baru
router.post('/', async (req, res, next) => {
    try {
        const { ManagementReport_id, Report_id } = req.body;
        const newManagementReportReport = await ManagementReportReport.create({ ManagementReport_id, Report_id });
        res.status(201).json(newManagementReportReport);
    } catch (err) {
        next(err);
    }
});

// Endpoint untuk menampilkan semua management report reports
router.get('/', async (req, res, next) => {
    try {
        const managementReportReports = await ManagementReportReport.findAll();
        res.json(managementReportReports);
    } catch (err) {
        next(err);
    }
});

// Endpoint untuk menampilkan management report report berdasarkan ID
router.get('/:id', async (req, res, next) => {
    try {
        const managementReportReport = await ManagementReportReport.findByPk(req.params.id);
        if (managementReportReport) {
            res.json(managementReportReport);
        } else {
            res.status(404).json({ message: 'Management Report Report not found' });
        }
    } catch (err) {
        next(err);
    }
});

// Endpoint untuk memperbarui management report report berdasarkan ID
router.put('/:id', async (req, res, next) => {
    try {
        const { ManagementReport_id, Report_id } = req.body;
        const managementReportReport = await ManagementReportReport.findByPk(req.params.id);
        if (managementReportReport) {
            managementReportReport.ManagementReport_id = ManagementReport_id;
            managementReportReport.Report_id = Report_id;
            await managementReportReport.save();
            res.json(managementReportReport);
        } else {
            res.status(404).json({ message: 'Management Report Report not found' });
        }
    } catch (err) {
        next(err);
    }
});

// Endpoint untuk menghapus management report report berdasarkan ID
router.delete('/:id', async (req, res, next) => {
    try {
        const managementReportReport = await ManagementReportReport.findByPk(req.params.id);
        if (managementReportReport) {
            await managementReportReport.destroy();
            res.json({ message: 'Management Report Report deleted' });
        } else {
            res.status(404).json({ message: 'Management Report Report not found' });
        }
    } catch (err) {
        next(err);
    }
});

module.exports = router;
