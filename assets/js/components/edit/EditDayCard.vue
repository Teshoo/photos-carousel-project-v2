<script setup lang="ts">
    import { computed, ref, type Ref } from 'vue';
    import { useRouter } from 'vue-router';
    import type { TripDay } from '@/js/types/types';
    import { useDayStore } from '@/js/stores/DayStore';
    import { cloneDay } from '@/js/services/day.service';
    import ActionButton from '@/js/components/core/buttons/ActionButton.vue';

    const router = useRouter();
    const dayStore = useDayStore();

    const props = defineProps<{ day: TripDay }>();
    const emit = defineEmits<{ noDayCreating: [] }>();

    const dayToEdit: Ref<TripDay> = ref(cloneDayToEdit());
    const isNewDay: Ref<boolean> = ref(props.day.id === -1);

    const isDayModified = computed<boolean>(
        () => JSON.stringify(props.day) !== JSON.stringify(dayToEdit.value)
    );

    initNewDay();

    // METHODS //

    function initNewDay(): void {
        const lastDay: any = dayStore.getDays.value.findLast((day) => day);
        if (lastDay !== undefined && isNewDay.value) {
            const day: TripDay = lastDay;
            dayToEdit.value.date = day.date;
            dayToEdit.value.startHideout = day.startHideout;
            dayToEdit.value.endHideout = day.endHideout;
        }
    }

    function cancelNewDay(): void {
        emit('noDayCreating');
    }

    async function createDay(): Promise<void> {
        if (isNewDay) {
            await dayStore.newDay(dayToEdit.value);
            emit('noDayCreating');
        }
    }

    function editDay(): void {
        if (isDayModified) {
            dayStore.editDay(dayToEdit.value);
        }
    }

    function cloneDayToEdit(): TripDay {
        return cloneDay(props.day);
    }

    async function changeCurrentDay(): Promise<void> {
        await dayStore.browseCurrentDay(props.day.id);
        router.push({ name: 'editDay', params: { dayId: dayStore.getCurrentDay.value.id } });
    }
</script>

<template>
    <div :class="$style.container">
        <div :class="$style.dayCard">
            <div :class="$style.dayCardLeft">
                <input 
                    :class="[$style.dayCardInput, $style.dayNameInput]"
                    type="text"
                    placeholder="day name"
                    v-model="dayToEdit.name"
                />
                <input 
                    :class="[$style.dayCardInput, $style.dayDateInput]"
                    type="date"
                    placeholder="day date"
                    v-model="dayToEdit.date"
                />
            </div>
            <div :class="$style.dayCardRight">
                <select 
                    :class="[$style.dayCardInput, $style.dayHideoutInput]"
                    v-model="dayToEdit.startHideout"
                    disabled
                >
                </select>
                <select 
                    :class="[$style.dayCardInput, $style.dayHideoutInput]"
                    v-model="dayToEdit.endHideout"
                    disabled
                >
                </select>
            </div>
        </div>
        <div :class="$style.buttonsContainer">
            <ActionButton v-if="!isNewDay"
                :name="'View'"
                :btn-type="'default'"
                @click="changeCurrentDay()"
            />
            <ActionButton  
                :name="isNewDay ? 'Create' : 'Save'"
                :btn-type="'save'"
                :disabled="!isDayModified"
                @click="isNewDay ? createDay() : editDay()"
            />
            <ActionButton v-if="isNewDay"
                :name="'Cancel'"
                :btn-type="'cancel'"
                @click="cancelNewDay()"
            />
        </div>
    </div>
</template>

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
        justify-content: space-between;
        padding: 10px;

        width: 500px;

        background: #A5A4D3;
        box-shadow: 0px 4px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 20px;
    }
    .dayCardLeft {
        display: grid;
        grid-template-rows: auto auto;
        gap: 20px
    }
    .dayCardRight {
        display: grid;
        grid-template-rows: auto auto;
        gap: 20px
    }
    .dayCardInput {
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
    .dayCardInput:focus {
        outline: 1px solid #FF5470;
    }
    .dayNameInput {
        width: 240px;
    }
    .dayDateInput {
        width: 170px;
    }
    .dayHideoutInput {
        width: 170px;
    }
    .buttonsContainer {
        display: grid;
        grid-template-rows: 1fr 1fr;
        align-content: center;
        gap: 10px;

        width: 100px;
    }
</style>