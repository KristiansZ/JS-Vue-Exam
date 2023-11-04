import { defineStore } from 'pinia';
import router from '../router';

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        user: {
            name: 'Kristians',
            surname: 'Zondaks',
            code: 'IT21008',
            favorite_songs: JSON.parse(localStorage.favorite_songs ?? '[]'),
        },
        authenticated: localStorage.getItem('is_authenticated') === 'true' ?? false,
    }),
    getters: {
        getFavoriteSongs() {
            return this.user.favorite_songs;
        },
        is_authenticated() {
            return localStorage.getItem('is_authenticated') === 'true' && this.authenticated;
        },
    },
     actions: {
        loadFavoriteSongs() {
            const storedFavoriteSongs = localStorage.getItem('favorite_songs');
            if (storedFavoriteSongs) {
                this.user.favorite_songs = JSON.parse(storedFavoriteSongs);
            }
        },
        setUserData(name, surname, code) {
            this.user.name = name;
            this.user.surname = surname;
            this.user.code = code;
        },
        authenticate(email, password) {   
            if (email == 'kristians.zondaks@va.lv' && password == '123456') {
                localStorage.setItem('is_authenticated', 'true');
                this.authenticated = true;
            }
        },
        logout() {
            localStorage.removeItem('is_authenticated');
            this.authenticated = false;
            router.push({path: '/login'});
        },
        toggleFavorite(songID) {
            const favoriteIndex = this.user.favorite_songs.indexOf(songID);
      
            if (favoriteIndex === -1) {
                this.user.favorite_songs.push(songID);
            } else {
                this.user.favorite_songs.splice(favoriteIndex, 1);
            }
            localStorage.favorite_songs = JSON.stringify(this.user.favorite_songs);
        },  
    }
});