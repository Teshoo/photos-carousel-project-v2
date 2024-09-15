<script setup lang="ts">
    import { ref, useTemplateRef, type Ref } from 'vue';

    const model = defineModel();
    const emit = defineEmits(['input']);
    const props = defineProps({ imageName: { type: String, required: false } });
    const fileInput = useTemplateRef('fileInput');
    const imageData: Ref<any> = ref(initImageDate());

    function chooseImage() {
        if (fileInput.value !== null) {
            fileInput.value.click();
        }
    }

    function initImageDate() {
        if(props.imageName) {
            return '/images/pictures/' + props.imageName;
        } else {
            return null;
        }
    }

    function onSelectFile() {
        if (fileInput.value !== null) {
            const files: FileList | null = fileInput.value.files;
            if (files && files[0]) {
                const reader = new FileReader;
                reader.onload = e => {
                    imageData.value = e.target?.result;
                }
                reader.readAsDataURL(files[0]);
                emit('input', files[0]);
                model.value = files[0]; 
            }
        }
    }
</script>

<template>
    <div 
        :class="$style.baseImageInput"
        :style="{ backgroundImage: `url(${imageData})` }"
        @click="chooseImage()"
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
            @input="onSelectFile()"
        >
    </div>
</template>

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