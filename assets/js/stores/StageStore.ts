export {}

import { defineStore } from 'pinia';

import { fetchStages, fetchStage, updateStage } from '@/js/services/stage-service';
import type { TripStage } from '@/js/types/types';

export const useStageStore = defineStore('Stage', {
    state: () => {
        return {
            stages: {} as Array<TripStage>,
            currentStage: {} as TripStage,
            tempStageName: '' as string
        };
    },
    getters: {
        getStages(state) {
            return state.stages;
        }
    },
    actions: {
        async browseStages(tripId: any) {
            let tripIri: string = 'api/trips/' + tripId;
            try {
                const response = await fetchStages(tripIri);
                this.stages = response.data['hydra:member'];
            } catch (error) {
                console.log('Something went wrong during stages loading');
            }
        },
        async browseCurrentStage(id: any) {
            try {
                const response = await fetchStage(id);
                this.currentStage = response.data;
                this.tempStageName = this.currentStage.name;
            } catch (error) {
                console.log('Something went wrong during the stage loading');
            }
        },
        async updateCurrentStage() {
            try {
                const response = await updateStage(this.currentStage['@id'], this.currentStage);
                this.currentStage = response.data;
                this.tempStageName = this.currentStage.name;
                
                let currentTripId = this.currentStage.trip.replace('/api/trips/','');
                this.browseStages(currentTripId);
            } catch (error) {
                console.log('Something went wrong during the stage update');
            }
        },
    }
});