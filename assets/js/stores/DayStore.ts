export {}

import { computed, ref, type Ref } from 'vue';
import { defineStore } from 'pinia';
import type { TripDay } from '@/js/types/types';
import { useStageStore } from './StageStore';
import { fetchDays, fetchDay, createDay, updateDay, deleteDay } from '@/js/services/day.service';

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
    const getDays = computed<Ref<TripDay[]>>(() => days);
    const getCurrentDay = computed<Ref<TripDay>>(() => currentDay);

    // ACTIONS
    async function browseDays(): Promise<void> {
        days.value = await fetchDays(stageStore.getCurrentStage.value.id);
    }

    async function browseCurrentDay(id: number): Promise<void> {
        if (currentDay.value.id === -1 || id !== currentDay.value.id) {
            currentDay.value = await fetchDay(id);
        }
    }

    async function newDay(day: TripDay): Promise<void> {
        await createDay(day).then(browseDays);
    }

    async function editDay(day: TripDay): Promise<void> {
        await updateDay(day).then(browseDays);
    }

    async function updateCurrentDay(day: TripDay): Promise<void> {
        currentDay.value = await updateDay(day);
        browseDays();
    }

    async function removeDay(day: TripDay): Promise<void> {
        await deleteDay(day).then(browseDays);
    }
    
    return { days, currentDay, getDays, getCurrentDay, browseDays, browseCurrentDay, newDay, editDay, updateCurrentDay, removeDay }
});