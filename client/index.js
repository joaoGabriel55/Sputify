const fetchTracks = async () => {
  const response = await fetch("http://localhost:4567/songs");
  return await response.json();
}

const fetchTrack = async (id) => {
  const response = await fetch(`http://localhost:4567/songs/${id}/audio`);
  return response;
}

function htmlToNode(html) {
  const template = document.createElement('template');
  template.innerHTML = html;
  const nNodes = template.content.childNodes.length;
  if (nNodes !== 1) {
    throw new Error(
      `html parameter must represent a single node; got ${nNodes}. ` +
      'Note that leading or trailing spaces around an element in your ' +
      'HTML, like " <img/> ", get parsed as text nodes neighbouring ' +
      'the element; call .trim() on your input to avoid this.'
    );
  }
  return template.content.firstChild;
}

const response = await fetchTracks();

const tracksGrid = document.querySelector(".tracks-grid");

response.forEach(track => {
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

  tracksGrid.appendChild(div);
});


const playButton = document.querySelector("#play-btn");

window.addEventListener("load", () => {
  playButton.addEventListener("click", () => {
    const audioElement = document.querySelector("audio");
    const audioCtx = new AudioContext();
    // const track = audioCtx.createMediaElementSource(audioElement);
    console.log(audioElement);

    audioElement.volume = 0.5;
    

    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }

    if (playButton.dataset.playing === "false") {
      audioElement.play().catch(e=> console.log("play failed", e));
      playButton.dataset.playing = "true";
      console.log(playButton);
      // icon pause_circle
    } else if (playButton.dataset.playing === "true") {
      audioElement.pause();
      playButton.dataset.playing = "false";
      console.log(playButton);
    }
  });
});