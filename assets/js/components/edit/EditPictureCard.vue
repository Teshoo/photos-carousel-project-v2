<template>
    <div :class="$style.container">
        <div :class="$style.pictureCard">
            <div :class="$style.leftPictureCard">
                <input type="file"/>
            </div>
            <div :class="$style.middlePictureCard">
                <input 
                    :class="{
                        [$style.pictureCardInputs]: true,
                        [$style.pictureCardInputName]: true,
                    }"
                    type="text"
                    placeholder="picture name"
                    v-model="cardPicture.name"
                />
                <input 
                    :class="$style.pictureCardInputs"
                    type="datetime-local"
                    step="1"
                    v-model="cardPicture.shotTime"
                />
            </div>
            <div :class="$style.rightPictureCard">
                <div :class="$style.leftPictureMap">
                    <div :class="$style.pictureCoordinates">
                        <input
                            :class="$style.pictureCardInputs"
                            type="datetime-local"
                            placeholder="picture lat"
                            v-model="cardPicture.lat"
                        />
                        <input
                            :class="$style.pictureCardInputs"
                            type="datetime-local"
                            placeholder="picture lng"
                            v-model="cardPicture.lng"
                        />
                    </div>
                    <a :url="googleMapUrl">
                        <button
                            :class="$style.googleMapBtn"
                            type="button"
                        >
                            Google Map
                        </button>
                    </a>
                </div>
                <div :class="$style.mapContainer"></div>
            </div>
        </div>
        <div :class="$style.buttonsContainer">
            <button
                :class="{
                    [$style.pictureCardBtn]: true,
                    [$style.pictureCardSaveBtnActive]: tempPicture.name !== cardPicture.name, 
                    [$style.pictureCardSaveBtnInactive]: tempPicture.name === cardPicture.name,
                }"
                type="submit"
                @click="
                    cardPicture.name !== tempPicture.name ? updatePicture() : null, 
                    tempPicture.name = cardPicture.name
                "
            >
                Save
            </button>
            <button 
                :class="{
                    [$style.pictureCardBtn]: true,
                    [$style.pictureCardDeleteBtn]: true,
                }"
            >
                Delete
            </button>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import type { PropType } from 'vue';
    import type { Picture } from '@/js/types/types';
    //import { updateStage } from '@/js/services/stage-service';

    export default defineComponent({
        name: 'EditStageCard',
        props: {
            picture: { 
                type: Object as PropType<Picture>,
                required: true,
            },
        },
        data() {
            return {
                cardPicture: {} as Picture,
                tempPicture: {} as Picture, // use to detect changes in input contents
                googleMapUrl: 'https://google.com/maps' as String,
            };
        },
        created() {
            this.cardPicture.name = this.picture.name;
            this.cardPicture.shotTime = this.picture.shotTime;
            this.cardPicture.lat = this.picture.lat;
            this.cardPicture.lng = this.picture.lng;
            this.cardPicture.extras = [];

            this.tempPicture.name = this.picture.name;
            this.tempPicture.shotTime = this.picture.shotTime;
            this.tempPicture.lat = this.picture.lat;
            this.tempPicture.lng = this.picture.lng;
        },
        methods: {
            async updatePicture() {
                /*try {
                    const response = await updateStage(this.tripStage['@id'], this.stage);
                    this.stage = response.data;
                    this.tempStage.name = this.stage.name;
                } catch (error) {
                    console.log('Something went wrong during the stage update');
                }*/
            }
        }
    });
</script>

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
        grid-template-columns: auto auto auto;
        align-content: stretch;
        padding: 10px;
        gap: 30px;

        width: 700px;

        background: #A5A4D3;
        box-shadow: 0px 4px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 20px;
    }
    .leftPictureCard {
        width: 200px;
        height: 150px;
    }
    .middlePictureCard {
        display: grid;
        grid-template-rows: auto auto;
        justify-content: stretch;
        gap: 10px;

        width: 240px;
        height: 150px;
    }
    .rightPictureCard {
        display: grid;
        grid-template-columns: auto auto;

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
        gap: 10px
    }
    .mapContainer {
        background: #D9D9D9;
        border-radius: 10px;
    }
    .pictureCardInputs {
        font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        font-size: 18px;
        font-weight: 700;
        line-height: 28px;
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
    .pictureCardDeleteBtn {
        background: #EC6666;
        color: #FFFFFF;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        cursor: pointer;
    }
</style>