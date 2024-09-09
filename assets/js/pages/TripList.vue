<script setup lang="ts">
    import { ref, type Ref } from 'vue';
    import type { Trip } from '@/js/types/types';
    import { useTripStore } from '@/js/stores/TripStore';
    import { createNewTrip } from '@/js/pages/TripList.service';
    import TripCard from '@/js/components/TripCard.vue';
    import newTripIcon from '@/icons/new_trip_icon.svg';
    import newTripHoverIcon from '@/icons/new_trip_hover_icon.svg';

    let trips: Ref<Trip[]>;
    let hover: Ref<Boolean> = ref(false);
    let loading: Ref<Boolean> = ref(true);
    let loadingNewTrip: Ref<Boolean> = ref(false);

    const tripStore = useTripStore();

    browseTrips();

    async function browseTrips() {
        await tripStore.browseTrips();
        trips = tripStore.getTrips;
        loading.value = false;
    }

    async function addNewTrip() {
        trips.value = await createNewTrip(trips.value);
        loadingNewTrip.value = false;
    }

</script>

<template>
    <div :class="$style.container">
        <div :class="$style.title">
            VOYAGES :
        </div>
        <div v-if="loading === true" :class="$style.loading">
            Loading...
        </div>
        <div v-if="loading === false" :class="$style.tripCards">
            <div
                v-for="trip in trips"
            >
                <trip-card :trip="trip" :key="trip.id"/> 
            </div>
            <div v-if="loadingNewTrip === true" :class="$style.newTripCard">
                <div :class="$style.loading">
                    Creating...
                </div>
            </div>
            <div 
                :class="$style.newTripCard"
                @click="loadingNewTrip = true; addNewTrip()"
                @mouseover="hover = true"
                @mouseleave="hover = false"
            >
                <div v-if="hover === false">
                    <newTripIcon/>
                </div>
                <div v-if="hover === true">
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