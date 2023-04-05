<template>
    <div>
        <div :class="$style.headerMenu">
            <div>
                <router-link to="/">
                    <div :class="$style.homepageButton">
                        <div v-if="$route.params.tripId">
                            <homeIcon/>
                        </div>
                        <div 
                            :class="$style.homepageButtonTitle" 
                            v-if="!($route.params.tripId)
                        ">
                            {{ title }}
                        </div>
                    </div>
                </router-link>
            </div>
            <div>
                <chevronUrl/>
            </div>
            <div v-if="$route.params.tripId">
                <select v-model="tripId">
                <option :value="tripId">Please select one</option>
                <option v-for="trip in trips" :key="trip[`@id`]">{{ trip.name }}</option>
                </select>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import { mapState, mapStores } from 'pinia';
    import { useTripStore } from '@/js/stores/TripStore';
    import chevronUrl from '@/icons/chevron_breadcrumb.svg';
    import homeIcon from '@/icons/home_icon.svg';
    
    export default defineComponent({
        name: 'TheHeader',
        components: {
            homeIcon,
            chevronUrl,
        },
        props: {
            title: { type: String, required: true }
        },
        data() {
            return {
                tripId: null as string|null,
            }
        },
        created() {
            this.TripStore.browseTrips();
        },
        computed: {
            ...mapState(useTripStore, ['trips']),
            ...mapStores(useTripStore)
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
        display: grid;
        grid-template-columns: auto;
        align-items: center;
        align-content: center;
        justify-items: center;
        justify-content: center;

        height: 50px;
        padding: 0px 10px 2px 10px;

        background-color: #FF5470;
        box-sizing: border-box;
        border: 3px solid #FFFFFF;
        border-radius: 15px;       
    }
    .homepageButtonTitle {
        font-family: 'Comic Sans MS';
        font-weight: 700;
        font-size: 25px;
        line-height: 35px;
        color: #FFFFFF; 
    }
</style>