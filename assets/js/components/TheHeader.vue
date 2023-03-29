<template>
    <div>
        <div :class="$style.headerMenu">
            <div :class="$style.homepageButton">
                Picture Carousel
            </div>
            <div>
                <chevronUrl/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import chevronUrl from '@/icons/chevron_breadcrumb.svg';

    export default defineComponent({
        name: 'TheHeader',
        components: {
            chevronUrl,
        },
    });
</script>

<style module>
    .headerMenu {
        display: flex;
        flex-direction: row;
        justify-content: start;
        align-items: center;
        gap: 20px;

        width: auto;
        height: 90px;
        padding-left: 10%;

        background-color: #FFAA1D;
    }
    .homepageButton {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;

        height: 50px;
        padding: 0px 10px 2px 10px;

        background-color: #FF5470;
        box-sizing: border-box;
        border: 3px solid #FFFFFF;
        border-radius: 15px;

        font-family: 'Comic Sans MS';
        font-weight: 700;
        font-size: 25px;
        line-height: 35px;
        color: #FFFFFF;
        
    }
</style>