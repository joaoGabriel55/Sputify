class Playlist {
  #id;
  #songs;
  #title;
  #description;

  constructor(songs, title, description = null, id = crypto.randomUUID()) {
    this.#id = id;
    this.#validate(title);
    this.#songs = songs;
    this.#title = title;
    this.#description = description;
  }

  toJson() {
    return { 
      id: this.#id,
      title: this.#title,
      description: this.#description,
      songs: this.#songs
    }
  }

  get id() {
    return this.#id;
  }

  get title() {
    return this.#title;
  }

  get description() {
    return this.#description
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