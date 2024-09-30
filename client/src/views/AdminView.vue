<template>
  <q-tabs
    v-model="tab"
    dense
    class="text-grey"
    active-color="primary"
    indicator-color="primary"
    align="justify"
    narrow-indicator
  >
    <q-tab name="users" label="Benutzer" />
    <q-tab name="projects" label="Projekte" />
  </q-tabs>
  <q-tab-panels v-model="tab" animated>
    <q-tab-panel name="users">
      <q-table
        :rows="filteredUsers"
        :columns="userColumns"
        row-key="name"
        hide-bottom
        :rows-per-page-options="[20]"
        style="height: 80vh"
      >
        <template #top>
          <div class="flex row justify-center" style="width: 100%">
            <q-input
              rounded
              outlined
              debounce="300"
              v-model="filter"
              placeholder="Search"
            >
              <template #append>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
        </template>
        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
              class="text-primary"
            >
              {{ col.label }}
            </q-th>
          </q-tr>
        </template>
        <template v-slot:body-cell-role="props">
          <q-td :props="props">
            <q-select
              filled
              v-model="props.row.role"
              :options="roleOptions"
              label="Rolle"
              @update:model-value="(value) => {updateRole(value, props.row.name)}"
            />
          </q-td>
        </template>
        <template v-slot:body-cell-projects="props">
          <q-td :props="props">
            <q-select
              filled
              v-model="props.row.projects"
              multiple
              :options="projectOptions"
              label="Projekte"
              @update:model-value="(value) => {updateProjects(value, props.row.name)}"
            />
          </q-td>
        </template>

        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn
              flat
              icon="delete"
              color="negative"
              @click="onDelete(props.row)"
            ></q-btn>
          </q-td>
        </template>
      </q-table>
    </q-tab-panel>
    <q-tab-panel name="projects">
      <q-table
        :rows="filteredProjects"
        :columns="projectColumns"
        row-key="name"
        hide-bottom
        :rows-per-page-options="[20]"
        style="height: 80vh"
      >
        <template #top>
          <div class="flex row justify-center" style="width: 100%">
            <q-input
              rounded
              outlined
              debounce="300"
              v-model="filter"
              placeholder="Search"
            >
              <template #append>
                <q-icon name="search" />
              </template>
            </q-input>
            <q-btn color="accent" icon="add" rounded @click="switchToggle"></q-btn>
          </div>
        </template>
        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
              class="text-primary"
            >
              {{ col.label }}
            </q-th>
          </q-tr>
        </template>
        <template v-slot:body-cell-graph="props">
          <q-td :props="props">
            <q-btn
              flat
              icon="show_chart"
              color="accent"
              @click="onDelete(props.row)"
            ></q-btn>
          </q-td>
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn
              flat
              icon="delete"
              color="negative"
              @click="onDeleteProject(props.row)"
            ></q-btn>
          </q-td>
        </template>
      </q-table>
      <AddProjectPopUP v-model:toggle="toggle"></AddProjectPopUP>
    </q-tab-panel>
  </q-tab-panels>
</template>
<script setup>
import { ref, onMounted, onBeforeUpdate, computed, watch } from "vue";
import { useVModel } from "@vueuse/core";
import { useTagStore } from "../stores/tagStore";
import { useUserStore } from "../stores/userStore";
import { useQuasar } from "quasar";
import AddProjectPopUP from "../components/AddProjectPopUP.vue";

const $q = useQuasar();

const tagStore = useTagStore();
const userStore = useUserStore();

const toggle = ref(false);
const tab = ref("users");
const filter = ref("");
const users = ref(userStore.allUsers);
const projects = ref(tagStore.allProjects);
const projectOptions = ref(tagStore.allProjects.map((el) => el.projectName))
const roleOptions = ref(['admin', 'user'])


watch(toggle, async () => {
    projects.value = tagStore.allProjects
})


const filteredUsers = computed(() => {
  return users.value.filter((element) => {
    if (filter.value !== "") {
      return element.name.toLowerCase().includes(filter.value.toLowerCase());
    } else {
      return element;
    }
  });
});

const filteredProjects = computed(() => {
  return projects.value.filter((element) => {
    return element.projectName.toLowerCase().includes(filter.value.toLowerCase());
  });
});

const switchToggle = () => {
  toggle.value = true;
};

const userColumns = [
  { name: "name", label: "Name", field: "name", align: "center" },
  { name: "email", label: "E-mail", field: "email", align: "center" },
  { name: "role", label: "Rolle", field: "role", align: "center" },
  { name: "projects", label: "Projekte", field: "projects", align: "center" },
  { name: "actions", label: "Aktionen", align: "center" },
];

const projectColumns = [
  { name: "name", label: "Name", field: "projectName", align: "center" },
  { name: "graph", label: "Daten", align: "center" },
  { name: "actions", label: "Löschen", align: "center" },
];

onMounted(() => {
  userStore.getAllUsers();
  tagStore.getAllProjects();
});

onBeforeUpdate(() => {

});


const updateProjects = async (event, username) => {
  console.log(event)
  console.log(username)
  await userStore.changeUserProjects(username, event)
}

const updateRole = async (event, username) => {
  console.log(event)
  console.log(username)
  await userStore.changeUserRole(username, event)
}

const onDeleteProject = async (row) => {
  console.log(row.projectName)
  tagStore.deleteTag(row.projectName).then(() => {
    projects.value = tagStore.allProjects
  })
}
</script>
