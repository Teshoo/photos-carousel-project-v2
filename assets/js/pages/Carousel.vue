<script setup lang="ts">
    import { ref, watch, type Ref } from 'vue';
    import { useDayStore } from '@/js/stores/DayStore';
    import { usePictureStore } from '@/js/stores/PictureStore';
    import { useHideoutStore } from '@/js/stores/HideoutStore';
    import Picture from '@/js/components/Picture.vue';
    import CarouselMap from '@/js/components/Map.vue';
    import timeIcon from '@/icons/time_icon.svg';
    import tempIcon from '@/icons/temp_icon.svg';
    import nextIcon from '@/icons/nav_next_icon.svg';
    import prevIcon from '@/icons/nav_prev_icon.svg';
    
    const dayStore = useDayStore();
    const pictureStore = usePictureStore();
    const hideoutStore = useHideoutStore();
    const arePicturesLoading: Ref<boolean> = ref(true);
    const areAllStagePicturesLoading: Ref<boolean> = ref(true);
    const areHideoutsLoading: Ref<boolean> = ref(true);
    const currentPictureIndex: Ref<number> = ref(0);

    browsePictures();
    browseAllStagePictures();
    browseHideouts();

    // METHODS
    
    function browsePictures(): void {
        pictureStore.browsePictures()
            .then(() => pictureStore.changeCurrentPicture(pictureStore.getPictures.value[0]))
            .then(() => arePicturesLoading.value = false);
        
    }

    function browseAllStagePictures(): void {
        pictureStore.browseAllStagePictures().then(() => areAllStagePicturesLoading.value = false);
    }

    function browseHideouts(): void {
        hideoutStore.browseHideouts().then(() => areHideoutsLoading.value = false);
    }

    function previousPicture(): void {
        if (currentPictureIndex.value > 0)
        {
            currentPictureIndex.value--;
            pictureStore.changeCurrentPicture(pictureStore.getPictures.value[currentPictureIndex.value]);
        }
    }

    function nextPicture(): void {
        if (currentPictureIndex.value < pictureStore.getPictures.value.length - 1)
        {
            currentPictureIndex.value++;
            pictureStore.changeCurrentPicture(pictureStore.getPictures.value[currentPictureIndex.value]);
        }
    }

    function restartDay(): void {
        currentPictureIndex.value = 0;
        pictureStore.changeCurrentPicture(pictureStore.getPictures.value[currentPictureIndex.value]);
    }

    function endDay(): void {
        currentPictureIndex.value = pictureStore.getPictures.value.length - 1;
        pictureStore.changeCurrentPicture(pictureStore.getPictures.value[currentPictureIndex.value]);
    }

    watch(
        () => dayStore.getCurrentDay.value,
        () => { 
            arePicturesLoading.value = true;
            currentPictureIndex.value = 0;
            browsePictures();
        }
    )
</script>
<template>
    <div 
        :class="$style.container"
        v-if="!arePicturesLoading"
    >
        <div :class="$style.pictureSide">
            <div :class="$style.pictureInfo">
                <div :class="$style.pictureDescription">
                    <div :class="$style.titles">
                        Description
                    </div>
                    <div :class="$style.texts">
                        {{ pictureStore.getCurrentPicture.value.name }}
                    </div>
                </div>
                <div>
                    <div :class="$style.pictureTimeTempContainer">
                        <div :class="$style.pictureTimeTemp">
                            <timeIcon />
                            {{ pictureStore.getCurrentPicture.value.shotTime.substring(11,16) }}
                        </div>
                        <div :class="$style.pictureTimeTemp">
                            <tempIcon />
                            -1°C
                        </div>
                    </div>
                </div>
            </div>
            <div :class="$style.pictureContainer">
                <Picture v-for="picture in pictureStore.getPictures.value"
                    :key = "picture.id"
                    :picture = "picture"
                />
            </div>
            <div :class="$style.pictureNav">
                <div :class="$style.pictureNavLeft">
                    <div 
                        :class="$style.pictureNavBtnFirstLast"
                        @click="restartDay()"
                    >
                        RESTART
                    </div>
                    <div 
                        :class="$style.pictureNavBtnPreNext"
                        @click="previousPicture()"
                    >
                        <prevIcon/>
                    </div>
                </div>
                <div :class="$style.pictureNavRight">
                    <div 
                        :class="$style.pictureNavBtnPreNext"
                        @click="nextPicture()"
                    >
                        <nextIcon/>
                    </div>
                    <div 
                        :class="$style.pictureNavBtnFirstLast"
                        @click="endDay()"
                    >
                        END
                    </div>
                </div>
            </div>
        </div>
        <div :class="$style.mapSide">
            <div :class="$style.timestamp">
                <div :class="$style.titles">
                        Timestamp
                </div>
            </div>
            <div :class="$style.mapContainer">
                <CarouselMap 
                    :currentPictureIndex = "currentPictureIndex"
                />
            </div>
        </div>
    </div>
</template>

<style module>
    .container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 50px;

        margin: 45px 10% 0 10%;
        box-sizing: border-box;

        height: 80vh;
    }
    .titles {
        font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0.3em;
        text-align: left;
        text-transform: uppercase;
        color: #FFEFD5;
    }
    .texts {
        font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        font-size: 15px;
        font-weight: 500;
        letter-spacing: 0.1em;
        text-align: left;
        color: #FFF;
    }
    .pictureSide {
        display: grid;
        grid-template-rows: auto 1fr auto;
        gap: 10px;
    }
    .mapSide {
        display: grid;
        grid-template-rows: auto 1fr;
        gap: 10px;
    }
    .timestamp {
        height: 90px;
        width: 100%;
    }
    .mapContainer {
        border-style: solid;
        border-color: #FFF;
        border-radius: 20px;
        border-width: 1px;

        height: 100%;
    }
    .pictureInfo {
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 10;

        height: 90px;
        padding: 0 15px 0 15px;
    }
    .pictureDescription {
        display: grid;
        grid-template-rows: auto 1fr;
        gap: 10px
    }
    .pictureTimeTempContainer {
        display: grid;
        grid-template-rows: 1fr 1fr;
        gap: 20px;
    }
    .pictureTimeTemp {
        display: grid;
        grid-template-columns: 1fr 1fr;
        align-items: center;
        gap: 5px;

        height: 20px;

        font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        font-size: 15px;
        font-weight: 700;
        letter-spacing: 0.1em;
        text-align: right;
        color: #FFF;
    }
    .pictureContainer {
        display: flex;
        align-items: center;
        gap: 500px;

        border-style: solid;
        border-color: #FFF;
        border-radius: 20px;
        border-width: 1px;

        overflow: hidden;
        box-sizing: border-box;

        min-width: 0;
        min-height: 0;
        width: 100%;
        height: 55vh;
    }
    .pictureNav {
        display: grid;
        grid-template-columns: 1fr 1fr;
        justify-content: space-between;

        width: 100%;
        height: 100px;

        padding: 0 15px 0 15px;
        box-sizing: border-box;
    }
    .pictureNavLeft {
        display: grid;
        grid-template-columns: auto auto;
        justify-content: start;
        align-content: center;
        align-items: center;
        gap: 20px;
    }
    .pictureNavRight {
        display: grid;
        grid-template-columns: auto auto;
        justify-content: end;
        align-content: center;
        align-items: center;
        gap: 20px;
    }
    .pictureNavBtnFirstLast {
        display: grid;
        align-content: center;

        width: 70px;
        height: 70px;
        
        background-color: #7C7AEA;
        border-radius: 10px;

        font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        font-size: 12px;
        font-weight: 500;
        letter-spacing: 0.2em;
        text-align: center;
        color: #FFF;

        cursor: pointer;
    }
    .pictureNavBtnPreNext {
        display: grid;
        justify-items: center;
        align-items: center;

        width: 150px;
        height: 100px;

        background-color: #000;
        border-radius: 10px;

        cursor: pointer;
    }
</style>