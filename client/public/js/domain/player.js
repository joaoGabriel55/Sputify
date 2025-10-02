import PlayerService from "../service/playerService.js";

class Player {
  songs;
  currentSong;
  volume = 0;
  status = "stopped";
  progress = 0.0;

  constructor(songs, currentSong = null, playerService = new PlayerService()) {
    this.songs = songs;
    this.currentSong = currentSong;
    this.playerService = playerService;
  }

  play() {
    this.playerService.play();
    this.status = "playing";
  }

  stop() {
    this.playerService.stop();
    this.status = "stopped";
  }

  setVolume(value) {
    this.volume = value;
    this.playerService.volumeChange(value);
  }

  volumeUp() {
    this.volume += 5;
    this.playerService.volumeChange(this.volume);
  }

  volumeDown() {
    this.volume -= 5;
    this.playerService.volumeChange(this.volume);
  }

  prev() {
    let newIndex = this.songs.findIndex((song) => song.id === this.currentSong.id) - 1;

    if (newIndex < 0) {
      newIndex = 0;
    }

    this.selectSong(this.songs[newIndex]);
  }

  next() {
    let newIndex = this.songs.findIndex((song) => song.id === this.currentSong.id) + 1;

    if (newIndex >= this.songs.length) {
      newIndex = this.songs.length - 1;
    }

    this.selectSong(this.songs[newIndex]);
  }

  currentTime() {
    return this.playerService.getCurrentTime();
  }

  duration() {
    return this.playerService.getDuration();
  }

  getStatus() {
    return this.status;
  }

  toggleMute() {
    this.playerService.toggleMute();
  }

  updateProgress() {
    this.playerService.updateProgress();
  }

  setTimes() {
    this.playerService.setTimes();
  }

  selectSong(track) {
    this.currentSong = track;
    this.playerService.updatePlayerSongInfo(track);
    this.play();
  }
}

export default Player;
