import { ref, computed, toRaw } from 'vue';
import axios from 'axios';
import { defineStore } from 'pinia';
import { openDB } from 'idb';

let db = null;

const openDataBase = async () => {
  db = await openDB('tagsDB', 1, {
    upgrade(db) {
      db.createObjectStore('tags', { keyPath: '_id' });
      db.createObjectStore('addedImages', { keyPath: 'id' });
    },
  });
};

export const useTagStore = defineStore(
  'projectStore',
  () => {
    // state
    const tags = ref([]);
    const allProjects = ref([])
    let isOnline = true;

    // getters
    const tagsGetter = computed(() => toRaw(tags.value));
    // actions
    async function getUserTags() {
      try {
        const { data } = await axios.get('/api/project/');
        tags.value = data;
      } catch (error) {
        console.error(error);
        isOnline = false;
      }
    }
    async function getAllProjects() {
      try {
        const { data } = await axios.get('/api/project/all');
        allProjects.value = data;
      } catch (error) {
        console.error(error);
        isOnline = false;
      }
    }

    async function updateTag(tag, updatedFields) {
      if (!isOnline) {
        const tempAlb = await db.get('tags', tag._id);
        if (updatedFields.title) tempAlb.title = updatedFields.title;
        if (updatedFields.description) tempAlb.description = updatedFields.description;
        if (updatedFields.images) tempAlb.images = JSON.parse(JSON.stringify(updatedFields.images));
        if (updatedFields.coords) tempAlb.coords = JSON.parse(JSON.stringify(updatedFields.coords));

        tempAlb.edit = true;
        await db.put('tags', toRaw(tempAlb));
        await getUserTags();
        return;
      }
      try {
        const data = await axios.post(`/api/tag/upload/${tag._id}`, {
          updatedFields,
        });
        console.log(data);
      } catch (error) {
        console.error(error);
        isOnline = false;
        updateTag(tag, updatedFields);
      }
    }

    async function uploadAddedImages(images) {
      if (!isOnline) {
        const all = await db.getAll('addedImages');
        const allIndex = all.length;
        const returnArr = [];
        await images.forEach((element, index) => {
          db.put('addedImages', { id: allIndex + index, blob: element });
          returnArr.push({ filename: allIndex + index });
        });
        return returnArr;
      }
      try {
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
      } catch (error) {
        console.error(error);tag
        isOnline = false;
        uploadAddedImages(images);
      }
    }

    async function deleteTag(projectName) {
      try {
        await axios.delete(`/api/project/${projectName}`);
        await getAllProjects();
        await getUserTags();
      }catch (error) {
        console.error(error);
        isOnline = false;
      }
    }

    async function favouriteTag(tag) {
      if (!isOnline) {
        const el = await db.get('tags', tag._id);
        if (el.favourite === undefined) el.favourite = false;
        el.favourite = !el.favourite;
        el.edit = true;
        await db.put('tags', toRaw(el));
        tags.value.find((el) => el._id === tag._id).favourite = el.favourite;
        return;
      }
      try {
        await axios.post(`/api/tag/favourite/${tag._id}`);
        const element = tags.value.find((el) => el._id === tag._id);
        element.favourite = !element.favourite;
      } catch (error) {
        console.error(error);
        isOnline = false;
        favouriteTag(tag);
      }
    }

    async function createTag(updatedFields) {
      try {
        await axios.post('/api/project', { updatedFields });
        await getAllProjects();
        await getUserTags();
      } catch (error) {
        console.error(error);
        isOnline = false;
      }
    }

    function updateOnline(bool) {
      isOnline = bool;
    }

    async function createDB() {
      if (!db) await openDataBase();
    }

    async function findAndUploadfromIndexCreate(element) {
      const allImages = await db.getAll('addedImages');
      const filesToUpload = [];
      let returnArr;
      element.images.forEach((el) => {
        if (allImages.find((e) => e.id === el)) {
          filesToUpload.push(allImages.find((e) => e.id === el));
        }
      });
      if (filesToUpload.length !== 0) {
        const uploadimages = filesToUpload.map((el) => el.blob);
        returnArr = await uploadAddedImages(uploadimages);
        returnArr.forEach(() => element.images.pop());
        console.log(returnArr);
        returnArr.forEach((el) => element.images.push(el.filename));
        console.log(returnArr);
      }
      delete element.new;
      delete element._id;
      delete element.edit;
      await createTag(element);
    }

    async function findAndUploadfromIndexUpdate(element) {
      const allImages = await db.getAll('addedImages');
      const filesToUpload = [];
      let returnArr;
      element.images.forEach((el) => {
        if (allImages.find((e) => e.id === el)) {
          filesToUpload.push(allImages.find((e) => e.id === el));
        }
      });
      if (filesToUpload.length !== 0) {
        const uploadimages = filesToUpload.map((el) => el.blob);
        returnArr = await uploadAddedImages(uploadimages);
        returnArr.forEach(() => element.images.pop());
        console.log(returnArr);
        returnArr.forEach((el) => element.images.push(el.filename));
        console.log(returnArr);
      }
      const copy = element;
      delete copy.new;
      delete copy.edit;
      await updateTag(element, copy);
    }

    async function sync() {
      try {
        const all = await db.getAll('tags');
        await all.forEach((element) => {
          if (element.isDeleted) {
            deleteTag(element);
          } else if (element.new) {
            findAndUploadfromIndexCreate(element);
          } else if (element.edit) {
            findAndUploadfromIndexUpdate(element);
          }
        });
        await getUserTags();
      } catch (error) {
        console.error(error);
        isOnline = false;
        return;
      }
    }

    return {
      getUserTags,
      getAllProjects,
      updateTag,
      uploadAddedImages,
      deleteTag,
      favouriteTag,
      createTag,
      updateOnline,
      createDB,
      sync,
      tags,
      allProjects,
      tagsGetter,
    };
  },
  {
    persist: true,
  },
);
