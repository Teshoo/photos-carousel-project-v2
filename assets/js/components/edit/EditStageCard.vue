<script setup lang="ts">
    import { computed, ref, type Ref } from 'vue';
    import { useRouter } from 'vue-router';
    import type { TripStage } from '@/js/types/types';
    import { useStageStore } from '@/js/stores/StageStore';
    import { cloneStage } from '@/js/services/stage.service';
    import StageMapInput from '@/js/components/edit/cardComponents/StageMapInput.vue';
    import ActionButton from '@/js/components/core/buttons/ActionButton.vue';

    const router = useRouter();
    const stageStore = useStageStore();
    
    const props = defineProps<{ stage: TripStage }>();
    const emit = defineEmits<{ noStageCreating: [] }>();

    const stageToEdit: Ref<TripStage> = ref(cloneStageToEdit());
    const isNewStage: Ref<boolean> = ref(props.stage.id === -1);
    const isMapVisible: Ref<boolean> = ref(true);

    const isStageModified = computed<boolean>(
        () => JSON.stringify(props.stage) !== JSON.stringify(stageToEdit.value)
    );

    initNewStage();

    // METHODS //

    function initNewStage(): void {
        const lastStage: any = stageStore.getStages.value.findLast((stage) => stage);
        if (lastStage !== undefined && isNewStage.value) {
            const stage: TripStage = lastStage;
            stageToEdit.value.lat = stage.lat;
            stageToEdit.value.lng = stage.lng;
        }
    }

    function cancelNewStage(): void {
        emit('noStageCreating');
    }

    async function createStage(): Promise<void> {
        if (isNewStage) {
            isMapVisible.value = false;
            await stageStore.newStage(stageToEdit.value);
            emit('noStageCreating');
        }
    }

    function editStage(): void {
        if (isStageModified) {
            stageStore.editStage(stageToEdit.value);
        }
    }

    function cloneStageToEdit(): TripStage {
        return cloneStage(props.stage);
    }

    async function changeCurrentStage(): Promise<void> {
        await stageStore.browseCurrentStage(props.stage.id);
        router.push({ name: 'editStage', params: { stageId: stageStore.getCurrentStage.value.id } });
    }
</script>

<template>
    <div :class="$style.container">
        <div :class="$style.stageCard">
            <div :class="$style.stageCardLeft">
                <input 
                    :class="[$style.stageCardInputs, $style.stageNameInput]"
                    type="text"
                    placeholder="stage name"
                    v-model="stageToEdit.name"
                />

                <div :class="$style.stageCoordinates">
                    <input
                        :class="[$style.stageCardInputs, $style.stageCardInputCoord]"
                        type="text"
                        placeholder="stage lat"
                        v-model="stageToEdit.lat"
                    />

                    <input
                        :class="[$style.stageCardInputs, $style.stageCardInputCoord]"
                        type="text"
                        placeholder="stage lng"
                        v-model="stageToEdit.lng"
                    />
                </div>
            </div>

            <StageMapInput v-if="isMapVisible"
                :class="$style.mapContainer"
                :stage-to-edit="stageToEdit"
                v-model:lat="stageToEdit.lat"
                v-model:lng="stageToEdit.lng"
            />
        </div>

        <div :class="$style.buttonsContainer">
            <ActionButton v-if="!isNewStage"
                :name="'View'"
                :btn-type="'default'"
                @click="changeCurrentStage()"
            />

            <ActionButton  
                :name="isNewStage ? 'Create' : 'Save'"
                :btn-type="'save'"
                :disabled="!isStageModified"
                @click="isNewStage ? createStage() : editStage()"
            />
            
            <ActionButton v-if="isNewStage"
                :name="'Cancel'"
                :btn-type="'cancel'"
                @click="cancelNewStage()"
            />
        </div>
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
        grid-template-columns: auto 1fr;
        justify-items: start;
        padding: 10px;
        gap: 30px;

        width: 500px;

        background: #A5A4D3;
        box-shadow: 0px 4px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 20px;
    }
    .stageCardLeft {
        display: grid;
        grid-template-rows: auto auto;
        align-content: space-between;

        height: 150px;
    }
    .stageCoordinates {
        display: grid;
        grid-template-rows: auto auto;
        justify-items: end;
        gap: 10px;
    }
    .stageCardInputs {
        font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        font-size: 17px;
        font-weight: 500;
        color: #383838;
        
        height: 40px;
        background-color: #FFEFD5;

        border-radius: 10px;
        border: none;
        box-sizing: border-box;
        padding: 10px;
    }
    .stageCardInputs:focus {
        outline: 1px solid #FF5470;
    }
    .stageNameInput {
        width: 240px;
    }
    .stageCardInputCoord {
        width: 150px;
    }
    .mapContainer {
        background: #D9D9D9;
        border-radius: 10px;
        width : 100%;
        height: 150px;
    }
    .buttonsContainer {
        display: grid;
        grid-template-rows: 1fr 1fr;
        align-content: center;
        gap: 10px;

        width: 100px;
    }
</style>