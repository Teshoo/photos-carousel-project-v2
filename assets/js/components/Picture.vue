<script setup lang="ts">
    import { computed, useTemplateRef, watch } from 'vue';
    import type { Picture } from '@/js/types/types';
    import { usePictureStore } from '@/js/stores/PictureStore';

    const props = defineProps<{ picture: Picture, currentPictureIndex: number}>();

    const pictureStore = usePictureStore();
    const pictureRef = useTemplateRef('pictureRef');

    const isPictureIndex = computed<boolean>(
        () =>   props.currentPictureIndex !== -1 
                && props.currentPictureIndex !== pictureStore.getPictures.value.length
    );

    // METHODS

    watch(
        [() => pictureStore.getCurrentPicture.value, () => props.currentPictureIndex],
        () => { 
            if (pictureRef.value !== null)
            {
                if (props.picture.id === pictureStore.getCurrentPicture.value.id && isPictureIndex.value)
                {
                    pictureRef.value.scrollIntoView({behavior: 'smooth', inline: 'center'});
                }
            }
        }
    );
</script>
<template>
    <img 
        :class="$style.picture"
        :src="'/images/pictures/' + picture.imageName"
        ref="pictureRef"
    >
</template>
<style module>
    .picture {
        box-sizing: content-box;
        max-width: 100%;
        max-height: 100%;
    }
</style>