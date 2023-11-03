<template>
    <div id="about-view">
        <div class="wrapper-header">
            <h1>ABOUT ME</h1>
            <div class="settings">
                <button id="btn-edit" @click="toggleEditMode">{{ editButtonLabel }}</button>
                <button v-if="isEditing" id="btn-save" @click="saveForm">Save Form</button>
            </div>
        </div>
        <form>
            <div class="wrapper-input">
                <label>NAME</label>
                <input v-if="isEditing" id="input-name" v-model="inputName" />
                <p v-else id="txt-name">{{ user.name }}</p>
            </div>
            <div class="wrapper-input">
                <label>SURNAME</label>
                <input v-if="isEditing" id="input-surname" v-model="inputSurname"/>
                <p v-else id="txt-name">{{ user.surname }}</p>
            </div>
            <div class="wrapper-input">
                <label>STUDENT CODE</label>
                <input v-if="isEditing" id="input-ciode" v-model="inputCode" />
                <p v-else id="txt-name">{{ user.code }}</p>
            </div>
            <div class="wrapper-songs">
                <label>FAVORITE SONGS</label>
                <ul v-if="user.favorite_songs.length > 0">
                    <li v-for="song in favoriteSongs" :key="song.id">
                        <img id="img-album" :src="getAlbumCover(song)" />
                        <div class="song-info">
                            <p id="txt-song" class="song-name">{{ song.name }}</p>
                            <p id="txt-artist" class="song-artists">{{ getArtists(song.artists) }}</p>
                        </div>
                    </li>
                </ul>
                <div id="txt-empty" class="empty" v-if="user.favorite_songs.length == 0">NO SONGS FOUND</div>
            </div>
        </form>
</div>
</template>
  
<script>
import { useAuthStore } from '../auth.js';
import songData from '../data/songs.js';

export default {
    data() {
        return {
            isEditing: false,
            inputName: '',
            inputSurname: '',
            inputCode: '',
            songs: songData,
        };
    },
    computed: {
        user() {
            return useAuthStore().user;
        },

        editButtonLabel() {
            return this.isEditing ? 'Cancel' : 'Edit Form';
        },
        processedSongs() {
            return songData;
        },
        favoriteSongs() {
            return this.songs.filter(song => this.isFavorite(song.id));
        },
    },
    methods: {
        isFavorite(songID){
            const favoriteSongs = useAuthStore().getFavoriteSongs;

            return favoriteSongs && Array.isArray(favoriteSongs) && favoriteSongs.includes(songID);
        },
        toggleEditMode() {
            this.isEditing = !this.isEditing;
            if (!this.isEditing) {
                this.resetInputFields();
            } else{
                this.setInputValues();
            }
        },
        resetInputFields() {
            this.inputName = this.user.name;
            this.inputSurname = this.user.surname;
            this.inputCode = this.user.code;
        },
        setInputValues() {
            this.inputName = this.user.name;
            this.inputSurname = this.user.surname;
            this.inputCode = this.user.code;
        },
        async saveForm() {
            const updatedUserData = {
                name: this.inputName,
                surname: this.inputSurname,
                code: this.inputCode,
            };

            useAuthStore().setUserData(updatedUserData.name, updatedUserData.surname, updatedUserData.code);

            this.disableEditMode();
        },
        disableEditMode() {
            this.isEditing = false;
        },
        getAlbumCover(song) {
            console.log(song.album?.images[0]?.url)
            return song.album?.images[0]?.url || '';
        },
        getArtists(artists) {
            return artists ? artists.map(artist => artist.name).join(', ') : '';
        },
    },
};
</script>