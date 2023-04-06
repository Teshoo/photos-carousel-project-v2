import { createRouter, createWebHistory } from 'vue-router';
import TripList from "@/js/pages/TripList.vue";
import EditTrip from '@/js/pages/edit/EditTrip.vue';

const routes = [
    { 
        path: '/', 
        name: 'tripList', 
        component: TripList,
    },
    {
        path: '/edit/trip/:tripId',
        name: 'editTrip',
        component: EditTrip,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router