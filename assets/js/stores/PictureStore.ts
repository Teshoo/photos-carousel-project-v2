export {}

import { computed, ref, type Ref } from 'vue';
import { defineStore } from 'pinia';
import type { Picture } from '@/js/types/types';
import { useDayStore } from './DayStore';
import { createPicture, deletePicture, fetchPictures, updatePicture } from '@/js/services/picture.service';

export const usePictureStore = defineStore('Picture', () => {
    const dayStore = useDayStore();

    // STATES
    const pictures: Ref<Picture[]> = ref([]);

    // GETTERS
    const getPictures = computed<Ref<Picture[]>>(() => pictures);
    
    // ACTIONS
    async function browsePictures(): Promise<void> {
        pictures.value = await fetchPictures(dayStore.getCurrentDay.value.id);
    }

    async function newPicture(picture: Picture, imageFile: File): Promise<void> {
        await createPicture(picture, imageFile).then(browsePictures);
    }

    async function replacePicture(picture: Picture, imageFile: File): Promise<void> {
        await createPicture(picture, imageFile);
        await removePicture(picture).then(browsePictures);
    }

    async function editPicture(picture: Picture): Promise<void> {
        await updatePicture(picture).then(browsePictures);
    }

    async function removePicture(picture: Picture): Promise<void> {
        await deletePicture(picture).then(browsePictures);
    }

    return { pictures, getPictures, browsePictures, newPicture, replacePicture, editPicture, removePicture }
});