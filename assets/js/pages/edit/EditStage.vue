<script setup lang="ts">
    import { computed, ref, watch, type Ref } from 'vue';
    import router from '@/js/router';
    import { useTripStore } from '@/js/stores/TripStore';
    import { useStageStore } from '@/js/stores/StageStore';
    import { useDayStore } from '@/js/stores/DayStore';
    import { useHideoutStore } from '@/js/stores/HideoutStore';
    import EditDayCard from '@/js/components/edit/EditDayCard.vue';
    import type { TripDay, TripStage } from '@/js/types/types';
    import { cloneStage } from '@/js/services/stage.service';
    import ActionButton from '@/js/components/core/buttons/ActionButton.vue';
    import newDayIcon from '@/icons/new_day_icon.svg';
    import newDayHoverIcon from '@/icons/new_day_hover_icon.svg';

    const tripStore = useTripStore();
    const stageStore = useStageStore();
    const dayStore = useDayStore();
    const hideoutStore = useHideoutStore();

    const stageToEdit: Ref<TripStage> = ref(cloneCurrentStage());
    const areDaysLoading: Ref<boolean> = ref(true);
    const areHideoutsLoading: Ref<boolean> = ref(true);
    const isHovering: Ref<boolean> = ref(false);
    const isDayCreating:Ref<boolean>= ref(false);
    const emptyDay: Ref<TripDay> = ref({
        id: -1,
        name: '',
        date: '',
        startHideout: '',
        endHideout: '',
        tripStage: '/api/trip_stages/' + stageToEdit.value.id,
        pictures: []
    });

    const isStageModified = computed<boolean>(
        () => JSON.stringify(stageStore.getCurrentStage.value) !== JSON.stringify(stageToEdit.value)
    );
    const hasDays = computed<boolean>(
        () => stageToEdit.value.tripDays.length !== 0
    );
    const isLoading = computed<boolean>(
        () => areDaysLoading.value || areHideoutsLoading.value
    )

    browseDays();
    browseHideouts();

    // METHODS //

    function browseDays(): void {
        dayStore.browseDays().then(() => areDaysLoading.value = false);
    }

    function browseHideouts(): void {
        hideoutStore.browseHideouts().then(() => areHideoutsLoading.value = false);
    }

    function cloneCurrentStage(): TripStage {
        return cloneStage(stageStore.getCurrentStage.value);
    }

    function updateCurrentStage(): void {
        if (stageStore.getCurrentStage.value.name !== stageToEdit.value.name) {
            stageStore.updateCurrentStage(stageToEdit.value);
        }
    }

    function deleteCurrentStage(): void {
        if (!hasDays.value) {
            stageStore.removeStage(stageToEdit.value);
            router.push({ name: 'editTrip', params: { stageId: tripStore.getCurrentTrip.value.id }});
        }
    }

    watch(
        () => stageStore.getCurrentStage.value,
        () => { 
            isDayCreating.value = false;
            stageToEdit.value = cloneCurrentStage();
            emptyDay.value.tripStage = '/api/trip_stages/' + stageToEdit.value.id;
            browseDays();
        }
    );
</script>

<template>
    <div :class="$style.container">
        <div v-if="stageStore.getCurrentStage"
            :class="$style.stageEdit"
        >
            <div :class="$style.titles">
                Stage
            </div>
            <input 
                :class="$style.stageNameInput"
                type="text"
                placeholder="stage name"
                v-model="stageToEdit.name"
            />
            <div :class="$style.buttonsContainer">
                <ActionButton  
                    :name="'Save'"
                    :btn-type="'save'"
                    :disabled="!isStageModified"
                    @click="updateCurrentStage()"
                />
                <ActionButton
                    :name="'Delete'"
                    :btn-type="'delete'"
                    :disabled="hasDays"
                    @click="deleteCurrentStage()"
                />
            </div>
        </div>
        <div v-if="isLoading === false"
            :class="$style.daysContainer"
        >
            <div :class="$style.titles">
                Days ({{ dayStore.getDays.value.length }})
            </div>
            <div v-for="day in dayStore.getDays.value">
                <EditDayCard :day="day"/>
            </div>
            <EditDayCard v-if="isDayCreating"
                :key="dayStore.currentDay.id"
                :day="emptyDay"
                @no-day-creating="isDayCreating = false"
            />
            <div v-if="!isDayCreating"
                :class="$style.newDayContainer"
            >
                <div
                    :class="$style.newDayButton"
                    @click="isDayCreating = true, isHovering = false"
                    @mouseover="isHovering = true"
                    @mouseleave="isHovering = false"
                >
                    <div v-if="!isHovering">
                        <newDayIcon />
                    </div>
                    <div v-if="isHovering">
                        <newDayHoverIcon />
                    </div>
                </div>
                <div :class="$style.newDayShadowButtons"></div>
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
    .stageEdit {
        display: grid;
        grid-template-columns: auto auto auto;
        justify-content: start;
        align-items: center;
        gap: 20px;
    }
    .stageNameInput {
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
        padding: 10px;
    }
    .stageNameInput:focus {
        outline: 5px solid #7C7AEA;
    }
    .buttonsContainer {
        display: grid;
        grid-template-columns: 1fr 1fr;
        align-content: center;
        gap: 10px;

        width: 100px;
    }
    .daysContainer {
        display: grid;
        grid-template-columns: 1fr;
        gap: 30px;
    }
    .newDayContainer {
        display: grid;
        grid-template-columns: auto auto;
        justify-items: center;
        justify-content: center;
        align-items: center;
        gap: 20px;
    }
    .newDayButton {
        cursor: pointer;
    }
    .newDayShadowButtons {
        height: 100px;
        width: 100px;
    }
</style>