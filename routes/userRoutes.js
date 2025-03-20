const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController"); // ❌ Check if this file exists and exports correctly
const authMiddleware = require("../middleware/authMiddleware");

router.get("/users", userController.getUsers); // ❌ Ensure getUsers is defined

module.exports = router;
