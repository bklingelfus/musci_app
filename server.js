// - - - - - - - - - - Set Up - - - - - - - - - - - - - - 
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const app = express();
const db = mongoose.connection;

app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
// CSS
app.use(express.static('public'));
// Partials
app.set("views", "./views")


// - - - - - - - - Useful variables - - - - - - - - - - -
const data = require('./models/data.js');
const Song = require('./models/songSchema.js');
const User = require('./models/userSchema.js');

const genres =[
    'Eletronic',
    'Rock',
    'Indie Rock',
    'Alternative Rock',
    'Pop',
    'Classical',
]

let currentUser = {_id:'0'};
let currentSong ='';
let currentPlaylist= [];
let currentSearch = [];
let showPlaylist =[];

const capitalize=(string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// - - - - - - - - - MongoDB setup - - - - - - - - - - -
const mongoURI = 'mongodb://localhost:27017/'+ 'music_app';
mongoose.connect(mongoURI, () => {
	console.log('the connection with mongod is established');
});
    // Errors
    db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
    db.on('connected', () => console.log('mongo connected: ', mongoURI));
    db.on('disconnected', () => console.log('mongo disconnected'));


// - - - - - - - - - - Pages - - - - - - - - - - - - -
app.listen(3000, ()=>{
    console.log(`Listening...`);
});

app.get('/',(req, res)=>{
    res.render('index.ejs', {currentSong});
});

app.get('/home', (req, res)=>{
    // insert data into Songs collections if not empty
    Song.count(function(err, count) {
        console.log(count);
        if( count < 1) {
            console.log('went this way')
            Song.create(data);
        } else {
        console.log('Nothing was done');
        }
    });
    Song.find({}, (error, match)=>{
        res.render('home.ejs', {
            songs: match, 
            currentUser
        });
    })
});

app.get('/search', (req, res)=>{
    res.render('search.ejs', {
        currentUser,
    });
});
app.get('/search/result', (req, res)=>{
    res.render('searchResult.ejs', {
        songs: currentSearch,
        currentUser,
    });    
});

app.get('/profile/:id', (req, res)=>{
    res.render('profile.ejs',{
        currentUser,
        genres
    })
});
app.get('/profile/:id/settings', (req, res)=>{
    res.render('profileSettings.ejs', {
        currentUser, 
        genres,
    })
});

app.get('/playlist/:id', (req,res)=>{
    res.render('playlist.ejs',{
        currentPlaylist,
        currentUser
    });
});

app.get('/song/:id',(req, res)=>{
    res.render('song.ejs',{
        id: req.params.id,
        currentUser
    })
})

// - - - - - - - - Pages Actions - - - - - - - - - - -
    // Change player song
app.post('/', (req, res)=> {
    currentSong = req.body.song;
});
// Change current playlist
app.post('/changePlaylist/:id', (req,res)=>{
    currentPlaylist=currentUser.playlists[req.params.id]
});
    // Change search display
app.post('/search', (req, res)=> {
    currentSearch =[];
    if (req.body.search ==='') {
        Song.find({}, (error, match)=>{
            for (let i =0; i < match.length; i++){
                currentSearch.push(match[i]);
            }
        });
    } else {
        Song.find({title: req.body.search}, (error, match)=>{
            for (let i =0; i < match.length; i++){
                currentSearch.push(match[i]);
            }
        });
    }
    res.redirect('/search');
});
    // Create user
app.post('/createUser',(req, res)=>{
    // adjusting req.body for model
    if (req.body.creator==='on'){req.body.creator=true};
    req.body.playlists =[];
    req.body.playlists.push(
        {name: 'Favorites', songs: []},
        {name: 'Weekly Adventure', songs: []}
    );
    User.create(req.body, (error, newUser)=>{
        currentUser=newUser        
    })
    res.redirect('/home')
});
    // Delete user
app.delete('/reset/:id', (req, res)=>{
    // Deleting user
    User.find({_id:req.params.id}, (error, match)=>{}).deleteOne();
    currentUser={_id:'0'};
    // Deleting DB to reset changes to songs
    Song.find({}, (error, match)=>{}).deleteMany((error,deleted)=>{});
    res.redirect('/home');
});
    // Edit user
app.put('/editUser/:id',(req, res)=>{
    if (req.body.creator==='on'){req.body.creator=true}
    else{req.body.creator=false};
    console.log(req.body)
    User.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err,updatedUser)=>{
        currentUser=updatedUser
    });
    res.redirect('/profile/:id');
});
    // Delete user playlists
app.put('/deletePlaylist/:id',(req, res)=>{
    currentUser.playlists.splice(req.params.id, 1);
    User.findByIdAndUpdate(currentUser._id, currentUser, {new:true}, (err,updatedUser)=>{});
    res.redirect('/profile/:id/settings');
});
    // Create user playlist
app.put('/createPlaylist', (req,res)=>{
    req.body.songs=[];
    currentUser.playlists.push(req.body);
    User.findByIdAndUpdate(currentUser._id, currentUser, {new:true}, (err,updatedUser)=>{});
    res.redirect('/profile/:id/');
});
