<script setup lang="ts">
    import { computed, ref, watch, type Ref } from 'vue';
    import { LMap, LTileLayer, LMarker, LIcon, LPolyline } from '@vue-leaflet/vue-leaflet';
    import 'leaflet/dist/leaflet.css';
    import type { Picture } from '@/js/types/types';
    import { usePictureStore } from '@/js/stores/PictureStore';
    import { useHideoutStore } from '@/js/stores/HideoutStore';

    const currentMarkerUrl: string = '/assets/currentMarker.svg';
    const markerUrl: string = '/assets/marker.svg';
    const hideoutMarkerUrl: string = '/assets/shelterMarker.svg';

    const props = defineProps<{ currentPictureIndex: number }>();

    const pictureStore = usePictureStore();
    const hideoutStore = useHideoutStore();

    interface FarthestCoordinates {
        higestLat: number,
        lowestLat: number,
        higestLng: number,
        lowestLng: number
    }

    const isPictureIndex = computed<boolean>(
        () =>   props.currentPictureIndex !== -1 
                && props.currentPictureIndex !== pictureStore.getPictures.value.length
    );

    // MAP ATTRIBUTES

    const zoom: Ref<number> = ref(16);

    const markerSize: Ref<[number, number]> = ref([15, 15]);
    const currentMarkerSize: Ref<[number, number]> = ref([25, 25]);
    const hideoutSize: Ref<[number, number]> = ref([30, 30]);

    const markerZIndex: Ref<number> = ref(1500);
    const currentMarkerZIndex: Ref<number> = ref(1000);
    const hideoutZIndex: Ref<number> = ref(400);

    const polylineColor: Ref<string> = ref('#FF5470');
    const polylineDashArray: Ref<string> = ref('1 4');
    const polylineDashOffset: Ref<string> = ref('20');

    const center = computed<[string, string]>(() => {
        if (!isPictureIndex.value) {
            return getDayPicturesCenter();
        } else {
            return [pictureStore.getCurrentPicture.value.lat, pictureStore.getCurrentPicture.value.lng];
        }
        
    });

    // BOOLEANS

    function isFirstPicture(index: number): boolean {
        return index === 0;
    }

    function isMarkerVisible(index: number): boolean {
        return index < props.currentPictureIndex;
    }

    function isPolylineVisible(index: number): boolean {
        return index <= props.currentPictureIndex;
    }

    // METHODS

    function setPolylineStart(picture: Picture, index: number): [string, string] {
        if (index > 0) {
            return [getPreviousPicture(index).lat, getPreviousPicture(index).lng];
        } else {
            return [picture.lat, picture.lng];
        }
    }

    function getPreviousPicture(index: number): Picture {
        return pictureStore.getPictures.value[index-1];
    }

    function getDayPicturesCenter(): [string, string] {
        const farthestCoordinates: FarthestCoordinates = getFarthestCoordinates();
        const centerLat: string = ((farthestCoordinates.higestLat + farthestCoordinates.lowestLat)/2).toString();
        const centerLng: string = ((farthestCoordinates.higestLng + farthestCoordinates.lowestLng)/2).toString();
        return [centerLat, centerLng];
    }

    function getFarthestCoordinates(): FarthestCoordinates {
        let farthestCoordinates: FarthestCoordinates = {
            higestLat: Number(pictureStore.pictures[0].lat),
            lowestLat: Number(pictureStore.pictures[0].lat),
            higestLng: Number(pictureStore.pictures[0].lng),
            lowestLng: Number(pictureStore.pictures[0].lng)
        }

        pictureStore.pictures.forEach(picture => {
            const pictureLat: number = Number(picture.lat);
            const pictureLng: number = Number(picture.lng);

            if (farthestCoordinates.higestLat < pictureLat) {
                farthestCoordinates.higestLat = pictureLat;
            }
            if (farthestCoordinates.lowestLat > pictureLat) {
                farthestCoordinates.lowestLat = pictureLat;
            }
            if (farthestCoordinates.higestLng < pictureLng) {
                farthestCoordinates.higestLng = pictureLng;
            }
            if (farthestCoordinates.lowestLng > pictureLng) {
                farthestCoordinates.lowestLng = pictureLng;
            }
        });
        return farthestCoordinates;
    }
</script>
<template>
    <l-map ref="map"
        :style="{ borderRadius: '20px' }"
        v-model:zoom="zoom"
        v-model:center="center"
        :use-global-leaflet="false"
    >
        <l-tile-layer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            layer-type="base"
            name="OpenStreetMap"
        />
        <l-marker v-if="isPictureIndex"
            ref="marker"
            :lat-lng="[pictureStore.getCurrentPicture.value.lat, pictureStore.getCurrentPicture.value.lng]"
            :z-index-offset="currentMarkerZIndex"
        >
            <l-icon
                :icon-url="currentMarkerUrl"
                :icon-size="currentMarkerSize"
            />
        </l-marker>
        <div v-for="(picture, index) in pictureStore.getPictures.value"
            :key="picture.id"
        >
            <l-marker
                :lat-lng="[picture.lat, picture.lng]"
                :z-index-offset="markerZIndex"
                :visible="isMarkerVisible(index)"
            >
                <l-icon
                    :icon-url="markerUrl"
                    :icon-size="markerSize"
                />
            </l-marker>
            <div v-if="!isFirstPicture(index)">
                <l-polyline
                    :lat-lngs="[
                        setPolylineStart(picture, index),
                        [picture.lat, picture.lng]
                    ]"
                    :color="polylineColor"
                    :dash-array="polylineDashArray"
                    :dash-offset="polylineDashOffset"
                    :visible="isPolylineVisible(index)"
                />
            </div>
        </div>
        <l-marker v-for="hideout in hideoutStore.getHideouts.value"
            :key="hideout.id"
            :lat-lng="[hideout.lat, hideout.lng]"
            :z-index-offset="hideoutZIndex"
        >
            <l-icon
                :icon-url="hideoutMarkerUrl"
                :icon-size="hideoutSize"
            />
      </l-marker>
    </l-map>
</template>
<style module>
</style>