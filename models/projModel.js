// Requires ODM Mongoose
const mongoose = require("mongoose");

// Creates database Schema using mongoose
const ProjectSchema = new mongoose.Schema({
  projName: { type: String, required: true },
  tasks: {
    TaskID: { type: Number },
    TaskName: { type: String },
    StartDate: { type: Date }, 
    EndDate: { type: Date }, 
    Duration: { type: Number },
    Progress: { type: Number }
  }
}, { collection: 'proj'})

// Creates models
const projModel = mongoose.model('proj', ProjectSchema);
module.exports = projModel;