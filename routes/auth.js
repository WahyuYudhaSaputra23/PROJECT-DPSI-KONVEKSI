const express = require('express');
const router = express.Router();
const { sequelize, User } = require('../models'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const upload = require('../middleware/upload'); 

// Rute pendaftaran dengan gambar profil
router.post('/register', upload.single('image'), async (req, res, next) => {
    try {
        const { username, password, role } = req.body;
        if (!username || !password || !role) {
            return res.status(400).json({ message: 'Please provide username, password, and role' });
        }
        const newUser = await User.create({
            Username: username,
            Password: password,
            Role: role,
            Image: req.file ? req.file.filename : null 
        });
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        next(err);
    }
});

// Rute login
router.post('/login', async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { Username: username } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.Password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user.idUser, role: user.Role }, 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
