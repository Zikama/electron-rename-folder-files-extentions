/*Selector*/
g = (k) => { return document.querySelector(k) };
/*Selector All*/
gA = (k) => { return document.querySelectorAll(k) };
/*//Create Elemet */
create = (k) => { return document.createElement(k) }; /*Append Child Element*/
append = (k, l) => { return k.appendChild(l) }; /*Insert Element Before*/
iB = (j, k, l) => { return j.insertBefore(k, l) };

pl = () => {
    if (video.paused) {
        video.play();
        player.classList.add("pause");
        player.classList.remove("play");


    } else if (video.played) {
        video.pause();
        player.classList.add("play");
        player.classList.remove("pause");
    } else {
        video.pause();
    }
}
mute = () => {
    video.muted = !video.muted;
    sound.classList.toggle('muted');
    if (video.muted) {
        volume.value = 0;
    } else {
        volume.value = 5;
    }
}
stp = () => {
    video.pause();
    video.currentTime = 0;
    player.classList.add("play");
    player.classList.remove("pause");
}

const video = g("#video");
let videoCont = g("#video-container");
let sound = g("#sound");
let menu = g("#menug");
let player = g("#play");
let stoper = g("#stop");
let prog = g("#volume");
let full = g("#full");
let fullscre = g("#fulls");
let randomColor = g("#dots");
//let progp =   g("#volumeP");
let volume = g("#volumeV");
player.addEventListener("click", pl);
stoper.addEventListener("click", stp);
// sound.addEventListener("click", mute);