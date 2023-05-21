export {}

import { defineStore } from 'pinia';

import { fetchPictures } from '@/js/services/picture-service';
import type { Picture } from '@/js/types/types';

export const usePictureStore = defineStore('Picture', {
    state: () => {
        return {
            pictures: {} as Array<Picture>,
        };
    },
    getters: {
        getPictures(state) {
            return state.pictures;
        }
    },
    actions: {
        async browsePictures(dayId: any) {
            let dayIri: string = 'api/trip_days/' + dayId;
            try {
                const response = await fetchPictures(dayIri);
                this.pictures = response.data['hydra:member'];
            } catch (error) {
                console.log('Something went wrong during pictures loading');
            }
        },
    }
});