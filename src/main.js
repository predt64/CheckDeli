import { createApp } from 'vue'
import pinia from '@/plugins/pinia.js'
import App from './App.vue'
import router from '@/plugins/router.js'
import vuetify from '@/plugins/vuetify.js'

createApp(App).use(vuetify).use(router).use(pinia).mount('#app')