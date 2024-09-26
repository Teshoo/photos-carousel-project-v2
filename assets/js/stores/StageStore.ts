export {}

import { computed, ref, type Ref } from 'vue';
import { defineStore } from 'pinia';
import type { TripStage } from '@/js/types/types';
import { useTripStore } from '@/js/stores/TripStore';
import { fetchStages, fetchStage, createStage, updateStage, deleteStage } from '@/js/services/stage.service';

export const useStageStore = defineStore('Stage', () => {
    const tripStore = useTripStore();

    // STATE
    const stages: Ref<TripStage[]> = ref([]);
    const currentStage: Ref<TripStage> = ref({
        id: -1,
        name: '',
        lng: '',
        lat: '',
        trip: '',
        tripDays: []
    });

    // GETTERS
    const getStages = computed<Ref<TripStage[]>>(() => stages);
    const getCurrentStage = computed<Ref<TripStage>>(() => currentStage);

    // ACTIONS
    async function browseStages() {
        stages.value = await fetchStages(tripStore.getCurrentTrip.value.id);
    }

    async function browseCurrentStage(id: number) {
        if (currentStage.value.id === -1 || id !== currentStage.value.id) {
            currentStage.value = await fetchStage(id);
        }
    }

    async function newStage(stage: TripStage) {
        await createStage(stage).then(browseStages);
    }

    async function editStage(stage: TripStage) {
        await updateStage(stage).then(browseStages);
    }

    async function updateCurrentStage(stage: TripStage) {
        currentStage.value = await updateStage(stage);
        browseStages();
    }

    async function removeStage(stage: TripStage): Promise<void> {
        await deleteStage(stage).then(browseStages);
    }

    return { stages, currentStage, getStages, getCurrentStage, browseStages, browseCurrentStage, newStage, editStage, updateCurrentStage, removeStage }
});