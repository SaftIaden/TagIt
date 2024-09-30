<template>
  <div class="">
    <h1>Danke fürs Regestrieren</h1>
    <div>

    </div>
    <q-btn color="primary" label="Zurück zur Anmeldung" @click="goLogin()"> </q-btn>
  </div>
</template>
<script setup>
import router from '@/router';
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';
import axios from 'axios'

const route = useRoute()

onMounted(async () => {
    const { data } = await axios.get(`/api/user/validateRegister/${route.query.token}`);
  })
const goLogin = () => router.push('/login');



</script>
