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

    const allUsers = ref([])

    // getters
    const isAuthenticated = computed(() => user.value.uid !== '');

    // actions
    function saveUserData(uid, email, profilePic) {
      user.value.uid = uid;
      user.value.email = email;
      user.value.profilePic = profilePic;
    }

    async function getAllUsers() {
        try {
        const { data } = await axios.get('/api/user');
        allUsers.value = data;
      } catch (error) {
          console.error(error);
      }
    }

    async function changeUserProjects(userName, updatedProjects) {
      try {
        const { data } = await axios.patch(`api/user/${userName}`, {updatedProjects})
        console.log(data)
        await getAllUsers()
      } catch (error) {
        console.log(error)
      }
    }

       async function changeUserRole(userName, updatedRole) {
      try {
        const { data } = await axios.patch(`api/user/role/${userName}`, {updatedRole})
        console.log(data)
        await getAllUsers()
      } catch (error) {
        console.log(error)
      }
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
      allUsers,
      getAllUsers,
      saveUserData,
      changeUserProjects,
      changeUserRole,
      logout,
    };
  },
  {
    persist: true,
  },
);
