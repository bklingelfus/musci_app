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

let currentUser = {_id:'0', genres:[], playlists:[{songs:[]}]};
let showPlaylist = {name: '', songs:[]};
let currentPlaylist= {name: '', songs:[]};
let currentSearch = [];

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
app.listen(process.env.PORT || 3000, 
	() => console.log("Server is running...")
);


app.get('/',(req, res)=>{
    res.render('index.ejs', {});
});

app.get('/player', (req, res)=>{
    res.render('player.ejs',{
        currentPlaylist,
    })
});

app.get('/home', (req, res)=>{
    // insert data into Songs collections if not empty
    Song.count(function(err, count) {
        console.log(count);
        if( count < 1) {
            console.log('went this way')
            for(let i=0;i<1;i++){
                Song.create(data);
            }
        } else {
        console.log('Nothing was done');
        }
    });
    Song.find({}, (error, match)=>{
        console.log(currentUser)
        res.render('home.ejs', {
            songs: match, 
            currentUser
        });
    })
});

app.get('/search', (req, res)=>{
    res.render('search.ejs', {
        currentUser,
        songs: currentSearch
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
        currentPlaylist: showPlaylist,
        currentUser,
        id: req.params.id
    });
});

app.get('/song/:id',(req, res)=>{
    Song.find({_id: req.params.id}, (err, match)=>{
        res.render('song.ejs',{
            currentUser,
            song: match[0]
        });
    });
});

app.get('/:artist', (req, res)=>{
    Song.find({artist: req.params.artist}, (err, match)=>{
        Song.find({artist: req.params.artist}).distinct('album', (err, result)=>{
            res.render('artist.ejs', {
                currentUser,
                artistCollection: match,
                albuns: result,
                artist: req.params.artist
            });
        });
    });
});

app.get('/:artist/:album', (req, res)=>{
    Song.find({artist: req.params.artist, album:req.params.album}).sort({songNum:1}).exec((err, match)=>{
        res.render('album.ejs', {
            currentUser,
            artist: req.params.artist,
            album: req.params.album,
            albumSongs: match
        });
    });
});

// - - - - - - - - Pages Actions - - - - - - - - - - -
// Change current playlist
app.post('/changePlaylist/:id', (req,res)=>{
    showPlaylist=currentUser.playlists[req.params.id]
    res.redirect(`/playlist/${req.params.id}`)
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
            Song.find({artist: req.body.search}, (error, match)=>{
                for (let i =0; i < match.length; i++){
                    currentSearch.push(match[i]);
                }
                Song.find({album: req.body.search}, (error, match)=>{
                    for (let i =0; i < match.length; i++){
                        currentSearch.push(match[i]);
                    }
                });
            });
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
    // creating user
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
    // adjusting model
    if (req.body.creator==='on'){req.body.creator=true}
    else{req.body.creator=false};
    // updating DB and currentUser variable
    User.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err,updatedUser)=>{
        currentUser=updatedUser
    });
    res.redirect('/profile/:id');
});
    // Delete user playlists
app.put('/deletePlaylist/:id',(req, res)=>{
    // Adjusting current user for update
    currentUser.playlists.splice(req.params.id, 1);
    // Updating DB
    User.findByIdAndUpdate(currentUser._id, currentUser, {new:true}, (err,updatedUser)=>{});
    res.redirect('/profile/:id/settings');
});
    // Create user playlist
app.put('/createPlaylist', (req,res)=>{
    // adjusting currentUser for update
    req.body.songs=[];
    currentUser.playlists.push(req.body);
    // updating DB
    User.findByIdAndUpdate(currentUser._id, currentUser, {new:true}, (err,updatedUser)=>{});
    res.redirect('/profile/:id/');
});
    // Edit user playlist
app.put('/editPlaylist/:id', (req, res)=>{
    // edit currentUser
    showPlaylist.name =req.body.name
    for(let i=0;i<req.body.songs.length;i++) {
        let matchIndex = showPlaylist.songs.findIndex(song => 
            {return song._id === req.body.songs[i]});
        showPlaylist.songs.splice(matchIndex, 1)
    }
    // change currentUser
    currentUser.playlists[req.params.id] = showPlaylist
    // update DB
    User.findByIdAndUpdate(currentUser._id, currentUser, {new:true}, (err,updatedUser)=>{});
    res.redirect(`/profile/:id/`);
});
    // Add to song to favorites
app.put('/addToFavorites/:id', (req, res)=>{   
    console.log(currentUser.playlists[0])
    Song.find({_id:req.params.id}, (err, match)=>{
        // let matchIndex = currentUser.playlists[0].songs.findIndex(song => 
        //     {return song === match[0]});
        // if(matchIndex >=0){
        //     console.log('Match Found')
        // } else {
        // }
        console.log(match)
        if (currentUser.playlists[0].songs.includes(match[0])){
            console.log('found')
        } else {
            currentUser.playlists[0].songs.push(match[0]);
        }
        // console.log(matchIndex)
    });
    console.log(currentUser.playlists[0])
    // if (currentUser.playlists[0].songs.some(e => e._id === req.params.id)) {
    //     console.log('contains')
    // }
    // update DB
    User.findByIdAndUpdate(currentUser._id, currentUser, {new:true}, (err,updatedUser)=>{});
    res.redirect('/profile/:id/');
});
// Change player song
app.post('/:genre/:artist/:album/:songID', (req, res)=> {
    let genre = req.params.genre;
    let artist = req.params.artist;
    let album = req.params.album;
    let songID = req.params.songID;
    if (artist === 'all' && album ==='all' && genre==='all') {
        Song.find({}, (err, match)=>{
            Song.find({_id: songID}, (err, matchSong)=>{
                console.log(matchSong)
                match.unshift(matchSong[0])
                currentPlaylist.name = 'All Random'
                currentPlaylist.songs = match
            })
        })
    }
// console.log(req.body)
// currentSong = req.body.song;
});
