const express = require('express');
const app = express()
app.set("trust proxy", 1)
const authroutes = require("../src/routes/auth.routes")
const notes = require("./routes/notes.routes");
const cookieParser = require("cookie-parser")
const cors = require("cors")

app.use(cors({
  origin: "https://notes-ten-blond-22.vercel.app",
  credentials: true
}));


app.use(express.json());
app.use(cookieParser());


app.use("/api/auth",authroutes)
app.use("/api/notes",notes)


module.exports = app
