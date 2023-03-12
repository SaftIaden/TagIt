import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '@/stores/userStore.js';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      beforeEnter: (to, from, next) => {
        const userStore = useUserStore();
        if (!userStore.isAuthenticated) next({ path: '/login' });
        else next();
      },
    },
    {
      path: '/add',
      name: 'Add Tag',
      component: () => import('../views/AddTagView.vue')
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/LoginRegister.vue'),
      beforeEnter: (to, from, next) => {
        const userStore = useUserStore();
        if (userStore.isAuthenticated) next({ path: '/login' });
        else next();
      },
    },
    {
      path: '/logout',
      beforeEnter: (to, from, next) => {
        const userStore = useUserStore();
        userStore.logout();
        next({ path: '/login' });
      },
    },
    {
      path: '/verify/',
      name: 'verify',
      component: () => import('../views/VerifyRegestration.vue'),
    },
    {
      path: '/thankyou',
      name: 'newRegistred',
      component: () => import('../views/NewRegistred.vue'),
    },
    {
      path: '/:catchAll(.*)*',
      component: () => import('../views/ErrorNotFound.vue'),
    },
  ],
});

export default router;
