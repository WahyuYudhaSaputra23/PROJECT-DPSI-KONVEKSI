const express = require('express');
const router = express.Router();
const UserUserManagement = require('../models').UserUserManagement; 

// Endpoint untuk menambahkan user user management baru
router.post('/', async (req, res, next) => {
    try {
        const { UserManagement_id, User_id } = req.body;
        const newUserUserManagement = await UserUserManagement.create({ UserManagement_id, User_id });
        res.status(201).json(newUserUserManagement);
    } catch (err) {
        next(err);
    }
});

// Endpoint untuk menampilkan semua user user management
router.get('/', async (req, res, next) => {
    try {
        const userUserManagement = await UserUserManagement.findAll();
        res.json(userUserManagement);
    } catch (err) {
        next(err);
    }
});

// Endpoint untuk menampilkan user user management berdasarkan ID
router.get('/:id', async (req, res, next) => {
    try {
        const userUserManagement = await UserUserManagement.findByPk(req.params.id);
        if (userUserManagement) {
            res.json(userUserManagement);
        } else {
            res.status(404).json({ message: 'User User Management not found' });
        }
    } catch (err) {
        next(err);
    }
});

// Endpoint untuk memperbarui user user management berdasarkan ID
router.put('/:id', async (req, res, next) => {
    try {
        const { UserManagement_id, User_id } = req.body;
        const userUserManagement = await UserUserManagement.findByPk(req.params.id);
        if (userUserManagement) {
            userUserManagement.UserManagement_id = UserManagement_id;
            userUserManagement.User_id = User_id;
            await userUserManagement.save();
            res.json(userUserManagement);
        } else {
            res.status(404).json({ message: 'User User Management not found' });
        }
    } catch (err) {
        next(err);
    }
});

// Endpoint untuk menghapus user user management berdasarkan ID
router.delete('/:id', async (req, res, next) => {
    try {
        const userUserManagement = await UserUserManagement.findByPk(req.params.id);
        if (userUserManagement) {
            await userUserManagement.destroy();
            res.json({ message: 'User User Management deleted' });
        } else {
            res.status(404).json({ message: 'User User Management not found' });
        }
    } catch (err) {
        next(err);
    }
});

module.exports = router;
