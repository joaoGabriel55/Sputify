class Song {
    id
    title
    artist
    image
    audio
    
    constructor(id, title, artist, image, audio) {
        this.id = id
        this.title = title
        this.artist = artist
        this.image = image
        this.audio = audio
    }
}


class Tracklist {
  songs

  constructor(songs) {
    this.songs = songs
  }


}

// fetchTracks pra popular a Tracklist
// classe Tracklist -> mostrar as musicas listadas que o cara pode escolher
// mocko o retorno


// const player = new Player(songs, currentSong, playerService)