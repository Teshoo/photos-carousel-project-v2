<script setup lang="ts">
    import { ref, watch, type Ref } from 'vue';
    import { useStageStore } from '@/js/stores/StageStore';
    import { useDayStore } from '@/js/stores/DayStore';
    import DayCard from '@/js/components/DayCard.vue';

    const stageStore = useStageStore();
    const dayStore = useDayStore();
    const areDaysLoading: Ref<boolean> = ref(true);

    browseDays();

    // METHODS
    
    function browseDays(): void {
        dayStore.browseDays().then(() => areDaysLoading.value = false);
    }

    watch(
        () => stageStore.getCurrentStage.value,
        () => { 
            areDaysLoading.value = true;
            browseDays();
        }
    );

</script>
<template>
    <div :class="$style.container">
        <div :class="$style.title">
            {{ stageStore.getCurrentStage.value.name.toUpperCase() }}
        </div>
        <div v-if="areDaysLoading"
            :class="$style.loading"
        >
            Loading...
        </div>
        <div v-if="!areDaysLoading"
            :class="$style.daysContainer"
        >
            <div :class="$style.dayCards">
                <div v-for="day in dayStore.getDays.value">
                    <day-card
                        :day="day"
                        :key="day.id"
                    /> 
                </div>
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

    .title {
        font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        font-size: 24px;
        font-weight: 700;
        line-height: 28px;
        letter-spacing: 0.1em;
        text-align: left;
        color: #FFEFD5;
    }

    .daysContainer {
        display: grid;
        grid-template-columns: 1fr 1fr;
        justify-content: space-between;
        justify-items: center;
        gap: 20px;
    }

    .dayCards {
        display: grid;
        grid-template-columns: 1fr;
        gap: 15px;
    }

    .loading {
        display: grid;
        grid-template-columns: 1fr;
        justify-items: center;

        font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        font-size: 24px;
        font-weight: 700;
        line-height: 28px;
        letter-spacing: 0.1em;
        text-align: left;
        color: #FFF;
    }
</style>