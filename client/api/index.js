const fetchTracks = async () => {
  const response = await fetch("http://localhost:4567/songs");
  return await response.json();
};

const fetchTrack = async (id) => {
  const response = await fetch(`http://localhost:4567/songs/${id}/audio`);
  return response;
};
