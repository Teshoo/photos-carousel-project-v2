import "@/app.css";

import { createApp } from 'vue';
import App from '@/js/pages/main.vue';
import router from '@/js/router';
import { createPinia } from "pinia";

createApp(App).use(router).use(createPinia()).mount('#app');