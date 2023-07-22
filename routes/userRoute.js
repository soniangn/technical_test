const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();

const userModel = require("../models/userModel");
const { ObjectId } = require('mongodb');

require('dotenv').config()

router.get('/users', async (req, res) => {
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

router.post("/create", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Please enter all the details' })
        }

        const userExist = await userModel.findOne({ email: req.body.email });
        if (userExist) {
            return res.status(400).json({ message: 'User already exist with the given email' })
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashPassword;
        const user = new userModel(req.body);

        await user.save();
        return res.status(200).json({ message: 'User registered successfully' })
    } catch (error) {
        res.status(400).send();
    }
});

router.get('/:email', async (req, res) => {
    const email = req.params.email || req.body.email;  
    let result = await userModel.findOne({email: email});
    
    if (!result) {
        return res.status(404).json("User not found");
    } else {
        return res.send(result).status(200);
    }
})

router.patch('/:id', async (req, res) => {
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

router.delete('/:email', async (req, res) => {
    const email = req.params.email;
    let result = await userModel.deleteOne({email: email});

    res.send(result).status(200);
})

module.exports = router;