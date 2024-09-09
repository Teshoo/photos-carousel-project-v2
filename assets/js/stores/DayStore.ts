export {}

import { computed, ref, type Ref } from 'vue';
import { defineStore } from 'pinia';
import type { TripDay } from '@/js/types/types';
import { useStageStore } from './StageStore';
import { fetchDays, fetchDay, updateDay } from '@/js/services/day.service';

export const useDayStore = defineStore('Day', () => {
    const stageStore = useStageStore();

    // STATES
    const days: Ref<TripDay[]> = ref([]);
    const currentDay: Ref<TripDay> = ref({
        id: -1,
        name: '',
        date: '',
        startHideout: '',
        endHideout: '',
        tripStage: '',
        pictures: []
    })

    // GETTERS
    const getDays = computed(() => days);
    const getCurrentDay = computed(() => currentDay);

    // ACTIONS
    async function browseDays() {
        days.value = await fetchDays(stageStore.getCurrentStage.value.id);
    }

    async function browseCurrentDay(id: number) {
        if (currentDay.value.id === -1 || id !== currentDay.value.id) {
            currentDay.value = await fetchDay(id);
        }
    }

    async function editDay(day: TripDay) {
        await updateDay(day).then(browseDays);
    }

    async function updateCurrentDay(day: TripDay) {
        currentDay.value = await updateDay(day);
        browseDays();
    }
    
    return { days, currentDay, getDays, getCurrentDay, browseDays, browseCurrentDay, editDay, updateCurrentDay }
});