const Admin = require("../models/adminModel");//importing the Admin model 
const jwt = require("jsonwebtoken");//importing jsonwebtoken to generate JWT tokens 
const bcrypt = require("bcryptjs");//importing bcrypt to hash passwords 

// Admin registration controller 
exports.adminLogin = async (req, res) => {
    try {
        const { userName, password } = req.body;

        // Check if admin exists
        const admin = await Admin.findOne({ userName });
        if (!admin) return res.status(401).json({ message: "Invalid Credentials" });

        // Compare passwords
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid Credentials" });

        // Generate JWT token
        const token = jwt.sign({ id: admin._id, userName: admin.userName }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ message: "Login Successful", token });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
