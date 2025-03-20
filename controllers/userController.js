const axios = require("axios");
const User = require("../models/userModel");

const getUsers = async (req, res) => {
    try {
        const { search = null, page = 1, limit = 10 } = req.query;
        const pageNum = parseInt(page);
        const pageSize = parseInt(limit);

        const filter = search && search !== "null"
            ? { name: { $regex: search, $options: "i" } }
            : {};

        const totalUsers = await User.countDocuments(filter);
        const users = await User.find(filter)
            .limit(pageSize)
            .skip((pageNum - 1) * pageSize);

        res.json({
            totalUsers,
            totalPages: Math.ceil(totalUsers / pageSize),
            currentPage: pageNum,
            users
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

const fetchAndStoreUsers = async () => {
    try {
        const response = await axios.get(
            "https://18b7-59-162-82-6.ngrok-free.app/api/admin/users?search=null&page=1&limit=10",
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer YOUR_JWT_TOKEN", // Replace with actual token
                }
            }
        );

        if (response.data && response.data.data) {
            for (let user of response.data.data) {
                await User.findOneAndUpdate(
                    { _id: user._id }, // Use _id as unique key
                    { $set: user },    // Update data
                    { upsert: true, new: true } // Insert if not exists
                );
            }
            console.log("✅ Users stored in MongoDB successfully!");
        }
    } catch (error) {
        console.error("❌ Error fetching user data:", error);
    }
};

// Correctly export both functions
module.exports = { getUsers, fetchAndStoreUsers };
