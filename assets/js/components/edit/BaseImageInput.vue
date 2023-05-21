<template>
    <div 
        :class="$style.baseImageInput"
        :style="{ backgroundImage: `url(${imageData})` }"
        @click="chooseImage"
    >
        <span 
            :class="$style.placeholder"
            v-if="!imageData"
        >
            Import your picture
        </span>
        <input
            :class="$style.fileInput"
            ref="fileInput"
            type="file"
            @input="onSelectFile"
        >
    </div>
</template>

<script lang="ts">
    import { defineComponent, ref } from 'vue';
    import type { Ref } from 'vue';

    export default defineComponent ({
        name: 'BaseImageInput',
        data () {
            return {
                imageData: null as any,
                fileInput: ref(null) as Ref<HTMLElement | null>,
            }
        },
        methods: {
            chooseImage () {
                this.$refs.fileInput.click();
            },
            onSelectFile () {
                const input = this.$refs.fileInput;
                const files = input.files;
                if (files && files[0]) {
                    const reader = new FileReader;
                    reader.onload = e => {
                        this.imageData = e.target?.result;
                    }
                    reader.readAsDataURL(files[0]);
                    this.$emit('input', files[0]);
                }
            },
        }
    })
</script>

<style module>
    .baseImageInput {
        display: block;

        width: 100%;
        height: 100%;
        
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center center;

        border-radius: 10px;

        cursor: pointer;
    }
    .placeholder {        
        display: grid;
        justify-content: center;
        align-items: center;

        width: 100%;
        height: 100%;

        background-color: rgba(255, 239, 213, 0.5);
        border-radius: 10px;

        font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        letter-spacing: 0.1em;
    }
    .placeholder:hover {
        background-color: rgba(255, 239, 213, 0.5);
    }
    .fileInput {
        display: none;
    }
</style>