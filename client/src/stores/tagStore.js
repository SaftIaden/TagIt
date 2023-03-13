import { ref, computed, toRaw } from 'vue';
import axios from 'axios';
import { defineStore } from 'pinia';

export const useTagStore = defineStore(
  'tagStore',
  () => {
    // state
    const tags = ref([]);

    // getters
    const tagsGetter = computed(() => toRaw(tags.value));
    // actions
    async function getUserTags() {
      const { data } = await axios.get('/api/tag/');
      tags.value = data;
    }

    async function updateTag(tag, updatedFields) {
      const data = await axios.post(`/api/tag/upload/${tag._id}`, {
        updatedFields,
      });
      console.log(data);
      
    }

    async function uploadAddedImages(images) {
      const inData = new FormData();
      images.forEach((el) => {
        inData.append('image', el);
      });
      const { data } = await axios.post('/api/tag/image', inData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(data);
      return data;
    }

    async function deleteTag(tag) {
      await axios.delete(`/api/tag/${tag._id}`);
      tags.value.splice(tags.value.findIndex((el) => (el._id == tag._id)), 1);
    }

    async function favouriteTag(tag) {
      await axios.post(`/api/tag/favourite/${tag._id}`);
      const element = tags.value.find((el) => el._id === tag._id);
      element.favourite = !element.favourite;
    }

    async function createTag(updatedFields) {
      await axios.post('/api/tag', { updatedFields });
      getUserTags();
    }

    return {
      getUserTags,
      updateTag,
      uploadAddedImages,
      deleteTag,
      favouriteTag,
      createTag,
      tags,
      tagsGetter,
    };
  },
  {
    persist: true,
  },
);
