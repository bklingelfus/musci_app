// - - - - - - - VARIBLES - - - - - - - - - -

// - - - - - - - FUNCTIONS - - - - - - - - -
const refreshPlayer =()=>{
    const $player= window.parent.document.getElementById('iframe-player');
    $player.src = $player.src;
};

// - - - - - - - - DOM - - - - - - - - - - -
$(()=> {
    $(document).ready(function(){
        $('.changeSong').on('click', refreshPlayer);
    });
});