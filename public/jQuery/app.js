// - - - - - - - VARIBLES - - - - - - - - - -

// - - - - - - - FUNCTIONS - - - - - - - - -
const refreshPlayer =()=>{
    const $player= window.parent.document.getElementById('iframe-player');
    $player.src = $player.src;
};

    // Profile Settings Display
const editProfile =()=>{
    const thing = document.getElementById('editProfile');
    const place = document.getElementById('settingsDisplay');
    console.log('here')
    place.prepend(thing);
}
const generalSettings =()=>{
    const thing = document.getElementById('generalSettings');
    const place = document.getElementById('settingsDisplay');
    place.prepend(thing);
}
const deleteProfile =()=>{
    const thing = document.getElementById('deleteProfile');
    const place = document.getElementById('settingsDisplay');
    place.prepend(thing);
}
    // Modal
const openModal =()=>{
    console.log('pizza')
    document.getElementById('editPlaylist-modal').css('display', 'block');
}
const closeModal =()=>{
    document.getElementById('editPlaylist-modal').css('display', 'none');
}

// - - - - - - - - DOM - - - - - - - - - - -
$(()=> {
    // Changing Player
    $(document).ready(function(){
        $('.changeSong').on('click', refreshPlayer);
    });
    // Player Functions
    $(document).ready(function(){
    });
    // const $audio = document.getElementById("audio");
    // $audio.addEventListener('timeupdate', ()=>{
    //     document.getElementById('tracktime').innerHTML = Math.floor($audio.currentTime) + ' / ' + Math.floor($audio.duration);
    // })
    // let volume = document.getElementById('volume-slider');
    // volume.addEventListener("change", function(e) {
    //     $audio.volume = e.currentTarget.value / 100;
    // })
    // let playButton = document.getElementById('play-pause');
    // playButton.addEventListener("click", function() {
    //     if($audio.paused){
    //         $audio.play();
    //     } else {
    //         $audio.pause();  
    //     }
    // })
    // let muteButton = document.getElementById('mute');
    // muteButton.addEventListener("click", function() {
    //     if($audio.muted===true){
    //         $audio.muted = false
    //     } else {
    //         $audio.muted=true 
    //     }
    // })
    // Profile Settings Change
    const $edit = document.getElementById("edit-profile-button")
    const $general = document.getElementById('general-settings-button')
    const $delete = document.getElementById('delete-profile-button')
    console.log('connected')
    $edit.addEventListener('click', editProfile);
    $general.addEventListener('click', generalSettings);
    $delete.addEventListener('click', deleteProfile);

    // Playlist Modal
    // const $modal = document.getElementById('editPlaylist-modal')
    // const $modalButton = document.getElementById('modalButton')
    // console.log('connected')
    // $modal.addEventListener('click', openModal);
    // $modalButton.addEventListener('click', closeModal);

});