const express = require("express")
const mongoConnection = require("./db")
// const mongoose = require("mongoose")
const Router = require("./Routes/log")
const app = express()

mongoConnection()

app.use(express.json())
app.use("/api/v1/user",Router)

app.get("/",(req,res,next)=>{
    res.send("Welcome to the User Authentication")
})

app.listen(3000,()=>{
    console.log("Server is working on port 3000")
})