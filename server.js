// Requires cookie-parser middleware
const cookieParser = require('cookie-parser');

// Requires express framework
const express = require('express');

// Requires environment variables configuration
require('dotenv').config()

// Creates an app from express
const app = express();
const route = require('./routes/userRoute');

// Use of express.json to get request of json data
app.use(express.json());

// Loads the cookie-parsing middleware
app.use(cookieParser()); 

// Use routes
app.use('/api', route);

// Listens to the server
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
})

// Requires database connection
const dbConnect = require("./db/dbConnect");

// Executes database connection
dbConnect();
