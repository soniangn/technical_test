import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import userRoute from './routes/userRoute.js';
import projRoute from './routes/projRoute.js';
import taskRoute from './routes/taskRoute.js';
import authRoute from './routes/authRoute.js';
import ganttRoute from './routes/ganttRoute.js';
import dbConnect from "./db/dbConnect.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', authRoute);
app.use('/gantt', ganttRoute);
app.use('/api/user', userRoute);
app.use('/api/proj', projRoute);
app.use('/api/task', taskRoute);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
})

dbConnect();