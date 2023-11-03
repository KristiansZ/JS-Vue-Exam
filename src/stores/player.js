import { defineStore } from 'pinia'

export const usePlayerStore = defineStore('player', {
    state: () => ({
        playlist   : [],
        now_playing: {},
    }),
    getters: {
        getNextSong(){
            const currentIndex = this.playlist.findIndex((song) => song.id === this.now_playing.id);

            if (currentIndex !== -1 && currentIndex < this.playlist.length - 1) {
                return this.playlist[currentIndex + 1];
            } else {
                return null;
            }
        },
      
        getPreviousSong() {
            const currentIndex = this.playlist.findIndex((song) => song.id === this.now_playing.id);
      
            if (currentIndex > 0) {
                return this.playlist[currentIndex - 1];
            } else {
                return null;
            }
        },
        getNowPlayingSongId() {
            return this.now_playing?.id;
        },
        getNowPlaying() {
            return this.now_playing;
        },
        getNowPlayingAlbumID() {
            return this.now_playing?.album?.id ?? null;
        },
        getNowPlayingSongName() {
            return this.now_playing?.name ?? '';
        },
        getNowPlayingSongImage() {
            return this.now_playing?.album?.images[1].url ?? '';
        },
        getNowPlayingArtists() {
            return this.now_playing?.artists?.map(artist => artist.name).join(', ');
        },
        getNowPlayingSongPreview() {
            return this.now_playing?.preview_url;
        }
    },
    actions: {
        setPlaylist(songs) {
            this.playlist = songs;
            console.log('Playlist:', this.playlist);
        },
        setNowPlaying(song) {
            this.now_playing = song;
        },
        resetNowPlaying() {
            this.now_playing = {};
        },
    }
})
