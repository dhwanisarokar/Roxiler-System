const mongoose = require('mongoose');
const config = require("./config.js");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(config.mongoose.url);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
};

module.exports = connectDB;
