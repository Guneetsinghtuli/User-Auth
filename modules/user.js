const mongoose= require('mongoose');
const {Schema} = mongoose;

const user = new Schema({
    name:{
        type:String,
        required: true,
    },
    number:{
        type:Number,
        required: true,
    },
    email:{
        type:String,
        required: true,
    },
    password:{
        type:String,
        required:true
    }
})

const userModule = mongoose.model('user',user)
module.exports = userModule;
