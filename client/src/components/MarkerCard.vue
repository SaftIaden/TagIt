<template>
  <q-card class="my-card" style="width: 250px">
    <q-btn
      class="fixed-top-left q-mt-md"
      text-color="primary"
      flat
      icon="open_in_full"
      @click="openBigCard()"
      style="z-index: 1"
    ></q-btn>
    <q-btn
      v-if="!tag.favourite"
      class="fixed-top-right q-mt-md"
      text-color="primary"
      flat
      icon="star_outline"
      style="z-index: 1"
      @click="tagStore.favouriteTag(tag)"
    ></q-btn>
    <q-btn
      v-if="tag.favourite"
      class="fixed-top-right q-mt-md"
      text-color="primary"
      flat
      icon="star"
      style="z-index: 1"
      @click="tagStore.favouriteTag(tag)"
    ></q-btn>
    <ImageCarousel :images="props.tag.images"></ImageCarousel>
    <q-card-section>
      <div class="text-h6">{{ props.tag.title }}</div>
      <div class="text-subtitle2">{{ props.tag.description }}</div>
    </q-card-section>

    <q-card-section class="q-pt-none"> </q-card-section>
    <q-separator />
    <q-card-section>
      <p>Datum:{{ props.tag.created }}</p>
    </q-card-section>
  </q-card>
</template>
<script setup>
import { ref } from 'vue';
import ImageCarousel from './ImageCarousel.vue';
import { useTagStore } from '../stores/tagStore';

const tagStore = useTagStore();

const props = defineProps({
  tag: Object,
});
const emit = defineEmits(['update:currentTag', 'opendBigDailog']);

const openBigCard = () => {
  emit("update:currentTag", props.tag);
}

</script>
