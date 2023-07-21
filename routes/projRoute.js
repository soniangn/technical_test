const express = require('express');
const router = express.Router();
const { Proj } = require("../models/projModel");
require('dotenv').config()

router.post("/create", async (req, res) => {
  try {
    const proj = new Proj(req.body);
    await proj.save();
    return res.status(200).json({ message: 'Project created successfully' });        
  } catch (error) {
    console.log(error)
      res.status(400).send();
  }
})

router.get("/all", async (req, res) => {
  try {
    const project = await Proj.find();
    if (!project) {
      return res.json({ message:'No project found' })
    }
      return res.json({ projects: project })
    } catch (error) {
        return res.status(400).json({ error: error });  
    }
})

router.get('/:name', async (req, res) => {
    const name = req.params.name;  
    let result = await Proj.findOne({projName: name});
    
    if (!result) {
        res.send("Project not found").status(404);
    } else {
        res.send(result).status(200);
    }
})

router.patch('/:id',  async (req, res) => {
    const id = req.params.id;
    const name = req.body.projName
    
    const newData = {
        $set: {
            projName: name
        }
    };
    const result = await Proj.updateOne({ _id: id }, newData);
    
    res.send(result).status(200);
})

router.delete('/:name', async (req, res) => {
    const name = req.params.name;
    const result = await Proj.deleteOne({ projName: name });
    res.send(result).status(200);
})

module.exports = router;