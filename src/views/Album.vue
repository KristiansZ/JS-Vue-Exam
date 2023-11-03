<template>
    <div id="album-view">
    <div class="wrapper-header">
        <h1>ALBUMS</h1>
        <div class="settings">
            <button id="btn-grid" v-bind:class="[{ active : view == 1}]" @click="setView(1)"><IconGrid /></button>
            <button id="btn-list" v-bind:class="[{ active : view == 2}]" @click="setView(2)"><IconList /></button>
        </div>
    </div>
    <ul id="list-albums" v-bind:class="[{ grid : view == 1}]">
        <li v-for="album in albums" class="album" @dblclick="playAlbum(album)" :class="{ 'active': pStore.getNowPlayingAlbumID === album.id }">
            <img id="img-album" :src="album.images[1].url"/>
            <div class="album-info">
                <h4 id="txt-album-name">{{album.name}}</h4>
                <p id="txt-album-artists">{{album.artists[0].name}}</p>
                <div class="album-year">
                    <p id="txt-album-year">{{getYear(album.release_date)}}</p>
                    <p id="txt-album-tracks">{{countTracks(album.name)}}</p>
                </div>
            </div>
        </li>
    </ul>
</div>
</template>

<script>
import IconGrid from '../components/icons/IconGrid.vue';
import IconList from '../components/icons/IconList.vue';
import songList from '../data/songs.js';
import { usePlayerStore } from '../stores/player.js';
export default {
    data() {        
        let albumList = [];
        let albumNames = [];
        for (let i = 0; i<songList.length; i++) {
            if(albumNames.indexOf(songList[i].album.name) <0) {
                albumList.push(songList[i].album);
                albumNames.push(songList[i].album.name)
            }
        }
        return {
            view: 1,
            albums: albumList,
            pStore: usePlayerStore(),
        }
    },
    components: {
        IconGrid,
        IconList
    },
    methods:{
        setView(value) {
            this.view = value;
        },
        getYear(date) {
            let year = date.slice(0, 4);
            return year
        },
        countTracks(name) {
            let count = 0;
            for (let i = 0; i < songList.length; i++) {
                if (songList[i].album.name == name) {
                    count ++;
                }
            }
            if (count == 1) {
                return "1 song"
            } else {
                return count+" songs"
            }
        },
        playAlbum(album) {
            const songsToPlay = songList.filter(song => song.album.id === album.id);

            usePlayerStore().setPlaylist(songsToPlay);

            usePlayerStore().setNowPlaying(songsToPlay[0]);
        },
    },
}
</script>