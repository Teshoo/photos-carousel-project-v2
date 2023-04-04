<template>
    <div :class="$style.container">
        <div 
            :class="$style.tripEdit"
            v-if="trip"
        >
            Trip : 
            <input 
                :class="$style.tripNameInput"
                type="text"
                placeholder="trip name"
                v-model="trip.name" 
            />
            <button
                :class="{
                    [$style.tripNameButton]: true,
                    [$style.tripNameButtonActive]: tempTripName !== trip.name, 
                    [$style.tripNameButtonInactive]: tempTripName === trip.name,
                }"
                type="submit"
                @click="
                    trip.name !== tempTripName ? updateTrip(trip[`@id`]) : null, 
                    tempTripName = trip.name
                "
            >
                Save
            </button>
        </div>
        <div v-if="trip">
            
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import type { PropType } from 'vue';
    import { fetchTrip, updateTrip } from '@/js/services/trip-service';
    import { fetchStages } from '@/js/services/stage-service';
    import TripCard from '@/js/components/TripCard.vue';
    import newTripIcon from '@/icons/new_trip_icon.svg';

    interface Trip {
        '@context': string,
        '@id': string,
        '@type': string,
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
                tempTripName: '' as string
            }
        },
        created() {
            this.$watch(
                () => this.$route.params,
                () => {
                    this.browseTrip(this.$route.params.id)
                },
                { immediate: true }
            )
        },
        methods: {
            async browseTrip(id: any) {
                try {
                    const response = await fetchTrip(id);
                    this.trip = response.data;
                    this.tempTripName = this.trip.name;
                } catch (error) {
                    console.log('Something went wrong during the trip loading');
                }
            },
            /*async browseStages() {
                try {
                    const response = await fetchStages('');
                    this.trip = response.data['hydra:member'];
                } catch (error) {
                    console.log('Something went wrong during the trip loading');
                }
            }*/
            async updateTrip(iri: string) {
                try {
                    console.log(this.trip);
                    const response = await updateTrip(iri, this.trip);
                    this.trip = response.data;
                    this.tempTripName = this.trip.name;
                    console.log(this.trip);
                } catch (error) {
                    console.log('Something went wrong during the trip update');
                }
            },
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
    .tripEdit {
        display: grid;
        grid-template-columns: auto auto auto;
        justify-content: start;
        align-items: center;
        gap: 20px;

        font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        font-size: 24px;
        font-weight: 700;
        line-height: 28px;
        letter-spacing: 0.1em;
        color: #FFEFD5;
    }
    .tripNameInput {
        font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        font-size: 24px;
        font-weight: 700;
        line-height: 28px;
        letter-spacing: 0.1em;
        color: #383838;
        
        height: 40px;
        width: 200px;
        background-color: #FFEFD5;

        border-radius: 10px;
        border: none;
        box-sizing: border-box;
        padding: 10px;
    }
    .tripNameInput:focus {
        outline: 5px solid #7C7AEA;
        
    }
    .tripNameButton {
        display: grid;
        grid-template-columns: 1fr;
        align-items: center;
        justify-items: center;
        gap: 10px;

        width: 100px;
        height: 35px;

        border: none;
        border-radius: 20px;
        
        box-sizing: border-box;

        font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        line-height: 19px;
        letter-spacing: 0.1em;
    }
    .tripNameButtonActive {
        background: #7C7AEA;
        color: #FFFFFF;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        cursor: pointer;
    }
    .tripNameButtonInactive {
        background: rgba(124, 122, 234, 0.5);
        color: rgba(255, 255, 255, 0.5);
    }
</style>