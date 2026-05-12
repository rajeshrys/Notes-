const express = require("express");
const router = express.Router();
const notescontroller = require("../controllers/notes.controller");
const authmiddleware = require("../middleware/auth.middleware")

// For creating notes 
router.post("/createnotes",authmiddleware.authMiddleware,notescontroller.createnotes);

// For getting all notes 
router.get("/getNotes",authmiddleware.authMiddleware,notescontroller.getNotes);

// For delete One specific note  
router.delete("/DeleteNote/:id",authmiddleware.authMiddleware,notescontroller.deleteNote);

// For deleting all the notes 
router.delete("/DeleteNotes",authmiddleware.authMiddleware,notescontroller.deleteNotes);

// for updating the notes 
router.patch('/updateone/:id',authmiddleware.authMiddleware,notescontroller.updateNotes);

module.exports = router;