const db = require('../config/db'); // Assuming you have a DB connection setup in a config file

// Get all notes
exports.getAllNotes = async (req, res) => {
    try {
        const [notes] = await db.query('SELECT * FROM notes');
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving notes', error });
    }
};

// Get a single note by ID
exports.getNoteById = async (req, res) => {
    try {
        const [note] = await db.query('SELECT * FROM notes WHERE id = ?', [req.params.id]);
        if (note.length === 0) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.status(200).json(note[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving the note', error });
    }
};

// Add a new note
exports.addNote = async (req, res) => {
    const { title, content,deadline } = req.body;
    try {
        const result = await db.query('INSERT INTO notes (title, content) VALUES (?, ?, ?)', [title, content,deadline]);
        res.status(201).json({ message: 'Note created', id: result.insertId });
    } catch (error) {
        res.status(500).json({ message: 'Error creating note', error });
    }
};

// Update a note
exports.updateNote = async (req, res) => {
    const { title, content } = req.body;
    try {
        const result = await db.query('UPDATE notes SET title = ?, content = ? WHERE id = ?', [title, content, req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.status(200).json({ message: 'Note updated' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating note', error });
    }
};

// Delete a note
exports.deleteNote = async (req, res) => {
    try {
        const result = await db.query('DELETE FROM notes WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.status(200).json({ message: 'Note deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting note', error });
    }
};
