<template>
  <video ref="camera" autoplay style="width: 100%"></video>
  <div class="fixed-bottom q-gutter-md">
    <div class="flex row no-wrap q-gutter-x-xs" style="height: 60px; overflow: scroll">
      <img
        v-for="(image, key) in images"
        :key="key"
        :src="image"
        alt=""
        style="postition: absolute; z-index: 1"
        @click="deleteImage(image)"
      />
    </div>
    <div class="q-pa-md bg-black flex row justify-center q-gutter-x-lg">
      <q-btn class="text-white" icon="autorenew" dense flat @click="changeCamera()"></q-btn>
      <q-btn
        class="text-white"
        icon="radio_button_unchecked"
        dense
        flat
        @click="takePhoto()"
      ></q-btn>
      <q-btn
        class="text-white"
        icon="done"
        dense
        flat
        @click="openDialog()"
        :disable="images.length === 0"
      ></q-btn>
    </div>
  </div>
  <q-dialog
    v-model="titleDialog"
    persistent
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card>
      <q-card-section>
        <q-input standout="bg-primary text-white" v-model="title" label="Title" />
        <q-input standout="bg-primary text-white" v-model="description" label="description" />
        <q-btn @click="useCurrentPosition()">Use Current postotion</q-btn>
        <MapboxMap
          style="height: 100px"
          :access-token="mbAccessToken"
          map-style="mapbox://styles/tobiwankirnobi/cle5t3xjp001b01o4s7negt5k"
          :center="[0, 0]"
          :zoom="10"
          @mb-created="(map) => (mapboxMap = map)"
        >
          <MapboxMarker
            :lng-lat="[longitude, latitude]"
            draggable
            @mb-dragend="(e) => locationChnaged(e)"
            @mb-created="(e) => (marker = e)"
          ></MapboxMarker>
        </MapboxMap>
      </q-card-section>
      <q-card-actions align="center">
        <q-btn
          class="bg-primary text-white"
          square
          rouded
          icon="close"
          @click="closeDialog()"
        ></q-btn>
        <q-btn class="bg-primary text-white" square rouded icon="done" @click="addTag()"></q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { MapboxMap, MapboxMarker } from '@studiometa/vue-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useTagStore } from '../stores/tagStore';
import { useRouter } from 'vue-router';

const router = useRouter();

const tagStore = useTagStore();

const mbAccessToken = import.meta.env.VITE_MAPTOKEN;
const mapboxMap = ref();
const marker = ref();

const camera = ref();
const titleDialog = ref(false);

const title = ref('');
const description = ref('');
const longitude = ref(0);
const latitude = ref(0);

const availableCameras = [];
let currentVideoSource;
const images = ref([]);
const imageBlobs = [];
let imageCapture;

async function takePhoto() {
  imageCapture
    .grabFrame()
    .then(async (imageBitMap) => {
      console.log('Grabed Frame:', imageBitMap);
      const canvas = new OffscreenCanvas(imageBitMap.width, imageBitMap.height);
      const ctx = canvas.getContext('bitmaprenderer');
      ctx.transferFromImageBitmap(imageBitMap);
      const blob = await canvas.convertToBlob();
      images.value.push(URL.createObjectURL(blob));
      imageBlobs.push(blob);
      console.log(imageBlobs);
    })
    .catch((error) => {
      console.error('grabFrame() error: ', error);
    });
}

navigator.mediaDevices.enumerateDevices().then(gotDevices);

const start = () => {
  console.log(currentVideoSource);
  if (window.stream) {
    window.stream.getTracks().forEach((track) => {
      track.stop();
    });
  }

  const constraints = {
    video: { deviceId: currentVideoSource ? { exact: currentVideoSource } : undefined },
  };
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      camera.value.srcObject = stream;
      const track = stream.getVideoTracks()[0];
      imageCapture = new ImageCapture(track);
    })
    .then(gotDevices)
    .catch(handleError);
};

function gotDevices(deviceInfos) {
  // Handles being called several times to update labels. Preserve values.
  for (let i = 0; i !== deviceInfos.length; ++i) {
    const deviceInfo = deviceInfos[i];
    // option.value = deviceInfo.deviceId;
    if (deviceInfo.kind === 'videoinput') {
      availableCameras.push(deviceInfo.deviceId);
    } else {
      console.log('Some other kind of source/device: ', deviceInfo);
    }
    console.log(availableCameras);
  }
}

function handleError(error) {
  console.debug('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
}

const changeCamera = () => {
  const index = availableCameras.findIndex((el) => el === currentVideoSource);
  if (availableCameras[index + 1] !== undefined) currentVideoSource = availableCameras[index + 1];
  else currentVideoSource = availableCameras[0];
  start();
};

const deleteImage = (image) => {
  const index = images.value.findIndex((el) => el === image);
  images.value.splice(index, 1);
  imageBlobs.splice(index, 1);
};

const openDialog = async () => {
  titleDialog.value = true;
};

const updateCoords = (pos) => {
  longitude.value = pos.coords.longitude;
  latitude.value = pos.coords.latitude;
  console.log(latitude.value);
  console.log(mapboxMap.value);
  mapboxMap.value.panTo([longitude.value, latitude.value]);
};

function geoError(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
  longitude.value = 0;
  latitude.value = 0;
}

const useCurrentPosition = async () => {
  await navigator.geolocation.getCurrentPosition(updateCoords, geoError);
  mapboxMap.value.flyTo({ center: [longitude.value, latitude.value], essential: true });
};

const locationChnaged = (e) => {
  const { lng, lat } = e.target.getLngLat();
  longitude.value = lng;
  latitude.value = lat;
};

const closeDialog = () => {
  title.value = '';
  description.value = '';
  titleDialog.value = false;
};

const addTag = async () => {
  const newImages = [];
  const data = await tagStore.uploadAddedImages(imageBlobs);
  data.forEach((el) => newImages.push(el.filename));
  const updatedFields = {
    title: title.value,
    description: description.value,
    coords: {
      longitude: longitude.value,
      latitude: latitude.value,
    },
    images: newImages
  };
  await tagStore.createTag(updatedFields);
  router.push('/');
};

onMounted(async () => {
  start();
});
</script>
