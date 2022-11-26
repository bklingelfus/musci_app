// - - - - - - - VARIBLES - - - - - - - - - -

// - - - - - - - FUNCTIONS - - - - - - - - -
const refreshPlayer =()=>{
    const $player= window.parent.document.getElementById('iframe-player');
    $player.src = $player.src;
};

// - - - - - - - - DOM - - - - - - - - - - -
$(()=> {
    // Changing Player
    $(document).ready(function(){
        $('.changeSong').on('click', refreshPlayer);
    });
    // Player Functions
    const $audio = document.getElementById("audio");
    $audio.addEventListener('timeupdate', ()=>{
        document.getElementById('tracktime').innerHTML = Math.floor($audio.currentTime) + ' / ' + Math.floor($audio.duration);
    })
    let volume = document.getElementById('volume-slider');
    volume.addEventListener("change", function(e) {
        $audio.volume = e.currentTarget.value / 100;
    })
    let playButton = document.getElementById('play-pause');
    playButton.addEventListener("click", function() {
        if($audio.paused){
            $audio.play();
        } else {
            $audio.pause();  
        }
    })
    let muteButton = document.getElementById('mute');
    muteButton.addEventListener("click", function() {
        if($audio.muted===true){
            $audio.muted = false
        } else {
            $audio.muted=true 
        }
    })
});