<script setup lang="ts">
    import { useTemplateRef, watch } from 'vue';
    import type { Picture } from '@/js/types/types';
    import { usePictureStore } from '@/js/stores/PictureStore';

    const props = defineProps<{ picture: Picture }>();

    const pictureStore = usePictureStore();
    const pictureRef = useTemplateRef('pictureRef');

    // METHODS

    watch(
        () => pictureStore.getCurrentPicture.value,
        () => { 
            if (pictureRef.value !== null)
            {
                if (props.picture.id === pictureStore.getCurrentPicture.value.id)
                {
                    pictureRef.value.scrollIntoView({behavior: 'smooth', inline: 'center'});
                }
                
            }
        }
    )
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