import Express from 'express';
import { Proj } from '../models/projModel.js';
import dotenv from 'dotenv';
dotenv.config();


const router = Express.Router();

router.get('/:project_id', async(req, res) => {
  const projId = req.params.project_id;

  try {
    /*const proj = await Proj.findOne({ _id: projId });
    const tasksId = proj.tasks;
    */
    
    const tasks = await Proj.
      find({ _id: projId }).
      populate({ path: 'tasks', model: 'Task' }).
      exec();

    return res.status(200).json({ tasks: tasks[0].tasks })
    
  } catch(error) {
    res.status(400).send();
  }
})

export default router;