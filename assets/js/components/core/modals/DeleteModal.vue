<script setup lang="ts">
    import ActionButton from '@/js/components/core/buttons/ActionButton.vue';

    defineEmits<{cancel: [], confirm: []}>();
    const {} = defineProps<{
        isDisplayed: boolean
    }>();
</script>

<template>
    <div 
        :class="{
            [$style.modal]: true,
            [$style.modalDisplayed]: isDisplayed
        }"
    >
        <div :class="$style.container">
            <slot></slot>
            <div :class="$style.buttonsContainer">
                <ActionButton
                    :name="'Cancel'"
                    :btnType="'cancel'"
                    @click="$emit('cancel')"
                />
                <ActionButton
                    :name="'Confirm'"
                    :btnType="'delete'"
                    @click="$emit('confirm')"
                />
            </div>
        </div>
    </div>
</template>

<style module>
    .modal {
        display: none;
        position: fixed;
        z-index: 10000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;

        background-color: rgba(0, 0, 0, 0.5);

        overflow: auto; 
    }
    .modalDisplayed {
        display: grid;
    }
    .container {
        display: grid;
        grid-template-rows: auto auto;
        align-content: center;
        gap: 30px;

        width: 500px;
        height: 200px;
        margin: auto;

        background-color: #2C303F;
        box-shadow: 0px 4px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 20px;

        font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        font-size: 20px;
        font-weight: 500;
        line-height: 36px;
        letter-spacing: 0.1em;
        color: #ffffff;
        text-align: center;
    }
    .buttonsContainer {
        display: grid;
        grid-template-columns: auto auto;
        justify-content: center;
        gap: 30px;
    }
</style>