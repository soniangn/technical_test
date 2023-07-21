// Creates users endpoint to fetch all registered users
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const isAuthenticated = require('../middleware/auth');

// Creates express router
const router = express.Router();

// Imports userModel
const userModel = require("../models/userModel");
const { ObjectId } = require('mongodb');

// Requires environment variables
require('dotenv').config()

router.get('/users', isAuthenticated, async (req, res) => {
    try {
        const user = await userModel.find();
        if (!user) {
            return res.json({ message:'No user found' })
        }
        return res.json({ users: user })
    } catch (error) {
        return res.status(400).json({ error: error });  
    }
})

// Creates an user
router.post("/create", async (req, res) => {
    try {
        // Checks that email and password are provided
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Please enter all the details' })
        }
        // Checks if email provided is already registered
        const userExist = await userModel.findOne({ email: req.body.email });
        if (userExist) {
            return res.status(400).json({ message: 'User already exist with the given email' })
        }
        // Hashes the password with bcrypt
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashPassword;
        const user = new userModel(req.body);
        // Saves new user
        await user.save();
        return res.status(200).json({ message: 'User registered successfully' })
    } catch (error) {
        res.status(400).send();
    }
});

router.get('/:email', isAuthenticated, async (req, res) => {
    const email = req.params.email || req.body.email;  
    let result = await userModel.findOne({email: email});
    
    if (!result) {
        return res.status(404).json("User not found");
    } else {
        return res.send(result).status(200);
    }
})

router.patch('/:id', isAuthenticated, async (req, res) => {
    const id = new ObjectId(req.params.id);
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashPassword;
    const newData = {
        $set: {
            email: req.body.email,
            password: req.body.password
        }
    };

    let result = await userModel.updateOne({_id: id}, newData);
    res.send(result).status(200);
})

router.delete('/:email', isAuthenticated, async (req, res) => {
    const email = req.params.email;
    let result = await userModel.deleteOne({email: email});

    res.send(result).status(200);
})

module.exports = router;