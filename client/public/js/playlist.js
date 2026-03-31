import { fetchTrack } from "./api/index.js";
import PlaylistService from "./service/playlistService.js";
import htmlToNode from "./shared/htmlToNode.js";

const playlistId = location.pathname.split("/")[2];

const render = async () => {
  const playlistService = new PlaylistService();
  const playlist = playlistService.playlists.find(p => p.id === playlistId);
  
  if (!playlist) return; 

  const playlistName = document.getElementById("playlist-name");
  const playlistDescription = document.getElementById("playlist-description");

  playlistName.innerText = playlist.title;
  playlistDescription.innerText = playlist.description;

  const songIds = playlist ? playlist.songs.filter(Boolean) : [];

  const songPromises = await Promise.allSettled(
    songIds.map((songId) => {
      return fetchTrack(songId);
    })
  );

  const songs = songPromises.flatMap(s => s.status === "fulfilled" ? s.value : null);

  const trackList = document.querySelector(".track-list");
  const player = window.player;
  console.log("Playlist", player);

  songs.forEach((track) => {
    const htmlStr = `
      <div class="track-row">
        <img
        class="track-image"
        src="https://static.wikia.nocookie.net/beatles/images/8/82/Thebeatlesabbeyroad.jpg"
        alt="Track Title"
        />
        <p class="track-title">${track.title} - ${track.artist}</p>
      </div>
    `;

    const div = htmlToNode(htmlStr.trim());

    div.onclick = () => {
      player.selectSong(track);
      player.play();
    }

    trackList.appendChild(div);
  });
}

render();