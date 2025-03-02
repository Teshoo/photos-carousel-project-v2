<script setup lang="ts">
    import { useRouter } from 'vue-router';
    import type { TripDay } from '@/js/types/types'
    import { useDayStore } from '@/js/stores/DayStore';

    defineProps<{ day: TripDay }>()

    const router = useRouter();
    const dayStore = useDayStore();

    async function changeCurrentDay(day: TripDay) {
        await dayStore.browseCurrentDay(day.id);
        router.push({ name: 'carousel', params: { dayId: dayStore.getCurrentDay.value.id } });
    }
</script>

<template>
    <div 
        :class="$style.card"
        @click="changeCurrentDay(day)"
    >
        <div :class="$style.dayName">
            {{ day.name }}
        </div>
        <div :class="$style.dayStats">
            > ## pictures
        </div>
    </div>
</template>

<style module>
    .card {
        position: relative;

        display: grid;
        grid-template-columns: auto auto;
        justify-content: space-between;
        align-content: center;
        width: 460px;
        height: 50px;

        padding: 10px;
        box-sizing: border-box;

        background-color: #FF5470;
        border: 3px solid #FFFFFF;
        border-radius: 25px;

        cursor: pointer;
    }
    .dayName {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        padding: 0px 0px 0px 10px;

        width: 200px;
        height: 30px;

        background: #FF5470;
        border-radius: 10px;

        font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        font-size: 20px;
        font-weight: 700;
        line-height: 23px;
        letter-spacing: 0.1em;
        text-align: left;
        color: #FFFFFF;
    }
    .dayStats {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        padding: 0px 10px 0px 10px;

        width: fit-content;
        height: 30px;

        background: rgba(77, 75, 144, 0.85);
        border-radius: 10px;

        font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        font-size: 16px;
        font-weight: 700;
        line-height: 19px;
        letter-spacing: 0.1em;
        text-align: left;
        color: #FFFFFF;
    }
</style>