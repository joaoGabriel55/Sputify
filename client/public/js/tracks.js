import { fetchTrackAudios } from "./api/index.js";
import PlaylistService from "./service/playlistService.js";
import htmlToNode from "./shared/htmlToNode.js";

const render = async () => {
  console.log("Rendering tracks...");

  const response = await fetchTrackAudios();

  const tracksGrid = document.querySelector(".tracks-grid");
  
  const songs = response || [];
  const currentSong = songs.length > 0 ? songs[0] : null;
  const player = window.player;
  const playlistService = new PlaylistService();

  window.playlistService = playlistService;

  songs.forEach((track) => {
    const htmlStr = `
      <div class="track-card">
        <img class="track-image" src="https://static.wikia.nocookie.net/beatles/images/8/82/Thebeatlesabbeyroad.jpg" alt="Track Title">
        <div class="track-info">
          <h3 class="track-title">${track.title}</h3>
          <p class="track-artist">${track.artist}</p>
        </div>
      </div>
  `;

    const div = htmlToNode(htmlStr.trim());

    div.addEventListener("click", () => {
      player.selectSong(track);
      player.play();
    });

    tracksGrid.appendChild(div);
  });
};

window.addEventListener("load", () => {
  render();
});
