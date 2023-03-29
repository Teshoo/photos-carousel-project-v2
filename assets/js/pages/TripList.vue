<template>
    <div>
        <the-header :title="title" />
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import TheHeader from '@/js/components/TheHeader.vue';

    export default defineComponent({
        name: 'Homepage',
        components: {
            TheHeader
        },
        data() {
            return {
                title: 'Photo Carousel',
            };
        },
    });
</script>

<style module>

</style>