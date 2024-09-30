<script setup>
import { ref, onMounted } from 'vue';
import { useTagStore } from '../stores/tagStore';
import { useRouter } from 'vue-router';

import ProjektCard from '../components/ProjektCard.vue';

const tagStore = useTagStore();
const router = useRouter();

const projects = ref([])



onMounted(() => {
  tagStore.getUserTags();
  projects.value = tagStore.tags
});
</script>

<template>
  <h2>Projekte:</h2>
  <ProjektCard v-for="project in tags" v-bind:key="project.projectName" :project="project"></ProjektCard>

</template>
