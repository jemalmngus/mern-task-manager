// authRoutes.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Import your user model
const {authenticateToken} = require('./middleware');


// Logout user
router.post('/logout', authenticateToken, (req, res) => {
    // If the authentication middleware passes, the user is logged in and can be logged out
    console.log("successfully logged out")
    res.json({ message: 'Logout successful' });
  });


// Register user
router.post('/register', async (req, res) => {
    try {
      const { firstname, lastname, email, company, password } = req.body;
  
      // Check if the email is already registered
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        console.log(`Email ${email} is already registered`);
        return res.status(400).json({ message: 'Email already registered' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user
      const user = new User({
        firstname,
        lastname,
        email,
        company,
        password: hashedPassword,
      });
  
      // Save the user to the database
      await user.save();
  
      // Generate a JWT token for the registered user
      const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });
  
      // Send the token in the response
      console.log(`User ${email} registered successfully`);
      res.status(201).json({ token });
    } catch (error) {
      console.error('Error during registration:', error.message);
      res.status(500).json({ error: error.message });
    }
  });

// Login user
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Received email:', email);

        const user = await User.findOne({ email });

        if (!user) {
            console.log('User not found');
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.log('Invalid password');
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });
        console.log('Token:', token,"loggedin");
        res.status(200).json({ token });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: error.message });
    }
});
module.exports = router;
