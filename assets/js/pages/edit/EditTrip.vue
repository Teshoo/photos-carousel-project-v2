<script setup lang="ts">
    import { computed, ref, watch, type Ref } from 'vue';
    import router from '@/js/router';
    import type { Trip, TripStage } from '@/js/types/types';
    import { useTripStore } from '@/js/stores/TripStore';
    import { useStageStore } from '@/js/stores/StageStore';
    import EditStageCard from '@/js/components/edit/EditStageCard.vue';
    import { cloneTrip } from '@/js/services/trip.service';
    import ActionButton from '@/js/components/core/buttons/ActionButton.vue';
    import newStageIcon from '@/icons/new_stage_icon.svg';
    import newStageHoverIcon from '@/icons/new_stage_hover_icon.svg';

    const tripStore = useTripStore();
    const stageStore = useStageStore();

    const tripToEdit: Ref<Trip> = ref(cloneCurrentTrip());
    const isLoading: Ref<boolean> = ref(true);
    const isHovering: Ref<boolean> = ref(false);
    const isStageCreating:Ref<boolean>= ref(false);
    const emptyStage: Ref<TripStage> = ref({
        id: -1,
        name: '',
        lat: '',
        lng: '',
        trip: '/api/trips/' + tripToEdit.value.id,
        tripDays: []
    });

    const isTripModified = computed<boolean>(
        () => JSON.stringify(tripStore.getCurrentTrip.value) !== JSON.stringify(tripToEdit.value)
    );
    const hasStages = computed<boolean>(
        () => stageStore.getStages.value.length !== 0
    );

    // METHODS //

    browseStages();

    function browseStages(): void {
        stageStore.browseStages().then(() => isLoading.value = false);
    }

    function cloneCurrentTrip(): Trip {
        return cloneTrip(tripStore.getCurrentTrip.value);
    }

    function updateCurrentTrip(): void {
        if (tripStore.getCurrentTrip.value.name !== tripToEdit.value.name) {
            tripStore.updateCurrentTrip(tripToEdit.value);
        }
    }

    function deleteCurrentTrip(): void {
        if (!hasStages.value) {
            tripStore.removeTrip(tripToEdit.value);
            router.push({ name: 'tripList' });
        }
    }

    function stagesSortedByName(): TripStage[] {
        return stageStore.getStages.value.sort((a, b) => (a.name > b.name) ? 1 : -1);
    }

    watch(
        () => tripStore.getCurrentTrip.value,
        () => { 
            isStageCreating.value = false;
            tripToEdit.value = cloneCurrentTrip();
            emptyStage.value.trip = '/api/trips/' + tripToEdit.value.id;
            browseStages();
        }
    );
</script>

<template>
    <div v-if="tripStore.getCurrentTrip"
        :class="$style.container"
    >
        <div :class="$style.tripEdit">
            <div :class="$style.titles">
                Trip
            </div>
            <input 
                :class="$style.tripNameInput"
                type="text"
                placeholder="trip name"
                v-model="tripToEdit.name" 
            />
            <div :class="$style.buttonsContainer">
                <ActionButton  
                    :name="'Save'"
                    :btn-type="'save'"
                    :disabled="!isTripModified"
                    @click="updateCurrentTrip()"
                />
                <ActionButton
                    :name="'Delete'"
                    :btn-type="'delete'"
                    :disabled="hasStages"
                    @click="deleteCurrentTrip()"
                />
            </div>
        </div>
        <div v-if="isLoading === false"
            :class="$style.stagesContainer"
        >
            <div :class="$style.titles">
                Stages ({{ stageStore.getStages.value.length }}) 
            </div>
            <EditStageCard v-for="(stage, index) in stagesSortedByName()"
                :key="stage.id"
                :index="index"
                :stage="stage"
            />
            <EditStageCard v-if="isStageCreating"
                :key="tripStore.getCurrentTrip.value.id"
                :stage="emptyStage"
                @no-stage-creating="isStageCreating = false"
            />
            <div v-if="!isStageCreating"
                :class="$style.newStageContainer"
            >
                <div
                    :class="$style.newStageButton"
                    @click="isStageCreating = true, isHovering = false"
                    @mouseover="isHovering = true"
                    @mouseleave="isHovering = false"
                >
                    <div v-if="!isHovering">
                        <newStageIcon />
                    </div>
                    <div v-if="isHovering">
                        <newStageHoverIcon />
                    </div>
                </div>
                <div :class="$style.newStageShadowButtons"></div>
            </div> 
        </div>
    </div>
</template>

<style module>
    .container {
        display: grid;
        grid-template-columns: auto;
        gap: 50px;
        margin: 45px 20% 45px 20%;
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
        font-weight: 500;
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
    .buttonsContainer {
        display: grid;
        grid-template-columns: 1fr 1fr;
        align-content: center;
        gap: 10px;

        width: 100px;
    }
    .stagesContainer {
        display: grid;
        grid-template-columns: 1fr;
        gap: 30px;
    }
    .newStageContainer {
        display: grid;
        grid-template-columns: auto auto;
        justify-items: center;
        justify-content: center;
        align-items: center;
        gap: 20px;
    }
    .newStageButton {
        cursor: pointer;
    }
    .newStageShadowButtons {
        height: 100px;
        width: 100px;
    }
</style>