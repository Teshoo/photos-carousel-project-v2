export {}

import { defineStore } from 'pinia';

import { fetchStages } from '@/js/services/stage-service';
import type { TripStage } from '@/js/types/types';

export const useStageStore = defineStore('Stage', {
    state: () => {
        return {
            tripStages: {} as Array<TripStage>,
            currentTrip: {} as TripStage,
            tempTripStageName: '' as string
        };
    },
    getters: {
        getTrips(state) {
            return state.tripStages;
        }
    },
    actions: {
        async browseTripStages(tripId: any) {
            let tripIri: string = 'api/trips/' + tripId;
            try {
                const response = await fetchStages(tripIri);
                this.tripStages = response.data['hydra:member'];
            } catch (error) {
                console.log('Something went wrong during stages loading');
            }
        },
        /*async browseCurrentTripStage(id: any) {
            try {
                const response = await fetchTripStage(id);
                this.currentTripStageName = response.data;
                this.tempTripStageName = this.currentTripStage.name;
            } catch (error) {
                console.log('Something went wrong during the stage loading');
            }
        },
        async updateCurrentTripStage() {
            try {
                const response = await updateTripStage(this.currentTripStage['@id'], this.currentTripStage);
                this.currentTripStage = response.data;
                this.tempTripStageName = this.currentTripStage.name;
                this.browseTripStages();
            } catch (error) {
                console.log('Something went wrong during the stage update');
            }
        },*/
    }
});