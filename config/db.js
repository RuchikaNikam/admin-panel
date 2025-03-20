// Purpose: This file is used to connect to the MongoDB database using the connection string stored in the .env file. It uses the mongoose library to connect to the database.
const mongoose = require("mongoose");//importing mongoose
require("dotenv").config();//importing dotenv to use the .env file

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });//connecting to the database using the connection string stored in the .env file
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1);//if the connection fails then the process will exit
    }
};

module.exports = connectDB;//exporting the connectDB function
