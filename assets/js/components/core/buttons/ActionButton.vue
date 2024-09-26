<script setup lang="ts">
    const {btnType = 'default'} = defineProps<{
        name: string,
        btnType: string
    }>();
</script>

<template>
    <button
        :class="{
            [$style.baseBtn]: true,
            [$style.defaultBtn]: btnType === 'default',
            [$style.saveBtn]: btnType === 'save',
            [$style.cancelBtn]: btnType === 'cancel',
            [$style.deleteBtn]: btnType === 'delete',
        }"
    >
        <div>
            {{ name }}
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
        background: #638f63;
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