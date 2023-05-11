// Requires all necessary libraries, framework and file
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const isAuthenticated = require('../middleware/auth');

// Creates express router
const router = express.Router();

// Imports userModel
const userModel = require("../models/userModel");

// Requires environment variables
require('dotenv').config()

// Creates register endpoint to register a new user
router.post("/register", async (req, res) => {
    try {
        // Checks that email and password are provided
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Please enter all the details' })
        }
        // Checks that email provided is already registered
        const userExist = await userModel.findOne({ email: req.body.email });
        if (userExist) {
            return res.status(400).json({ message: 'User already exist with the given email' })
        }
        // Hash the password with bcrypt
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashPassword;
        const user = new userModel(req.body);
        // Saves new user
        await user.save();
        // Creates and assigns a token
        return res.status(200).json({ message: 'User registered successfully' })
    } catch (error) {
        res.status(400).send();
    }
});

// Creates login endpoint to login to the API
router.post('/login', async (req, res) => {
    try {
        // Checks that email and password are provided
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Please enter all the details' })
        }
        // Checks that the email exists
        const userExist = await userModel.findOne({email:req.body.email});
        if(!userExist){
            return res.status(400).json({message:'Wrong email'})
        }
        //Checks that the password is correct
        const isPasswordMatched = await bcrypt.compare(password,userExist.password);
        if(!isPasswordMatched){
            return res.status(400).json({message:'Wrong password'});
        }
        // Creates and assigns a token
        const token = jwt.sign({ id: userExist._id }, process.env.SECRET_KEY, {
            expiresIn: process.env.JWT_EXPIRE,
        });
        return res.status(200).json({ message:'LoggedIn Successfully', 'token': token  })
    } catch (error) {
        res.status(400).send();
    }
})

// Creates users endpoint to fetch all registered users
router.get('/users', isAuthenticated, async (req, res) => {
    try {
        const user = await userModel.find();
        if (!user) {
            return res.json({message:'No user found'})
        }
        return res.json({user:user})
    } catch (error) {
        return res.json({ error: error });  
    }
})

module.exports = router;