const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const fetchAndStoreUsers = require("./controllers/userController").fetchAndStoreUsers;

const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use("/api/admin", adminRoutes);
app.use("/api/admin/users", userRoutes);

// Fetch and store users after connecting to MongoDB
fetchAndStoreUsers();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
