import Playlist from "../domain/playlist.js";

class PlaylistService {
  #playlists;

  constructor() {
    this.#playlists = this.#getPlaylistsFromLocalStorage();
  }

  createNewPlaylist({ songs = [], title, description = null }) {
    const newPlaylist = new Playlist(songs, title, description);
    this.#playlists.push(newPlaylist);
    this.#savePlaylistsOnLocalStorage();
  }

  addSongToPlaylist(songId, playlistId) {
    const playlistIndex = this.#playlists.findIndex((p => p.id === playlistId));
    const parsedSongId = Number(songId);

    if (parsedSongId === NaN) {
      throw new Error("Song not found");
    }

    if (playlistIndex === -1) {
      throw new Error("Playlist not found");
    }

    this.#playlists[playlistIndex].addSong(parsedSongId);

    this.#savePlaylistsOnLocalStorage();
  }

  get playlists() {
    return this.#playlists;
  }

  #savePlaylistsOnLocalStorage() {
    const playlistsJson = this.#playlists.map((playlist) => playlist.toJson());
    localStorage.setItem("playlists", JSON.stringify(playlistsJson));
  }

  #getPlaylistsFromLocalStorage() {
    const playlistLocalStorage = localStorage.getItem("playlists");
    const playlists = playlistLocalStorage ? JSON.parse(playlistLocalStorage) : [];

    return playlists.map((playlistData) => {
      const { title, description, songs, id } = playlistData;

      return new Playlist(songs, title, description, id);
    });
  }
}

export default PlaylistService;
