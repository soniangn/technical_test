// Requires ODM Mongoose
const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  TaskID: { type: Number },
  TaskName: { type: String },
  StartDate: { type: Date }, 
  EndDate: { type: Date }, 
  Progress: { type: Number }
  })

const Task = mongoose.model('Task', TaskSchema);

const ProjectSchema = new mongoose.Schema({
  projName: { type: String, required: true },
  tasks: [
    { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Task'
    }
  ]
})


const Proj = mongoose.model('Proj', ProjectSchema);
module.exports = { Proj, Task };