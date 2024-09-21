<script setup lang="ts">
    import { computed, ref, type ComputedRef, type Ref } from 'vue';
    import type { Picture } from '@/js/types/types';
    import { usePictureStore } from '@/js/stores/PictureStore';
    import { clonePicture } from '@/js/services/picture.service';
    import BaseImageInput from '@/js/components/edit/pictureComponents/BaseImageInput.vue';
    import PictureMapInput from '@/js/components/edit/pictureComponents/PictureMapInput.vue';
    import ActionButton from '@/js/components/core/buttons/ActionButton.vue';

    // SETUP //
    const pictureStore = usePictureStore();

    const props = defineProps<{ picture: Picture }>();
    const emit = defineEmits<{ (e: 'newPictureToFalse'): void }>();

    const pictureToEdit: Ref<Picture> = ref(clonePictureToEdit());
    const imageFile: Ref<any> = ref(null);
    const imageData: Ref<any> = ref(setImageUrl());
    const isMapVisible: Ref<Boolean> = ref(true);
    const isNewPicture: Ref<Boolean> = ref(props.picture.id === -1);

    const googleMapUrl: ComputedRef<string> = computed(() => 'https://google.com/maps/@' + pictureToEdit.value.lat + ',+' + pictureToEdit.value.lng + ',18z');
    const isPictureModified = computed(
        () =>   JSON.stringify(props.picture) !== JSON.stringify(pictureToEdit.value)
                || imageFile.value !== null
    );

    initNewPicture();

    // METHODS //
    
    function initNewPicture(): void {
        const lastPicture: any = pictureStore.getPictures.value.findLast((picture) => picture);
        if ( lastPicture !== undefined && isNewPicture.value) {
            const picture: Picture = lastPicture;
            pictureToEdit.value.lat = picture.lat;
            pictureToEdit.value.lng = picture.lng;
            pictureToEdit.value.shotTime = picture.shotTime;
        }
    }

    function clonePictureToEdit(): Picture {
        const picture: Picture = clonePicture(props.picture);
        picture.shotTime = picture.shotTime.slice(0,19);
        return picture;
    }

    function setImageUrl(): String | null {
        return props.picture.imageName ? '/images/pictures/' + pictureToEdit.value.imageName : null;
    }

    function resetPictureCard(): void {
        imageFile.value = null;
        imageData.value = setImageUrl();
        pictureToEdit.value = clonePictureToEdit();
    }

    function cancelNewPicture(): void {
        emit('newPictureToFalse');
    }

    async function editPicture(): Promise<void> {
        if (isPictureModified) {   
            if (isNewPicture.value) {
                isMapVisible.value = false;
                await pictureStore.newPicture(pictureToEdit.value, imageFile.value);
                emit('newPictureToFalse');
            } else if (imageFile.value !== null) {
                pictureStore.newPicture(pictureToEdit.value, imageFile.value);
            } else {
                pictureStore.editPicture(pictureToEdit.value);
            }
        }
    }

    function removePicture(): void {
        pictureStore.removePicture(pictureToEdit.value);
    }
</script>

<template>
    <div :class="$style.container">
        <div :class="$style.pictureCard">
            <div :class="$style.leftPictureCard">
                <base-image-input 
                    v-model:imageFile="imageFile"
                    v-model:imageData="imageData"
                />
            </div>
            <div :class="$style.middlePictureCard">
                <textarea 
                    :class="{
                        [$style.pictureCardInputs]: true,
                        [$style.pictureCardInputName]: true,
                    }"
                    placeholder="picture name"
                    v-model="pictureToEdit.name"
                ></textarea>
                <input 
                    :class="$style.pictureCardInputs"
                    type="datetime-local"
                    step="1"
                    v-model="pictureToEdit.shotTime"
                />
            </div>
            <div :class="$style.rightPictureCard">
                <div :class="$style.leftPictureMap">
                    <div :class="$style.pictureCoordinates">
                        <input
                            :class="{
                                [$style.pictureCardInputs]: true,
                                [$style.pictureCardInputCoord]: true,
                            }"
                            type="text"
                            placeholder="picture lat"
                            v-model="pictureToEdit.lat"
                        />
                        <input
                            :class="{
                                [$style.pictureCardInputs]: true,
                                [$style.pictureCardInputCoord]: true,
                            }"
                            type="text"
                            placeholder="picture lng"
                            v-model="pictureToEdit.lng"
                        />
                    </div>
                    <a 
                        :href="googleMapUrl"
                        target="_blank"
                    >
                        <button
                            :class="$style.googleMapBtn"
                            type="button"
                        >
                            Google Map
                        </button>
                    </a>
                </div>
                <PictureMapInput v-if="isMapVisible"
                    :class="$style.mapContainer"
                    :pictureToEdit="pictureToEdit"
                    v-model:lat="pictureToEdit.lat"
                    v-model:lng="pictureToEdit.lng"
                />
            </div>
        </div>
        <div :class="$style.buttonsContainer">
            <ActionButton  
                :name="isNewPicture ? 'Create' : 'Save'"
                :btnType="'save'"
                :disabled="!isPictureModified"
                type="submit"
                @click="editPicture()"
            />
            <ActionButton
                :name="isNewPicture ? 'Cancel' : 'Reset'"
                :btnType="'cancel'"
                :disabled="!isPictureModified" 
                @click="isNewPicture ? cancelNewPicture() : resetPictureCard() "
            />
            <ActionButton v-if="!isNewPicture"
                :name="'Delete'"
                :btnType="'delete'"
                @click="removePicture()"
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
    .pictureCard {
        display: grid;
        grid-template-columns: auto auto 1fr;
        justify-content: start;
        padding: 10px;
        gap: 30px;

        width: 960px;

        background: #A5A4D3;
        box-shadow: 0px 4px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 20px;
    }
    .leftPictureCard {
        width: 200px;
        height: 150px;

        background-color: rgba(255, 239, 213, 0.5);

        border-radius: 10px;
    }
    .middlePictureCard {
        display: grid;
        grid-template-rows: auto auto;
        gap: 10px;

        width: 240px;
        height: 150px;
    }
    .rightPictureCard {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 10px;

        height: 150px;
    }
    .leftPictureMap {
        display: grid;
        grid-template-rows: auto auto;
        align-content: space-between;
        justify-items: center;

        width: 150px;
    }
    .pictureCoordinates {
        display: grid;
        grid-template-rows: 1fr 1fr;
        gap: 10px;

        width: 150px;
    }
    .mapContainer {
        background: #D9D9D9;
        border-radius: 10px;
    }
    .pictureCardInputs {
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
    .pictureCardInputs:focus {
        outline: 1px solid #FF5470;
    }
    .pictureCardInputName {
        height: 100px;

        text-align: start;
        resize: none;
    }
    .pictureCardInputCoord {
        width: 150px;
    }
    .googleMapBtn {
        display: grid;
        grid-template-columns: 1fr;
        justify-content: center;
        align-content: center;
        padding: 10px;

        width: 140px;
        height: 40px;

        background: #D9D9D9;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 20px;
    }
    .buttonsContainer {
        display: grid;
        grid-template-rows: 1fr 1fr;
        align-content: center;
        gap: 10px;

        width: 100px;
    }
</style>