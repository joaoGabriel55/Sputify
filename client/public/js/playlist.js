import PlaylistService from "./service/playlistService.js";

window.addEventListener("load", () => {
  const playlistService = new PlaylistService();
  const selectPlaylistContainer = document.getElementById("select-playlist-container");
  const addNewPlaylistContainer = document.getElementById("add-new-playlist-container");

  const addToPlaylistRadio = document.getElementById("addToPlaylist");
  const createNewPlaylistRadio = document.getElementById("createNewPlaylist");

  addToPlaylistRadio.checked = true;
  createNewPlaylistRadio.checked = false;

  addToPlaylistRadio.addEventListener("change", () => {
    if (addToPlaylistRadio.checked) {
      selectPlaylistContainer.hidden = false;
      addNewPlaylistContainer.hidden = true;
    }
  });

  createNewPlaylistRadio.addEventListener("change", () => {
    if (createNewPlaylistRadio.checked) {
      selectPlaylistContainer.hidden = true;
      addNewPlaylistContainer.hidden = false;
    }
  });

  const newPlaylistForm = document.getElementById("add-new-playlist-form");

  newPlaylistForm.addEventListener("submit", (e) => {
    e.preventDefault();

    console.log("creating playlist...", e);

    const formData = new FormData(newPlaylistForm);
    // mudar isso para pegar do data-attribute
    const songId = window.player.getCurrentSong().id;

    const title = formData.get("newPlaylistTitle");
    const description = formData.get("newPlaylistDescription");

    console.log({ title, description });

    playlistService.createNewPlaylist({ songs: [songId], title, description });
  });
});
