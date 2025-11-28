const playButton = document.getElementById("play-btn");
const volumeSlider = document.getElementById("volume");
const volumeMuteButton = document.getElementById("volume-mute-btn");
const audioElement = document.querySelector("audio");
const nextButton = document.getElementById("next-btn");
const prevButton = document.getElementById("prev-btn");
const addPlaylistButton = document.getElementById("add-playlist-btn");
const closeDialogButton = document.getElementById("close-dialog-btn");

window.addEventListener("load", () => {
  const player = window.player;

  // Set times after page load
  player?.setTimes();
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

  nextButton.addEventListener("click", () => {
    if (player.next()) {
      player.play();
    }
  });

  prevButton.addEventListener("click", () => {
    if (player.prev()) {
      player.play();
    }
  });

  addPlaylistButton.addEventListener("click", () => {
    console.log("Opening dialog...");
    const dialog = document.querySelector("dialog");
    dialog.showModal();
  });

  closeDialogButton.addEventListener("click", () => {
    console.log("Closing dialog...");
    const dialog = document.querySelector("dialog");
    dialog.close();
  });

  const playlistDialog = document.getElementById('playlist-dialog');
  playlistDialog.addEventListener('click', () => myDialog.close());

  const dialogDiv = document.getElementById('dialog-container');
  dialogDiv.addEventListener('click', (event) => event.stopPropagation());
});
