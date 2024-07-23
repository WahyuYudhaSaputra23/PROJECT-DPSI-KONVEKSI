const express = require('express');
const router = express.Router();
const EmployeeDataManagement = require('../models').EmployeeDataManagement; 

// Endpoint untuk menambahkan employee data management baru
router.post('/', async (req, res, next) => {
    try {
        const { DataManagement_id, Employee_id } = req.body;
        const newEmployeeDataManagement = await EmployeeDataManagement.create({ DataManagement_id, Employee_id });
        res.status(201).json(newEmployeeDataManagement);
    } catch (err) {
        next(err);
    }
});

// Endpoint untuk menampilkan semua employee data management
router.get('/', async (req, res, next) => {
    try {
        const employeeDataManagement = await EmployeeDataManagement.findAll();
        res.json(employeeDataManagement);
    } catch (err) {
        next(err);
    }
});

// Endpoint untuk menampilkan employee data management berdasarkan ID
router.get('/:id', async (req, res, next) => {
    try {
        const employeeDataManagement = await EmployeeDataManagement.findByPk(req.params.id);
        if (employeeDataManagement) {
            res.json(employeeDataManagement);
        } else {
            res.status(404).json({ message: 'Employee Data Management not found' });
        }
    } catch (err) {
        next(err);
    }
});

// Endpoint untuk memperbarui employee data management berdasarkan ID
router.put('/:id', async (req, res, next) => {
    try {
        const { DataManagement_id, Employee_id } = req.body;
        const employeeDataManagement = await EmployeeDataManagement.findByPk(req.params.id);
        if (employeeDataManagement) {
            employeeDataManagement.DataManagement_id = DataManagement_id;
            employeeDataManagement.Employee_id = Employee_id;
            await employeeDataManagement.save();
            res.json(employeeDataManagement);
        } else {
            res.status(404).json({ message: 'Employee Data Management not found' });
        }
    } catch (err) {
        next(err);
    }
});

// Endpoint untuk menghapus employee data management berdasarkan ID
router.delete('/:id', async (req, res, next) => {
    try {
        const employeeDataManagement = await EmployeeDataManagement.findByPk(req.params.id);
        if (employeeDataManagement) {
            await employeeDataManagement.destroy();
            res.json({ message: 'Employee Data Management deleted' });
        } else {
            res.status(404).json({ message: 'Employee Data Management not found' });
        }
    } catch (err) {
        next(err);
    }
});

module.exports = router;
