<script setup lang="ts">
    import { ref, watch, type Ref } from 'vue';
    import { useTripStore } from '@/js/stores/TripStore';
    import { useStageStore } from '@/js/stores/StageStore';
    import EditStageCard from '@/js/components/edit/EditStageCard.vue';
    import { cloneTrip } from '@/js/services/trip.service';
    import type { Trip } from '@/js/types/types';

    const tripStore = useTripStore();
    const stageStore = useStageStore();

    const tripToEdit: Ref<Trip> = ref(cloneCurrentTrip());
    const loading: Ref<Boolean> = ref(true);

    browseStages();

    function browseStages() {
        stageStore.browseStages().then(() => loading.value = false);
    }

    function cloneCurrentTrip() {
        return cloneTrip(tripStore.getCurrentTrip.value);
    }

    function updateCurrentTrip() {
        if (tripStore.getCurrentTrip.value.name !== tripToEdit.value.name) {
            tripStore.updateCurrentTrip(tripToEdit.value);
        }
    }

    watch(
        () => tripStore.getCurrentTrip.value,
        () => { 
            browseStages();
            tripToEdit.value = cloneCurrentTrip();
        }
    );
</script>

<template>
    <div 
        :class="$style.container" 
        v-if="tripStore.getCurrentTrip"
    >
        <div :class="$style.tripEdit">
            <div :class="$style.titles">
                Trip: 
            </div>
            <input 
                :class="$style.tripNameInput"
                type="text"
                placeholder="trip name"
                v-model="tripToEdit.name" 
            />
            <button
                :class="{
                    [$style.tripNameButton]: true,
                    [$style.tripNameButtonActive]: tripToEdit.name !== tripStore.getCurrentTrip.value.name, 
                    [$style.tripNameButtonInactive]: tripToEdit.name === tripStore.getCurrentTrip.value.name,
                }"
                type="submit"
                @click="updateCurrentTrip()"
            >
                Save
            </button>
        </div>
        <div :class="$style.stagesContainer">
            <div 
                :class="$style.titles"
                v-if="loading === false"
            >
                Stages: 
            </div>
            <div v-for="stage in stageStore.getStages.value">
                <EditStageCard :stage="stage"/>
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
    .titles {
        font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        font-size: 24px;
        font-weight: 700;
        line-height: 28px;
        letter-spacing: 0.1em;
        color: #FFEFD5;
    }
    .tripEdit {
        display: grid;
        grid-template-columns: auto auto auto;
        justify-content: start;
        align-items: center;
        gap: 20px;
    }
    .tripNameInput {
        font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        font-size: 24px;
        font-weight: 700;
        line-height: 28px;
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
    .stagesContainer {
        display: grid;
        grid-template-columns: 1fr;
        gap: 30px;
    }
</style>