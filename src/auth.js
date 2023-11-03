import { defineStore } from 'pinia';

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        user: {
            name: 'Kristians',
            surname: 'Zondaks',
            code: 'IT21008',
            favorite_songs: [],
        },
        authenticated: localStorage.is_authenticated ?? false,
    }),
    getters: {
        getFavoriteSongs() {
            return this.user.favorite_songs;
        },
        is_authenticated() {
            return localStorage.getItem('is_authenticated') === 'true' || this.authenticated;
        },
    },
     actions: {
        loadFavoriteSongs() {
            const storedFavoriteSongs = localStorage.getItem('favorite_songs');
            if (storedFavoriteSongs) {
                this.user.favorite_songs = JSON.parse(storedFavoriteSongs);
            }
        },

        saveFavoriteSongs() {
            const favoriteSongsJSON = JSON.stringify(this.user.favorite_songs);
            localStorage.setItem('favorite_songs', favoriteSongsJSON);
        },
        setUserData(name, surname, code) {
            this.user.name = name;
            this.user.surname = surname;
            this.user.code = code;
        },
        authenticate(email, password) {
            console.log("Can authenticate");
    
            if (email == 'kristians.zondaks@va.lv' && password == '123456') {
                localStorage.setItem('is_authenticated', 'true');
                this.authenticated = true;
        
                router.push('/');
            } else {
                console.error('Invalid email or password');
            }
        },
        logout() {
            localStorage.removeItem('is_authenticated');
            this.authenticated = false;
            
            router.push('/login');
        },
        toggleFavorite(songID) {
            const favoriteIndex = this.user.favorite_songs.indexOf(songID);
      
            if (favoriteIndex === -1) {
                this.user.favorite_songs.push(songID);
            } else {
                this.user.favorite_songs.splice(favoriteIndex, 1);
            }
            this.saveFavoriteSongs();
        },  
    }
});