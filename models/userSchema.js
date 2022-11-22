const mongoose = require('mongoose');
const song = require('./songSchema.js');

// create a new Schema
const userSchema = new mongoose.Schema({
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

const userCollections = mongoose.model('User', userSchema);

module.exports = userCollections;