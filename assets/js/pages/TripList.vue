<template>
    <div :class="$style.container">
        <div :class="$style.title">
            VOYAGES :
        </div>
        <div :class="$style.tripCards">
            <div
                v-for="trip in trips"
            >
                <trip-card :trip="trip" /> 
            </div>
            <div :class="$style.newTripCard">
                <newTripIcon/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import { fetchTrips } from '@/js/services/trip-service';
    import TripCard from '@/js/components/TripCard.vue';
    import newTripIcon from '@/icons/new_trip_icon.svg';

    export default defineComponent({
        name: 'TripList',
        components: {
            TripCard,
            newTripIcon,
        },
        data() {
            return {
                trips: [],
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
    }
    .newTripCard {
        display: grid;
        grid-template-rows: auto;
        justify-items: center;
        align-items: center;
        width: 300px;
        height: 150px;

    }
</style>