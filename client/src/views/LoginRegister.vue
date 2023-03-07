<template>
  <q-tabs v-model="tab" class="text-primary">
    <q-tab name="login" label="LOGIN" />
    <q-tab name="register" label="REGISTER" />
  </q-tabs>
  <div class="flex flex-center">
    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="login">
        <div class="q-pa-md" style="max-width: 400px">
          <q-form @submit="onSubmitLogin" @reset="onReset" class="q-gutter-md">
            <q-input
              filled
              type="string"
              v-model="inputEmail"
              label="Deine emailadresse *"
              lazy-rulese
              :rules="[
                (val) => (val !== null && val !== '') || 'Bitte gib deine Emailaresse',
                (val) => isValidEmail(val) || 'Bitte gib eine gültige Email Adresse an!',
              ]"
            />

            <q-input
              filled
              type="password"
              v-model="inputPasswort"
              label="Dein Passwort"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Bitte gib ein Passwort ein!']"
            />

            <div class="flex flex-center">
              <q-btn label="Submit" type="submit" color="primary" />
            </div>
          </q-form>
        </div>
      </q-tab-panel>
      <q-tab-panel name="register">
        <div class="q-pa-md" style="max-width: 400px">
          <q-form @submit="onSubmitRegister" @reset="onReset" class="q-gutter-md">
            <q-input
              filled
              type="string"
              v-model="inputName"
              label="Deinen Tag"
              lazy-rulese
              :rules="[
                (val) => (val && val.length > 0) || 'Bitte gib ein Namen ein!',
                async (val) => (await checkNameExists(val)) || 'Dieser Name ist schon vergeben',
              ]"
            />
            <q-input
              filled
              type="string"
              v-model="inputEmail"
              label="Deine emailadresse *"
              lazy-rulese
              :rules="[
                (val) => (val !== null && val !== '') || 'Bitte gib deine Emailaresse',
                (val) => isValidEmail(val) || 'Bitte gib eine gültige Email Adresse an!',
              ]"
            />

            <q-input
              filled
              type="password"
              v-model="inputPasswort"
              label="Dein Passwort"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Bitte gib ein Passwort ein!',
                (val) => val === inputPasswortCheck || 'Die Passwörter stimmen nicht überein',
              ]"
            />

            <q-input
              filled
              type="password"
              v-model="inputPasswortCheck"
              label="Dein Passwort"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Bitte gib ein Passwort ein!',
                (val) => val === inputPasswort || 'Die Passwörter stimmen nicht überein',
              ]"
            />

            <div class="flex flex-center">
              <q-btn label="Submit" type="submit" color="primary" />
            </div>
          </q-form>
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import axios from 'axios';
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'vue-router';

const tab = ref('login');

const $q = useQuasar();
const router = useRouter();

const userStore = useUserStore();

const inputEmail = ref(null);
const inputPasswort = ref(null);
const inputPasswortCheck = ref(null);
const inputName = ref(null);

const onSubmitLogin = async () => {
  await axios
    .post('/api/user/login', {
      email: inputEmail.value,
      passwort: inputPasswort.value,
    })
    .then((res) => {
      if (res.status === 200) {
        const { uid, email, profilepic } = res.data;
        userStore.saveUserData(uid, email, profilepic);
        router.push({ path: '/' });
        $q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Angemeldet',
        });
      }
    })
    .catch((error) => {
      if (error.response) {
        if (error.response.status === 404) {
          $q.notify({
            type: 'negative',
            message: 'Bitte verwende eine Regestrierte Email Adresse',
          });
        }
        if (error.response.status === 401) {
          $q.notify({
            type: 'negative',
            message: 'Falsches Passwort',
          });
        }
      }
    });
};

const onSubmitRegister = async () => {
  await axios
    .post('/api/user/register', {
      email: inputEmail.value,
      passwort: inputPasswort.value,
      name: inputName.value,
    })
    .then((res) => {
      if (res.status === 200) {
        router.push({ path: '/thankyou' });
        $q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Regestriert',
        });
      }
    })
    .catch((error) => {
      if (error.response) {
        if (error.response.status === 404) {
          $q.notify({
            type: 'negative',
            message: 'Bitte verwende eine Regestrierte Email Adresse',
          });
        }
        if (error.response.status === 401) {
          $q.notify({
            type: 'negative',
            message: 'Falsches Passwort',
          });
        }
      }
    });
};

const onReset = () => {
  inputEmail.value = null;
  inputPasswort.value = null;
  inputPasswortCheck.value = null;
  inputName.value = null;
};

const isValidEmail = (testMail) => {
  const emailPattern =
    /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
  return emailPattern.test(testMail);
};

const checkNameExists = async (name) => {
  const res = await axios.get(`/api/user/checkUser/${name}`);
  if (res.data === false) return true;
  if (res.data === true) return false;
};
</script>

<style lang="scss" scoped></style>
