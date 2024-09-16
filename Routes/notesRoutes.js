const express = require('express');
const router = express.Router();
const notesController = require('../Controllers/notesController');

// Define the routes
router.get('/notes', notesController.getAllNotes); // Get all notes
router.get('/notes/:id', notesController.getNoteById); // Get a single note by ID
router.post('/notes', notesController.addNote); // Add a new note
router.put('/notes/:id', notesController.updateNote); // Update a note by ID
router.delete('/notes/:id', notesController.deleteNote); // Delete a note by ID

module.exports = router;
