<template>
    <div :class="$style.container">
        <div :class="$style.dayCard">
        <input 
            :class="$style.dayNameInput"
            type="text"
            placeholder="day name"
            v-model="day.name"
        />
    </div>
    <button
        :class="{
            [$style.dayCardSaveBtn]: true,
            [$style.dayCardSaveBtnActive]: tempDay.name !== day.name, 
            [$style.dayCardSaveBtnInactive]: tempDay.name === day.name,
        }"
        type="submit"
        @click="
            day.name !== tempDay.name ? updateDay() : null, 
            tempDay.name = day.name
        "
    >
        Save
    </button>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import type { PropType } from 'vue';
    import type { TripDay } from '@/js/types/types';
    import { updateDay } from '@/js/services/day-service';

    export default defineComponent({
        name: 'EditDayCard',
        props: {
            tripDay: { 
                type: Object as PropType<TripDay>,
                required: true,
            },
        },
        data() {
            return {
                day: {} as TripDay,
                tempDay: {} as TripDay,
            };
        },
        created() {
            this.day.name = this.tripDay.name;
            this.day.pictures = [];
            this.tempDay.name = this.tripDay.name;
        },
        methods: {
            async updateDay() {
                try {
                    const response = await updateDay(this.tripDay['@id'], this.day);
                    this.day = response.data;
                    this.tempDay.name = this.day.name;
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
    .dayCard {
        display: grid;
        grid-template-columns: auto auto;
        padding: 10px;
        gap: 30px;

        width: 700px;

        background: #A5A4D3;
        box-shadow: 0px 4px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 20px;
    }
    .dayNameInput {
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
    .dayNameInput:focus {
        outline: 1px solid #FF5470;
    }
    .dayCardSaveBtn {
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
    .dayCardSaveBtnActive {
        background: #7C7AEA;
        color: #FFFFFF;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        cursor: pointer;
    }
    .dayCardSaveBtnInactive {
        background: rgba(124, 122, 234, 0.5);
        color: rgba(255, 255, 255, 0.5);
    }
</style>