// "playlists": {
//   "playlist1": {
//     "title": "My Favorites",
//     "description": "A collection of my favorite songs.",
//     "songs": [1, 2, 3, 4, 5]
//   }
// }

import Playlist from "../domain/playlist";

const playlists = JSON.parse(localStorage.getItem('playlists'))

const newPlaylists = playlists.map((playlistData) => {
  const {  title, description, songs } = playlistData;
  return new Playlist(songs, title, description).toJson();
});


localStorage.setItem('playlist', playlists)


class PlaylistService {
  constructor() {
    const playlistLocalStorage = localStorage.getItem('playlists')
    this.playlists = playlistLocalStorage ? JSON.parse(playlistLocalStorage) : [];
  }

  createNewPlaylist({ title, description = null }) {
    const newPlaylist = new Playlist([], title, description);
    this.playlists.push(newPlaylist.toJson());
    this.#savePlaylistsOnLocalStorage();
  }

  addSongToPlaylist(songId, playlist) {}

  removeSongFromPlaylist(songId, playlist) {}

  #savePlaylistsOnLocalStorage() {}
}