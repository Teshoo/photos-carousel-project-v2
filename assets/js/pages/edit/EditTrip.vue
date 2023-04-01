<template>
    <div :class="$style.container">
        <div :class="$style.title">
            Etape : {{ trip.name }}
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import type { PropType } from 'vue';
    import { fetchTrip } from '@/js/services/trip-service';
    import { fetchStages } from '@/js/services/stage-service';
    import TripCard from '@/js/components/TripCard.vue';
    import newTripIcon from '@/icons/new_trip_icon.svg';

    interface Trip {
        '@id': string,
        id: number,
        name: string,
        tripStages: Array<string>,
        extras: Array<string>,
    }

    export default defineComponent({
        name: 'TripList',
        components: {
            TripCard,
            newTripIcon,
        },
        prop: {
            trips: {
                    type: Object as PropType<Trip>,
                    required: true,
                }
        },
        data() {
            return {
                trip: {} as Trip,
            }
        },
        created() {
            this.browseTrip();
        },
        methods: {
            async browseTrip() {
                try {
                    const response = await fetchTrip(1);
                    this.trip = response.data['hydra:member'];
                } catch (error) {
                    console.log('Something went wrong during the trip loading');
                }
            },
            async browseStages() {
                try {
                    const response = await fetchStages('');
                    this.trip = response.data['hydra:member'];
                } catch (error) {
                    console.log('Something went wrong during the trip loading');
                }
            }
        },
    });
</script>

<style module>
</style>