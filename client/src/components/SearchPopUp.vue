<template>
  <q-dialog
    v-model="dialogOpen"
    persistent
    :maximized="true"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card>
      <q-bar class="bg-white text-black flex justify-center">
        <q-btn dense flat font-size="30px" icon="expand_more" v-close-popup> </q-btn>
      </q-bar>
      <q-table
        :rows="filterdTags"
        :columns="columns"
        row-key="name"
        hide-bottom
        :rows-per-page-options="[20]"
        :visible-columns="filteredColumns()"
        style="height: 80vh"
      >
        <template #top>
          <div class="flex row justify-center" style="width: 100%">
            <q-input rounded outlined debounce="300" v-model="filter" placeholder="Search">
              <template #append>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
        </template>
        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th v-for="col in props.cols" :key="col.name" :props="props" class="text-primary">
              {{ col.label }}
            </q-th>
          </q-tr>
        </template>
        <template v-slot:body-cell-image="props">
          <q-td :props="props">
            <div>
              <q-img @click="emit('update:currentTag',props.row)" :src="`/images/${props.row.images[0]}`" />
            </div>
          </q-td>
        </template>
      </q-table>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { ref, onMounted, onBeforeUpdate, computed } from 'vue';
import { useVModel } from '@vueuse/core';
import { useTagStore } from '../stores/tagStore';
import { useQuasar } from 'quasar';

const $q = useQuasar();

const tagStore = useTagStore();

const props = defineProps({
  toggle: Boolean,
});
const emit = defineEmits(['update:toggle','update:currentTag']);
const dialogOpen = useVModel(props, 'toggle', emit);


const tags = ref();
const filter = ref('');

const filterdTags = computed(() => {
  return tags.value.filter((element) => {
    return element.title.toLowerCase().includes(filter.value.toLowerCase())
  })
})


const columns = [
  { name: 'image', label: 'Image', field: 'image', align: 'center' },
  { name: 'title', label: 'Title', field: 'title', align: 'center' },
  { name: 'description', label: 'Description', field: 'descrition', align: 'center' },
  { name: 'favourite', label: 'favourite', field: 'favourite', align: 'center' },
];

const filteredColumns = () => {
  const cols = ['image', 'title'];
  if ($q.screen.gt.xs) cols.push('description');
  if ($q.screen.gt.sm) cols.push('favourite');
  return cols;
};

onMounted(() => {
  filterdTags.value = tagStore.tags;
})

onBeforeUpdate(()=> {
  tags.value = tagStore.tags;
})
</script>
