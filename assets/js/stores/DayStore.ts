export {}

import { defineStore } from 'pinia';

import { fetchDays, fetchDay, updateDay } from '@/js/services/day-service';
import type { TripDay } from '@/js/types/types';

export const useDayStore = defineStore('Day', {
    state: () => {
        return {
            days: {} as Array<TripDay>,
            currentDay: {} as TripDay,
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
        async browseCurrentDay(id: any) {
            try {
                const response = await fetchDay(id);
                this.currentDay = response.data;
                this.tempDayName = this.currentDay.name;
            } catch (error) {
                console.log('Something went wrong during the stage loading');
            }
        },
        async updateCurrentDay() {
            try {
                const response = await updateDay(this.currentDay['@id'], this.currentDay);
                this.currentDay = response.data;
                this.tempDayName = this.currentDay.name;
                
                let currentStageId = this.currentDay.tripStage.replace('/api/trip_stages/','');
                this.browseDays(currentStageId);
            } catch (error) {
                console.log('Something went wrong during the stage update');
            }
        },
    }
});