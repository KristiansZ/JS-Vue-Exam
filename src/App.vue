<template>
    <Header v-if="isLoggedIn"></Header>
    <div id="section-body">
        <Navigation v-if="isLoggedIn"></Navigation>
        <router-view class="section-router" ></router-view>
    </div>
    <div id="section-player" v-if="isLoggedIn">
        <AudioPlayer />
    </div>
</template>

<script>
    import { useAuthStore } from './stores/auth.js';

    export default {
        computed: {
            isLoggedIn(){
                return useAuthStore().authenticated;
            },
        }
    }
</script>
