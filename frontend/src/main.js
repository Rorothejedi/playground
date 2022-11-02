import {
    createApp
} from "vue";
import App from "./App.vue";

// vue router
import router from "./router";

// vuex store
import store from "./store";

// naive UI (external library of components)
import naive from 'naive-ui'

// i18n (translation module)
import i18n from './locales/i18n'

// kinesis (for animate elements) (POC)
import VueKinesis from "vue-kinesis";

createApp(App)
    .use(store)
    .use(router)
    .use(naive)
    .use(i18n)
    .use(VueKinesis)
    .mount("#app");