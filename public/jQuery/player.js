
// - - - - - - - - - DOM - - - - - - - - - - -
$(()=>{
    // - - - - - - - - VARIABLES - - - - - - - - -
    const $audio = document.getElementById("audio");
    const volume = document.getElementById('volume-slider');
    const playButton = document.getElementById('play-pause');
    const muteButton = document.getElementById('mute');
    const leftTrack = document.getElementById('left-track-time');
    const rightTrack = document.getElementById('right-track-time');
    const playIcon = document.getElementById('play-icon');
    const muteIcon = document.getElementById('mute-icon');
    const backButton = document.getElementById('backplayer');
    const nextButton = document.getElementById('nextplayer');
    const albumCover = document.getElementById('albumCover');
    const currentSong = document.getElementById('currentSong');
    const currentArtist = document.getElementById('currentArtist');

    // - - - - - - - - FUNCTIONS - - - - - - - - -
    const muteFunction =()=> {
        if($audio.muted===true){
            $audio.muted = false
            muteIcon.setAttribute('name', 'mic');
        } else {
            $audio.muted=true 
            muteIcon.setAttribute('name', 'mic-off');
        }
    }
    const timeUpdateFunction =()=>{
        // update time tracker
        let e = '';
        if($audio.currentTime%60 < 10){e='0'};
        let f = '';
        if($audio.duration%60 < 10){f='0'};
        let currentTime = Math.floor($audio.currentTime/60)+':'+e+Math.floor($audio.currentTime%60);
        let totalTime = Math.floor($audio.duration/60)+':'+f+ Math.floor($audio.duration%60);
        document.getElementById('currentTime').innerHTML = currentTime
        document.getElementById('totalTime').innerHTML = totalTime;
        // update time range
        let p = $audio.currentTime
        let l = $audio.duration
        let trackPercentage = ((p/l)*100)
        let leftUpdate = 'width:' + trackPercentage+'%;'
        let rightUpdate ='width:' + (100-trackPercentage)+'%;'
        leftTrack.setAttribute('style', leftUpdate);
        rightTrack.setAttribute('style', rightUpdate);
        // if song ended play next
        if (p===l) {
            nextFunction()
        }
    }
    const playFunction =()=> {
        if($audio.paused){
            $audio.play();
            playIcon.setAttribute('name', 'pause-outline')
        } else {
            $audio.pause();
            playIcon.setAttribute('name', 'logo-google-playstore')  
        }
    }
    const nextFunction=()=>{
        const nextSong = document.getElementsByClassName('background-music')[0];
        const nextTitle = document.getElementsByClassName('player-song')[0];
        const nextArtist = document.getElementsByClassName('player-artist')[0];
        const nextAlbum = document.getElementsByClassName('player-album')[0];
        $audio.append(nextSong)
        $audio.load()
        currentSong.append(nextTitle)
        currentArtist.append(nextArtist)
        albumCover.append(nextAlbum)
    }
    const backFunction=()=>{
        const position =(document.getElementsByClassName('background-music').length)-1
        const lastSong = document.getElementsByClassName('background-music')[position];
        const lastTitle = document.getElementsByClassName('player-song')[position];
        const lastArtist = document.getElementsByClassName('player-artist')[position];
        const lastAlbum = document.getElementsByClassName('player-album')[position];
        let p = $audio.currentTime
        let l = $audio.duration
        if (p>3){
            $audio.load()
        } else {
            $audio.prepend(lastSong)
            $audio.load()
            currentSong.prepend(lastTitle)
            currentArtist.prepend(lastArtist)
            albumCover.prepend(lastAlbum)
        }
    }
    
    // - - - - - - - ATTACH EVENTS - - - - - - - - 
    volume.addEventListener("change", function(e) {
        $audio.volume = e.currentTarget.value / 100;
    })
    $audio.addEventListener('timeupdate', timeUpdateFunction)
    playButton.addEventListener("click", playFunction)
    muteButton.addEventListener("click", muteFunction)
    backButton.addEventListener("click", backFunction)
    nextButton.addEventListener("click", nextFunction)
});