const express = require('express')

const { validationResult } = require('express-validator');
const userModule = require('../modules/user');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

const app = express()

const JWT_SEC = "guneet";
const saltRounds = 10;


exports.login = async (req, res, next) => {
    let success = false
    try {
        //Checking if the mail is correct
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }

        //Does user exist
        const user = await userModule.findOne({ email: req.body.email })
        if (user === null) {
            return res.status(400).json({ success, message: "Please write the correct credentials email" })
        }

        //Password check
        const authCheck = await bcrypt.compare(req.body.password, user.password);
        //If password is correct
        if (authCheck) {
            success = true

            const payload = {
                id: user._id
            }
            const authToken = jwt.sign(payload, JWT_SEC)



            let data = {
                name: user.name,
                number: user.number,
                email: user.email,
                id: user._id
            }
            res.send({ success, data,authToken, message: "Login Successfully" })
        }
        //If password is incorrect
        else {
            res.status(400).json({ success, message: "Please write the correct credentials" })
        }
    }
    catch (error) {
        res.status(400).json({ success, message: "Some error occured" })
    }
}




exports.register = async (req, res, next) => {
    let success = false
    try {
        //Finding a user with same email
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, message: errors.array() });
        }


        let user = await userModule.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ success, message: "User already exists" })
        }

        //Checking for validation 


        //Hashing a password
        const hash = await bcrypt.hash(req.body.password, saltRounds);
        console.log(hash)
        const New_User = {
            name: req.body.name,
            number: req.body.number,
            email: req.body.email,
            password: hash
        }

        //Saving the user
        const NewUser = new userModule(New_User)
        const newUser = await NewUser.save()

        //Send this back
        success = true
        let send = {
            name: req.body.name,
            number: req.body.number,
            email: req.body.email,
            id: newUser._id
        }
        res.send({ success, send, message: "Successfully Signed up" })

    } catch (error) {
        res.status(400).json({ success, message: "Some error occured" })
    }

}