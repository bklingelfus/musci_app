$(()=>{
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