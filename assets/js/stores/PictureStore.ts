export {}

import { computed, ref, type Ref } from 'vue';
import { defineStore } from 'pinia';
import type { Picture } from '@/js/types/types';
import { useDayStore } from '@/js/stores/DayStore';
import { createPicture, deletePicture, fetchPictures, updatePicture } from '@/js/services/picture.service';

export const usePictureStore = defineStore('Picture', () => {
    const dayStore = useDayStore();

    // STATES
    const pictures: Ref<Picture[]> = ref([]);
    const allStagePictures: Ref<[Picture[]]> = ref([[]]);
    const currentPicture: Ref<Picture> = ref({
        id: -1,
        name: '',
        lng: '',
        lat: '',
        shotTime: '',
        imageName: '',
        tripDay: '',
        extras: []
    });

    // GETTERS
    const getPictures = computed<Ref<Picture[]>>(() => pictures);
    const getAllStagePictures = computed<Ref<[Picture[]]>>(() => allStagePictures);
    const getCurrentPicture = computed<Ref<Picture>>(() => currentPicture);
    
    // ACTIONS
    async function browsePictures(): Promise<void> {
        pictures.value = await fetchPictures(dayStore.getCurrentDay.value.id);
    }

    async function browseAllStagePictures(): Promise<void> {
        let allPictures$!: [Picture[]];

        await dayStore.getDays.value.reduce(async (promise, day) => {
            await promise;
            const pictures = await fetchPictures(day.id);
            if (!allPictures$) {
                allPictures$ = [pictures];
            } else  {
                allPictures$.push(pictures);
            }
        }, Promise.resolve());

        allStagePictures.value = allPictures$;
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

    function changeCurrentPicture(picture: Picture): void {
        currentPicture.value = picture;
    }

    return { pictures, getPictures, getAllStagePictures, getCurrentPicture, browsePictures, browseAllStagePictures, newPicture, replacePicture, editPicture, removePicture, changeCurrentPicture }
});