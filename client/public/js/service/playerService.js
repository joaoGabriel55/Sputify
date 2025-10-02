class PlayerService {
  constructor() {
    this.playButton = document.getElementById("play-btn");
    this.playButtonIcon = this.playButton.querySelector("span");
    this.playerCurrentTime = document.querySelector(".player-time-current")
    this.playerDuration = document.querySelector(".player-time-duration")
    this.progressFilled = document.querySelector(".player-progress-filled")
    this.audioElement = document.querySelector("audio");
    this.lastAudioVolumeBeforeMuted = 0;
  }

  play() {
    this.audioElement.play().catch((e) => console.log("play failed", e));
    this.playButton.dataset.playing = "true";
    this.playButtonIcon.textContent = "pause_circle";
  }

  stop() {
    this.audioElement.pause();
    this.playButton.dataset.playing = "false";
    this.playButtonIcon.textContent = "play_circle";
  }

  volumeChange(value) {
    this.audioElement.volume = value;
  }

  toggleMute() {
    if (this.audioElement.volume === 0) {
      this.audioElement.volume = this.lastAudioVolumeBeforeMuted;
    } else {
      this.lastAudioVolumeBeforeMuted = this.audioElement.volume;
      this.audioElement.volume = 0;
    }
  }

  getCurrentTime() {
    return this.audioElement.currentTime;
  }

  getDuration() {
    return this.audioElement.duration;
  }

  updatePlayerSongInfo(track) {
    const { id, title, artist } = track;

    const playerTrackTitle = document.querySelector(".track-player .player-track-info .track-title")

    playerTrackTitle.textContent = `${title} - ${artist}`;

    this.audioElement.src = `http://localhost:4567/songs/${id}/audio`;
  }

  updateProgress() {
    const percent = (this.audioElement.currentTime / this.audioElement.duration) * 100
    this.progressFilled.style.flexBasis = `${percent}%`
  }

  setTimes() {
    if (!this.audioElement.currentTime) {
      return;
    }
    this.playerCurrentTime.textContent = new Date(this.audioElement.currentTime * 1000)
      .toISOString()
      .substr(14, 5)
    this.playerDuration.textContent = new Date(this.audioElement.duration * 1000)
      .toISOString()
      .substr(14, 5)
  }
}

export default PlayerService;