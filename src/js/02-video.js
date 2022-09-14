import Player from "@vimeo/player"
import Throttle from "lodash.throttle"

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const timeKey = "videoplayer-current-time"

player.on('timeupdate', Throttle(durationSaveLocalStorage, 1000));
 


function durationSaveLocalStorage ({seconds}){
  localStorage.setItem(timeKey, seconds)
}

window.addEventListener("load", newSrart)

function newSrart(){
  if(!localStorage.getItem(timeKey)){
    return;
  }
  const currentVideoTime = localStorage.getItem(timeKey);
  player
  .setCurrentTime(currentVideoTime)

  .catch(function(error) {
    switch (error.name) {
        case 'RangeError':
            // the time was less than 0 or greater than the video’s duration
            break;
  
        default:
            // some other error occurred
            break;
    }
  });
};



