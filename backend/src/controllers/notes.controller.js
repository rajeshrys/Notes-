const notesmodel = require("../models/notes.model")
const usermodel = require("../models/user.model")

async function createnotes(req,res){
try{
        const {title,description} = req.body;

    if(!title|| !description ){
        return res.status(400).json({message:"Title and Description are missing"})
    }

    const notes = await notesmodel.create({
        title: title,
        description: description,
        user: req.user._id
    })

    res.status(201).json({
        message: "Note Created Successfully",
        notes: notes
    })
}
catch(err){
    return res.status(500).json({
        message: "Internal error"
    })
}


}

async function getNotes(req,res){
    const user = req.user._id
    const notes = await notesmodel.find({user})
    console.log(notes)
    if(!notes){
        return res.status(404).json({message:"No Notes found"})
    }

    res.status(200).json({
        message:"Notes Fetched successfully",
        notes
    })
}


async function deleteNote(req,res){
    const noteId = req.params.id 
    console.log(req.params.id)
    const notes = await notesmodel.findOneAndDelete({_id:noteId})

    if(!notes){
        return res.status(404).json({message:"No Notes found"})
    }

    res.status(200).json({
        message:"Notes Deleted successfully",
        notes
    })
}


async function deleteNotes(req,res){
    const userId = req.user._id 
    
    const notes = await notesmodel.deleteMany({
        user: userId
    })

    res.status(200).json({
        message:"Notes Deleted successfully",
    })
}

async function updateNotes(req,res){
    const notesId = req.params.id;
    
    const notes =  await notesmodel.findByIdAndUpdate(
    notesId,
    req.body,
    {new:true}
)

    if(!notes){
        return res.status(404).json({
            message:"No notes found"
        })
    }
    res.status(200).json({
        message: "Successfully Updated notes"
    })

}

module.exports = {
    createnotes,
    getNotes,
    deleteNote,
    deleteNotes,
    updateNotes
}
