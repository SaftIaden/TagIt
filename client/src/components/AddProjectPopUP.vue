<template>
  <q-dialog v-model="dialogOpen" persistent :maximized="false">
    <q-card class="flex-column" >
      <q-bar class="bg-white text-black">
        <q-btn dense flat font-size="30px" icon="close" v-close-popup> </q-btn>
      </q-bar>
      <q-input v-model="projektName" placeholder="Projekt Name"></q-input>
           <q-select
        label="Altersgruppen:"
        filled
        v-model="modelAltersgruppen"
        use-input
        use-chips
        multiple
        hide-dropdown-icon
        input-debounce="0"
        new-value-mode="add-unique"
        style="width: 250px"
      />
        <q-select
        label="Kategorien:"
        filled
        v-model="modelKategorien"
        use-input
        use-chips
        multiple
        hide-dropdown-icon
        input-debounce="0"
        new-value-mode="add-unique"
        style="width: 250px"
      />
           <q-select
        label="Geschlechter:"
        filled
        v-model="modelGeschlechter"
        use-input
        use-chips
        multiple
        hide-dropdown-icon
        input-debounce="0"
        new-value-mode="add-unique"
        style="width: 250px"
      />
      <q-btn class="justify-center" color="accent" @click="addProject">Erstellen</q-btn>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { ref, onMounted, onBeforeUpdate, computed } from "vue";
import { useVModel } from "@vueuse/core";
import { useTagStore } from "../stores/tagStore";
import { useQuasar } from "quasar";

const modelAltersgruppen = ref(['<10', '11-14', '15-19', '19-25', '>25']);
const modelKategorien = ref([]);
const modelGeschlechter = ref(['weiblich','männlich', 'divers']);

const tagStore = useTagStore();

const props = defineProps({
  toggle: Boolean,
});
const emit = defineEmits(["update:toggle", "update:currentTag"]);
const dialogOpen = useVModel(props, "toggle", emit);

const projektName = ref("");

const addProject = async () => {
  await tagStore.createTag({ projectName: projektName.value });
  await tagStore.getAllProjects()
  emit('update:toggle', false);
};

onMounted(() => {});

onBeforeUpdate(() => {});
</script>
