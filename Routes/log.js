const express = require('express')
const { body } = require('express-validator');
const { getUser, changePassword, updateProfile } = require('../Controller/getUser');
const { login, register } = require('../Controller/userController');
const Router = express.Router()

//Middleware created
var check = [
    body('email')
        .isEmail()
        .withMessage("Please write a correct email"),
    body('password')
        .exists()
        .withMessage("Password cannot be empty")
]


var checkRegister = [
    body('name')
        .exists()
        .withMessage("Name cannot be left blank"),
    body('number')
        .exists()
        .withMessage("Contact number cannot be left blank"),
    body('email')
        .exists()
        .withMessage("Email Cannot be left blank")
        .isEmail()
        .withMessage("Please write a correct email")
    ,
    body('password')
        .exists()
        .withMessage("Password cannot be empty")
        .isLength({ min: 5 })
        .withMessage("Password should be minimum of 5 characters")
]

//API Endpoints

//To Register a User
Router.post("/register", checkRegister, register)
//Login a User
Router.post("/login", check, login)
//get all the details of a specific user
Router.post("/details", body('id').exists().withMessage("ID cannot be blank"), getUser)
//To change the password (Use the headers to set the JWT token)
Router.post("/login/pwd",changePassword)
//To change the Profile data of a user (Use the header to set JWT token)
Router.post("/login/update",updateProfile)

module.exports = Router