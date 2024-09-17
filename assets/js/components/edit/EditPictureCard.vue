<script setup lang="ts">
    import { computed, ref, type ComputedRef, type Ref } from 'vue';
    import type { Picture } from '@/js/types/types';
    import { usePictureStore } from '@/js/stores/PictureStore';
    import { clonePicture } from '@/js/services/picture.service';
    import BaseImageInput from '@/js/components/edit/pictureComponents/BaseImageInput.vue';
    import PictureMapInput from '@/js/components/edit/pictureComponents/PictureMapInput.vue';

    const pictureStore = usePictureStore();

    const props = defineProps<{ picture: Picture }>();
    const emit = defineEmits<{ (e: 'newPictureToFalse'): void }>()

    const pictureToEdit: Ref<Picture> = ref(clonePictureToEdit());
    const imageFile: Ref<any> = ref(null);
    const isMapVisible: Ref<Boolean> = ref(true);

    const googleMapUrl: ComputedRef<string> = computed(() => 'https://google.com/maps/@' + pictureToEdit.value.lat + ',+' + pictureToEdit.value.lng + ',18z');
    const isPictureModified = computed(
        () =>   JSON.stringify(props.picture) !== JSON.stringify(pictureToEdit.value)
                || imageFile.value !== null
    );

    initNewPictureLatLng();

    function cancelNewPicture() {
        emit('newPictureToFalse');
    }

    function resetPictureCard() {
        pictureToEdit.value = clonePictureToEdit();
    }

    function initNewPictureLatLng() {
        const lastPicture: any = pictureStore.getPictures.value.findLast((element) => element);
        if ( lastPicture !== undefined && pictureToEdit.value.id === -1) {
            const picture: Picture = lastPicture;
            pictureToEdit.value.lat = picture.lat;
            pictureToEdit.value.lng = picture.lng;
        }
    }

    function clonePictureToEdit() {
        const picture: Picture = clonePicture(props.picture);
        picture.shotTime = picture.shotTime.slice(0,19);
        return picture;
    }
    
    async function editPicture() {
        if (isPictureModified) {   
            if (props.picture.id === -1) {
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

    function removePicture() {
        pictureStore.removePicture(pictureToEdit.value);
    }
</script>

<template>
    <div :class="$style.container">
        <div :class="$style.pictureCard">
            <div :class="$style.leftPictureCard">
                <base-image-input 
                    v-model="imageFile"
                    :imageName="pictureToEdit.imageName"
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
            <button
                :class="{
                    [$style.pictureCardBtn]: true,
                    [$style.pictureCardSaveBtnActive]: isPictureModified, 
                    [$style.pictureCardSaveBtnInactive]: !isPictureModified,
                }"
                type="submit"
                @click="editPicture()"
            >
                <div v-if="picture.id === -1">
                    Create
                </div>
                <div v-else>
                    Save
                </div>
            </button>
            <button v-if="picture.id !== -1"
                :class="{
                    [$style.pictureCardBtn]: true,
                    [$style.pictureCardResetBtnActive]: isPictureModified, 
                    [$style.pictureCardResetBtnInactive]: !isPictureModified,
                }"
                @click="resetPictureCard()"
            >
                Reset
            </button>
            <div v-if="picture.id === -1">
                <button 
                    :class="{
                        [$style.pictureCardBtn]: true,
                        [$style.pictureCardResetBtnActive]: true,
                    }"
                    @click="cancelNewPicture()"
                >
                    Cancel
                </button>
            </div>
            <div v-else>
                <button 
                    :class="{
                        [$style.pictureCardBtn]: true,
                        [$style.pictureCardDeleteBtn]: true,
                    }"
                    @click="removePicture()"
                >
                    Delete
                </button>
            </div>
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
    .pictureCardBtn {
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
    .pictureCardSaveBtnActive {
        background: #7C7AEA;
        color: #FFFFFF;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        cursor: pointer;
    }
    .pictureCardSaveBtnInactive {
        background: rgba(124, 122, 234, 0.5);
        color: rgba(255, 255, 255, 0.5);
    }
    .pictureCardResetBtnActive {
        background: #e49c53;
        color: #FFFF;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        cursor: pointer;
    }
    .pictureCardResetBtnInactive {
        background: rgb(228, 156, 83, 0.5);
        color: rgba(255, 255, 255, 0.5);
    }
    .pictureCardDeleteBtn {
        background: #EC6666;
        color: #FFFFFF;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        cursor: pointer;
    }
</style>