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
      <ImageCarousel :images="currentTag.images"></ImageCarousel>
      <q-card-section>
        <p class="text-h3" style="font-family: BlankRiver">{{ currentTag.title }}</p>
        <p>{{ currentTag.description }}</p>
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
        <q-btn
          class="bg-primary text-white"
          square
          rouded
          icon="delete"
          @click=" deleteDialog = true"
        ></q-btn>
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
          <q-btn
            class="absolute-top-right rouded bg-primary q-ma-md"
            icon="delete"
            style="z-index: 1"
            @click="removeFromTag(image)"
          ></q-btn>
        </q-carousel-slide>
        <q-carousel-slide
          v-for="(image, key) in addedImages"
          :key="key"
          :name="key + images.length"
          class="column no-wrap flex-center"
          :img-src="image"
        >
          <q-btn
            class="absolute-top-right rouded bg-primary q-ma-md"
            icon="delete"
            style="z-index: 1"
            @click="removeFromAdded(image)"
          ></q-btn>
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
        <q-input standout="bg-primary text-white" v-model="description" label="description" />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <MapboxMap
          style="height: 200px; width 300px"
          ref="mapboxMap"
          :access-token="mbAccessToken"
          map-style="mapbox://styles/tobiwankirnobi/cle5t3xjp001b01o4s7negt5k"
          :center="[coords.longitude, coords.latitude]"
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
  <q-dialog v-model="deleteDialog" persistent
    ><q-card calss="q-ma-md">
    <q-card-section>
      <p class="text-h5">Willst du diesen Tag wirklich löschen?</p>
      <p class="text-subtitle1">Titel: <span style="font-family: blankRiver">{{ currentTag.title }}</span></p>
      <q-input
        v-model="deleteConrimation"
        label="Gib den Namen des Tags ein um zu bestätigen"
      ></q-input>
    </q-card-section>
    <q-card-actions align="center">
      <q-btn class="bg-primary text-white" icon="close" v-close-popup>
      </q-btn>
      <q-btn
        class="bg-negative text-white"
        :disable="!(deleteConrimation === currentTag.title)"
        icon="delete"
        @click="deleteTag()"
      ></q-btn>

    </q-card-actions>
      </q-card
    >
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
const addedImagesBlobs = [];
const slide = ref(0);
const deleteDialog = ref(false);
const deleteConrimation = ref('');

const edit = ref(false);
const title = ref();
const images = ref([]);
const description = ref();
const coords = ref([]);

const props = defineProps({
  toggle: Boolean,
  currentTag: Object,
});
const emit = defineEmits(['update:toggle']);
const dialogOpen = useVModel(props, 'toggle', emit);

const resetEdit = () => {
  title.value = props.currentTag.title;
  description.value = props.currentTag.description;
  images.value = JSON.parse(JSON.stringify(props.currentTag.images));
  coords.value.longitude = props.currentTag.coords.longitude;
  coords.value.latitude = props.currentTag.coords.latitude;
  addedImages.value.splice(0, addedImages.value.length);
  addedImagesBlobs.splice(0, addedImagesBlobs.length);
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

const update = async () => {
  if (addedImages.value.length > 0) {
    const data = await tagStore.uploadAddedImages(addedImagesBlobs);
    data.forEach((el) => images.value.push(el.filename));
  }
  const updatedFields = {};
  if (title.value !== props.currentTag.title) updatedFields.title = title.value;
  if (description.value !== props.currentTag.description) {
    updatedFields.description = description.value;
  }
  if (coords.value !== props.currentTag.coords) {
    update;
    updatedFields.coords = {
      longitude: coords.value.longitude,
      latitude: coords.value.latitude,
    };
  }
  if (images.value !== JSON.parse(JSON.stringify(props.currentTag.images)))
    updatedFields.images = images.value;
  tagStore.updateTag(props.currentTag, updatedFields);
  tagStore.getUserTags();
  resetEdit();
  edit.value = !edit.value;
};

const addImage = (event) => {
  console.log(event);
  addedImages.value.push(URL.createObjectURL(event));
  addedImagesBlobs.push(event);
  console.log(event);
  file.value = null;
};

const removeFromTag = (image) => {
  const index = images.value.findIndex((el) => el === image);
  images.value.splice(index, 1);
};

const removeFromAdded = (image) => {
  const index = addedImages.value.findIndex((el) => el === image);
  addedImages.value.splice(index, 1);
  addedImagesBlobs.splice(index, 1);
};

const deleteTag = () => {
  tagStore.deleteTag(props.currentTag);
  tagStore.getUserTags();
  emit('update:toggle', false);
}
</script>
