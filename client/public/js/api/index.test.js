import { fetchTrackAudios, fetchTrackAudio } from "./index";
import { HttpClient } from "../client/httpClient";

jest.mock('../client/httpClient', () => ({
  HttpClient: jest.fn()
}));

describe("API", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("fetchTrackAudios", () => {
    it("should fetch tracks", async () => {
      HttpClient.mockImplementation(() => {
        return {
          get: (path) => {
            return Promise.resolve([
              { id: 1, title: "Track 1", artist: "Artist 1" },
              { id: 2, title: "Track 2", artist: "Artist 2" },
            ])
          },
        };
      });

      const tracks = await fetchTrackAudios();
      expect(tracks).toHaveLength(2);
    });
  });

  describe("fetchTrackAudio", () => {
    it("should fetch track", async () => {
      const mockFile = new File(['file content'], 'test.mp3', { type: 'audio/mpeg' });

      HttpClient.mockImplementation(() => {
        return {
          get: (path) => {
            return mockFile
          },
        };
      });

      const track = await fetchTrackAudio(1);
      expect(track).toBe(mockFile);
      expect(mockFile.type).toBe('audio/mpeg')
    });
  });
});
