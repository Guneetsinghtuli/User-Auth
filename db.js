//Step1: Import mongoose
const mongoose = require('mongoose');
//Connect to mongoose
function mongoConnection() {
    mongoose.connect('mongodb://localhost:27017/testing', () => {
        console.log("Connected successfully")
    });
}

//Create schema and module
const user = require('./modules/user')

module.exports = mongoConnection;



