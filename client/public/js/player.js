const playButton = document.getElementById("play-btn");
const volumeSlider = document.getElementById("volume");
const volumeMuteButton = document.getElementById("volume-mute-btn");
const audioElement = document.querySelector("audio");
import Player from "./domain/player.js";

window.addEventListener("load", () => {
  console.log("Player.js");
  const player = window.player;

  // Set times after page load
  player.setTimes();
  // Update progress bar and time values as audio plays
  audioElement.addEventListener("timeupdate", () => {
    player.updateProgress();
    player.setTimes();
  });

  playButton.addEventListener("click", () => {
    if (playButton.dataset.playing === "false") {
      player.play();
    } else if (playButton.dataset.playing === "true") {
      player.stop();
    }
  });

  volumeSlider.addEventListener("input", (event) => {
    player.setVolume(event.target.value);
    volumeSlider.value = event.target.value;
  });

  volumeMuteButton.addEventListener("click", () => {
    player.toggleMute();
  });
});
