<template>
  <q-item clickable tag="a" target="_blank" @click="linkClick()">
    <q-item-section v-if="icon" avatar>
      <q-icon size="30px" :name="icon" />
    </q-item-section>
    <q-item-section v-if="svg" avatar>
      <q-avatar size="30px" color="primary" text-color="white">{{ title[0] }}</q-avatar>
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup>
import router from '../router/index.js'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    default: '#',
  },

  icon: {
    type: String,
    default: '',
  },
  svg: {
    type: String,
    default: null,
  },
});

const linkClick = () => {
  router.push(props.link);
};
</script>
