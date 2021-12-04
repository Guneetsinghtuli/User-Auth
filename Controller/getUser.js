const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

const { validationResult } = require('express-validator');
const userModule = require('../modules/user');

const JWT_SEC = "guneet";
const saltRounds = 10;

exports.getUser = async (req, res, next) => {
    let success = false
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }
        // const user = await userModule.findById(req.body.id)
        const user = await userModule.findOne({ _id: req.body.id })
        if (user) {
            success = true
            return res.send({ success, user, message: "ID Found" })
        }
        return res.status(400).json({ success, message: "The ID does not exists" })

    } catch (error) {

    }
}

exports.changePassword = async (req, res, next) => {
    let success = false
    try {
        let authToken = req.headers.authtoken
        if (authToken === undefined) {
            return res.status(400).json({ success, errors: "Auth Token is missing" })
        }
        var decoded =  await jwt.verify(authToken, JWT_SEC);

        const user = await userModule.findById(decoded.id)
        if (user) {
            // const authCheck = await bcrypt.compare(req.body.oldPassword, user.password)
            const match = await bcrypt.compare(req.body.oldPassword, user.password);

            if(match){
                const result = await bcrypt.hash(req.body.newPassword, saltRounds);
                let update = await userModule.findByIdAndUpdate({_id:decoded.id},{password:result})

                update.save().then(() => { console.log("User data updated") })
                success = true
                return res.send({ success, message: "Password Changed successfully" })
            }
            return res.send({ success, message: "Old password incorrect" })
        }
    } catch (error) {
        return res.status(401).send({success,message:"You are not authorised"})
    }
}


exports.updateProfile = async(req,res,next) =>{
    let success = false;
    try {
        let authToken = req.headers.authtoken
        if (authToken === undefined) {
            return res.status(400).json({ success, errors: "Auth Token is missing" })
        }
        var decoded =  await jwt.verify(authToken, JWT_SEC);

        const user = await userModule.findById(decoded.id)
        if (user) {

                let update = await userModule.findByIdAndUpdate({_id:decoded.id},req.body)

                update.save().then(() => { console.log("User data updated") })
                success = true
                return res.send({ success, message: "User Data Updated successfully" })

        }
    } catch (error) {
        return res.status(401).send({success,message:"You are not authorised"})
    }
}