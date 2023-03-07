<template>
  <q-dialog
    v-model="dialogOpen"
    persistent
    :maximized="true"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card v-if="!edit" class="bg-white text-balck">
      <q-bar class="bg-primary text-white flex justify-center">
        <q-btn dense flat font-size="30px" icon="expand_more" v-close-popup> </q-btn>
      </q-bar>
      <ImageCarousel :images="props.currentTag.images"></ImageCarousel>
      <q-card-section>
        <p class="text-h3" style="font-family: BlankRiver">{{ props.currentTag.title }}</p>
        <p>{{ props.currentTag.description }}</p>
      </q-card-section>
      <q-card-section>
        <MapboxMap
          style="height: 200px; width 300px"
          ref="mapboxMap"
          :access-token="mbAccessToken"
          map-style="mapbox://styles/tobiwankirnobi/cle5t3xjp001b01o4s7negt5k"
          :center="[currentTag.coords.longitude, currentTag.coords.latitude]"
          :zoom="10"
        >
          <MapboxMarker
            :lng-lat="[currentTag.coords.longitude, currentTag.coords.latitude]"
          ></MapboxMarker>
        </MapboxMap>
      </q-card-section>

      <q-card-section class="q-pt-none"> </q-card-section>
      <q-card-actions class="fixed-bottom q-pa-md" align="around">
        <q-btn class="bg-primary text-white" square rouded icon="edit" @click="startEdit()"></q-btn>
        <q-btn class="bg-primary text-white" square rouded icon="delete"></q-btn>
      </q-card-actions>
    </q-card>

    <q-card v-if="edit" class="bg-white text-balck">
      <q-bar class="bg-primary text-white flex justify-center">
        <q-btn dense flat font-size="30px" icon="expand_more" v-close-popup></q-btn>
      </q-bar>
      <q-carousel
        v-model="slide"
        transition-prev="slide"
        transition-next="slide"
        swipeable
        animated
        control-color="white"
        navigation
        padding
        arrows
        height="35%"
        class="bg-primary text-white shadow-1 rounded-borders"
      >
        <q-carousel-slide
          v-for="(image, key) in images"
          :key="key"
          :name="key"
          class="column no-wrap flex-center"
          :img-src="`/images/${image}`"
        >
        </q-carousel-slide>
        <q-carousel-slide
          v-for="(image, key) in addedImages"
          :key="key"
          :name="key+images.length"
          class="column no-wrap flex-center"
          :img-src="image"
        >
        q-btn
        </q-carousel-slide>
      </q-carousel>
      <q-card-section>
        <q-file
          standout
          v-model="file"
          label="Standout"
          @update:model-value="addImage($event)"
          lable="Upload Image"
        />
        <q-input standout="bg-primary text-white" v-model="title" label="Title" />
        <q-input standout="bg-primary text-white" v-model="descritption" label="description" />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <MapboxMap
          style="height: 200px; width 300px"
          ref="mapboxMap"
          :access-token="mbAccessToken"
          map-style="mapbox://styles/tobiwankirnobi/cle5t3xjp001b01o4s7negt5k"
          :center="[currentTag.coords.longitude, currentTag.coords.latitude]"
          :zoom="10"
        >
          <MapboxMarker
            :lng-lat="[coords.longitude, coords.latitude]"
            draggable
            @mb-dragend="(e) => locationChnaged(e)"
          ></MapboxMarker>
        </MapboxMap>
      </q-card-section>
      <q-card-actions class="fixed-bottom q-pa-md" align="around">
        <q-btn class="bg-primary text-white" square rouded icon="close" @click="reset()"></q-btn>
        <q-btn class="bg-primary text-white" square rouded icon="done" @click="update()"></q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { ref } from 'vue';
import ImageCarousel from './ImageCarousel.vue';
import { useVModel } from '@vueuse/core';
import { MapboxMap, MapboxMarker } from '@studiometa/vue-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useTagStore } from '../stores/tagStore';

const tagStore = useTagStore();

const mbAccessToken = import.meta.env.VITE_MAPTOKEN;

const file = ref();
const addedImages = ref([]);
const slide = ref(0);

const edit = ref(false);
const title = ref();
const images = ref([]);
const descritption = ref();
const coords = ref([]);

const props = defineProps({
  toggle: Boolean,
  currentTag: Object,
});
const emit = defineEmits(['update:toggle']);
const dialogOpen = useVModel(props, 'toggle', emit);

const resetEdit = () => {
  title.value = props.currentTag.title;
  descritption.value = props.currentTag.description;
  images.value = props.currentTag.images;
  coords.value = props.currentTag.coords;
};

const reset = () => {
  resetEdit();
  edit.value = false;
};

const startEdit = () => {
  resetEdit();
  edit.value = !edit.value;
};

const locationChnaged = (marker) => {
  console.log(marker.target.getLngLat());
  const { lng, lat } = marker.target.getLngLat();
  coords.value.longitude = lng;
  coords.value.latitude = lat;
};

const update = () => {
  const updatedFields = {};
  if (title.value !== props.currentTag.title) updatedFields.title = title.value;
  if (descritption.value !== props.currentTag.description) {
    updatedFields.description = title.description;
  }
  updatedFields.coords = coords.value;

  if (images.value !== props.currentTag.images) updatedFields.images = images.value;
  tagStore.updateTag(props.currentTag, updatedFields);
  tagStore.getUserTags();
  edit.value = !edit.value;
};

const addImage = (event) => {
  console.log(event);
  addedImages.value.push(URL.createObjectURL(event));
  file.value = null;
};
</script>
