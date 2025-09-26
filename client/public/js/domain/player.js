class Player {
    song

     constructor(track, playService) {
        this.track = track
        this.playService = playService
        this.#findPlayerElements();
      }
    
    #findPlayerElements() {
      this.playButton = document.getElementById("play-btn");
      this.volumeSlider = document.getElementById("volume");
      this.volumeMuteButton = document.getElementById("volume-mute-btn");
      this.audioElement = document.querySelector("audio");
      this.progress = document.querySelector(".player-progress")
      this.progressFilled = document.querySelector(".player-progress-filled")
      this.playerCurrentTime = document.querySelector(".player-time-current")
      this.playerDuration = document.querySelector(".player-time-duration")
    }

    playOrPauseSong() {
      if (playButton.dataset.playing === "false") {
        audioElement.play().catch((e) => console.log("play failed", e));
        playButton.dataset.playing = "true";
        playButtonIcon.textContent = "pause_circle";

      } else if (playButton.dataset.playing === "true") {
        audioElement.pause();
        playButton.dataset.playing = "false";
        playButtonIcon.textContent = "play_circle";
      }
    }

}