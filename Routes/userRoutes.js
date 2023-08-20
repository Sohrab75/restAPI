// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../Model/userModal');
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');

// User Registration
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            console.log(`User registration failed: Email ${email} already registered.`);
            return res.status(400).json({ message: 'Email already registered' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        console.log(`User registered successfully: ${email}`);
        res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
        console.error('Error during user registration:', error);
        res.status(500).send('Error registering user');
    }
});

// User Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            console.log(`Login failed: User not found for email ${email}`);
            res.status(401).json({ message: 'User not found' });
            return;
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (isPasswordCorrect) {
            console.log(`Login successful: User ${email}`);
            const token = jwt.sign({ userId: user._id }, 'your-secret-key');
            res.status(200).json({ token });
        } else {
            console.log(`Login failed: Incorrect password for user ${email}`);
            res.status(401).json({ message: 'Incorrect password' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Error logging in');
    }
});


module.exports = router;
