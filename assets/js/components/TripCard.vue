<script setup lang="ts">
    import { useRouter } from 'vue-router';
    import type { Trip } from '@/js/types/types'
    import { useTripStore } from '@/js/stores/TripStore';
    import editIcon from '@/icons/edit_icon.svg';

    defineProps<{ trip: Trip }>()

    const router = useRouter();
    const tripStore = useTripStore();

    async function changeCurrentTrip(trip: Trip) {
        await tripStore.browseCurrentTrip(trip.id);
        router.push({ name: 'editTrip', params: { tripId: tripStore.getCurrentTrip.value.id } });
    }
</script>

<template>
    <div :class="$style.card">
        <div 
            :class="$style.editButton"
            @click="changeCurrentTrip(trip)"
        >
            <editIcon/>
        </div>
        <div :class="$style.tripName">
            {{ trip.name }}
        </div>
        <div :class="$style.tripStats">
            <div>
                > {{ trip.tripStages.length }} étapes
            </div>
            <div>
                > ## photos
            </div>
            <div>
                > ## catégories bonus
            </div>
        </div>
    </div>
</template>

<style module>
    .card {
        position:relative;

        display: grid;
        grid-template-rows: auto;
        align-content: space-between;
        width: 300px;
        height: 150px;

        padding: 7px;
        box-sizing: border-box;

        background-image: url('https://media.routard.com/image/35/0/fb-slovenie.1585350.jpg');
        border: 3px solid #FFFFFF;
        border-radius: 25px;
    }
    .tripName {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        padding: 0px 0px 0px 10px;

        width: 200px;
        height: 30px;

        background: #FF5470;
        border-radius: 10px;

        font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        font-size: 20px;
        font-weight: 700;
        line-height: 23px;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        text-align: left;
        color: #FFFFFF;
    }
    .editButton {
        display: grid;
        align-items: center;
        justify-items: center;

        position: absolute;
        box-sizing: border-box;

        top: -3px;
        right: -3px;
        width: 60px;
        height: 40px;

        background-color: #FFEFD5;
        box-shadow: -1px 1px 0px 2px rgba(0, 0, 0, 0.25);
        border-radius: 10px 25px;

        cursor: pointer;
    }
    .tripStats {
        display: grid;
        grid-template-rows: auto;
        align-content: space-evenly;

        height: 80px;
        padding: 5px 10px;

        background: rgba(77, 75, 144, 0.85);
        border-radius: 10px;

        font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        font-size: 16px;
        font-weight: 700;
        line-height: 19px;
        letter-spacing: 0.1em;
        text-align: left;
        color: #FFFFFF;
    }
</style>