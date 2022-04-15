const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let languageSchema = Schema({
    name: {
        type: String,
        required: true
    },
    notes: [{
        type: {
            title: { type: String },
            description: { type: String },
            noteDetail: { type: String }
        },
    }]
})
module.exports = mongoose.model("Language", languageSchema);