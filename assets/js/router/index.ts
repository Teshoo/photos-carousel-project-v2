import { createRouter, createWebHistory } from 'vue-router';
import { useTripStore } from '@/js/stores/TripStore';
import { useStageStore } from '@/js/stores/StageStore';
import { useDayStore } from '@/js/stores/DayStore';
import TripList from '@/js/pages/TripList.vue';
import StageList from '@/js/pages/StageList.vue';
import DayList from '@/js/pages/DayList.vue';
import Carousel from '@/js/pages/Carousel.vue';
import EditTrip from '@/js/pages/edit/EditTrip.vue';
import EditStage from '@/js/pages/edit/EditStage.vue';
import EditDay from '@/js/pages/edit/EditDay.vue';

const routes = [
    { 
        path: '/', 
        name: 'tripList', 
        component: TripList
    },
    {
        path: '/trip/:tripId',
        name: 'stageList',
        component: StageList,
        beforeEnter: async (to: any) => {
            await matchTripId(to);
            await setToNormalMode();
        }
    },
    {
        path: '/trip/:tripId/stage/:stageId',
        name: 'dayList',
        component: DayList,
        beforeEnter: async (to: any) => {
            await matchTripId(to);
            await matchStageId(to);
            await setToNormalMode();
        }
    },
    {
        path: '/trip/:tripId/stage/:stageId/day/:dayId',
        name: 'carousel',
        component: Carousel,
        beforeEnter: async (to: any) => {
            await matchTripId(to);
            await matchStageId(to);
            await matchDayId(to);
            await setToNormalMode();
        }
    },
    {
        path: '/edit/trip/:tripId',
        name: 'editTrip',
        component: EditTrip,
        beforeEnter: async (to: any) => {
            await matchTripId(to);
            await setToEditMode();
        }
    },
    {
        path: '/edit/trip/:tripId/stage/:stageId',
        name: 'editStage',
        component: EditStage,
        beforeEnter: async (to: any) => {
            await matchTripId(to);
            await matchStageId(to);
            await setToEditMode();
        }
    },
    {
        path: '/edit/trip/:tripId/stage/:stageId/day/:dayId',
        name: 'editDay',
        component: EditDay,
        beforeEnter: async (to: any) => {
            await matchTripId(to);
            await matchStageId(to);
            await matchDayId(to);
            await setToEditMode();
        }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

async function setToEditMode(): Promise<void> {
    const tripStore = useTripStore();
    tripStore.setToEditMode();
}

async function setToNormalMode(): Promise<void> {
    const tripStore = useTripStore();
    tripStore.setToNormalMode();
}

async function matchTripId(to: any): Promise<void> {
    const tripStore = useTripStore();
    if (tripStore.currentTrip.id === -1) {
        await tripStore.browseCurrentTrip(to.params.tripId);
        await tripStore.browseTrips();
    }
}

async function matchStageId(to: any): Promise<void> {
    const stageStore = useStageStore();
    if (stageStore.currentStage.id === -1) {
        await stageStore.browseCurrentStage(to.params.stageId);
        await stageStore.browseStages();
    }
}
async function matchDayId(to: any): Promise<void> {
    const dayStore = useDayStore();
    if (dayStore.currentDay.id === -1) {
        await dayStore.browseCurrentDay(to.params.dayId);
        await dayStore.browseDays();
    }
}

export default router;