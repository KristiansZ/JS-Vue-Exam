<template>
    <div id="songs-view" @scroll="handleScroll">
        <div class="wrapper-header">
            <h1>SONGS</h1>
            <div class="wrapper-search">
                <input v-model="search" id="input-search" placeholder="Search by title..." />
            </div>
            <div class="wrapper-settings">
                <button
                    :class="{ active: show_favorites }"
                    id="btn-show-favorites"
                    @click="toggleShowFavorites">
                    Show Favorites
                </button>
            </div>
        </div>
        <div class="wrapper-songs">
            <table cellspacing="0" cellpadding="0">
                <tr ref="header">
                    <th id="th-id">#</th>
                    <th
                        :class="{ active: sortByTitle }"
                        id="th-title"
                        @click="sortBy(1)"
                        >
                        Title
                        <IconCaretUp
                            color= "var(--c-accent-secondary)"
                            v-if="sortByTitle"
                            v-bind:class="{ 'flip-vertical': sortState === 2 }"
                        />
                    </th>
                    <th id="th-artist">Artist</th>
                    <th id="th-album">Album</th>
                    <th
                        :class="{ active: sortByDuration }"
                        id="th-duration"
                        @click="sortBy(2)"
                    >
                        Duration
                        <IconCaretUp
                            color= "var(--c-accent-secondary)"
                            v-if="sortByDuration"
                            v-bind:class="{ 'flip-vertical': sortStateDuration === 2 }"
                        />
                    </th>
                </tr>
                <!-- Loop goes on this <tr> element -->
                <tr class="song" v-for="(song, index) in processedSongs" :key="index" v-on:dblclick="selectSong(song)" :class="{ 'active': pStore.getNowPlayingSongId === song.id }">
                    <td id="td-index">
                        <IconPlay v-show="this.pStore.getNowPlayingSongId === song.id"/>
                        <span id="txt-index" v-text="index+1" v-show="this.pStore.getNowPlayingSongId !== song.id"></span>
                    </td>
                    <td id="td-title">
                        <img :src="song.album.images[0].url" />
                        {{song.name}}
                    </td>
                    <td id="td-artist" v-text="getArtists(song.artists)"></td>
                    <td id="td-album">{{song.album.name}}</td>
                    <td id="td-duration">
                        {{getTime(song.duration_ms)}}
                        <IconHeart v-on:click="this.aStore.toggleFavorite(song.id), $forceUpdate()" v-bind:class="[{ active : isFavorite(song.id)}]" :key="index"/>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script>
import { useAuthStore } from '../stores/auth.js';
import songData from '../data/songs.js';
import { usePlayerStore } from '../stores/player.js';
import IconCaretUp from '../components/icons/IconCaretUp.vue';
import IconHeart from '../components/icons/IconHeart.vue';
import IconPlay from '../components/icons/IconPlay.vue';
export default {
  data() {
    return {
      search: '',
      show_favorites: false,
      sortByTitle: false,
      sortByDuration: false,
      sortState: 0,
      sortStateDuration: 0,
      songs: songData,
      pStore: usePlayerStore(),
      aStore: useAuthStore(),
    };
  },
  components: {
    IconCaretUp,
    IconHeart,
    IconPlay,
  },
  computed: {
    processedSongs() {
        const filteredSongs = this.songs.filter(song =>
            song.name.toLowerCase().includes(this.search.toLowerCase())
        );

        return filteredSongs;
    },
  },
  methods: {
    handleScroll(event) {
      this.$refs.header.classList.value = event.target.scrollTop > 100 ? 'scrolled' : '';
    },
    toggleShowFavorites() {
        this.show_favorites = !this.show_favorites;
        if (this.show_favorites) {
            const favoriteSongs = this.songs.filter(song => this.isFavorite(song.id));
            this.songs = favoriteSongs;
        } else {
            this.songs = songData.slice();
        }
    },
    sortBy(column) {
        if (column === 1) {
            switch (this.sortState) {
            case 0:
                this.sortState = 1;
                this.sortByTitle = true;
                break;
            case 1:
                this.sortState = 2;
                this.sortByTitle = true;
                break;
            case 2:
                this.sortState = 0;
                this.sortByTitle = false;
                break;
            }
            this.sortSongsTitle();
        }
        if (column === 2) {

            switch (this.sortStateDuration) {
            case 0:
                this.sortStateDuration = 1;
                this.sortByDuration = true;
                break;
            case 1:
                this.sortStateDuration = 2;
                this.sortByDuration = true;
                break;
            case 2:
                this.sortStateDuration = 0;
                this.sortByDuration = false;
                break;
            }
            this.sortSongsDuration();
        }
    },
    sortSongsTitle() {
        const sortedSongs = this.sortState === 0 ? songData.slice() : [...songData];

        if (this.sortState === 1) {
            sortedSongs.sort((a, b) => {
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();

            return nameA < nameB ? -1 : (nameA > nameB ? 1 : 0);
            });
        } else if (this.sortState === 2) {
            sortedSongs.sort((a, b) => {
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();

            return (nameA < nameB ? -1 : (nameA > nameB ? 1 : 0)) *-1;
            });
        }

        this.songs = sortedSongs;
    },
    sortSongsDuration() {
        const sortedSongs = this.sortStateDuration === 0 ? songData.slice() : [...songData];

        if (this.sortStateDuration === 1) {
            sortedSongs.sort((a, b) => a.duration_ms - b.duration_ms);
        } else if (this.sortStateDuration === 2) {
            sortedSongs.sort((a, b) => b.duration_ms - a.duration_ms);
        }

        this.songs = sortedSongs;
    },
    getArtists(artists) {
        var list = '';
        artists.forEach(element => {
            list = list.concat(element.name).concat(", ");
        });
        list = list.slice(0, -2);
        return list;
    },
    getTime(ms) {
        let min = Math.floor(ms / 60000);
        let sec = ((ms % 60000) / 1000).toFixed(0);
        return sec == 60 ? (min+1) + ":00" : min + ":" + (sec < 10 ? "0" : "") + sec;
    },
    isFavorite(songID){
        const favoriteSongs = useAuthStore().getFavoriteSongs;

        if (favoriteSongs && Array.isArray(favoriteSongs) && favoriteSongs.includes(songID)) {
            return true;
        } else {
            return false;
        }
    },
    selectSong(song){
        usePlayerStore().setNowPlaying(song);
    },
    isSongPlaying(songId) {
      const nowPlayingSongId = usePlayerStore().getNowPlayingSongId();
      return nowPlayingSongId === songId;
    },  
  },
};
</script>