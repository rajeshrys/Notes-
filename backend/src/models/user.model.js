const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
    name: {
        type:String,
        required:[true,"Name is required for creation of notes"]
    },
    email: {
        type:String,
        required:[true,"email is required for creation of notes"],
        unique: true
    },
    password:{
        type: String,
        required:[true,"password is required for creation of notes"]
    }
})

const usermodel = mongoose.model("user",userschema)

module.exports = usermodel