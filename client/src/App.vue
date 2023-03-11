<script setup>
import { ref } from 'vue';
import EssentialLink from '@/components/EssentialLinks.vue';

const leftDrawerOpen = ref(false);

const toggleLeftDrawer = () => (leftDrawerOpen.value = !leftDrawerOpen.value);

const linksListUserIcon = [
  {
    title: 'Account',
    icon: 'account_circle',
    link: '/',
  },
  {
    title: 'Logout',
    icon: 'logout',
    link: '/login',
  },
];
</script>

<template>
  <q-layout view="hHh lpr fFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title class="row justify-center">
          <q-avatar>
            <img src="/Logos/Main.svg" />
          </q-avatar>
          <p class="river">TagIt</p>
          <q-avatar>
            <img src="/Logos/Main.svg" />
          </q-avatar>
        </q-toolbar-title>

        <q-avatar font-size="40px" text-color="white" icon="account_circle">
          <q-menu transition-show="jump-down" transition-hide="jump-up">
            <q-list style="min-width: 100px">
              <EssentialLink
                v-for="link in linksListUserIcon"
                :key="link.title"
                v-bind="link"
              ></EssentialLink>
            </q-list> </q-menu
        ></q-avatar>
      </q-toolbar>
    </q-header>
    <q-drawer v-model="leftDrawerOpen" side="left" bordered>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style>
@font-face {
  font-family: BlankRiver;
  src: url('../fonts/Blank River.ttf');
}
.river {
  font-family: BlankRiver;
}
</style>

<style scoped></style>
