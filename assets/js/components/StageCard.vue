<script setup lang="ts">
    import { useRouter } from 'vue-router';
    import type { TripStage } from '@/js/types/types'
    import { useStageStore } from '@/js/stores/StageStore';
    import editIcon from '@/icons/edit_icon.svg';

    defineProps<{ stage: TripStage }>()

    const router = useRouter();
    const stageStore = useStageStore();

    async function changeCurrentStage(stage: TripStage) {
        await stageStore.browseCurrentStage(stage.id);
        router.push({ name: 'dayList', params: { stageId: stageStore.getCurrentStage.value.id } });
    }
</script>

<template>
    <div 
        :class="$style.card"
        @click="changeCurrentStage(stage)"
    >
        <div :class="$style.stageName">
            {{ stage.name }}
        </div>
        <div :class="$style.stageStats">
            > ## pictures
        </div>
    </div>
</template>

<style module>
    .card {
        position: relative;

        display: grid;
        grid-template-columns: auto auto;
        justify-content: space-between;
        align-content: center;
        width: 460px;
        height: 50px;

        padding: 10px;
        box-sizing: border-box;

        background-color: #FF5470;
        border: 3px solid #FFFFFF;
        border-radius: 25px;

        cursor: pointer;
    }
    .stageName {
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
        text-align: left;
        color: #FFFFFF;
    }
    .stageStats {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        padding: 0px 10px 0px 10px;

        width: fit-content;
        height: 30px;

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