const express = require('express');
const isAuthenticated = require('../middleware/auth');

// Creates express router
const router = express.Router();

// Imports userModel
const projModel = require("../models/projModel");

// Requires environment variables
require('dotenv').config()

router.post("/proj/create", async (req, res) => {
  try {
    const proj = new projModel(req.body);
    await proj.save();
    return res.status(200).json({ message: 'Project created successfully' });        
  } catch (error) {
    console.log(error)
      res.status(400).send();
  }
})

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

router.get('/proj/:name', async (req, res) => {
    const name = req.params.name;  
    let result = await projModel.findOne({projName: name});
    
    if (!result) {
        res.send("Project not found").status(404);
    } else {
        res.send(result).status(200);
    }
})

router.patch('/proj/:name',  async (req, res) => {
    const name = req.params.name;
    console.log("🚀 ~ router.patch ~ name:", name)
    
    const newData = {
        $set: {
            projName: name
        }
    };
    const result = await projModel.updateOne({ projName: name }, newData);
    res.send(result).status(200);
})

router.delete('/proj/:name', async (req, res) => {
    const name = req.params.name;
    const result = await projModel.deleteOne({ projName: name });
    res.send(result).status(200);
})

module.exports = router;