import Playlist from "../domain/playlist";

class PlaylistService {
  playlists;

  constructor() {
    this.playlists = this.#getPlaylistsFromLocalStorage();
  }

  createNewPlaylist({ title, description = null }) {
    const newPlaylist = new Playlist([], title, description);
    this.playlists.push(newPlaylist);
    this.#savePlaylistsOnLocalStorage();
  }

  addSongToPlaylist(songId, playlistId) {
    const playlistIndex = this.playlists.findIndex((p => p.id === playlistId));

    if (playlistIndex === -1) {
      throw new Error("Playlist not found");
    }

    this.playlists[playlistIndex].addSong(songId);

    this.#savePlaylistsOnLocalStorage();
  }

  #savePlaylistsOnLocalStorage() {
    const playlistsJson = this.playlists.map((playlist) => playlist.toJson());
    localStorage.setItem("playlists", JSON.stringify(playlistsJson));
  }

  #getPlaylistsFromLocalStorage() {
    const playlistLocalStorage = localStorage.getItem("playlists");
    const playlists = playlistLocalStorage ? JSON.parse(playlistLocalStorage) : [];

    return playlists.map((playlistData) => {
      const { title, description, songs } = playlistData;

      return new Playlist(songs, title, description);
    });
  }
}

export default PlaylistService;
