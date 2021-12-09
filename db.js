//Step1: Import mongoose
const mongoose = require('mongoose');
//Connect to mongoose
function mongoConnection() {
    mongoose.connect('mongodb+srv://guneetsinghtuli:guneet71@cluster0.ps2sx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', () => {
        console.log("Connected successfully")
    });
}

//Create schema and module
const user = require('./modules/user')

module.exports = mongoConnection;



