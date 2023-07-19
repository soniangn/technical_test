const express = require('express');
const isAuthenticated = require('../middleware/auth');

// Creates express router
const router = express.Router();

// Imports userModel
const projModel = require("../models/projModel");

// Requires environment variables
require('dotenv').config()

/*
router.get("/proj/all", async (req, res) => {
  try {
    const project = await projModel.find();
    if (!project) {
      return res.json({ message:'No project found' })
    }
      return res.json({ projects: project })
    } catch (error) {
        return res.status(400).json({ error: error });  
    }
})
*/

/*
router.get('/proj/:name', async (req, res) => {
    const name = req.params.name;  
    let result = await projModel.findOne({projName: name});
    
    if (!result) {
        res.send("Project not found").status(404);
    } else {
        res.send(result).status(200);
    }
})
*/

router.patch('/proj/task/:name', async (req, res) => {
    const projName = req.params.name;
    const { TaskID, TaskName, StartDate, EndDate, Duration, Progress } = req.body.tasks;
    const newData = {
        $set: {
            TaskID: TaskID,
            TaskName: TaskName,
            StartDate: StartDate, 
            EndDate: EndDate, 
            Duration: Duration, 
            Progress: Progress
        }
    };
    const result = await projModel.updateOne({ projName: projName }, newData);
    res.send(result).status(200);
})

router.delete('/proj/task/:name', async (req, res) => {
    const projName = req.params.name;
    const result = await projModel.deleteOne({ projName: projName });
    res.send(result).status(200);
})


module.exports = router;