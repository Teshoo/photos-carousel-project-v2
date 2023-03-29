<template>
    <div>
        <the-header :title="title" />
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import TheHeader from '@/js/components/TheHeader.vue';
    import TripList from '@/js/pages/TripList.vue';

    export default defineComponent({
        name: 'Main',
        components: {
            TheHeader,
            TripList,
        },
        data() {
            return {
                title: 'Korea trip\'s pictures',
            };
        },
    });
</script>

<style></style>