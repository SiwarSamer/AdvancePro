const express = require('express');
const connection = require("../../../db/connection.js");
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const app = express(); 
app.use(bodyParser.json());
const { JWT_SECRET_KEY } = require('./../middleware/middleware.js');
const bcrypt = require('bcrypt');
const User = require('../../../db/models/user.model.js');  
const { sequelize } = require('../../../db/connection.js'); 
require('dotenv').config();
const { loginSchema, signupSchema } = require('./../services/validation/validation.js');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate request
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." });
        }

        // Fetch user by email
        const user = await User.findOne({ where: { email } });

        // Check if user exists
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        // Create JWT payload
        const payload = {
            user: {
                id: user.user_id,
                email: user.email,
                role: user.role
            }
        };

        // Sign the token
        const token = jwt.sign(payload, JWT_SECRET_KEY, { algorithm: 'HS256', expiresIn: '1h' });

        // Check for admin role
        if (user.role === "admin") {
            return res.status(200).json({
                message: "Admin login successful",
                token,
                userId: user.user_id,
                role: user.role,
                email: user.email
            });
        }

        // Respond for non-admin login
        return res.status(200).json({
            message: "Login successful",
            token,
            userId: user.user_id,
            role: user.role,
            email: user.email
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};


module.exports = { login };
const signup = async (req, res) => {
    try {
        const { UserName, email, password, phone, address, role } = req.body;

        // Validate required fields
        if (!UserName || !email || !password) {
            return res.status(400).json({ message: "Username, email, and password are required." });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Hashed password:", hashedPassword);

        // Create a new user with any role (including admin)
        const newUser = await User.create({
            name: UserName, 
            email,
            password: hashedPassword,
            phone,
            address,
            role,
        });

        console.log("User created:", newUser);
        return res.status(201).json({ message: "User created successfully", userId: newUser.user_id });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};



  
const logout = async (req, res) => {
    try {
        // If token is stored in a cookie, clear it by setting an expired date
        res.cookie('token', '', { expires: new Date(0), httpOnly: true });

        return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { login, signup, logout };

