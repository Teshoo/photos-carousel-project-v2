export {}

import { computed, ref, type Ref } from 'vue';
import { defineStore } from 'pinia';
import type { Picture } from '@/js/types/types';
import { useDayStore } from './DayStore';
import { fetchPictures, updatePicture } from '@/js/services/picture.service';

export const usePictureStore = defineStore('Picture', () => {
    const dayStore = useDayStore();

    // STATES
    const pictures: Ref<Picture[]> = ref([]);

    // GETTERS
    const getPictures = computed(() => pictures);
    
    // ACTIONS
    async function browsePictures() {
        pictures.value = await fetchPictures(dayStore.getCurrentDay.value.id);
    }

    async function editPicture(picture: Picture) {
        await updatePicture(picture).then(browsePictures);
    }

    return { pictures, getPictures, browsePictures, editPicture }
});