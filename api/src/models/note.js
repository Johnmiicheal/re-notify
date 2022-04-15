const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        }
    },
    {
        // To assign timestamps field with a date type
        timestamps: true
    }
);
// Notes model definition with the schema
const Note = mongoose.model('Note', noteSchema);
module.exports = Note;