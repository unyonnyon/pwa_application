import Vue from 'vue'
import Vuex from 'vuex'
import axios from "../axios-auth.js";
import axiosRefresh from "../axios-refresh.js";
import router from "../router/index.js";


Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        idToken: null
    },
    getters: {
        idToken: state => state.idToken
    },
    mutations: {
        updateIdToken(state, idToken) {
            state.idToken = idToken;
        }
    },
    actions: {
        autoLogin({ commit, dispath }) {
            const idToken = localStorage.getItem("idToken");
            if (!idToken) return;
            const now = new Date();
            const expiryTimeMs = localStorage.getItem("expiryTimeMs");
            const isExpired = now.getTime() >= expiryTimeMs;
            const refreshToekn = localStorage.getItem("refreshToken");
            if (isExpired) {
                dispath("refreshIdToken", refreshToekn);
            } else {
                const expiresInMs = expiryTimeMs - now.getTime();
                commit("updateIdToken", idToken);
                setTimeout(() => {
                    dispath("refreshIdToken", refreshToekn);
                }, expiresInMs);
            }
        },
        login({ dispatch }, authData) {
            axios.post(
                "/accounts:signInWithPassword?key=AIzaSyAwOoRZmWGkcX8tZgLVIv8M6omlx0I_9aA", {
                    email: authData.email,
                    password: authData.password,
                    returnSecureToken: true
                }
            ).then(response => {
                dispatch("setAuthData", response.data);
                router.push("/");
            });
        },
        refreshIdToken({ dispatch }, refreshToken) {
            axiosRefresh.post(
                "/token?key=AIzaSyAwOoRZmWGkcX8tZgLVIv8M6omlx0I_9aA", {
                    grant_type: "refresh_token",
                    refresh_token: refreshToken
                }
            ).then(response => {
                dispatch("setAuthData", {
                    idToken: response.data.id_token,
                    expiresIn: response.data.expires_in,
                    refreshToken: response.data.refresh_token
                });
            });
        },
        register({ dispatch }, authData) {
            axios.post(
                "/accounts:signUp?key=AIzaSyAwOoRZmWGkcX8tZgLVIv8M6omlx0I_9aA", {
                    email: authData.email,
                    password: authData.password,
                    returnSecureToken: true
                }
            ).then(response => {
                dispatch("setAuthData", response.data);
                router.push("/");
            });
        },
        setAuthData({ commit, dispatch }, authData) {
            const now = new Date();
            const expiryTimeMs = now.getTime() + authData.expiresIn * 1000;
            commit('updateIdToken', authData.idToken);
            localStorage.setItem("idToken", authData.idToken);
            localStorage.setItem("expiryTimeMs", expiryTimeMs);
            localStorage.setItem("refreshToken", authData.refreshToken);
            setTimeout(() => {
                dispatch("refreshIdToken", authData.refreshToken);
            }, authData.expiresIn * 1000);
        },
        logout({ commit }) {
            commit("updateIdToken", null);
            localStorage.removeItem("idToken");
            localStorage.removeItem("expiryTimeMs");
            localStorage.removeItem("refreshToken");
            router.replace("/login");
        }
    },
    modules: {}
})