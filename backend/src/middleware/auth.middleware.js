require("dotenv").config();
const express = require("express");
const jwt = require('jsonwebtoken')
const usermodel = require("../models/user.model")
require("dotenv").config();

async function authMiddleware(req,res,next){
    const required = req.cookies.token || req.headers.authorization?.split(" ")[1]
    console.log(required)
    if(!required){
        return res.status(400).json({message:"User is not logged in"})
    }
    const decoded = jwt.verify(required,process.env.JWT_SECRET)
    req.user = decoded 
    next()
}


module.exports = {authMiddleware}
