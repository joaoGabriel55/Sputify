export const fetchTracks = async () => {
  const response = await fetch("http://localhost:4567/songs");
  return await response.json();
};

export const fetchTrack = async (id) => {
  const response = await fetch(`http://localhost:4567/songs/${id}/audio`);
  return await response.json();
};
