import { ref, computed, toRaw } from 'vue';
import axios from 'axios';
import { defineStore } from 'pinia';

export const useAlbumStore = defineStore(
  'albumStore',
  () => {
    // state
    const albums = ref([]);

    // getters
    const albumsGetter = computed(() => toRaw(albums.value));
    // actions
    async function getUserAlbums() {
      const { data } = await axios.get('/api/album/');
      albums.value = data;
    }

    async function updateAlbum(album, updatedFields) {
      const data = await axios.patch(`/api/album/${album._id}`, {
        updatedFields,
      });
      console.log(data);
      await getUserAlbums();
    }

    async function deleteAlbum(album) {
      await axios.delete(`/api/album/${album._id}`);
      albums.value.splice(
        albums.value.findIndex((el) => el._id == album._id),
        1,
      );
    }

    async function favouriteAlbum(album) {
      await axios.post(`/api/album/favourite/${album._id}`);
      const element = albums.value.find((el) => el._id === album._id);
      element.favourite = !element.favourite;
    }

    async function createAlbum(updatedFields) {
      await axios.post('/api/album', { updatedFields });
      await getUserAlbums();
    }

    return {
      getUserAlbums,
      updateAlbum,
      deleteAlbum,
      favouriteAlbum,
      createAlbum,
      albums,
      albumsGetter,
    };
  },
  {
    persist: true,
  },
);
