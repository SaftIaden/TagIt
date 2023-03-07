import { ref, computed } from 'vue';
import axios from 'axios';
import { defineStore } from 'pinia';

export const useTagStore = defineStore(
  'tagStore',
  () => {
    // state
    const tags = ref([]);

    // getters

    // actions
    async function getUserTags() {
      const { data } = await axios.get('/api/tag/');
      tags.value = data;
    }

    async function updateTag(tag ,updatedFields) {
      const data = await axios.post(`/api/tag/${tag._id}`, {
        updatedFields
      })
      console.log(data);
    }

    return {
      getUserTags,
      updateTag,
      tags,
    };
  },
  {
    persist: true,
  },
);
