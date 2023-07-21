// Requires ODM Mongoose
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please provide an Email!"],
        unique: [true, "Email adress already exist"]
    },
    
    password: {
        type: String,
        required: [true, "Please provide a password"]
    },
})

const userModel = mongoose.model('user', UserSchema);
module.exports = userModel;