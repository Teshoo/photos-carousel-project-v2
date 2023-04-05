<template>
    <div :class="$style.container">
        <div :class="$style.title">
            VOYAGES :
        </div>
        <div :class="$style.tripCards">
            <div
                v-for="trip in trips"
            >
                <trip-card :trip="trip" :key="trip[`@id`]"/> 
            </div>
            <div 
                :class="$style.newTripCard"
                @click="addTrip"
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

<script lang="ts">
    import { defineComponent } from 'vue';
    import { fetchTrips, addTrip } from '@/js/services/trip-service';
    import type { Trip } from '@/js/types/types';
    import TripCard from '@/js/components/TripCard.vue';
    import newTripIcon from '@/icons/new_trip_icon.svg';
    import newTripHoverIcon from '@/icons/new_trip_hover_icon.svg';

    export default defineComponent({
        name: 'TripList',
        components: {
            TripCard,
            newTripIcon,
            newTripHoverIcon,
        },
        data() {
            return {
                trips: {} as Array<Trip>,
                newTrip: {} as Trip,
                hover: false as Boolean,
            }
        },
        created() {
            this.displayTrips();
        },
        methods: {
            async displayTrips() {
                try {
                    const response = await fetchTrips();
                    this.trips = response.data['hydra:member'];
                } catch (error) {
                    console.log('Something went wrong during trips loading');
                }
            },
            async addTrip() {
                try {
                    const response = await addTrip();
                    this.newTrip = response.data;
                    this.trips.push(this.newTrip);
                } catch (error) {
                    console.log('Something went wrong during the trip creation');
                }
            }
        },
    });
</script>

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
</style>