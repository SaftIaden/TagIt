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


const goLogin = () => router.push('/login');

</script>
