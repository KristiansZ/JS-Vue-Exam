<template>
    <div id="login-view">
        <form class="login-form">
            <div class="wrapper-logo">
                <img src="@/assets/logo.svg" />
                <div>KRAKEN.FM</div>
            </div>
            <input
                id="input-email"
                placeholder="E-mail"
                v-model="email"
            />
            <input
                id="input-password"
                type="password"
                placeholder="Password"
                v-model="password"
            />
            <button id="btn-submit" @click="submitLogin()" :disabled="isSubmitDisabled">
                LOGIN
            </button>
        </form>
    </div>
</template>

<script>
import { useAuthStore } from '../stores/auth.js';
export default {
    data() {
        return {
            email: '',
            password: '',
        };
    },
    computed: {
        isSubmitDisabled(){
            if(!(this.email && this.password.length >= 6)){
                return true;
            } else{
                return false;
            }
        }
    },
     methods: {
        submitLogin() {
            useAuthStore().authenticate(this.email, this.password);
        },
    },
};
</script>