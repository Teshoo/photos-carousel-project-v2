<script setup lang="ts">
    import { computed, ref, watch, type Ref } from 'vue';
    import type { Picture, TripDay } from '@/js/types/types';
    import router from '@/js/router';
    import { useStageStore } from '@/js/stores/StageStore';
    import { useDayStore } from '@/js/stores/DayStore';
    import { usePictureStore } from '@/js/stores/PictureStore';
    import { cloneDay } from '@/js/services/day.service';
    import EditPictureCard from '@/js/components/edit/EditPictureCard.vue';
    import newPictureIcon from '@/icons/new_picture_icon.svg';
    import newPictureHoverIcon from '@/icons/new_picture_hover_icon.svg';
    import ActionButton from '@/js/components/core/buttons/ActionButton.vue';

    const stageStore = useStageStore();
    const dayStore = useDayStore();
    const pictureStore = usePictureStore();

    const dayToEdit: Ref<TripDay> = ref(cloneCurrentDay());
    const isLoading: Ref<boolean> = ref(true);
    const isPictureCreating: Ref<boolean> = ref(false);
    const isHovering: Ref<boolean> = ref(false);
    const emptyPicture: Ref<Picture> = ref({
        id: -1,
        name: '',
        shotTime: '',
        lat: '',
        lng: '',
        imageName: '',
        tripDay: '/api/trip_days/' + dayToEdit.value.id,
        extras: []
    });

    const isDayModified = computed<boolean>(
        () => JSON.stringify(dayStore.getCurrentDay.value) !== JSON.stringify(dayToEdit.value)
    );

    const hasPictures = computed<boolean>(
        () => dayToEdit.value.pictures.length !== 0
    );
    
    // METHODS //

    browsePictures();

    function browsePictures(): void {
        pictureStore.browsePictures().then(() => isLoading.value = false);
    }

    function cloneCurrentDay(): TripDay {
        return cloneDay(dayStore.getCurrentDay.value);
    }

    function updateCurrentDay(): void {
        if (isDayModified) {
            dayStore.updateCurrentDay(dayToEdit.value);
        }
    }

    function deleteCurrentDay(): void {
        if (hasPictures) {
            dayStore.removeDay(dayToEdit.value);
        router.push({ name: 'editStage', params: { stageId: stageStore.getCurrentStage.value.id }});
        }
    }

    watch(
        () => dayStore.getCurrentDay.value,
        () => { 
            isPictureCreating.value = false;
            dayToEdit.value = cloneCurrentDay();
            emptyPicture.value.tripDay = '/api/trip_days/' + dayToEdit.value.id;
            browsePictures();
        }
    );
</script>

<template>
    <div :class="$style.container">
        <div v-if="dayStore.currentDay"
            :class="$style.dayEdit"
        >
            <div :class="$style.titles">
                Day
            </div>
            <div :class="$style.dayContainer">
                <input 
                :class="$style.dayNameInput"
                type="text"
                placeholder="day name"
                v-model="dayToEdit.name" 
            />
            <input 
                :class="$style.dayNameInput"
                type="date"
                placeholder="day date"
                v-model="dayToEdit.date"
            />
            </div>
            <div :class="$style.buttonsContainer">
                <ActionButton  
                    :name="'Save'"
                    :btn-type="'save'"
                    :disabled="!isDayModified"
                    @click="updateCurrentDay()"
                />
                <ActionButton
                    :name="'Delete'"
                    :btn-type="'delete'"
                    :disabled="hasPictures"
                    @click="deleteCurrentDay()"
                />
            </div>
        </div>
        <div v-if="!isLoading"
            :class="$style.picturesContainer"
        >
            <div :class="$style.titles">
                Pictures ({{ pictureStore.getPictures.value.length }})
            </div>       
            <EditPictureCard v-for="picture in pictureStore.getPictures.value"
                :key="picture.id"
                :index="picture.shotTime"
                :picture="picture"
            />
            <EditPictureCard v-if="isPictureCreating" 
                :key="dayStore.currentDay.id"
                :picture="emptyPicture" 
                @no-picture-creating="isPictureCreating = false"
            />
            <div v-if="!isPictureCreating"
                :class="$style.newPictureContainer"
            >
                <div
                    :class="$style.newPictureButton"
                    @click="isPictureCreating = true, isHovering = false"
                    @mouseover="isHovering = true"
                    @mouseleave="isHovering = false"
                >
                    <div v-if="!isHovering">
                        <newPictureIcon />
                    </div>
                    <div v-if="isHovering">
                        <newPictureHoverIcon />
                    </div>
                </div>
                <div :class="$style.newPictureShadowButtons"></div>
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
    .dayContainer {
        display: grid;
        grid-template-columns: auto auto;
        gap: 15px;
    }
    .dayEdit {
        display: grid;
        grid-template-columns: auto auto auto;
        justify-content: start;
        align-items: center;
        gap: 20px;
    }
    .titles {
        font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        font-size: 24px;
        font-weight: 700;
        line-height: 28px;
        letter-spacing: 0.1em;
        color: #FFEFD5;
    }
    .dayNameInput {
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
        padding: 0 10px 0 10px;
    }
    .dayNameInput:focus {
        outline: 3px solid #7C7AEA;
    }
    .buttonsContainer {
        display: grid;
        grid-template-columns: 1fr 1fr;
        align-content: center;
        gap: 10px;

        width: 100px;
    }
    .picturesContainer {
        display: grid;
        grid-template-columns: 1fr;
        gap: 30px;
    }
    .newPictureContainer {
        display: grid;
        grid-template-columns: auto auto;
        justify-items: center;
        justify-content: center;
        align-items: center;
        gap: 20px;
    }
    .newPictureButton {
        cursor: pointer;
    }
    .newPictureShadowButtons {
        height: 100px;
        width: 100px;
    }
</style>