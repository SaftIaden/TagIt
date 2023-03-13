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
  <div class="container row" style="padding: 1rem">
    <q-card
      class="my-card col"
      style="max-width: 25rem; widht: 90vw"
      v-for="post in filteredList"
    >
      <q-responsive :ratio="9 / 16">
        <q-img
          src="https://cdn.pixabay.com/photo/2023/02/10/13/44/gorilla-7780902_960_720.jpg"
        >
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
    <q-card>
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
}
</style>
<script>
import { ref } from 'vue';

export default {
  setup() {
    return {
      search: ref(''),
      posts: {},
      selected: ref(''),
      selectedde: ref(''),
    };
  },
  computed: {
    filteredList() {
      return this.posts.filter((post) => {
        return post.title.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },
};
</script>
