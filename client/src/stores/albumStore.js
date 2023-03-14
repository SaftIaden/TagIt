import { ref, computed, toRaw } from 'vue';
import axios from 'axios';
import { defineStore } from 'pinia';
import { openDB } from 'idb';

let db = null;

const openDataBase = async () => {
  db = await openDB('albumsDB', 1, {
    upgrade(db) {
      db.createObjectStore('albums', { keyPath: '_id' });
    },
  });
};

export const useAlbumStore = defineStore(
  'albumStore',
  () => {
    // state
    const albums = ref([]);
    let isOnline = true;
    // getters
    const albumsGetter = computed(() => toRaw(albums.value));
    // actions
    async function getUserAlbums() {
      if (!isOnline) {
        let data = await db.getAll('albums');
        albums.value = data.filter((el) => !el.isDeleted);
        return;
      }
      try {
        const { data } = await axios.get('/api/album/');
        albums.value = data;
        await db.clear('albums');
        albums.value.forEach((e) => {
          db.put('albums', toRaw(e));
        });
      } catch (error) {
        console.error(error);
        isOnline = false;
        getUserAlbums();
      }
    }

    async function updateAlbum(album, updatedFields) {
      if (!isOnline) {
        const tempAlb = await db.get('albums', album._id);
        if (updatedFields.title) tempAlb.title = updatedFields.title;
        if (updatedFields.description) tempAlb.description = updatedFields.description;
        if (updatedFields.tags) tempAlb.tags = updatedFields.tags;
        await db.put('albums', toRaw(tempAlb));
        await getUserAlbums();
        return;
      }
      try {
        await axios.patch(`/api/album/${album._id}`, {
          updatedFields,
        });
        await getUserAlbums();
      } catch (error) {
        console.error(error);
        isOnline = false;
        updateAlbum(album, updatedFields);
      }
    }

    async function deleteAlbum(album) {
      if (!isOnline) {
        const el = await db.get('albums', album._id);
        el.isDeleted = true;
        await db.put('albums', toRaw(el));
        albums.value.splice(
          albums.value.findIndex((el) => el._id == album._id),
          1,
        );
        return;
      }
      try {
        await axios.delete(`/api/album/${album._id}`);
        albums.value.splice(
          albums.value.findIndex((el) => el._id == album._id),
          1,
        );
      } catch (error) {
        console.error(error);
        isOnline = false;
        deleteAlbum(album);
      }
    }

    async function favouriteAlbum(album) {
      if (!isOnline) {
        const el = await db.get('albums', album._id);
        if (el.favourite === undefined) el.favourite = false;
        el.favourite = !el.favourite;
        el.edit = true;
        await db.put('albums', toRaw(el));
        albums.value.find((el) => el._id === album._id).favourite = el.favourite;
        return;
      }
      try {
        await axios.post(`/api/album/favourite/${album._id}`);
        const element = albums.value.find((el) => el._id === album._id);
        element.favourite = !element.favourite;
      } catch (error) {
        console.error(error);
        isOnline = false;
        favouriteAlbum(album);
      }
    }

    async function createAlbum(updatedFields) {
      console.log(updatedFields)
      if (!isOnline) {
        await db.put('albums', toRaw({
          _id: albums.value.length,
          title: updatedFields.title,
          description: updatedFields.description,
          tags: updatedFields.tags,
          new: true,
        }));
        albums.value.push({
          _id: albums.value.length,
          title: updatedFields.title,
          description: updatedFields.description,
          tags: updatedFields.tags,
        });
        return;
      }
      try {
        await axios.post('/api/album', { updatedFields });
        await getUserAlbums();
      } catch (error) {
        console.error(error);
        isOnline = false;
        createAlbum(updatedFields);
      }
    }

    function updateOnline(bool) {
      isOnline = bool;
    }
    async function createDB() {
      if (!db) await openDataBase();
    }
    async function sync() {
      try {
        const all = await db.getAll('albums');
        await all.forEach((element) => {
          if (element.isDeleted) {
            deleteAlbum(element);
          } else if (element.new) {
            delete element.new;
            delete element._id;
            delete element.edit;
            createAlbum(element);
          } else if (element.edit) {
            const copy = element;
            delete copy.new;
            delete copy.edit;
            updateAlbum(element, copy);
          }
        });
        await getUserAlbums();
      } catch (error) {
        console.error(error);
        isOnline = false;
        return;
      }
    }

    return {
      getUserAlbums,
      updateAlbum,
      deleteAlbum,
      favouriteAlbum,
      createAlbum,
      updateOnline,
      createDB,
      sync,
      albums,
      albumsGetter,
    };
  },
  {
    persist: true,
  },
);
