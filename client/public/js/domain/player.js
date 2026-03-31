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
    this.#checkCurrentSongPresence();

    this.playerService.play();
    this.status = "playing";
  }

  stop() {
    this.#checkCurrentSongPresence();

    this.playerService.stop();
    this.status = "stopped";
  }

  setVolume(value) {
    this.volume = value;
    this.playerService.volumeChange(value);
  }

  getVolume() {
    return this.volume;
  }

  prev() {
    this.#checkCurrentSongPresence();

    let newIndex = this.songs.findIndex((song) => song.id === this.currentSong.id) - 1;

    if (newIndex < 0) {
      return false;
    }

    this.selectSong(this.songs[newIndex]);
    return true;
  }

  next() {
    this.#checkCurrentSongPresence();

    let newIndex = this.songs.findIndex((song) => song.id === this.currentSong.id) + 1;

    if (newIndex >= this.songs.length) {
      return false;
    }

    this.selectSong(this.songs[newIndex]);
    return true;
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
    console.log("Selecting song", track)
    this.currentSong = track;
    this.playerService.updatePlayerSongInfo(track);
    console.log("Player", this);
  }

  getCurrentSong() {
    return this.currentSong;
  }

  #checkCurrentSongPresence() {
    if (!this.currentSong) {
      throw new Error("There is no current song selected")
    }
  }
}

export default Player;
