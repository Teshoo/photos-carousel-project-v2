<script setup lang="ts">
    import { ref, useTemplateRef, type Ref } from 'vue';
    import { LMap, LTileLayer, LMarker, LIcon, LPolyline } from '@vue-leaflet/vue-leaflet';
    import 'leaflet/dist/leaflet.css';
    import type { Picture } from '@/js/types/types';
    import { usePictureStore } from '@/js/stores/PictureStore';

    const currentMarkerUrl: string = '/assets/currentMarker.svg';
    const markerUrl: string = '/assets/marker.svg';

    const pictureStore = usePictureStore();
    const props = defineProps<{ pictureToEdit: Picture }>();
    const pictureLat = defineModel<string>('lat', { required: true });
    const pictureLng = defineModel<string>('lng', { required: true });
    const marker = useTemplateRef<any>('marker');

    const lastPictureIndex: Ref<number> = ref(pictureStore.getPictures.value.findLastIndex((element) => element));
    
    // MAP ATTRIBUTES //

    const zoom: Ref<number> = ref(18);
    const pictureCenter: Ref<[string, string]> = ref([pictureLat.value, pictureLng.value]);
    const iconSize: Ref<[number, number]> = ref([15, 15]);
    const polylineColor: Ref<string> = ref('#FF5470');
    const polylineDashArray: Ref<string> = ref('1 4');
    const polylineDashOffset: Ref<string> = ref('20');

    // BOOLEANS //

    function isPictureToEdit(picture: Picture): boolean {
        return picture.id === props.pictureToEdit.id;
    }
    function isFollowingPictureToEdit(index: number): boolean {
        return getPreviousPicture(index).id === props.pictureToEdit.id;
    }
    function isInvolvingPictureToEdit(picture: Picture, index: number): boolean {
        return isPictureToEdit(picture) || isFollowingPictureToEdit(index);
    }
    function isFirstPicture(index: number): boolean {
        return index === 0;
    }
    function isNewPicture(): boolean {
        return props.pictureToEdit.id === -1;
    }

    // METHODS //

    function updatePictureLatLng(): void {
        const markerLatLng = marker.value?.leafletObject.getLatLng();
        pictureLat.value = sliceCoord(markerLatLng.lat +'');
        pictureLng.value = sliceCoord(markerLatLng.lng + '');
    }

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
            :lat-lng="[pictureLat, pictureLng]"
            :draggable="true"
            :z-index-offset="500"
            @dragend="updatePictureLatLng()"
        >
            <l-icon
                :icon-url="currentMarkerUrl"
                :icon-size="iconSize"
            />
        </l-marker>
        <div v-for="(picture, index) in pictureStore.getPictures.value"
            :key="picture.id"
        >
            <l-marker v-if="!isPictureToEdit(picture)" 
                :lat-lng="[picture.lat, picture.lng]"
            >
                <l-icon v-if="picture.lat && picture.lng"
                    :icon-url="markerUrl"
                    :icon-size="iconSize"
                />
            </l-marker>
            <div v-if="!isFirstPicture(index)">
                <l-polyline v-if="!isInvolvingPictureToEdit(picture, index)"
                    :lat-lngs="[
                        setPolylineStart(picture, index), 
                        [picture.lat, picture.lng]
                    ]"
                    :color="polylineColor"
                    :dash-array="polylineDashArray"
                    :dash-offset="polylineDashOffset"
                />
                <l-polyline v-if="isPictureToEdit(picture)"
                    :lat-lngs="[
                        setPolylineStart(picture, index),
                        [props.pictureToEdit.lat, props.pictureToEdit.lng]
                    ]"
                    :color="polylineColor"
                    :dash-array="polylineDashArray"
                    :dash-offset="polylineDashOffset"
                />
                <l-polyline v-if="isFollowingPictureToEdit(index)"
                    :lat-lngs="[
                        [props.pictureToEdit.lat, props.pictureToEdit.lng],
                        [picture.lat, picture.lng]
                    ]"
                    :color="polylineColor"
                    :dash-array="polylineDashArray"
                    :dash-offset="polylineDashOffset"
                />
            </div>
        </div>
        <l-polyline v-if="isNewPicture()"
            :lat-lngs="[
                setPolylineStart(pictureToEdit, lastPictureIndex + 1),
                [props.pictureToEdit.lat, props.pictureToEdit.lng]
            ]"
            :color="polylineColor"
            :dash-array="polylineDashArray"
            :dash-offset="polylineDashOffset"
        />
    </l-map>
  </main>
</template>