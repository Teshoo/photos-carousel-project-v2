<script setup lang="ts">
    import { ref, type Ref } from 'vue';
    import { useRouter } from 'vue-router';
    import type { TripStage } from '@/js/types/types';
    import { useStageStore } from '@/js/stores/StageStore';
    import { cloneStage } from '@/js/services/stage.service';

    const router = useRouter();
    const stageStore = useStageStore();
    
    const props = defineProps<{ stage: TripStage }>();

    const stageToEdit: Ref<TripStage> = ref(cloneStageToEdit());

    function editStage() {
        if (props.stage.name !== stageToEdit.value.name) {
            stageStore.editStage(stageToEdit.value);
        }
    }

    function cloneStageToEdit() {
        return cloneStage(props.stage);
    }

    async function changeCurrentStage() {
        await stageStore.browseCurrentStage(props.stage.id);
        router.push({ name: 'editStage', params: { stageId: stageStore.getCurrentStage.value.id } });
    }
</script>

<template>
    <div :class="$style.container">
        <div :class="$style.stageCard">
        <input 
            :class="$style.stageNameInput"
            type="text"
            placeholder="stage name"
            v-model="stageToEdit.name"
        />
    </div>
    <button
        :class="{
            [$style.stageCardSaveBtn]: true,
            [$style.stageCardSaveBtnActive]: stageToEdit.name !== stage.name, 
            [$style.stageCardSaveBtnInactive]: stageToEdit.name === stage.name,
        }"
        type="submit"
        @click="editStage()"
    >
        Save
    </button>
    
    <button @click="changeCurrentStage()">
        View
    </button>
    </div>
</template>

<style module>
    .container {
        display: grid;
        grid-template-columns: auto auto;
        justify-items: center;
        justify-content: center;
        align-items: center;
        gap: 20px;
    }
    .stageCard {
        display: grid;
        grid-template-columns: auto auto;
        padding: 10px;
        gap: 30px;

        width: 700px;

        background: #A5A4D3;
        box-shadow: 0px 4px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 20px;
    }
    .stageNameInput {
        font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        font-size: 18px;
        font-weight: 700;
        line-height: 28px;
        color: #383838;
        
        height: 40px;
        width: 240px;
        background-color: #FFEFD5;

        border-radius: 10px;
        border: none;
        box-sizing: border-box;
        padding: 10px;
    }
    .stageNameInput:focus {
        outline: 1px solid #FF5470;
    }
    .stageCardSaveBtn {
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
    .stageCardSaveBtnActive {
        background: #7C7AEA;
        color: #FFFFFF;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        cursor: pointer;
    }
    .stageCardSaveBtnInactive {
        background: rgba(124, 122, 234, 0.5);
        color: rgba(255, 255, 255, 0.5);
    }
</style>