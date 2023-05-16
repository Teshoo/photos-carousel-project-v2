<template>
    <div :class="$style.container">
        <div :class="$style.stageCard">
        <input 
            :class="$style.stageNameInput"
            type="text"
            placeholder="stage name"
            v-model="stage.name"
        />
    </div>
    <button
        :class="{
            [$style.stageCardSaveBtn]: true,
            [$style.stageCardSaveBtnActive]: tempStage.name !== stage.name, 
            [$style.stageCardSaveBtnInactive]: tempStage.name === stage.name,
        }"
        type="submit"
        @click="
            stage.name !== tempStage.name ? updateStage() : null, 
            tempStage.name = stage.name
        "
    >
        Save
    </button>
    
    <button v-if="stage">
        <router-link :to="{ name: 'editStage', params: { stageId: stage.id }}">
                View
        </router-link>
    </button>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import type { PropType } from 'vue';
    import type { TripStage } from '@/js/types/types';
    import { updateStage } from '@/js/services/stage-service';

    export default defineComponent({
        name: 'EditStageCard',
        props: {
            tripStage: { 
                type: Object as PropType<TripStage>,
                required: true,
            },
        },
        data() {
            return {
                stage: {} as TripStage,
                tempStage: {} as TripStage,
            };
        },
        created() {
            this.stage.id = this.tripStage.id;
            this.stage.name = this.tripStage.name;
            this.stage.tripDays = [];
            this.tempStage.name = this.tripStage.name;
        },
        methods: {
            async updateStage() {
                try {
                    const response = await updateStage(this.tripStage['@id'], this.stage);
                    this.stage = response.data;
                    this.tempStage.name = this.stage.name;
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
    .stageCard {
        display: grid;
        grid-template-columns: auto auto;
        padding: 10px;
        gap: 30px;

        width: 700px;

        background: #A5A4D3;
        box-shadow: 0px 4px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 20px;
    }
    .stageNameInput {
        font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        font-size: 18px;
        font-weight: 700;
        line-height: 28px;
        color: #383838;
        
        height: 40px;
        width: 240px;
        background-color: #FFEFD5;

        border-radius: 10px;
        border: none;
        box-sizing: border-box;
        padding: 10px;
    }
    .stageNameInput:focus {
        outline: 1px solid #FF5470;
    }
    .stageCardSaveBtn {
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
    .stageCardSaveBtnActive {
        background: #7C7AEA;
        color: #FFFFFF;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        cursor: pointer;
    }
    .stageCardSaveBtnInactive {
        background: rgba(124, 122, 234, 0.5);
        color: rgba(255, 255, 255, 0.5);
    }
</style>