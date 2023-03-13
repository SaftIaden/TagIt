<template>
  <div class="q-pa-md flex row justify-center q-gutter-md">
    <q-card v-if="allTagIDs.length !== 0" class="col-5">
      <img :src="`/images/${tagStore.tags[0].images[0]}`" alt="" />
     <div @click="openAllAlbum = true">
        <q-card-section class="">
          <div class="text-h4" style="font-family: blankRiver">All</div>
          <div class="text-subtitle2">All Images from all your Tags</div>
        </q-card-section>
        <q-separator />
        <q-card-section class="flex row justify-around">
          <p>Tags: {{ allTagIDs.length }}</p>
          <p class="text-subtitle2">|</p>
          <p>Images: {{ summPics(allTagIDs) }}</p>
        </q-card-section>
     </div>
    </q-card>
    <q-card v-if="favouriteTagsIds.length !== 0" class="col-5">
      <img
        :src="`/images/${tagStore.tags.filter((el) => el.favourite === true)[0].images[0]}`"
        alt=""
      />
    <div @click="openFavouriteAlbum = true">
        <q-card-section class="">
          <div class="text-h4" style="font-family: blankRiver">Favourites</div>
          <div class="text-subtitle2">Images from your favourite Tags</div>
        </q-card-section>
        <q-separator />
        <q-card-section class="flex row justify-around">
          <p>Tags: {{ favouriteTagsIds.length }}</p>
          <p class="text-subtitle2">|</p>
          <p>Images: {{ summPics(favouriteTagsIds) }}</p>
        </q-card-section>
    </div>
    </q-card>
    <q-card class="col-5" v-for="a in albums" :key="a._id">
      <q-btn
        class="absolute-top-left q-mt-md"
        text-color="primary"
        flat
        icon="delete"
        style="z-index: 1"
        @click="albumStore.deleteAlbum(a)"
      ></q-btn>
      <q-btn
        v-if="!a.favourite"
        class="absolute-top-right q-mt-md"
        text-color="primary"
        flat
        icon="star_outline"
        style="z-index: 1"
        @click="albumStore.favouriteAlbum(a)"
      ></q-btn>
      <q-btn
        v-if="a.favourite"
        class="absolute-top-right q-mt-md"
        text-color="primary"
        flat
        icon="star"
        style="z-index: 1"
        @click="albumStore.favouriteAlbum(a)"
      ></q-btn>
      <img :src="`/images/${tagStore.tags.find((el) => el._id === a.tags[0]).images[0]}`" alt="" />
      <div @click="openAlbum(a)">
        <q-card-section class="">
          <div class="text-h4" style="font-family: blankRiver">{{ a.title }}</div>
          <div class="text-subtitle2">{{ a.description }}</div>
        </q-card-section>
        <q-separator />
        <q-card-section class="flex row justify-around">
          <p>Tags: {{ a.tags.length }}</p>
          <p class="text-subtitle2">|</p>
          <p>Images: {{ summPics(a.tags) }}</p>
        </q-card-section>
      </div>
    </q-card>
    <q-card class="col-5 text-center flex column justify-center" @click="albumDialog = true">
      <q-icon class="self-center" name="add_circle" size="8rem" color="primary"></q-icon>
      <q-card-section class="">
        <div class="text-h4" style="font-family: blankRiver">Add</div>
        <div class="text-subtitle2">{{}}</div>
      </q-card-section>
    </q-card>
  </div>
  <q-dialog
    v-model="albumDialog"
    persistent
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card>
      <q-card-section>
        <q-input standout="bg-primary text-white" v-model="title" label="Title" />
        <q-input standout="bg-primary text-white" v-model="description" label="description" />
        <q-select
          filled
          v-model="tags"
          multiple
          :options="tagStore.tags.map((el) => el.title)"
          label="Multiple"
          style="width: 250px"
        />
      </q-card-section>
      <q-card-actions align="center">
        <q-btn
          class="bg-primary text-white"
          square
          rouded
          icon="close"
          @click="closeDialog()"
        ></q-btn>
        <q-btn class="bg-primary text-white" square rouded icon="done" @click="addAlbum()"></q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-dialog
    v-model="openAlbumDialog"
    :maximized="true"
    persistent
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card>
      <q-bar class="bg-primary text-white flex justify-center">
        <q-btn dense flat font-size="30px" icon="expand_more" v-close-popup> </q-btn>
      </q-bar>
      <q-card-section class="flex row justify-between items-top q-mt-sm q-ml-sm">
        <p class="text-h2 q-my-md" style="font-family: blankRiver">{{ currentAlbum.title }}</p>
        <div>
          <q-btn
            class="q-mt-md"
            text-color="primary"
            size="20px"
            flat
            icon="edit"
            style="z-index: 1"
            @click="edit()"
          ></q-btn>
          <q-btn
            v-if="!currentAlbum.favourite"
            class="q-mt-md"
            size="20px"
            text-color="primary"
            flat
            icon="star_outline"
            style="z-index: 1"
            @click="albumStore.favouriteAlbum(currentAlbum)"
          ></q-btn>
          <q-btn
            v-if="currentAlbum.favourite"
            class="q-mt-md"
            text-color="primary"
            size="20px"
            flat
            icon="star"
            style="z-index: 1"
            @click="albumStore.favouriteAlbum(currentAlbum)"
          ></q-btn>
        </div>
      </q-card-section>
      <q-card-section v-for="(tag, key) in currentAlbum.tags" :key="key">
        <p>{{ tagStore.tags.find((el) => el._id === tag).title }}:</p>
        <div class="flex row justify-center q-ma-md">
          <img
            v-for="(image, key) in tagStore.tags.find((el) => el._id === tag).images"
            :key="key"
            class="col-4"
            :src="`/images/${image}`"
            alt=""
            @click="openImageInBig(image)"
          />
        </div>
        <q-separator />
      </q-card-section>
    </q-card>
    <q-dialog v-model="editDialog" persistent>
      <q-card>
        <q-input standout="bg-primary text-white" v-model="editTitle" label="Title" />
        <q-input standout="bg-primary text-white" v-model="editDescription" label="description" />
        <q-select
          filled
          v-model="editTags"
          multiple
          :options="tagStore.tags.map((el) => el.title)"
          label="Multiple"
          style="width: 250px"
        />
        <q-card-actions align="center">
          <q-btn
            class="bg-primary text-white"
            square
            rouded
            icon="close"
            @click="resetEdit()"
          ></q-btn>
          <q-btn
            class="bg-primary text-white"
            square
            rouded
            icon="done"
            @click="acceptEdit()"
          ></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-dialog>
  <q-dialog
    v-model="openAllAlbum"
    :maximized="true"
    persistent
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card>
      <q-bar class="bg-primary text-white flex justify-center">
        <q-btn dense flat font-size="30px" icon="expand_more" v-close-popup> </q-btn>
      </q-bar>
      <q-card-section class="flex row justify-between items-top q-mt-sm q-ml-sm">
        <p class="text-h2 q-my-md" style="font-family: blankRiver"> All </p>
      </q-card-section>
      <q-card-section v-for="(tag, key) in allTagIDs" :key="key">
        <p>{{ tagStore.tags.find((el) => el._id === tag).title }}:</p>
        <div class="flex row justify-center q-ma-md">
          <img
            v-for="(image, key) in tagStore.tags.find((el) => el._id === tag).images"
            :key="key"
            class="col-4"
            :src="`/images/${image}`"
            alt=""
            @click="openImageInBig(image)"
          />
        </div>
        <q-separator />
      </q-card-section>
    </q-card>
  </q-dialog>
  <q-dialog
    v-model="openFavouriteAlbum"
    :maximized="true"
    persistent
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card>
      <q-bar class="bg-primary text-white flex justify-center">
        <q-btn dense flat font-size="30px" icon="expand_more" v-close-popup> </q-btn>
      </q-bar>
      <q-card-section class="flex row justify-between items-top q-mt-sm q-ml-sm">
        <p class="text-h2 q-my-md" style="font-family: blankRiver"> Favourite </p>
      </q-card-section>
      <q-card-section v-for="(tag, key) in favouriteTagsIds" :key="key">
        <p>{{ tagStore.tags.find((el) => el._id === tag).title }}:</p>
        <div class="flex row justify-center q-ma-md">
          <img
            v-for="(image, key) in tagStore.tags.find((el) => el._id === tag).images"
            :key="key"
            class="col-4"
            :src="`/images/${image}`"
            alt=""
            @click="openImageInBig(image)"
          />
        </div>
        <q-separator />
      </q-card-section>
    </q-card>
  </q-dialog>
  <q-dialog v-model="openImage" :maximized="true">
    <img :src="`images/${currentImage}`" style="width: 100%" alt="" />
  </q-dialog>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useAlbumStore } from '../stores/albumStore';
import { useTagStore } from '../stores/tagStore';

const albumStore = useAlbumStore();
const tagStore = useTagStore();
const favouriteTagsIds = ref([]);
const allTagIDs = ref([]);

const albums = ref();
const currentAlbum = ref();
const openImage = ref(false);
const currentImage = ref();
const editDialog = ref(false);
const openAllAlbum = ref(false);
const openFavouriteAlbum = ref(false);

const editTitle = ref('');
const editDescription = ref('');
const editTags = ref([]);

const albumDialog = ref(false);
const openAlbumDialog = ref(false);
const title = ref('');
const description = ref('');
const tags = ref([]);

const summPics = (arr) => {
  let summ = 0;
  arr.forEach((element) => {
    summ += tagStore.tags.find((el) => el._id === element).images.length;
  });
  return summ;
};

const closeDialog = () => {
  title.value = '';
  description.value = '';
  albumDialog.value = false;
};

const addAlbum = async () => {
  const submitTags = [];
  tags.value.forEach((el) => submitTags.push(tagStore.tags.find((tag) => tag.title === el)._id));
  const updatedFields = {
    title: title.value,
    description: description.value,
    tags: submitTags,
  };
  await albumStore.createAlbum(updatedFields);
  albums.value = albumStore.albums;
  albumDialog.value = false;
};

const openAlbum = (album) => {
  currentAlbum.value = album;
  openAlbumDialog.value = true;
};

const openImageInBig = (image) => {
  currentImage.value = image;
  openImage.value = true;
};

const edit = () => {
  editTitle.value = currentAlbum.value.title;
  editDescription.value = currentAlbum.value.description;
  editTags.value = currentAlbum.value.tags.map(
    (tag) => tagStore.tags.find((el) => el._id === tag).title,
  );
  editDialog.value = true;
};

const resetEdit = () => {
  editDialog.value = false;
};

const acceptEdit = async () => {
  const updatedFields = {};
  if (currentAlbum.value.title !== editTitle.value) updatedFields.title = editTitle.value;
  if (currentAlbum.value.description !== editDescription.value)
    updatedFields.description = editDescription.value;
  const editTagIds = editTags.value.map(
    (tagname) => tagStore.tags.find((el) => el.title === tagname)._id,
  );
  if (currentAlbum.value.tags !== editTagIds) updatedFields.tags = editTagIds;
  await albumStore.updateAlbum(currentAlbum.value, updatedFields);
  albums.value = albumStore.albums;
  currentAlbum.value = albumStore.albums.find((el) => el._id === currentAlbum.value._id);
  editDialog.value = false;
};

onMounted(async () => {
  await albumStore.getUserAlbums();
  albums.value = albumStore.albums;
  favouriteTagsIds.value = tagStore.tags.filter((el) => el.favourite === true).map((el) => el._id);
  allTagIDs.value = tagStore.tags.map((el) => el._id);
  currentAlbum.value = albums.value[0];
});
</script>
