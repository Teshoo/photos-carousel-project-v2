<script setup lang="ts">
    import { useRoute, useRouter } from 'vue-router';
    import type { Trip, TripStage, TripDay } from '@/js/types/types';
    import { useTripStore } from '@/js/stores/TripStore';
    import { useStageStore } from '@/js/stores/StageStore';
    import { useDayStore } from '@/js/stores/DayStore';
    import chevronbcUrl from '@/icons/chevron_breadcrumb.svg';
    import chevrondpnUrl from '@/icons/chevron_dropdownmenu.svg';
    import homeIcon from '@/icons/home_icon.svg';

    const route = useRoute();
    const router = useRouter();

    const tripStore = useTripStore();
    const stageStore = useStageStore();
    const dayStore = useDayStore();

    async function changeCurrentTrip(trip: Trip) {
        await tripStore.browseCurrentTrip(trip.id);
        router.push({ name: 'editTrip', params: { tripId: tripStore.getCurrentTrip.value.id }});
    }

    async function changeCurrentStage(stage: TripStage) {
        await stageStore.browseCurrentStage(stage.id);
        router.push({ name: 'editStage', params: { stageId: stageStore.getCurrentStage.value.id }});
    }

    async function changeCurrentDay(day: TripDay) {
        await dayStore.browseCurrentDay(day.id);
        router.push({ name: 'editDay', params: { dayId: dayStore.getCurrentDay.value.id }});
    }
</script>

<template>
    <div>
        <div :class="$style.headerMenu">
            <div>
                <router-link to="/">
                    <div :class="$style.homepageButton">
                        <div v-if="route.params.tripId">
                            <homeIcon/>
                        </div>
                        <div 
                            :class="$style.homepageButtonTitle" 
                            v-if="!(route.params.tripId)"
                        >
                            Picture Carousel
                        </div>
                    </div>
                </router-link>
            </div>
            <chevronbcUrl v-if="route.params.tripId"/>
            <div
                :class="$style.editingLabel" 
                v-if="route.params.tripId"
            >
                Editing
            </div>
            <chevronbcUrl v-if="route.params.tripId"/>
            <div
                v-if="route.params.tripId && stageStore.getCurrentStage.value.id" 
                :class="$style.dropdown"
            >
                <div :class="$style.dropbtn">
                    {{ tripStore.getCurrentTrip.value.name }}
                    <chevrondpnUrl/>
                </div>
                <div :class="$style.dropdownContent">
                    <div 
                        :class="$style.dropdownItem" 
                        v-for="trip in tripStore.getTrips.value" 
                        :key="trip.id" 
                        @click="changeCurrentTrip(trip)"
                    >
                        {{ trip.name }}
                    </div>
                </div>
            </div>
            <chevronbcUrl v-if="route.params.stageId"/>
            <div
                v-if="route.params.stageId" 
                :class="$style.dropdown"
            >
                <div :class="$style.dropbtn">
                    {{ stageStore.getCurrentStage.value.name }}
                    <chevrondpnUrl/>
                </div>
                <div :class="$style.dropdownContent">
                    <div 
                        :class="$style.dropdownItem" 
                        v-for="stage in stageStore.getStages.value" 
                        :key="stage.id" 
                        @click="changeCurrentStage(stage)"
                    >
                        {{ stage.name }}
                    </div>
                </div>
            </div>
            <chevronbcUrl v-if="route.params.dayId"/>
            <div
                v-if="route.params.dayId" 
                :class="$style.dropdown"
            >
                <div :class="$style.dropbtn">
                    {{ dayStore.getCurrentDay.value.name }}
                    <chevrondpnUrl/>
                </div>
                <div :class="$style.dropdownContent">
                    <div 
                        :class="$style.dropdownItem" 
                        v-for="day in dayStore.getDays.value" 
                        :key="day.id" 
                        @click="changeCurrentDay(day)"
                    >
                        {{ day.name }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style module>
    .headerMenu {
        display: flex;
        flex-direction: row;
        justify-content: start;
        align-items: center;
        gap: 20px;

        width: auto;
        height: 90px;
        padding-left: 10%;

        background-color: #FFAA1D;
    }
    .homepageButton {
        display: grid;
        grid-template-columns: auto;
        align-items: center;
        align-content: center;
        justify-items: center;
        justify-content: center;

        height: 50px;
        padding: 0px 10px 0px 10px;

        background-color: #FF5470;
        box-sizing: border-box;
        border: 3px solid #FFFFFF;
        border-radius: 15px;       
    }
    .homepageButtonTitle {
        font-family: 'Comic Sans MS';
        font-weight: 700;
        font-size: 25px;
        line-height: 35px;
        color: #FFFFFF; 
    }
    .editingLabel {
        font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        font-style: normal;
        font-weight: 700;
        font-size: 25px;
        line-height: 29px;
        letter-spacing: 0.1em;

        color: #FFFFFF;
    }
    .dropbtn {
        display: grid;
        grid-template-columns: auto auto;
        justify-content: space-between;
        align-items: center;
        padding: 10px 15px;
        gap: 10px;

        width: 250px;
        height: 50px;

        background: rgba(0, 0, 0, 0.2);

        border: 2px solid #FFEFD5;
        border-radius: 10px;
        box-sizing: border-box;
        
        cursor: pointer;

        font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        font-style: normal;
        font-weight: 700;
        font-size: 25px;
        line-height: 29px;
        color: #FFFFFF;
    }
    .dropdown {
        position: relative;
        display: inline-block;
    }
    .dropdownContent {
        display: none;
        position: absolute;

        background-color: #FFAA1D;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.4);

        width: 250px;
        
        border: 2px solid #FFEFD5;
        border-radius: 0px 0px 10px 10px;
        border-style: none solid solid solid;        
        box-sizing: border-box;

        cursor: pointer;

        z-index: 1;
    }
    .dropdownItem {
        display: grid;
        justify-content: flex-start;
        align-items: center;
        padding: 10px 15px;
        box-sizing: border-box;

        height: 50px;
        background: rgba(0, 0, 0, 0.2);

        font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 25px;
        line-height: 29px;
        color: #FFFFFF;
    }
    .dropdownItem:hover {
        background: rgba(0, 0, 0, 0.3);
    }
    .dropdown:hover .dropdownContent {
        display: block;
        box-sizing: border-box;
    }
    .dropdown:hover .dropbtn {
        background: rgba(0, 0, 0, 0.3);
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.4);
        border-style: solid solid none solid;
        border-radius: 10px 10px 0px 0px;
    }
</style>