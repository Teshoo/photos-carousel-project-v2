<script setup lang="ts">
    import { ref, useTemplateRef, type Ref } from 'vue';
    import { LMap, LTileLayer, LMarker, LIcon } from '@vue-leaflet/vue-leaflet';
    import 'leaflet/dist/leaflet.css';
    import type { TripStage } from '@/js/types/types';
    import { useStageStore } from '@/js/stores/StageStore';

    const currentMarkerUrl: string = '/assets/currentMarker.svg';
    const markerUrl: string = '/assets/marker.svg';

    const stageStore = useStageStore();
    const props = defineProps<{ stageToEdit: TripStage }>();
    const stageLat = defineModel<string>('lat', { required: true });
    const stageLng = defineModel<string>('lng', { required: true });
    const marker = useTemplateRef<any>('marker');
    
    // MAP ATTRIBUTES //

    const zoom: Ref<number> = ref(10);
    const pictureCenter: Ref<[any, any]> = ref([stageLat.value, stageLng.value]);
    const iconSize: Ref<[number, number]> = ref([15, 15]);

    // BOOLEANS //

    function isStageToEdit(stage: TripStage): boolean {
        return stage.id === props.stageToEdit.id;
    }

    // METHODS //

    function updateStageLatLng(): void {
        const markerLatLng = marker.value?.leafletObject.getLatLng();
        stageLat.value = sliceCoord(markerLatLng.lat + '');
        stageLng.value = sliceCoord(markerLatLng.lng + '');
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
        v-model:center="pictureCenter"
        :use-global-leaflet="false"
    >
        <l-tile-layer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            layer-type="base"
            name="OpenStreetMap"
        />
        <l-marker ref="marker"
            :lat-lng="[stageLat, stageLng]"
            :draggable="true"
            :z-index-offset="500"
            @dragend="updateStageLatLng()"
        >
            <l-icon
                :icon-url="currentMarkerUrl"
                :icon-size="iconSize"
            />
        </l-marker>
        <div v-for="stage in stageStore.getStages.value"
            :key="stage.id"
        >
            <l-marker v-if="!isStageToEdit(stage)" 
                :lat-lng="[stage.lat, stage.lng]"
            >
                <l-icon v-if="stage.lat && stage.lng"
                    :icon-url="markerUrl"
                    :icon-size="iconSize"
                />
            </l-marker>
        </div>
    </l-map>
  </main>
</template>