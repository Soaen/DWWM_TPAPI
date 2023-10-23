import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreateView from "../views/CreateView.vue";
import ModifyView from "../views/ChangeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/create',
      name: 'create',
      component: CreateView

    },
    {
      path: '/modify/:id',
      name: 'modify',
      component: ModifyView

    }
  ]
})

export default router
