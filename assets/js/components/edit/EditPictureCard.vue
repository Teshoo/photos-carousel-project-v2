<template>
    <div :class="$style.container">
        <div :class="$style.pictureCard">
            <div :class="$style.leftPictureCard">
                <!--<input type="file"/>-->
                <base-image-input v-model="imageFile"/>
            </div>
            <div :class="$style.middlePictureCard">
                <textarea 
                    :class="{
                        [$style.pictureCardInputs]: true,
                        [$style.pictureCardInputName]: true,
                    }"
                    placeholder="picture name"
                    v-model="cardPicture.name"
                ></textarea>
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
                            :class="{
                                [$style.pictureCardInputs]: true,
                                [$style.pictureCardInputCoord]: true,
                            }"
                            type="text"
                            placeholder="picture lat"
                            v-model="cardPicture.lat"
                        />
                        <input
                            :class="{
                                [$style.pictureCardInputs]: true,
                                [$style.pictureCardInputCoord]: true,
                            }"
                            type="text"
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
    import { updatePicture } from '@/js/services/picture-service';
    import BaseImageInput from '@/js/components/edit/BaseImageInput.vue';

    export default defineComponent({
        name: 'EditPictureCard',
        components: {
            BaseImageInput,
        },
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
                imageFile: null,
            };
        },
        created() {
            this.cardPicture.name = this.picture.name;
            this.cardPicture.shotTime = this.picture.shotTime.slice(0,19);
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
                try {
                    const response = await updatePicture(this.picture['@id'], this.cardPicture);
                    this.cardPicture = response.data;
                    this.cardPicture.shotTime = this.cardPicture.shotTime.slice(0,19);
                    this.tempPicture.name = this.cardPicture.name;
                } catch (error) {
                    console.log('Something went wrong during the stage update');
                }
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
    .pictureCardDeleteBtn {
        background: #EC6666;
        color: #FFFFFF;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        cursor: pointer;
    }
</style>