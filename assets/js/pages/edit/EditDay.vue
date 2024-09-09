<script setup lang="ts">
    import { ref, watch, type Ref } from 'vue';
    import type { TripDay } from '@/js/types/types';
    import { useDayStore } from '@/js/stores/DayStore';
    import { usePictureStore } from '@/js/stores/PictureStore';
    import { cloneDay } from '@/js/services/day.service';
    import EditPictureCard from '@/js/components/edit/EditPictureCard.vue';

    const dayStore = useDayStore();
    const pictureStore = usePictureStore();

    const dayToEdit: Ref<TripDay> = ref(cloneCurrentDay());
    const loading: Ref<Boolean> = ref(true);

    browsePictures();

    function browsePictures() {
        pictureStore.browsePictures().then(() => loading.value = false);
    }

    function cloneCurrentDay() {
        return cloneDay(dayStore.getCurrentDay.value);
    }

    function updateCurrentDay() {
        if (dayStore.getCurrentDay.value.name !== dayToEdit.value.name) {
            dayStore.updateCurrentDay(dayToEdit.value);
        }
    }

    watch(
        () => dayStore.getCurrentDay.value,
        () => { 
            browsePictures();
            dayToEdit.value = cloneCurrentDay();
        }
    );
</script>

<template>
    <div :class="$style.container">
        <div 
            :class="$style.dayEdit"
            v-if="dayStore.currentDay"
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
        <div :class="$style.picturesContainer">
            <div
                :class="$style.titles"
                v-if="loading === false"
            >
                Pictures: 
            </div>
            <div v-for="picture in pictureStore.getPictures.value">
                <EditPictureCard :picture="picture"/>
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
</style>