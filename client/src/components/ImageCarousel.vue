<template>
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
    height="200px"
    class="bg-primary text-white shadow-1 rounded-borders"
  >
    <q-carousel-slide
      v-for="(image, key) in props.images"
      :key="key"
      :name="key"
      class="column no-wrap flex-center"
      :img-src="`/images/${image}`"
      img-alt="Images will show next time you are online!"
    >
    </q-carousel-slide>
  </q-carousel>
</template>
<script setup>
import { ref } from 'vue';
const props = defineProps({
  images: Array,
});
const slide = ref(0);
</script>
