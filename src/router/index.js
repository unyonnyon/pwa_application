import Vue from 'vue'
import VueRouter from 'vue-router'
import Comments from '../views/Comments.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import store from "../store/index.js";

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'comments',
        component: Comments,
        beforeEnter(to, from, next) {
            if (store.getters.idToken) {
                next();
            } else {
                next("/login");
            }
        }
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        beforeEnter(to, from, next) {
            if (store.getters.idToken) {
                next("/");
            } else {
                next();
            }
        }
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        beforeEnter(to, from, next) {
            if (store.getters.idToken) {
                next("/");
            } else {
                next();
            }
        }
    }

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router