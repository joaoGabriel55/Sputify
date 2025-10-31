import { fetchTracks } from "./api/index.js";
import Player from "./domain/player.js";

export function htmlToNode(html) {
  const template = document.createElement("template");
  template.innerHTML = html;
  const nNodes = template.content.childNodes.length;
  if (nNodes !== 1) {
    throw new Error(
      `html parameter must represent a single node; got ${nNodes}. ` +
        "Note that leading or trailing spaces around an element in your " +
        'HTML, like " <img/> ", get parsed as text nodes neighbouring ' +
        "the element; call .trim() on your input to avoid this.",
    );
  }
  return template.content.firstChild;
}

const render = async () => {
  console.log("Rendering tracks...");

  const response = await fetchTracks();

  const tracksGrid = document.querySelector(".tracks-grid");
  
  const songs = response || [];
  const currentSong = songs.length > 0 ? songs[0] : null;
  const player = new Player(songs, currentSong);

  window.player = player;

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

render();

// opcional: conseguir setar o tempo na interface de progresso
