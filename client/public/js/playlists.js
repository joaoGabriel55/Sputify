import PlaylistService from "./service/playlistService.js";
import htmlToNode from "./shared/htmlToNode.js";

const render = async () => {
  console.log("Rendering playlists...");

  const playlistService = new PlaylistService();

  const playlistsGrid = document.querySelector(".playlists-grid");

  const playlists = playlistService.playlists || [];

  playlists.forEach((playlist) => {
    const htmlStr = `
    <a href="/playlists/${playlist.id}">
      <div class="playlist-card">
        <img class="playlist-image" src="https://static.wikia.nocookie.net/beatles/images/8/82/Thebeatlesabbeyroad.jpg" alt="Track Title">
        <div class="playlist-info">
            <h3 class="playlist-title">${playlist.title}</h3>
            <p class="playlist-description">${playlist.description}</p>
        </div>
      </div>
    </a>
  `;

    const div = htmlToNode(htmlStr.trim());

    playlistsGrid.appendChild(div);
  });
}

render();