<template>
    <div :class="$style.container">
        <div 
            :class="$style.stageEdit"
            v-if="currentStage"
        >
            <div :class="$style.titles">
                Stage: 
            </div>
            <input 
                :class="$style.stageNameInput"
                type="text"
                placeholder="stage name"
                v-model="currentStage.name" 
            />
            <button
                :class="{
                    [$style.stageNameButton]: true,
                    [$style.stageNameButtonActive]: tempStageName !== currentStage.name, 
                    [$style.stageNameButtonInactive]: tempStageName === currentStage.name,
                }"
                type="submit"
                @click="
                    currentStage.name !== tempStageName ? updateCurrentStage : null, 
                    tempStageName = currentStage.name
                "
            >
                Save
            </button>
        </div>
        <div 
            :class="$style.daysContainer"
            v-if="currentStage"
        >
            <div :class="$style.titles">
                Stage's days: 
            </div>
            <div v-for="day in days">
                <EditDayCard :tripDay="day"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import { mapState, mapStores, mapActions } from 'pinia';
    import { useStageStore } from '@/js/stores/StageStore';
    import { useDayStore } from '@/js/stores/DayStore';
    import EditDayCard from '@/js/components/edit/EditDayCard.vue';

    export default defineComponent({
        name: 'EditStage',
        components: {
            EditDayCard,
        },
        created() {
            this.$watch(
                () => this.$route.params,
                () => {
                    this.StageStore.browseCurrentStage(this.$route.params.stageId);
                    this.DayStore.browseDays(this.$route.params.stageId);
                },
                { immediate: true }
            )
        },
        computed: {
            ...mapState(useStageStore, ['currentStage', 'tempStageName']),
            ...mapStores(useStageStore),
            ...mapActions(useStageStore, ['updateCurrentStage']),
            ...mapState(useDayStore, ['days']),
            ...mapStores(useDayStore),
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
    .stageEdit {
        display: grid;
        grid-template-columns: auto auto auto;
        justify-content: start;
        align-items: center;
        gap: 20px;
    }
    .stageNameInput {
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
    .stageNameInput:focus {
        outline: 5px solid #7C7AEA;
    }
    .stageNameButton {
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
    .stageNameButtonActive {
        background: #7C7AEA;
        color: #FFFFFF;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        cursor: pointer;
    }
    .stageNameButtonInactive {
        background: rgba(124, 122, 234, 0.5);
        color: rgba(255, 255, 255, 0.5);
    }
    .daysContainer {
        display: grid;
        grid-template-columns: 1fr;
        gap: 30px;
    }
</style>