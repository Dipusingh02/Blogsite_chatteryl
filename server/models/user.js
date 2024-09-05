const mongoose=require("mongoose");
const bcrypt =require('bcryptjs');
const {isEmail}= require('validator');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter your name"]
    },
    email:{
        type:String,
        required:[true,"Please enter your email"],
        unique:true,
        lowercase:true,
        validate:[isEmail,"Please enter a valid email"]
    },
    password:{
        type:String,
        required:[true,"Please enter your password"],
        minlength:[6,"Minimum password length is 6 characters"]
    },confirmpassword:{
        type : String,
    } ,
    country: {
        type: String,
        default:""
    },
    state: {
        type: String,
        default:""
    },
    pincode: {
        type: String,
        default:""
    },
    profilePhoto: {
        type: String,
        default:""
    },
    createdDatetime :{
        type:Date,
        default:Date.now
    },});
      
      module.exports = mongoose.model("User", userSchema);