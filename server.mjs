import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import userRoute from './routes/userRoute.js';
import projRoute from './routes/projRoute.js';
import dbConnect from "./db/dbConnect.js";

// Requires environment variables configuration
dotenv.config();

// Creates an app from express
const app = express();

app.use(cors());
// Use of express.json to get request of json data
app.use(express.json());

// Use routes
app.use('/api', userRoute);
app.use('/api', projRoute);

// Listens to the server 
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
})

// Executes database connection
dbConnect();