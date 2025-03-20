const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    _id: String, // Use API's _id
    full_name: String,
    age: Number,
    lat: String,
    long: String,
    address: String,
    looking_for: String
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;
// This model will be used to interact with the users collection in the MongoDB database. It includes fields for the user's full name, age, latitude, longitude, address, and what they are looking for. The model is exported as "User" with the userSchema schema. The timestamps option is set to true to automatically add createdAt and updatedAt fields to each document.