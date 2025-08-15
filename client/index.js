const fetchTracks = async () => {
  const response = await fetch("http://localhost:4567/songs");
  console.log(await response.json()); 
}

fetchTracks();
