import "@/app.css";

import { createApp } from 'vue';
import App from '@/js/pages/Main.vue';
import router from '@/js/router';

createApp(App).use(router).mount('#app');