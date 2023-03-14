<template>
  <div class="container" style="padding: 1rem">
    <q-input bottom-slots v-model="search" label="search" :dense="dense">
      <template v-slot:append>
        <q-icon
          v-if="search !== ''"
          name="close"
          @click="search = ''"
          class="cursor-pointer"
        />
        <q-icon name="search" />
      </template>

      <template v-slot:hint> search by title </template>
    </q-input>
  </div>
  <div class="container row justify-center" style="padding: 1rem">
    <q-card
      class="my-card col col-md-4 col-sm-12 col-xs-12 q-ma-sm"
      v-for="post in filteredList"
      :key="post.id"
    >
      <q-responsive :ratio="9 / 16">
        <q-img :src="post.image[0]">
          <div class="absolute-bottom text-center">
            <p class="text-h4">{{ post.title }}</p>
            <q-btn
              @click="
                (alert = true),
                  (selected = post.title),
                  (selectedde = post.description)
              "
              unelevated
              rounded
              label="Beschreibung"
              type="submit"
              color="primary"
              size="1rem"
              style="width: 80%"
            />
          </div>
        </q-img>
      </q-responsive>
    </q-card>
  </div>

  <q-dialog v-model="alert">
    <q-card class="my-card">
      <q-card-section>
        <div class="text-h6">{{ selected }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        {{ selectedde }}
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="close" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<style scoped>
.my-card {
  overflow: hidden;
  border-radius: 15px;
  max-width: 30rem;
  width: 90vw;
}
</style>
<script>
import { ref, onMounted } from 'vue';
import { useAlbumStore } from '../stores/albumStore.js';

const albumStore = useAlbumStore();
// class Post {
//   constructor(title, link, author, img) {
//     this.title = title;
//     this.link = link;
//     this.description = author;
//     this.img = img;
//   }
// }

export default {
  setup() {
    return {
      alert: ref(false),
      search: ref(''),
      posts: {},
      selected: ref(''),
      selectedde: ref(''),
      postList: [
        ...albumStore.albums,
      ]
    }
  },
  computed: {
    filteredList() {
      return this.postList.filter((post) => {
        return post.title.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },
};


onMounted(async () => {
  await albumStore.getUserAlbums();
})
</script>
