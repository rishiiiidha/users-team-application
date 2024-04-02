const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const User = require("../models/user");

const connection = async (req, res) => {
  try {
    await mongoose.connect(
      "mongodb+srv://rishidha04:ILu5sLmjsqim7AQy@cluster0.rtbw5ul.mongodb.net/team-app"
    );
    console.log("Successfully connected to MongoDB Atlas");

    // Read data from JSON file
    // const jsonData = fs.readFileSync(
    //   path.resolve(__dirname, "data.json"),
    //   "utf-8"
    // );
    // const data = JSON.parse(jsonData);

    // // Insert data into the database
    // await User.insertMany(data);
    // console.log("Data imported successfully.");
  } catch (e) {
    console.log(`Error importing data to MongoDB Atlas: ${e.message}`);
  }
};

module.exports = connection;
// connection()
