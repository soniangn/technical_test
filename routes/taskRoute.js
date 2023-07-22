import express from 'express';
import mongoose from 'mongoose';
import { Task } from '../models/projModel.js';
import { Proj } from '../models/projModel.js';
import dotenv from 'dotenv';
dotenv.config();


const router = express.Router();

router.post("/:project_id/create", async ({ params, body }, res) => {
  try {
    const proj_id = params.project_id;
    const { TaskID, TaskName, StartDate, EndDate, Progress } = body;
   
    const task = new Task({
      TaskID: TaskID,
      TaskName: TaskName,
      StartDate: StartDate,
      EndDate: EndDate,
      Progress: Progress
    })

    task.save();

    await Proj.updateOne(
      { _id: proj_id},
      { $push: {
        tasks: task._id
        }
      }
    )

    return res.status(200).json({ message: 'Task created successfully' });        
  } catch (error) {
    console.log(error)
    return res.status(400).send();
  }
})

router.get("/:project_id", async (req, res) => {
  const proj_id = req.params.project_id;
  try {
    const proj = await Proj.findOne({ _id: proj_id });
    const tasksId = proj.tasks;

    const ListTasks = await Task.find({
      '_id': {
        $in: tasksId
      }
    })    
    
    if (!ListTasks) {
      return res.json({ message:'No project found' })
    }
      return res.json({ tasks: ListTasks })
    } catch (error) {
      return res.status(400).json({ error: error });  
    }
})

router.get("/:project_id", async (req, res) => {
  const proj_id = req.params.project_id;
  try {
    const proj = await Proj.findOne({ _id: proj_id });
    const tasksId = proj.tasks;

    const listTasks = await Task.find({
      '_id': {
        $in: tasksId
      }
    })    
    
    if (!listTasks) {
      return res.json({ message:'No project found' })
    }
      return res.json({ tasks: listTasks })
    } catch (error) {
      return res.status(400).json({ error: error });  
    }
})

router.patch('/:project_id/:task_id', async (req, res) => {
    const task_id = req.params.task_id;

    const { TaskID, TaskName, StartDate, EndDate, Progress } = req.body;

    const newData = {
        $set: {
            TaskID: TaskID,
            TaskName: TaskName,
            StartDate: StartDate, 
            EndDate: EndDate, 
            Progress: Progress
        }
    };
    const result = await Task.updateOne({ _id: task_id}, newData);
    res.send(result).status(200);
})

router.get('/:project_id/:task_id', async (req, res) => {
  const task_id = req.params.task_id;
  
  try {
    const task = await Task.findOne({ _id: task_id }) 
    return res.status(200).json({ task: task});
  } catch (error) {
      return res.status(400);  
  }
})

router.delete('/:project_id/:task_id', async (req, res) => {
  const proj_id = new mongoose.Types.ObjectId(req.params.project_id);
  const task_id = new mongoose.Types.ObjectId(req.params.task_id);
  
  try {
    await Proj.updateMany(
      { _id: proj_id},
      { $pull: { tasks: task_id }}
    )
    
    await Task.deleteOne({ _id: task_id })
    return res.status(200).json({ message: 'Task deleted successfully'});
  } catch (error) {
      return res.status(400).json({ error: error });  
  }
})


export default router;