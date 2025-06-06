<script setup lang="ts">
    import { ref, watch, type Ref } from 'vue';
    import { useTripStore } from '@/js/stores/TripStore';
    import { useStageStore } from '@/js/stores/StageStore';
    import StageCard from '@/js/components/StageCard.vue';

    const tripStore = useTripStore();
    const stageStore = useStageStore();
    const areStagesLoading: Ref<boolean> = ref(true);

    browseStages();

    // METHODS
    
    function browseStages(): void {
        stageStore.browseStages().then(() => areStagesLoading.value = false);
    }

    watch(
        () => tripStore.getCurrentTrip.value,
        () => { 
            areStagesLoading.value = true;
            browseStages();
        }
    );

</script>
<template>
    <div :class="$style.container">
        <div :class="$style.title">
            {{ tripStore.getCurrentTrip.value.name.toUpperCase() }}
        </div>
        <div v-if="areStagesLoading"
            :class="$style.loading"
        >
            Loading...
        </div>
        <div v-if="!areStagesLoading"
            :class="$style.stagesContainer"
        >
            <div :class="$style.stageCards">
                <div v-for="stage in stageStore.getStages.value">
                    <stage-card
                        :stage="stage"
                        :key="stage.id"
                    /> 
                </div>
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

    .title {
        font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        font-size: 24px;
        font-weight: 700;
        line-height: 28px;
        letter-spacing: 0.1em;
        text-align: left;
        color: #FFEFD5;
    }

    .stagesContainer {
        display: grid;
        grid-template-columns: 1fr 1fr;
        justify-content: space-between;
        justify-items: center;
        gap: 20px;
    }

    .stageCards {
        display: grid;
        grid-template-columns: 1fr;
        gap: 15px;
    }

    .loading {
        display: grid;
        grid-template-columns: 1fr;
        justify-items: center;

        font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        font-size: 24px;
        font-weight: 700;
        line-height: 28px;
        letter-spacing: 0.1em;
        text-align: left;
        color: #FFF;
    }
</style>