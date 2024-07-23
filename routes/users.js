const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');
const User = require('../models').User;

// Endpoint untuk menambahkan user baru dengan gambar
router.post('/', authenticate, authorize(['admin']), upload.single('image'), async (req, res, next) => {
    try {
        const { Username, Password, Role } = req.body;
        const newUser = await User.create({
            Username,
            Password,
            Role,
            Image: req.file ? req.file.filename : null 
        });
        res.status(201).json(newUser);
    } catch (err) {
        next(err);
    }
});

// Endpoint untuk menampilkan semua users
router.get('/', authenticate, authorize(['admin']), async (req, res, next) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (err) {
        next(err);
    }
});

// Endpoint untuk menampilkan user berdasarkan ID
router.get('/:id', authenticate, authorize(['admin']), async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        next(err);
    }
});

// Endpoint untuk memperbarui user berdasarkan ID dengan gambar
router.put('/:id', authenticate, authorize(['admin']), upload.single('image'), async (req, res, next) => {
    try {
        const { Username, Password, Role } = req.body;
        const user = await User.findByPk(req.params.id);
        if (user) {
            user.Username = Username;
            user.Password = Password;
            user.Role = Role;
            if (req.file) {
                user.Image = req.file.filename; 
            }
            await user.save();
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        next(err);
    }
});

// Endpoint untuk menghapus user berdasarkan ID
router.delete('/:id', authenticate, authorize(['admin']), async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            await user.destroy();
            res.json({ message: 'User deleted' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        next(err);
    }
});

module.exports = router;
