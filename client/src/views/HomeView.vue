<script setup>
import { ref, onMounted } from 'vue';
import { MapboxMap, MapboxMarker, MapboxGeolocateControl } from '@studiometa/vue-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import BigCardPopUP from '../components/BigCardPopUP.vue';
import SearchPopUp from '../components/SearchPopUp.vue';
import { useUserStore } from '@/stores/userStore.js';
import { useTagStore } from '../stores/tagStore';
import { useRouter } from 'vue-router';

import MarkerCard from '../components/MarkerCard.vue';

const userStore = useUserStore();
const tagStore = useTagStore();
const router = useRouter();

const currentTag = ref(tagStore.tags[0]);

const toggle = ref(false);
const searchtoggle = ref(false);

const changeTag = (e) => {
  currentTag.value = e;
  toggle.value = true;
};

const mbAccessToken = import.meta.env.VITE_MAPTOKEN;
const mapboxMap = ref();

let intervalMSconsumed = 0;
const showLocationIntervall = setInterval(() => {
  const button = document.querySelector('.mapboxgl-ctrl-geolocate');
  if (button) {
    button.click();
    clearInterval(showLocationIntervall);
  }

  if (intervalMSconsumed >= 8000) clearInterval(showLocationIntervall);
  intervalMSconsumed += 500;
}, 500);

onMounted(() => {
  tagStore.getUserTags();
});
</script>

<template>
  <MapboxMap
    style="height: 100vh"
    ref="mapboxMap"
    :access-token="mbAccessToken"
    map-style="mapbox://styles/tobiwankirnobi/cle5t3xjp001b01o4s7negt5k"
    :center="[0, 0]"
    :zoom="1"
    ><MapboxGeolocateControl :trackUserLocation="true" :showAccuracyCircle="false" />
    <MapboxMarker
      v-for="tag in tagStore.tags"
      :key="tag.id"
      :lng-lat="[tag.coords.longitude, tag.coords.latitude]"
      :popup="{ closeButton: false, maxWidth: '300px' }"
      ><template v-slot:popup>
        <MarkerCard :tag="tag" @update:current-tag="changeTag($event)" /> </template
    ></MapboxMarker>
  </MapboxMap>
  <q-toolbar id="footer-toolbar" class="row justify-center q-gutter-md q-my-md fixed-bottom">
    <q-btn size="32px" color="primary" flat square icon="image" @click="toggleLeftDrawer" />

    <q-btn size="32px" color="primary" flat square icon="add" @click="router.push({path: 'add'})" />

    <q-btn size="32px" color="primary" flat square icon="search" @click="searchtoggle = true" />
  </q-toolbar>
  <BigCardPopUP :currentTag="currentTag" v-model:toggle="toggle"></BigCardPopUP>
  <SearchPopUp v-model:toggle="searchtoggle" @update:current-tag="changeTag($event)"></SearchPopUp>
</template>
