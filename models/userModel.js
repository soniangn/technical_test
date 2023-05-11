// Requires ODM Mongoose
const mongoose = require("mongoose");

// Creates database Schema using mongoose
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please provide an Email!"],
        unique: [true, "Email adress already exist"],
    },
    
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
})

// Creates models
const userModel = mongoose.model('user', UserSchema);
module.exports = userModel;