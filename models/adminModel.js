const mongoose = require("mongoose");//importing mongoose to use its features 
const bcrypt = require("bcryptjs");//importing bcrypt to hash the password 

// Admin schema with userName and password fields 
const adminSchema = new mongoose.Schema({
    userName: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Hash password before saving to database 
adminSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

module.exports = mongoose.model("Admin", adminSchema);//exporting the Admin model with the adminSchema schema 

// This model will be used to interact with the admins collection in the MongoDB database. It includes a pre-save hook to hash the password before saving it to the database. The password field is required and unique, and the userName field is also required and unique. The model is exported as "Admin" with the adminSchema schema.