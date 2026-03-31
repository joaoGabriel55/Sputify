import { HttpClient } from "../client/httpClient.js";

export const fetchTrackAudios = async () => {
  const client = HttpClient("http://localhost:4567");
  return await client.get("songs");
};

export const fetchTrackAudio = async (id) => {
  const client = HttpClient("http://localhost:4567");
  return await client.get(`songs/${id}/audio`);
};

export const fetchTrack = async (id) => {
  const client = HttpClient("http://localhost:4567");
  return await client.get(`songs/${id}`);
}