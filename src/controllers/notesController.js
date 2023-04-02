import Note from '../models/Note.js';

//Helpers

const isOwner = (user, note) => {
    const userId = JSON.stringify(user._id);
    const noteAuthor = JSON.stringify(note.author);

    if (userId == noteAuthor) return true;
    return false;
}

export default {
    async addNote(req, res) {
        const { title, body } = req.body;

        try {
            let note = new Note({ title, body, author: req.user._id });
            await note.save();
            res.status(200).json(note);
        } catch (error) {
            res.status(500).json({ error: 'Problem to create a new note' });
        }
    },

    async getNote(req, res) {
        const { id } = req.params;
        try {
            let note = await Note.findById(id);
            if (isOwner(req.user, note))
                return res.status(200).json(note);
            res.status(403).json({ error: 'Permission denied' });
        } catch (error) {
            res.status(500).json({ error: 'Problem to get your note' });
        }

    },

    async showNotes(req, res) {
        const userId = req.user._id;
        try {
            let notes = await Note.find({ author: userId });
            res.status(200).json(notes);
        } catch (error) {
            res.status(500).json({ error: 'Problem to show your notes' });
        }
    },

    async updateNote(req, res) {
        const { id } = req.params;
        const { title, body } = req.body;

        try {
            let noteToUpdate = {};

            let note = await Note.findById(id);
            if (!isOwner(req.user, note)) return res.status(401).json({ error: 'Permission denied' });

            if (body) {
                noteToUpdate = await Note.findByIdAndUpdate(id, { $set: { body } }, { upsert: true, new: true });
            } else {
                noteToUpdate = await Note.findByIdAndUpdate(id, { $set: { title } }, { upsert: true, new: true });
            }


            res.status(200).json(noteToUpdate);

        } catch (error) {
            res.status(500).json({ error: 'problem to update a note' });
        }
    },

    async deleteNote(req, res) {
        const { id } = req.params;
        try {
            let noteToDelete = await Note.findById(id);
            if (!isOwner(req.user, noteToDelete)) return res.status(401).json({ error: 'Permission denied' });
            await Note.findByIdAndDelete(id);
            res.status(200).json({ message: 'OK' });

        } catch (error) {
            res.status(500).json({ error: 'problem to delete a note' });
        }
    },

    async searchNote(req, res) {
        const { query } = req.query;

        try {
            let searchedNotes = [];

            if (query) {
                searchedNotes = await Note
                    .find({ author: req.user._id })
                    .find({ $text: { $search: query } });
                return res.json(searchedNotes);
            }

            searchedNotes = await Note.find({ author: req.user._id });
            res.json(searchedNotes);
            
        } catch (error) {
            res.status(500).json({ error: 'problem to search a note' });
        }
    }
}