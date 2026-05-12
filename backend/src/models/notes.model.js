const mongoose = require("mongoose")

const notesSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true,"Title is required for creation of notes"]
    },
    description:{
        type: String,
        required:[true,"Description is required for creation of notes"]
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    }
})

const notesmodel = mongoose.model("notes",notesSchema)

module.exports = notesmodel;