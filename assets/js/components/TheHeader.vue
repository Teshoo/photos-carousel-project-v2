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
                            v-if="!($route.params.tripId)"
                        >
                            {{ title }}
                        </div>
                    </div>
                </router-link>
            </div>
            <chevronbcUrl v-if="$route.params.tripId"/>
            <div
                :class="$style.editingLabel" 
                v-if="$route.params.tripId"
            >
                Editing
            </div>
            <chevronbcUrl v-if="$route.params.tripId"/>
            <div
                v-if="$route.params.tripId" 
                :class="$style.dropdown"
            >
                <div :class="$style.dropbtn">
                    {{ currentTrip.name }}
                    <chevrondpnUrl/>
                </div>
                <div :class="$style.dropdownContent">
                    <div 
                        :class="$style.dropdownItem" 
                        v-for="trip in trips" 
                        :key="trip[`@id`]" 
                        @click="tripId = trip.id"
                    >
                        {{ trip.name }}
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
    import chevronbcUrl from '@/icons/chevron_breadcrumb.svg';
    import chevrondpnUrl from '@/icons/chevron_dropdownmenu.svg';
    import homeIcon from '@/icons/home_icon.svg';
    
    export default defineComponent({
        name: 'TheHeader',
        components: {
            homeIcon,
            chevronbcUrl,
            chevrondpnUrl,
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
        padding: 0px 10px 0px 10px;

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
    .editingLabel {
        font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        font-style: normal;
        font-weight: 700;
        font-size: 25px;
        line-height: 29px;
        letter-spacing: 0.1em;

        color: #FFFFFF;
    }
    .dropbtn {
        display: grid;
        grid-template-columns: auto auto;
        justify-content: space-between;
        align-items: center;
        padding: 10px 15px;
        gap: 10px;

        width: 250px;
        height: 50px;

        background: rgba(0, 0, 0, 0.2);

        border: 2px solid #FFEFD5;
        border-radius: 10px;
        box-sizing: border-box;
        
        cursor: pointer;

        font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        font-style: normal;
        font-weight: 700;
        font-size: 25px;
        line-height: 29px;
        color: #FFFFFF;
    }
    .dropdown {
        position: relative;
        display: inline-block;
    }
    .dropdownContent {
        display: none;
        position: absolute;

        background-color: #FFAA1D;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.4);

        width: 250px;
        
        border: 2px solid #FFEFD5;
        border-radius: 0px 0px 10px 10px;
        border-style: none solid solid solid;        
        box-sizing: border-box;

        cursor: pointer;

        z-index: 1;
    }
    .dropdownItem {
        display: grid;
        justify-content: flex-start;
        align-items: center;
        padding: 10px 15px;
        box-sizing: border-box;

        height: 50px;
        background: rgba(0, 0, 0, 0.2);

        font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 25px;
        line-height: 29px;
        color: #FFFFFF;
    }
    .dropdownItem:hover {
        background: rgba(0, 0, 0, 0.3);
    }
    .dropdown:hover .dropdownContent {
        display: block;
        box-sizing: border-box;
    }
    .dropdown:hover .dropbtn {
        background: rgba(0, 0, 0, 0.3);
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.4);
        border-style: solid solid none solid;
        border-radius: 10px 10px 0px 0px;
    }
</style>