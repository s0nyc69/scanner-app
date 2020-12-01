import Vue, { createApp } from 'vue';
import App from './App.vue'
import router from './router'
import IonicVue from '@ionic/vue'
import '@ionic/core/css/ionic.bundle.css'

Vue.use(IonicVue)

createApp(App).use(router).mount('#app')
