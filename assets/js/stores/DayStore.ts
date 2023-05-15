export {}

import { defineStore } from 'pinia';

import { fetchDays } from '@/js/services/day-service';
import type { TripDay } from '@/js/types/types';

export const useDayStore = defineStore('Day', {
    state: () => {
        return {
            days: {} as Array<TripDay>,
            currentStage: {} as TripDay,
            tempDayName: '' as string
        };
    },
    getters: {
        getDays(state) {
            return state.days;
        }
    },
    actions: {
        async browseDays(stageId: any) {
            let stageIri: string = 'api/trip_stages/' + stageId;
            try {
                const response = await fetchDays(stageIri);
                this.days = response.data['hydra:member'];
            } catch (error) {
                console.log('Something went wrong during days loading');
            }
        },
    }
});