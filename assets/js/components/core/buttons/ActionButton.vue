<script setup lang="ts">
    const props = defineProps({
        name: { type: String, required: true },
        btnType: { type: String, default: 'default' }
    });
</script>

<template>
    <button
        :class="{
            [$style.baseBtn]: true,
            [$style.defaultBtn]: props.btnType === 'default',
            [$style.saveBtn]: props.btnType === 'save',
            [$style.cancelBtn]: props.btnType === 'cancel',
            [$style.deleteBtn]: props.btnType === 'delete',
        }"
    >
        <div>
            {{ props.name }}
        </div>
    </button>
</template>

<style module>
    .baseBtn {
        display: grid;
        grid-template-columns: 1fr;
        align-items: center;
        justify-items: center;

        width: 100px;
        height: 35px;

        border: none;
        border-radius: 20px;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        
        box-sizing: border-box;

        font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        line-height: 19px;
        letter-spacing: 0.1em;
        color: #FFFFFF;

        cursor: pointer;
    }
    .baseBtn:disabled {
        opacity: 0.5;
        cursor: default;
    }
    .defaultBtn {
        background: #7C7AEA;
    }
    .saveBtn {
        background: #7C7AEA;
    }
    .cancelBtn {
        background: #e49c53;
    }
    .deleteBtn {
        background: #EC6666;
    }
</style>