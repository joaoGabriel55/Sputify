const fetchTracks = async () => {
  const response = await fetch("http://localhost:4567/songs");
  return await response.json();
};

const fetchTrack = async (id) => {
  const response = await fetch(`http://localhost:4567/songs/${id}/audio`);
  return response;
};

function htmlToNode(html) {
  const template = document.createElement("template");
  template.innerHTML = html;
  const nNodes = template.content.childNodes.length;
  if (nNodes !== 1) {
    throw new Error(
      `html parameter must represent a single node; got ${nNodes}. ` +
        "Note that leading or trailing spaces around an element in your " +
        'HTML, like " <img/> ", get parsed as text nodes neighbouring ' +
        "the element; call .trim() on your input to avoid this."
    );
  }
  return template.content.firstChild;
}

const response = await fetchTracks();

const tracksGrid = document.querySelector(".tracks-grid");

response.forEach((track) => {
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
const progress = document.querySelector(".player-progress")
const progressFilled = document.querySelector(".player-progress-filled")
const playerCurrentTime = document.querySelector(".player-time-current")
const playerDuration = document.querySelector(".player-time-duration")

window.addEventListener("load", () => {
  let lastAudioVolumeBeforeMuted = 0;

  // Set times after page load
  setTimes()
  // Update progress bar and time values as audio plays
  audioElement.addEventListener("timeupdate", () => {
    progressUpdate()
    setTimes()
  })

  playButton.addEventListener("click", () => {
    //const audioCtx = new AudioContext();
    const playButtonIcon = playButton.querySelector("span");

    // const track = audioCtx.createMediaElementSource(audioElement);
    // if (audioCtx.state === "suspended") {
    //   audioCtx.resume();
    // }
    if (playButton.dataset.playing === "false") {
      audioElement.play().catch((e) => console.log("play failed", e));
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
  });

  audioElement.addEventListener("timeupdate", () => {
    progressUpdate();
    setTimes();
  });

  // audioElement.addEventListener("volumechange",(event) => {
  //   console.log(event.target.volume);
  // });
});

// Display currentTime and duration properties in real-time
function setTimes() {
  playerCurrentTime.textContent = new Date(audioElement.currentTime * 1000)
    .toISOString()
    .substr(14, 5)
  playerDuration.textContent = new Date(audioElement.duration * 1000)
    .toISOString()
    .substr(14, 5)
}
// Update player timeline progress visually
function progressUpdate() {
  const percent = (audioElement.currentTime / audioElement.duration) * 100
  progressFilled.style.flexBasis = `${percent}%`
}

// interface volume e progresso mobile
// mudar o audio selecionado com base no click
// separar arquivos js por contextos e chamar individualmente no index.html
// opcional: conseguir setar o tempo na interface de progresso