import { createRouter, createWebHistory } from 'vue-router';
import TripList from "@/js/pages/TripList.vue";

const routes = [
    { path: '/', name: 'Trip List', component: TripList }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router