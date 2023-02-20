<script setup>
import { ref } from 'vue';
import { MapboxMap, MapboxMarker, MapboxGeolocateControl } from '@studiometa/vue-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

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
</script>

<template>
  <MapboxMap
    style="height: 100vh"
    ref="mapboxMap"
    :access-token="mbAccessToken"
    map-style="mapbox://styles/tobiwankirnobi/cle5t3xjp001b01o4s7negt5k"
    :center="[0, 0]"
    :zoom="1"
    ><MapboxGeolocateControl :trackUserLocation="true"></MapboxGeolocateControl
  ></MapboxMap>
</template>
