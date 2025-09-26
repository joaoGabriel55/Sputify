import { fetchTracks } from "./api/index.js";

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

  response.forEach((track) => {
    const htmlStr = `
      <div class="track-card" data-id="${track.id}" data-title="${track.title}" data-artist="${track.artist}">
        <img class="track-image" src="https://static.wikia.nocookie.net/beatles/images/8/82/Thebeatlesabbeyroad.jpg" alt="Track Title">
        <div class="track-info">
          <h3 class="track-title">${track.title}</h3>
          <p class="track-artist">${track.artist}</p>
        </div>
      </div>
  `;

    const div = htmlToNode(htmlStr.trim());

    div.addEventListener("click", (event) => {
      const audioElement = document.querySelector("audio");
      const trackId = event.currentTarget.getAttribute("data-id");
      const trackTitle = event.currentTarget.getAttribute("data-title");
      const trackArtist = event.currentTarget.getAttribute("data-artist");
      const playButton = document.getElementById("play-btn")
      const playButtonIcon = playButton.querySelector("span");
      const playerTrackTitle = document.querySelector(".track-player .player-track-info .track-title")

      playerTrackTitle.textContent = `${trackTitle} - ${trackArtist}`;

      audioElement.src = `http://localhost:4567/songs/${trackId}/audio`;

      if (playButton.dataset.playing === "false") {
        playButton.dataset.playing = "true";
        playButtonIcon.textContent = "pause_circle";
      }

      audioElement.play().catch((e) => console.log("play failed", e));
    });

    tracksGrid.appendChild(div);
  });
};

render();

// interface volume e progresso mobile
// mudar o audio selecionado com base no click
// separar arquivos js por contextos e chamar individualmente no index.html
// opcional: conseguir setar o tempo na interface de progresso
