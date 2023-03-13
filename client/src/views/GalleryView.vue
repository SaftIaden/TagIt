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
        <q-img :src="post.img">
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
import { ref } from 'vue';

class Post {
  constructor(title, link, author, img) {
    this.title = title;
    this.link = link;
    this.description = author;
    this.img = img;
  }
}

export default {
  setup() {
    return {
      alert: ref(false),
      search: ref(''),
      posts: {},
      selected: ref(''),
      selectedde: ref(''),
      postList: [
        new Post(
          'Vue.js',
          'https://vuejs.org/',
          'Chris',
          'https://vuejs.org//images/logo.png'
        ),
        new Post(
          'React.js',
          'https://facebook.github.io/react/',
          'Tim',
          'https://daynin.github.io/clojurescript-presentation/img/react-logo.png'
        ),
        new Post(
          'Angular.js',
          'https://angularjs.org/',
          'Sam',
          'https://angularjs.org/img/ng-logo.png'
        ),
        new Post(
          'Ember.js',
          'http://emberjs.com/',
          'Rachel',
          'http://www.gravatar.com/avatar/0cf15665a9146ba852bf042b0652780a?s=200'
        ),
        new Post(
          'Meteor.js',
          'https://www.meteor.com/',
          'Chris',
          'http://hacktivist.in/introduction-to-nodejs-mongodb-meteor/img/meteor.png'
        ),
        new Post(
          'Aurelia',
          'http://aurelia.io/',
          'Tim',
          'https://cdn.auth0.com/blog/aurelia-logo.png'
        ),
        new Post(
          'Node.js',
          'https://nodejs.org/en/',
          'A. A. Ron',
          'https://code-maven.com/img/node.png'
        ),
        new Post(
          'Pusher',
          'https://pusher.com/',
          'Alex',
          'https://avatars1.githubusercontent.com/u/739550?v=3&s=400'
        ),
        new Post(
          'Feathers.js',
          'http://feathersjs.com/',
          'Chuck',
          'https://cdn.worldvectorlogo.com/logos/feathersjs.svg'
        ),
      ],
    };
  },
  computed: {
    filteredList() {
      return this.postList.filter((post) => {
        return post.title.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },
};
</script>
