const mongoose = require('mongoose');

// create a new Schema
const songSchema = new mongoose.Schema({
    title: String,
    // artist: [String],
    // album: String,
    // albumCover: String,
    mp3: String,
    // genre: String,
    // songNum: String,
    // year: String,
    // highlight: {
    //     start: String,
    //     end: String,
    // },
});

const songCollections = mongoose.model('Song', songSchema);

module.exports = songCollections;