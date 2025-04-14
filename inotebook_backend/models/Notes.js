const mongoose = require('mongoose');
const { Schema } = mongoose;

const noteSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        default: "General"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
}, { timestamps: true });

const Notes = mongoose.model('note', noteSchema);
module.exports = Notes;