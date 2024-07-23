const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');
const UserManagement = require('../models').UserManagement; 

// Endpoint untuk menambahkan user management baru - Hanya Admin yang dapat menambahkan
router.post('/', authenticate, authorize(['admin']), async (req, res, next) => {
    try {
        const { NameManager, Description } = req.body;
        const newUserManagement = await UserManagement.create({ NameManager, Description });
        res.status(201).json(newUserManagement);
    } catch (err) {
        next(err);
    }
});

// Endpoint untuk menampilkan semua user management - Hanya Admin yang dapat melihat
router.get('/', authenticate, authorize(['admin']), async (req, res, next) => {
    try {
        const userManagement = await UserManagement.findAll();
        res.json(userManagement);
    } catch (err) {
        next(err);
    }
});

// Endpoint untuk menampilkan user management berdasarkan ID - Hanya Admin yang dapat melihat
router.get('/:id', authenticate, authorize(['admin']), async (req, res, next) => {
    try {
        const userManagement = await UserManagement.findByPk(req.params.id);
        if (userManagement) {
            res.json(userManagement);
        } else {
            res.status(404).json({ message: 'User Management not found' });
        }
    } catch (err) {
        next(err);
    }
});

// Endpoint untuk memperbarui user management berdasarkan ID - Hanya Admin yang dapat memperbarui
router.put('/:id', authenticate, authorize(['admin']), async (req, res, next) => {
    try {
        const { NameManager, Description } = req.body;
        const userManagement = await UserManagement.findByPk(req.params.id);
        if (userManagement) {
            userManagement.NameManager = NameManager;
            userManagement.Description = Description;
            await userManagement.save();
            res.json(userManagement);
        } else {
            res.status(404).json({ message: 'User Management not found' });
        }
    } catch (err) {
        next(err);
    }
});

// Endpoint untuk menghapus user management berdasarkan ID - Hanya Admin yang dapat menghapus
router.delete('/:id', authenticate, authorize(['admin']), async (req, res, next) => {
    try {
        const userManagement = await UserManagement.findByPk(req.params.id);
        if (userManagement) {
            await userManagement.destroy();
            res.json({ message: 'User Management deleted' });
        } else {
            res.status(404).json({ message: 'User Management not found' });
        }
    } catch (err) {
        next(err);
    }
});

module.exports = router;
