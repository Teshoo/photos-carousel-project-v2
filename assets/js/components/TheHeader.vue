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
            <div v-if="$route.params.tripId">
                <chevronUrl/>
            </div>
            <div :class="$style.dropdown">
                <div :class="$style.dropbtn">{{ currentTrip.name }}</div>
                <div :class="$style.dropdownContent">
                    <div 
                        :class="$style.dropdownItem" 
                        v-for="trip in trips" 
                        :key="trip[`@id`]" 
                        @click="tripId = trip.id">{{ trip.name }}
                    </div>
                </div>
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
                tripId: null as number|null,
            }
        },
        created() {
            this.TripStore.browseTrips();
        },
        watch: {
            tripId() {
                this.$router.push({ name: 'editTrip', params: { tripId: this.tripId } })
            },
        },
        computed: {
            ...mapState(useTripStore, ['trips', 'currentTrip']),
            ...mapStores(useTripStore),
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
    .dropbtn {
        background-color: #4CAF50;
        color: white;
        padding: 16px;
        font-size: 16px;
        cursor: pointer;
    }
    .dropdown {
        position: relative;
        display: inline-block;
    }
    .dropdownContent {
        display: none;
        position: absolute;
        background-color: #f9f9f9;
        min-width: 160px;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        z-index: 1;
    }
    .dropdownItem:hover {
        background-color: #FF5470;
        cursor: pointer;
    }
    .dropdown:hover .dropdownContent {
        display: block;
    }
    .dropdown:hover .dropbtn {
        background-color: #3e8e41;
    }
</style>