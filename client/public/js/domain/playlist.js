class Playlist {
  #songs;
  title;
  description;

  constructor(songs, title, description = null) {
    this.#validate(title);
    this.#songs = songs;
    this.title = title;
    this.description = description;
  }

  toJson() {
    return { 
      title: this.title,
      description: this.description,
      songs: this.#songs
    }
  }

  addSong(songId) {
    this.#songs.push(songId);
  }

  removeSong(songId) {
    const songIndex = this.#songs.findIndex(id => id === songId);

    if (songIndex > -1) {
      this.#songs.splice(songIndex, 1);
    }
  }

  #validate(title) {
    if (!title || title.trim() === '') {
      throw new Error("Title is required");
    }
  }

  get songs() {
    return this.#songs;
  }
}

export default Playlist;