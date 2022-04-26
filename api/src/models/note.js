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
        },
        favoriteCount:{
            type: Number,
            default: 0
        },
        favoritedBy: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    {
        // To assign timestamps field with a date type
        timestamps: true
    }
);
// Notes model definition with the schema
const Note = mongoose.model('Note', noteSchema);
module.exports = Note;