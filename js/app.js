// https://www.w3.org/2010/05/video/mediaevents.html

let loop, max = 600;
function initiate() {
    media = document.getElementById('media')
    play = document.getElementById('play')
    progress = document.getElementById('progress')
    mute = document.getElementById('mute')
    bar = document.getElementById('bar')
    volume = document.getElementById('volume')
    playicon = document.getElementById('playicon')

    play.addEventListener('click', push)
    playicon.addEventListener('click', push)
    mute.addEventListener('click', sound)
    bar.addEventListener('click', move)
    volume.addEventListener('change', level)
}
addEventListener('load', initiate)

function push() {

    if (!media.paused && !media.ended) {
        media.pause();
        play.value = 'play';
        clearInterval(loop);
        playicon.innerHTML = `<box-icon  name='play' color='rgb(255, 255, 255)' size='lg' animation='flashing' ></box-icon>`
        
        
    } else {
        media.play();
        play.value = 'pause';
        loop = setInterval(status, 1000)
        playicon.innerHTML = `<box-icon  name='pause' color='rgb(255, 255, 255)' size='lg' animation='flashing' ></box-icon>`
        
    }
}

function sound() {
    if (media.muted) {
        media.muted = false;
        mute.value = 'sounf off'
    } else {
        media.muted = true;
        mute.value = 'sound on'
    }
}

function status() {
    if (!media.ended) {
        let size = parseInt(media.currentTime * max / media.duration);
        progress.style.width = `${size}px`
    } else {
        progress.style.width = '0';
        play.value = 'play';
        clearInterval(loop);
        media.currentTime = 0;
        playicon.innerHTML = `<box-icon  name='repeat' color='rgb(255, 255, 255)' size='lg' animation='flashing' ></box-icon>`
    }
}

function move(e) {
    if(!media.ended) {
        let mouseX = e.pageX - bar.offsetLeft;
        let newTime = mouseX * media.duration / max;
        media.currentTime = newTime;
        progress.style.width = `${mouseX}px`
    }
}

function level() {
    media.volume = volume.value;
}