import PlaylistService from "./service/playlistService.js";
import htmlToNode from "./shared/htmlToNode.js";

window.addEventListener("load", () => {
  const playlistService = init();

  const addPlaylistButton = document.getElementById("add-playlist-btn");
  const closeDialogButton = document.getElementById("close-dialog-btn");

  addPlaylistButton.addEventListener("click", () => {
    console.log("Opening dialog...");
    const dialog = document.querySelector("dialog");
    init();
    dialog.showModal();
  });

  closeDialogButton.addEventListener("click", () => {
    console.log("Closing dialog...");
    const dialog = document.querySelector("dialog");
    dialog.close();
  });

  const dialogDiv = document.getElementById('dialog-container');
  dialogDiv.addEventListener('click', (event) => event.stopPropagation());

  const selectPlaylistForm = document.getElementById("select-playlist-form");
  const newPlaylistForm = document.getElementById("add-new-playlist-form");

  selectPlaylistForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const btn = document.getElementById("add-playlist-btn");
    const songId = btn.getAttribute("songId");

    const formData = new FormData(selectPlaylistForm);
    const playlistId = formData.get("playlistId");

    playlistService.addSongToPlaylist(songId, playlistId);

    const dialog = document.querySelector("#playlist-dialog");
    dialog.close();
  });
  // aqui
  newPlaylistForm.addEventListener("submit", (e) => {
    e.preventDefault();

    console.log("creating playlist...", e);

    const formData = new FormData(newPlaylistForm);
    const btn = document.getElementById("add-playlist-btn");
    const songId = btn.getAttribute("songId");

    const title = formData.get("newPlaylistTitle");
    const description = formData.get("newPlaylistDescription");

    console.log({ title, description });

    playlistService.createNewPlaylist({ songs: [songId], title, description });

    const dialog = document.querySelector("#playlist-dialog");
    dialog.close();

    newPlaylistForm.reset();

    init();
  });

  function init() {
    const playlistService = new PlaylistService();
    const playlists = playlistService.playlists;
    console.log("playlists", playlists);
    console.log("Init running");

    const selectPlaylistContainer = document.getElementById("select-playlist-container");
    const addNewPlaylistContainer = document.getElementById("add-new-playlist-container");
    const selectPlaylistOption = document.getElementById("select-playlist-option");
    const playlistSelect = document.getElementById("select-playlist");

    const addToPlaylistRadio = document.getElementById("addToPlaylist");
    const createNewPlaylistRadio = document.getElementById("createNewPlaylist");

    playlistSelect.innerHTML = "";

    if (playlists.length > 0) {
      playlists.forEach((playlist) => {
        const htmlStr = `<option value=${playlist.id}>${playlist.title}</option>`;

        const div = htmlToNode(htmlStr.trim());
        playlistSelect.appendChild(div);
      });

      
      addToPlaylistRadio.checked = true;
      createNewPlaylistRadio.checked = false;
      
      addNewPlaylistContainer.hidden = true;
      selectPlaylistOption.hidden = false;
      selectPlaylistContainer.hidden = false;
    } else {
      selectPlaylistOption.hidden = true;

      addToPlaylistRadio.checked = false;
      createNewPlaylistRadio.checked = true;

      selectPlaylistContainer.hidden = true;
      addNewPlaylistContainer.hidden = false;
    }

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

    return playlistService;
  }
});
