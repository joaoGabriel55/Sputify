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

const render = async () => {
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
}

render();



// interface volume e progresso mobile
// mudar o audio selecionado com base no click
// separar arquivos js por contextos e chamar individualmente no index.html
// opcional: conseguir setar o tempo na interface de progresso