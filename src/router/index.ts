import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import studentsVue from '@/views/students.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    // PR1: '/students'（検索ページ）のルートをここに追加する
    {
      path: '/students',
      name: 'students',
      component: studentsVue,
    },
  ],
})

export default router
