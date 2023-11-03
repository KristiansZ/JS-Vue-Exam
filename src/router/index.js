import {createRouter, createWebHistory} from 'vue-router'
import { useAuthStore } from '../auth.js';
import Songs from '../views/Songs.vue';
import Login from '../views/Login.vue';
import Album from '../views/Album.vue';
import About from '../views/About.vue';

const router = createRouter({
    history: createWebHistory(),
    routes : [
        {
            path: '/login',
            name: 'Login',
            component: Login,
        },
        {
            path: '/',
            name: 'Songs',
            component: Songs,
        },
        {
            path: '/albums',
            name: 'Album',
            component: Album,
        },
        {
            path: '/about',
            name: 'About',
            component: About,
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (!useAuthStore().is_authenticated && to.path !== '/login') {
        next('/login');
    }else if(useAuthStore().is_authenticated && to.path === '/login'){
        next(from);
    }else{
        next();
    }
});

export default router
