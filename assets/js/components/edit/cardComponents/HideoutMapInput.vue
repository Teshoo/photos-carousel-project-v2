<script setup lang="ts">
    import { computed, ref, useTemplateRef, type Ref } from 'vue';
    import { LMap, LTileLayer, LMarker, LIcon } from '@vue-leaflet/vue-leaflet';
    import 'leaflet/dist/leaflet.css';
    import type { Hideout } from '@/js/types/types';
    import { useHideoutStore } from '@/js/stores/HideoutStore';

    const currentMarkerUrl: string = '/assets/currentMarker.svg';
    const markerUrl: string = '/assets/marker.svg';

    const hideoutStore = useHideoutStore();
    const props = defineProps<{ hideoutToEdit: Hideout }>();
    const hideoutLat = defineModel<string>('lat', { required: true });
    const hideoutLng = defineModel<string>('lng', { required: true });
    const marker = useTemplateRef<any>('marker');
    
    // MAP ATTRIBUTES //

    const zoom: Ref<number> = ref(10);
    const hideoutCenter = computed<[string, string]>(() => [hideoutLat.value, hideoutLng.value]);
    const iconSize: Ref<[number, number]> = ref([15, 15]);
    
    // BOOLEANS //

    function isHideoutToEdit(hideout: Hideout): boolean {
        return hideout.id === props.hideoutToEdit.id;
    }

    // METHODS //

    function updateHideoutLatLng(): void {
        const markerLatLng = marker.value?.leafletObject.getLatLng();
        hideoutLat.value = sliceCoord(markerLatLng.lat + '');
        hideoutLng.value = sliceCoord(markerLatLng.lng + '');
    }

    function sliceCoord(str: string): string {
        return str.split('.')[0] + '.' + str.split('.')[1].slice(0, 6);
    }
</script>

<template>
    <main>
        <l-map ref="map"
            :style="{ borderRadius: '10px' }"
            v-model:zoom="zoom"
            v-model:center="hideoutCenter"
            :use-global-leaflet="false"
            :options="{ zoomControl: false }"
        >
            <l-tile-layer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                layer-type="base"
                name="OpenStreetMap"
            />
            
            <l-marker ref="marker"
                :lat-lng="[hideoutLat, hideoutLng]"
                :draggable="true"
                :z-index-offset="500"
                @dragend="updateHideoutLatLng()"
            >
                <l-icon
                    :icon-url="currentMarkerUrl"
                    :icon-size="iconSize"
                />
            </l-marker>
            
            <div v-for="hideout in hideoutStore.getHideouts.value"
                :key="hideout.id"
            >
                <l-marker v-if="!isHideoutToEdit(hideout)" 
                    :lat-lng="[hideout.lat, hideout.lng]"
                >
                    <l-icon v-if="hideout.lat && hideout.lng"
                        :icon-url="markerUrl"
                        :icon-size="iconSize"
                    />
                </l-marker>
            </div>
        </l-map>
    </main>
</template>