const usermodel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const emailservices =require("../services/email.service")
require("dotenv").config();

async function userregister(req,res){
    const {name,email,password} = req.body;
    if(!name|| !email|| !password){
        return res.status(400).json({
            message:"Required fields are missing"
        })
    }
    const ifuseralreadyexists = await usermodel.findOne({email})
    
    if(ifuseralreadyexists){
        return res.status(409).json({
            message: "User Already exists"
        })
    }
    
    const hashed = await bcrypt.hash(password,10)

    const user = await usermodel.create({
        name: name,
        email: email,
        password: hashed
    })
    await emailservices.sendRegistrationEmail(user.email, user.name);

    const token  = jwt.sign({
        _id: user._id
    },process.env.JWT_SECRET,{expiresIn: "3d"})

    res.cookie("token", token, {
    httpOnly: true,
   secure:true,
    sameSite:"none"
    })
    console.log("cookies:", req.cookies)
console.log("headers:", req.headers.authorization)

    res.status(201).json({
        message: "User registration successful",
        token: token
    })
}

async function userlogin(req,res){
    const {email,password} = req.body;

    const isuservalid  = await usermodel.findOne({email})

    if(!isuservalid){
        return res.status(400).json({
            message: "User is not registered"
        })
    }
    const isvalidpass = await bcrypt.compare(password,isuservalid.password)
    if(!isvalidpass){
        return res.status(401).json({
            message: "Wrong Email or password"
        })
    }
    const token  = jwt.sign({
        _id: isuservalid._id
    },process.env.JWT_SECRET,{expiresIn: "3d"})

    res.cookie("token", token, {
    httpOnly: true,
    secure:true,
    sameSite:"none"
})
console.log("cookies:", req.cookies)
console.log("headers:", req.headers.authorization)

    res.status(200).json({
        message: "User logged in successfully",
        token: token,
        user:{
            email
        }
    })

}

module.exports = {userregister,userlogin}
