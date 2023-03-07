import { ref, computed } from 'vue';
import axios from 'axios';
import { defineStore } from 'pinia';

export const useUserStore = defineStore(
  'UserStore',
  () => {
    // state
    const user = ref({
      uid: '',
      email: '',
      profilePic: '',
    });

    // getters
    const isAuthenticated = computed(() => user.value.uid !== '');

    // actions
    function saveUserData(uid, email, profilePic) {
      user.value.uid = uid;
      user.value.email = email;
      user.value.profilePic = profilePic;
    }

    async function logout() {
      await axios.get('/api/logout');
      user.value.uid = '';
      user.value.email = '';
      user.value.profilePic = '';
    }

    return {
      user,
      isAuthenticated,
      saveUserData,
      logout,
    };
  },
  {
    persist: true,
  },
);
