const express = require("express");
const router = express.Router()
const registercontroller = require("../controllers/auth.controller");

router.post("/register",registercontroller.userregister)
router.post("/login",registercontroller.userlogin);


module.exports = router;