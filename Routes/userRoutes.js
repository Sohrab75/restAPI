// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../Model/userModal');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// Generate a random secret key
const JWT_SECRET_KEY = crypto.randomBytes(32).toString('hex');

const generateToken = (user) => {
    const payload = {
      email: user.email,
      // Add more user data here if needed
    };
  
    const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '5m' });
  
    return token;
  };

// User Registration
router.post('/register', async (req, res) => {
    const {email, password, role} = req.body;
    console.log("role data", role)
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log(`User registration failed: Email ${email} already registered.`);
            return res.status(400).json({ message: 'Email already registered' });
        }
        const hashedPassword = await bcryptjs.hash(password, 10);
        const newUser = new User({email, password: hashedPassword, role });
        await newUser.save();
        console.log("database data", newUser);
        console.log(`User registered successfully: ${email}`);
        console.log(`User registered with role: ${role}`);
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

        const isPasswordCorrect = await bcryptjs.compare(password, user.password);

        if (isPasswordCorrect) {
            console.log(`Login successful: User ${email}`);
            const token = generateToken(user);
            // const token = jwt.sign({ userId: user._id }, 'your-secret-key');
            res.status(200).json({ message: 'Login successful!', token});
        } else {
            console.log(`Login failed: Incorrect password for user ${email}`);
            res.status(401).json({ message: 'Incorrect password' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Error logging in');
    }
});

// GET endpoint to fetch user information
router.get('/userinfo', async (req, res) => {
    const token = req.header('x-access-token');
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized. Token missing.' });
    }

    try {
        const decoded = await jwt.verify(token, JWT_SECRET_KEY);
        const { email } = decoded;
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        // Return the user information in the response
        return res.json({
            username: user.username,
            email: user.email,
        });
    } catch (error) {
        console.error('Token verification error:', error);
        return res.status(401).json({ message: 'Unauthorized. Invalid token.' });
    }
});



module.exports = router;
