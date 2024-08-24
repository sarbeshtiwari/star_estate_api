// controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secretKey, tokenExpiry } = require('../../config/jwt');
const userModel = require('../../models/auth/userModel');
const { connect, Schema, model } = require('mongoose');

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await userModel.findOne({ email });

    if (user) {
      // Compare the provided password with the hashed password
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        console.log('matched');
        // Generate JWT token
        const token = jwt.sign({ email: user.email }, secretKey, { expiresIn: tokenExpiry });
        console.log(token);
        res.json({ success: true, token });
      } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
      }
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new userModel({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ success: true, message: 'User registered successfully' });
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}



module.exports = {
  login, registerUser
};
