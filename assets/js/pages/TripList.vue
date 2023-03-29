<template>
    <div>
        Trips :
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import TripCard from '@/js/components/TripCard.vue';

    export default defineComponent({
        name: 'TripList',
        components: {
            TripCard,
        },
    });
</script>

<style module>

</style>