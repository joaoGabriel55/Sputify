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


const playButton = document.getElementById("play-btn");
const volumeSlider = document.getElementById("volume");
const volumeMuteButton = document.getElementById("volume-mute-btn");
const audioElement = document.querySelector("audio");

window.addEventListener("load", () => {
  let lastAudioVolumeBeforeMuted = 0;

  playButton.addEventListener("click", () => {
    //const audioCtx = new AudioContext();
    const playButtonIcon = playButton.querySelector("span")

    // const track = audioCtx.createMediaElementSource(audioElement);
    // if (audioCtx.state === "suspended") {
    //   audioCtx.resume();
    // }
    if (playButton.dataset.playing === "false") {
      audioElement.play().catch(e=> console.log("play failed", e));
      playButton.dataset.playing = "true";
      playButtonIcon.textContent = "pause_circle";
    } else if (playButton.dataset.playing === "true") {
      audioElement.pause();
      playButton.dataset.playing = "false";
      playButtonIcon.textContent = "play_circle";
    }
  });

  volumeSlider.addEventListener("input", (event) => {
    audioElement.volume = event.target.value;
  });

  volumeMuteButton.addEventListener("click", () => {
    if (audioElement.volume === 0) {
      audioElement.volume = lastAudioVolumeBeforeMuted;
    } else {
      lastAudioVolumeBeforeMuted = audioElement.volume;
      audioElement.volume = 0;
    }
  }
  )

  audioElement.addEventListener("volumechange",(event) => {
    console.log(event.target.volume);
  });
});

// a interface de tempo/progresso da musica
// mudar o audio selecionado com base no click
// separar arquivos js por contextos e chamar individualmente no index.html