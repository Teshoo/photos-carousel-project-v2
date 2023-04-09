<template>
    <div :class="$style.container">
        <div 
            :class="$style.tripEdit"
            v-if="currentTrip"
        >
            <div :class="$style.titles">
                Trip : 
            </div>
            <input 
                :class="$style.tripNameInput"
                type="text"
                placeholder="trip name"
                v-model="currentTrip.name" 
            />
            <button
                :class="{
                    [$style.tripNameButton]: true,
                    [$style.tripNameButtonActive]: tempTripName !== currentTrip.name, 
                    [$style.tripNameButtonInactive]: tempTripName === currentTrip.name,
                }"
                type="submit"
                @click="
                    currentTrip.name !== tempTripName ? updateCurrentTrip : null, 
                    tempTripName = currentTrip.name
                "
            >
                Save
            </button>
        </div>
        <div 
            :class="$style.stagesContainer"
            v-if="currentTrip"
        >
            <div :class="$style.titles">
                Trip's stages : 
            </div>
            <div v-for="stage in tripStages">
                <EditStageCard :tripStage="stage"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import { mapState, mapStores, mapActions } from 'pinia';
    import { useTripStore } from '@/js/stores/TripStore';
    import { useStageStore } from '@/js/stores/StageStore';
    import EditStageCard from '@/js/components/edit/EditStageCard.vue';

    export default defineComponent({
        name: 'EditTrip',
        components: {
            EditStageCard,
        },
        created() {
            this.$watch(
                () => this.$route.params,
                () => {
                    this.TripStore.browseCurrentTrip(this.$route.params.tripId);
                    this.StageStore.browseTripStages(this.$route.params.tripId);
                },
                { immediate: true }
            )
        },
        computed: {
            ...mapState(useTripStore, ['currentTrip', 'tempTripName']),
            ...mapStores(useTripStore),
            ...mapActions(useTripStore, ['updateCurrentTrip']),
            ...mapState(useStageStore, ['tripStages']),
            ...mapStores(useStageStore),
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