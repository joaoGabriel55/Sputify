import Playlist from "./playlist";

describe("Playlist", () => {
  describe("when instanting a playlist", () => {
    describe("when tile is empty", () => {
      it("throws an error", () => {
        expect(() => new Playlist([])).toThrow(new Error("Title is required"));
      });
    });
  });

  describe("addSong", () => {
    it("adds the song to the playlist", () => {
      const playlist = new Playlist([], "Test playlist", "test description");

      playlist.addSong(1);
      
      expect(playlist.songs).toEqual([1]);
    });

    describe("when adding a duplicate song", () => {
      it("adds the song anyway", () => {
        const playlist = new Playlist([1], "Test playlist", "test description");

        playlist.addSong(1);
      
        expect(playlist.songs).toEqual([1, 1]);
      });
    });
  });

  describe("removeSong", () => {
    it("removes the song from the playlist", () => {
      const playlist = new Playlist([1,3], "Test playlist", "test description");

      playlist.removeSong(3);

      expect(playlist.songs).toEqual([1]);
    });

    describe("when removing a song that is not in the playlist", () => {
      it("does not throw any erros", () => {
        const playlist = new Playlist([], "Test");

        playlist.removeSong(45);

        expect(playlist.songs).toEqual([]);
      });
    });
  });

  describe("toJson", () => {
    it("returns an object with the playlist data", () => {
      const songsId = [1,2,3,5,8,13];
      const playlist = new Playlist(songsId, "Test Playlist", "The best playlist ever");

      expect(playlist.toJson()).toEqual({
        title: "Test Playlist",
        description: "The best playlist ever",
        songs: songsId
      })
    })
  });
});
