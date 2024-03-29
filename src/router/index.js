import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/LoginPage.vue')
    },
    {
      path: '/',
      name: 'Dashboard',
      component: () => import('../layouts/Dashboard.vue'),
      children: [
        {
          path: '',
          name: 'Home',
          component: () => import('../views/HomePage.vue')
        },
        {
          path: 'profile',
          name: 'Profile',
          component: () => import('../views/ProfilePage.vue')
        },
        {
          path: 'barang-masuk',
          name: 'Barang Masuk',
          component: () => import('../views/BarangMasuk.vue')
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('../views/NotFound.vue')
    }
  ]
})

export default router
