const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const userModel = require("../models/userModel");
require('dotenv').config()

router.post("/register", async (req, res) => {
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

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Please enter all the details' })
        }

        const userExist = await userModel.findOne({ email:req.body.email });
        if(!userExist){
            return res.status(400).json({ message:'Wrong email' })
        }

        const isPasswordMatched = await bcrypt.compare(password,userExist.password);
        if(!isPasswordMatched){
            return res.status(400).json({ message:'Wrong password' });
        }

        const token = jwt.sign({ id: userExist._id }, process.env.SECRET_KEY, {
            expiresIn: process.env.JWT_EXPIRE,
        });
        return res.status(200).json({ message:'LoggedIn Successfully', 'token': token })
    } catch (error) {
        res.status(400).send();
    }
})

module.exports = router;