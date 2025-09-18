import { fetchTracks, fetchTrack } from "./index";

describe("API", () => {
  jest.spyOn(window, "fetch").mockResolvedValue({
    json: () =>
      Promise.resolve([
        { id: 1, title: "Track 1", artist: "Artist 1" },
        { id: 2, title: "Track 2", artist: "Artist 2" },
      ]),
  });

  describe("fetchTracks", () => {
    it("should fetch tracks", async () => {
      const tracks = await fetchTracks();
      expect(tracks).toBeInstanceOf(Array);
    });
  });

  describe("fetchTrack", () => {
    it("should fetch track", async () => {
      const track = await fetchTrack(1);
      expect(track).toBeInstanceOf(Object);
    });
  });
});
