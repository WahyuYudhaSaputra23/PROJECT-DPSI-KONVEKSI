const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');
const Employees = require('../models').Employees; 

// Endpoint untuk menambahkan employee baru
router.post('/', authenticate, authorize(['admin']), async (req, res, next) => {
    try {
        const { EmployeeName, Position, Salary, idManagementReport } = req.body;
        const newEmployee = await Employees.create({ EmployeeName, Position, Salary, idManagementReport });
        res.status(201).json(newEmployee);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error', details: err.message });
        next(err);
    }
});

// Endpoint untuk menampilkan semua employees
router.get('/', authenticate, authorize(['admin', 'pemilik', 'karyawan']), async (req, res, next) => {
    try {
        const employees = await Employees.findAll();
        res.json(employees);
    } catch (err) {
        next(err);
    }
});

// Endpoint untuk menampilkan employee berdasarkan ID
router.get('/:id', authenticate, authorize(['admin', 'pemilik', 'karyawan']), async (req, res, next) => {
    try {
        const employee = await Employees.findByPk(req.params.id);
        if (employee) {
            res.json(employee);
        } else {
            res.status(404).json({ message: 'Employee not found' });
        }
    } catch (err) {
        next(err);
    }
});

// Endpoint untuk memperbarui employee berdasarkan ID
router.put('/:id', authenticate, authorize(['admin']), async (req, res, next) => {
    try {
        const { EmployeeName, Position, Salary, idManagementReport } = req.body;
        const employee = await Employees.findByPk(req.params.id);
        if (employee) {
            employee.EmployeeName = EmployeeName;
            employee.Position = Position;
            employee.Salary = Salary;
            employee.idManagementReport = idManagementReport;
            await employee.save();
            res.json(employee);
        } else {
            res.status(404).json({ message: 'Employee not found' });
        }
    } catch (err) {
        next(err);
    }
});

// Endpoint untuk menghapus employee berdasarkan ID
router.delete('/:id', authenticate, authorize(['admin']), async (req, res, next) => {
    try {
        const employee = await Employees.findByPk(req.params.id);
        if (employee) {
            await employee.destroy();
            res.json({ message: 'Employee deleted' });
        } else {
            res.status(404).json({ message: 'Employee not found' });
        }
    } catch (err) {
        next(err);
    }
});

module.exports = router;
