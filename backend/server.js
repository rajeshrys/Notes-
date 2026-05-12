const { connect } = require("mongoose")
const app = require("./src/app")
const connectdb = require("./src/db/db")
require("dotenv").config();


connectdb()

app.listen(process.env.PORT,(req,res)=>{
    console.log("server is running at localhost:3000");
})