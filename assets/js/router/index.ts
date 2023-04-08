import { createRouter, createWebHistory } from 'vue-router';
import TripList from "@/js/pages/TripList.vue";
import EditTrip from '@/js/pages/edit/EditTrip.vue';
import EditStage from '@/js/pages/edit/EditStage.vue';
import EditDay from '@/js/pages/edit/EditDay.vue';

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
    {
        path: '/edit/trip/:tripId/stage/:stageId',
        name: 'editStage',
        component: EditStage,
    },
    {
        path: '/edit/trip/:tripId/stage/:stageId/day/:dayId',
        name: 'editDay',
        component: EditDay,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router