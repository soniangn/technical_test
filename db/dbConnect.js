// Require ODM Mongoose
const mongoose = require("mongoose");
require('dotenv').config()

// Use of mongoose to connect the app to the database on mongoDB using the DB_URL
async function dbConnect() {
    mongoose
    .connect(
        process.env.DB_URL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => {
      console.log("Successfully connected to MongoDB Atlas!");
    })
    .catch((error) => {
      console.log("Unable to connect to MongoDB Atlas!");
      console.error(error);
    });
}

module.exports = dbConnect;