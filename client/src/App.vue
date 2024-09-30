<script setup>
import { ref, onMounted } from "vue";
import EssentialLink from "@/components/EssentialLinks.vue";
import { onlineTest } from "./utils/onlineTest.js";
import { useQuasar } from "quasar";
import { useTagStore } from "./stores/tagStore";
import { useAlbumStore } from "./stores/albumStore";
import router from './router/index.js'

import { openDB } from "idb";

const $q = useQuasar();
const tagStore = useTagStore();
const albumStore = useAlbumStore();

const leftDrawerOpen = ref(false);

const toggleLeftDrawer = () => (leftDrawerOpen.value = !leftDrawerOpen.value);

const linksListUserIcon = [
  {
    title: "Account",
    icon: "account_circle",
    link: "/",
  },
  {
    title: "Logout",
    icon: "logout",
    link: "/login",
  },
];

const isOnline = ref(true);
const update = ref(false);

const updateStoresNetwork = (bool) => {
  tagStore.updateOnline(bool);
  albumStore.updateOnline(bool);
};

const onRestart = async () => {
  isOnline.value = await onlineTest();
  window.addEventListener("online", () => (isOnline.value = true));
  window.addEventListener("offline", () => (isOnline.value = false));
  const registration = await navigator.serviceWorker.getRegistration();
  if (registration) registration.waiting?.postMessage({ type: "SKIP_WAITING" });
  window.location.reload();
};

onMounted(async () => {
  if (!window.indexedDB) alert("IndexedDB is not available!");
  await albumStore.createDB();
  await tagStore.createDB();
  isOnline.value = await onlineTest();
  window.addEventListener("online", async () => {
    isOnline.value = true;
    updateStoresNetwork(true);
    $q.notify({
      color: "green-4",
      textColor: "white",
      icon: "wifi",
      message: "Online",
    });
    await albumStore.sync();
    await tagStore.sync();
  });
  window.addEventListener("offline", () => {
    isOnline.value = false;
    navigator.vibrate(200);
    updateStoresNetwork(false);
    $q.notify({
      color: "red-4",
      textColor: "white",
      icon: "wifi_off",
      message: "Offline",
    });
  });
  const registration = await navigator.serviceWorker.getRegistration();
  if (!registration) {
    console.log("registration failed!");
    return;
  }
  registration.addEventListener("updatefound", () => {
    update.value = true;
    $q.notify({
      color: "blue-4",
      textColor: "white",
      icon: "refresh",
      message: "An Update is available!",
      position: "top-right",
    });
  });
  if (registration.waiting) {
    update.value = true;
  }
  if (!window.indexedDB) alert("IndexedDB is not available!");
  // if (!db) await openDataBase();
  // if(isOnline.value == true) await synchronize();
});
</script>

<template>
  <q-layout view="hHh lpr fFf">
    <q-header class="bg-primary text-white" height-hint="98" style="padding: 0.5rem">
      <q-toolbar>
      <q-avatar  font-size="40px" text-color="white" icon="admin_panel_settings" @click="router.push('/admin')"/>
        <q-toolbar-title class="row justify-center" @click="router.push('/')">
          <img src="/Logos/Main.jpg" style="max-width: 8rem" />
        </q-toolbar-title>
        <q-btn
          v-if="update"
          flat
          class="text-white"
          @click="onRestart"
          size="20px"
          icon="refresh"
        ></q-btn>
        <q-avatar font-size="40px" text-color="white" icon="account_circle">
          <q-menu transition-show="jump-down" transition-hide="jump-up">
            <q-list style="min-width: 100px">
              <EssentialLink
                v-for="link in linksListUserIcon"
                :key="link.title"
                v-bind="link"
              ></EssentialLink>
            </q-list>
          </q-menu>
          <q-badge floating color="red" rounded v-if="!isOnline" />
          <q-badge floating color="green" rounded v-if="isOnline"
        /></q-avatar>
      </q-toolbar>
    </q-header>
    <q-drawer v-model="leftDrawerOpen" side="left" bordered>
      <q-item clickable @click="router.push('/admin')" v-ripple>
        <q-item-section avatar>
          <q-icon name="shiel_person" />
        </q-item-section>
        <q-item-section> Admin </q-item-section>
      </q-item>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style>
@font-face {
  font-family: BlankRiver;
  src: url("../fonts/Blank River.ttf");
}
.river {
  font-family: BlankRiver;
}
</style>

<style scoped></style>
