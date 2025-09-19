import { HttpClient } from "../client/httpClient.js";

export const fetchTracks = async () => {
  const client = HttpClient("http://localhost:4567");
  return await client.get("songs");
};

export const fetchTrack = async (id) => {
  const client = HttpClient("http://localhost:4567");
  return await client.get(`songs/${id}/audio`);
};
