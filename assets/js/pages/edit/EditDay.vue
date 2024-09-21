<script setup lang="ts">
    import { ref, watch, type Ref } from 'vue';
    import type { Picture, TripDay } from '@/js/types/types';
    import { useDayStore } from '@/js/stores/DayStore';
    import { usePictureStore } from '@/js/stores/PictureStore';
    import { cloneDay } from '@/js/services/day.service';
    import EditPictureCard from '@/js/components/edit/EditPictureCard.vue';
    import newPictureIcon from '@/icons/new_picture_icon.svg';
    import newPictureHoverIcon from '@/icons/new_picture_hover_icon.svg';

    const dayStore = useDayStore();
    const pictureStore = usePictureStore();

    const dayToEdit: Ref<TripDay> = ref(cloneCurrentDay());
    const isLoading: Ref<Boolean> = ref(true);
    const isPictureCreating: Ref<Boolean> = ref(false);
    const isHovering: Ref<Boolean> = ref(false);
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
    
    browsePictures();

    function browsePictures(): void {
        pictureStore.browsePictures().then(() => isLoading.value = false);
    }

    function cloneCurrentDay(): TripDay {
        return cloneDay(dayStore.getCurrentDay.value);
    }

    function updateCurrentDay(): void {
        if (dayStore.getCurrentDay.value.name !== dayToEdit.value.name) {
            dayStore.updateCurrentDay(dayToEdit.value);
        }
    }

    watch(
        () => dayStore.getCurrentDay.value,
        () => { 
            browsePictures();
            dayToEdit.value = cloneCurrentDay();
            isPictureCreating.value = false;
        }
    );
</script>

<template>
    <div :class="$style.container">
        <div v-if="dayStore.currentDay"
            :class="$style.dayEdit"
        >
            <div :class="$style.titles">
                Day:
            </div>
            <input 
                :class="$style.dayNameInput"
                type="text"
                placeholder="day name"
                v-model="dayToEdit.name" 
            />
            <button
                :class="{
                    [$style.dayNameButton]: true,
                    [$style.dayNameButtonActive]: dayToEdit.name !== dayStore.getCurrentDay.value.name, 
                    [$style.dayNameButtonInactive]: dayToEdit.name === dayStore.getCurrentDay.value.name,
                }"
                type="submit"
                @click="updateCurrentDay()"
            >
                Save
            </button>
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
                @new-picture-to-false="isPictureCreating = false"
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
    .titles {
        font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        font-size: 24px;
        font-weight: 700;
        line-height: 28px;
        letter-spacing: 0.1em;
        color: #FFEFD5;
    }
    .dayEdit {
        display: grid;
        grid-template-columns: auto auto auto;
        justify-content: start;
        align-items: center;
        gap: 20px;
    }
    .dayNameInput {
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
    .dayNameInput:focus {
        outline: 5px solid #7C7AEA;
    }
    .dayNameButton {
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
    .dayNameButtonActive {
        background: #7C7AEA;
        color: #FFFFFF;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        cursor: pointer;
    }
    .dayNameButtonInactive {
        background: rgba(124, 122, 234, 0.5);
        color: rgba(255, 255, 255, 0.5);
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