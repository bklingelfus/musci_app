const mongoose = require('mongoose');
const song = require('./songSchema.js');

// create a new Schema
const profileSchema = new mongoose.Schema({
    username: {type:String, unique: true},
    password: String,
    creator: {type:Boolean, default: false},
    userPhoto: {type:String, default:''},
    genrePreferences: [String],
    playlists: [
        {name: String,
        songs: [song.schema]}
    ],
});

const profileCollections = mongoose.model('Profile', profileSchema);

module.exports = profileCollections;