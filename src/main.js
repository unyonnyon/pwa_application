import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from "axios";

Vue.config.productionTip = false

axios.defaults.baseURL =
    "https://firestore.googleapis.com/v1/projects/vue-pwa-tutorial-e724f/databases/(default)/documents";
// axios.defaults.headers.common['Authorization'] = "mochi";
axios.defaults.headers.get["Accept"] = "application/json";

axios.interceptors.request.use(
    config => {
        console.log("test");
        return config;
    },
    error => {
        // axios.get();
        return Promise.reject(error);
    }
);
axios.interceptors.response.use(
    config => {
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// axios.interceptors.request.eject(interceptorsId);

store.dispatch("autoLogin");

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')