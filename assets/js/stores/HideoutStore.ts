export {}

import { computed, ref, type Ref } from 'vue';
import { defineStore } from 'pinia';
import type { Hideout } from '@/js/types/types';
import { useTripStore } from '@/js/stores/TripStore';
import { fetchHideouts, createHideout, updateHideout, deleteHideout } from '@/js/services/hideout.service';

export const useHideoutStore = defineStore('Hideout', () => {
    const tripStore = useTripStore();

    // STATE
    const hideouts: Ref<Hideout[]> = ref([]);

    // GETTERS
    const getHideouts = computed<Ref<Hideout[]>>(() => hideouts);

    // ACTIONS
    async function browseHideouts() {
        hideouts.value = await fetchHideouts(tripStore.getCurrentTrip.value.id);
    }

    async function newHideout(hideout: Hideout) {
        await createHideout(hideout).then(browseHideouts);
    }

    async function editHideout(hideout: Hideout) {
        await updateHideout(hideout).then(browseHideouts);
    }

    async function removeHideout(hideout: Hideout): Promise<void> {
        await deleteHideout(hideout).then(browseHideouts);
    }

    return { hideouts, getHideouts, browseHideouts, newHideout, editHideout, removeHideout }
});