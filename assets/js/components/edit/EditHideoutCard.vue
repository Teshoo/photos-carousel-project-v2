<script setup lang="ts">
    import { computed, ref, type Ref } from 'vue';
    import type { Hideout } from '@/js/types/types';
    import { useHideoutStore } from '@/js/stores/HideoutStore';
    import { cloneHideout } from '@/js/services/hideout.service';
    import HideoutMapInput from '@/js/components/edit/cardComponents/HideoutMapInput.vue';
    import ActionButton from '@/js/components/core/buttons/ActionButton.vue';

    const hideoutStore = useHideoutStore();
    
    const props = defineProps<{ hideout: Hideout }>();
    const emit = defineEmits<{ noHideoutCreating: [] }>();

    const hideoutToEdit: Ref<Hideout> = ref(cloneHideoutToEdit());
    const isNewHideout: Ref<boolean> = ref(props.hideout.id === -1);
    const isMapVisible: Ref<boolean> = ref(true);

    const isHideoutModified = computed<boolean>(
        () => JSON.stringify(props.hideout) !== JSON.stringify(hideoutToEdit.value)
    );

    initNewHideout();

    // METHODS //

    function initNewHideout(): void {
        const lastHideout: any = hideoutStore.getHideouts.value.findLast((hideout) => hideout);
        if (lastHideout !== undefined && isNewHideout.value) {
            const hideout: Hideout = lastHideout;
            hideoutToEdit.value.lat = hideout.lat;
            hideoutToEdit.value.lng = hideout.lng;
        }
    }

    function cancelNewHideout(): void {
        emit('noHideoutCreating');
    }

    async function createHideout(): Promise<void> {
        if (isNewHideout) {
            isMapVisible.value = false;
            await hideoutStore.newHideout(hideoutToEdit.value);
            emit('noHideoutCreating');
        }
    }

    function editHideout(): void {
        if (isHideoutModified) {
            hideoutStore.editHideout(hideoutToEdit.value);
        }
    }

    function removeHideout(): void {
        hideoutStore.removeHideout(hideoutToEdit.value);
    }

    function cloneHideoutToEdit(): Hideout {
        return cloneHideout(props.hideout);
    }
</script>

<template>
    <div :class="$style.container">
        <div :class="$style.hideoutCard">
            <div :class="$style.hideoutCardLeft">
                <input 
                    :class="[$style.hideoutCardInputs, $style.hideoutNameInput]"
                    type="text"
                    placeholder="hideout name"
                    v-model="hideoutToEdit.name"
                />

                <div :class="$style.hideoutCoordinates">
                    <input
                        :class="[$style.hideoutCardInputs, $style.hideoutCardInputCoord]"
                        type="text"
                        placeholder="hideout lat"
                        v-model="hideoutToEdit.lat"
                    />

                    <input
                        :class="[$style.hideoutCardInputs, $style.hideoutCardInputCoord]"
                        type="text"
                        placeholder="hideout lng"
                        v-model="hideoutToEdit.lng"
                    />
                </div>
            </div>

            <HideoutMapInput v-if="isMapVisible"
                :class="$style.mapContainer"
                :hideout-to-edit="hideoutToEdit"
                v-model:lat="hideoutToEdit.lat"
                v-model:lng="hideoutToEdit.lng"
            />
        </div>

        <div :class="$style.buttonsContainer">
            <ActionButton  
                :name="isNewHideout ? 'Create' : 'Save'"
                :btn-type="'save'"
                :disabled="!isHideoutModified"
                @click="isNewHideout ? createHideout() : editHideout()"
            />

            <ActionButton v-if="isNewHideout"
                :name="'Cancel'"
                :btn-type="'cancel'"
                @click="cancelNewHideout()"
            />
            
            <ActionButton v-if="!isNewHideout"
                :name="'Delete'"
                :btn-type="'delete'"
                @click="removeHideout()"
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
    .hideoutCard {
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
    .hideoutCardLeft {
        display: grid;
        grid-template-rows: auto auto;
        align-content: space-between;

        height: 150px;
    }
    .hideoutCoordinates {
        display: grid;
        grid-template-rows: auto auto;
        justify-items: end;
        gap: 10px;
    }
    .hideoutCardInputs {
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
    .hideoutCardInputs:focus {
        outline: 1px solid #FF5470;
    }
    .hideoutNameInput {
        width: 240px;
    }
    .hideoutCardInputCoord {
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