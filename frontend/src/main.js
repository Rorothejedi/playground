import {
    createApp
} from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import naive from 'naive-ui'
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;
window.Echo = new Echo({
    broadcaster: 'pusher',
    key: process.env.VUE_APP_WEBSOCKETS_KEY,
    wsHost: process.env.VUE_APP_WEBSOCKETS_SERVER,
    wsPort: 6001,
    forceTLS: false,
    disableStats: true
});

createApp(App)
    .use(store)
    .use(router)
    .use(naive)
    .mount("#app");