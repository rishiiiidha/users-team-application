const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const User = require("../models/user");
const dotenv = require("dotenv");

dotenv.config();

const connection = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Successfully connected to MongoDB Atlas");
  } catch (e) {
    console.log(`Error importing data to MongoDB Atlas: ${e.message}`);
  }
};

module.exports = connection;
