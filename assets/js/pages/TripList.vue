<script setup lang="ts">
    import { ref, type Ref } from 'vue';
    import type { Trip } from '@/js/types/types';
    import { useTripStore } from '@/js/stores/TripStore';
    import TripCard from '@/js/components/TripCard.vue';
    import newTripIcon from '@/icons/new_trip_icon.svg';
    import newTripHoverIcon from '@/icons/new_trip_hover_icon.svg';

    const tripStore = useTripStore();

    const isHovering: Ref<boolean> = ref(false);
    const isLoading: Ref<boolean> = ref(true);
    const isLoadingNewTrip: Ref<boolean> = ref(false);
    const newTrip: Ref<Trip> = ref({
        id: -1,
        name: 'New Trip',
        tripStages: [],
        extras: [],
        hideouts: []
    });

    browseTrips();

    // METHODS
    
    function browseTrips(): void {
        tripStore.browseTrips().then(() => isLoading.value = false);
    }

    async function createTrip(): Promise<void> {
        await tripStore.newTrip(newTrip.value);
        isLoadingNewTrip.value = false;
    }
</script>

<template>
    <div :class="$style.container">
        <div :class="$style.title">
            TRIPS
        </div>
        <div v-if="isLoading"
            :class="$style.loading"
        >
            Loading...
        </div>
        <div v-if="!isLoading"
            :class="$style.tripCards"
        >
            <div v-for="trip in tripStore.getTrips.value">
                <trip-card
                    :trip="trip"
                    :key="trip.id"
                /> 
            </div>
            <div v-if="isLoadingNewTrip"
                :class="$style.newTripCard"
            >
                <div :class="$style.loading">
                    Creating...
                </div>
            </div>
            <div 
                :class="$style.newTripCard"
                @click="isLoadingNewTrip = true; createTrip()"
                @mouseover="isHovering = true"
                @mouseleave="isHovering = false"
            >
                <div v-if="!isHovering">
                    <newTripIcon/>
                </div>
                <div v-if="isHovering">
                    <newTripHoverIcon/>
                </div>
            </div>
        </div>
    </div>
</template>

<style module>
    .container {
        display: grid;
        grid-template-columns: auto;
        gap: 50px;
        margin: 45px 20% 0 20%;
        box-sizing: border-box;
    }
    .title {
        font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        font-size: 24px;
        font-weight: 700;
        line-height: 28px;
        letter-spacing: 0.1em;
        text-align: left;
        color: #FFEFD5;
    }
    .tripCards {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        justify-content: space-evenly;
        justify-items: center;
        gap: 50px;
    }
    .newTripCard {
        display: grid;
        grid-template-rows: auto;
        justify-items: center;
        align-items: center;
        width: 300px;
        height: 150px;

        cursor: pointer;
    }
    .loading {
        display: grid;
        grid-template-columns: 1fr;
        justify-items: center;

        font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        font-size: 24px;
        font-weight: 700;
        line-height: 28px;
        letter-spacing: 0.1em;
        text-align: left;
        color: #FFF;
    }
</style>