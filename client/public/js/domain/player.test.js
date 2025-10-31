import Player from "./player.js";

class MockPlayerService {
  play() {}
  stop() {}
  volumeChange(value) {}

  toggleMute() {}
  getCurrentTime() {}
  getDuration() {}
  updatePlayerSongInfo(track) {}
  updateProgress() {}
  setTimes() {}
}

describe("Player", () => {
  let player;
  let mockPlayerService;
  const songs = [
    {
      id: 1,
      title: "Rein me in - feat. Olivia Dean",
      artist: "Sam Fender",
      album: "People Watching",
      audio: "samfender_reinmein.mp3",
    },
    {
      id: 2,
      title: "Tyrants",
      artist: "Sam Fender",
      album: "People Watching",
      audio: "samfender_tyrants.mp3",
    },
  ];
  let currentSong = songs[0];

  beforeEach(() => {
    mockPlayerService = new MockPlayerService();
    player = new Player(songs, currentSong, mockPlayerService);
  });

  describe("play", () => {
    it("should change the status to 'playing'", () => {
      player.play();

      expect(player.getStatus()).toEqual("playing");
    });

    it("should call the play method from playerService", () => {
      const serviceSpy = jest.spyOn(mockPlayerService, "play");

      player.play();

      expect(serviceSpy).toHaveBeenCalled();
    });

    describe("when there is no song select", () => {
      it("throws an error", () => {
        player = new Player(songs, null, mockPlayerService);

        expect(() => player.play()).toThrow(
          "There is no current song selected"
        );
      });
    });
  });

  describe("stop", () => {
    it("should change the status to 'stopped'", () => {
      player.stop();

      expect(player.getStatus()).toEqual("stopped");
    });

    it("should call the stop method from playerService", () => {
      const serviceSpy = jest.spyOn(mockPlayerService, "stop");

      player.stop();

      expect(serviceSpy).toHaveBeenCalled();
    });

    describe("when there is no song select", () => {
      it("throws an error", () => {
        player = new Player(songs, null, mockPlayerService);

        expect(() => player.stop()).toThrow(
          "There is no current song selected"
        );
      });
    });
  });

  describe("setVolume", () => {
    it("should change the volume value", () => {
      player.setVolume(80);

      expect(player.getVolume()).toEqual(80);
    });

    it("should change the volume", () => {
      const serviceSpy = jest.spyOn(mockPlayerService, "volumeChange");

      player.setVolume(50);

      expect(serviceSpy).toHaveBeenCalled();
      expect(player.getVolume()).toEqual(50);
    });
  });

  describe("prev", () => {
    describe("when there is no song select", () => {
      it("throws an error", () => {
        player = new Player(songs, null, mockPlayerService);

        expect(() => player.prev()).toThrow(
          "There is no current song selected"
        );
      });
    });

    it("sets the current song to the previous one in the list", () => {
      currentSong = songs[1];
      player = new Player(songs, currentSong, mockPlayerService);

      player.prev();

      expect(player.getCurrentSong()).toStrictEqual(
        expect.objectContaining({
          id: songs[0].id,
          title: songs[0].title,
        })
      );
    });

    describe("when song is the first one of the list", () =>{
      it("does not change current song", () => {
        player.prev();

        expect(player.getCurrentSong()).toStrictEqual(
          expect.objectContaining({
            id: songs[0].id,
            title: songs[0].title,
          })
        );
      })
    });
  });

  describe("next", () => {
    describe("when there is no song select", () => {
      it("throws an error", () => {
        player = new Player(songs, null, mockPlayerService);

        expect(() => player.next()).toThrow(
          "There is no current song selected"
        );
      });
    });

    it("should call the selectSong method with the next song index", () => {
      currentSong = songs[2];
      player = new Player(songs, currentSong, mockPlayerService);

      player.next();

      expect(player.getCurrentSong()).toStrictEqual(
        expect.objectContaining({
          id: songs[2].id,
          title: songs[2].title,
        })
      );
    });

    describe("when song is the last one of the list", () =>{
      it("does not change current song", () => {
        player.next();

        expect(player.getCurrentSong()).toStrictEqual(
          expect.objectContaining({
            id: songs[0].id,
            title: songs[0].title,
          })
        );
      })
    });
  });

  describe("currentTime", () => {
    it("should call the getCurrentTime method from playerService", () => {
      const serviceSpy = jest.spyOn(mockPlayerService, "getCurrentTime");

      player.currentTime();

      expect(serviceSpy).toHaveBeenCalled();
    });
  });

  describe("duration", () => {
    it("should call the getDuration method from playerService", () => {
      const serviceSpy = jest.spyOn(mockPlayerService, "getDuration");

      player.duration();

      expect(serviceSpy).toHaveBeenCalled();
    });
  });

  describe("toggleMute", () => {
    it("should call the toggleMute method from playerService", () => {
      const serviceSpy = jest.spyOn(mockPlayerService, "toggleMute");

      player.toggleMute();

      expect(serviceSpy).toHaveBeenCalled();
    });
  });

  describe("updateProgress", () => {
    it("should call the updateProgress method from playerService", () => {
      const serviceSpy = jest.spyOn(mockPlayerService, "updateProgress");

      player.updateProgress();

      expect(serviceSpy).toHaveBeenCalled();
    });
  });

  describe("setTimes", () => {
    it("should call the setTimes method from playerService", () => {
      const serviceSpy = jest.spyOn(mockPlayerService, "setTimes");

      player.setTimes();

      expect(serviceSpy).toHaveBeenCalled();
    });
  });

  describe("selectSong", () => {
    it("should change the currentSong method from player", () => {});

    it("should call the updatePlayerSongInfo method from playerService", () => {});

    it("should call the play method from the player", () => {});
  });
});
