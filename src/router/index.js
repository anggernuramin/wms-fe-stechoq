import { createRouter, createWebHistory } from 'vue-router'
import AuthenticationService from '../services/AuthenticationService'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/login/register.vue')
  },
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('../layouts/Dashboard.vue'),
    meta: { requiresAuth: true }, // Otentikasi diperlukan untuk Dashboard
    children: [
      {
        path: 'products',
        name: 'products',
        component: () => import('../views/product/view.vue'),
        meta: { requiresAuth: true }, // Otentikasi diperlukan untuk products
        children: [
          {
            path: 'add',
            name: 'products add',
            component: () => import('../views/product/add.vue'),
            meta: { requiresAuth: true }
          },
          {
            path: 'edit/:id',
            name: 'products edit',
            component: () => import('../views/product/edit.vue'),
            meta: { requiresAuth: true }
          },
          {
            path: 'delete/:id',
            name: 'products delete',
            component: () => import('../views/product/delete.vue'),
            meta: { requiresAuth: true }
          }
        ]
      },
      {
        path: 'products/category',
        name: 'category',
        component: () => import('../views/category/view.vue'),
        meta: { requiresAuth: true }, // Otentikasi diperlukan untuk category
        children: [
          {
            path: 'add',
            name: 'category add',
            component: () => import('../views/category/add.vue'),
            meta: { requiresAuth: true }
          },
          {
            path: 'edit/:id',
            name: 'category edit',
            component: () => import('../views/category/edit.vue'),
            meta: { requiresAuth: true }
          },
          {
            path: 'delete/:id',
            name: 'category delete',
            component: () => import('../views/category/delete.vue'),
            meta: { requiresAuth: true }
          }
        ]
      },
      {
        path: 'barangkeluar',
        name: 'barangkeluar',
        component: () => import('../views/barangkeluar/view.vue'),
        meta: { requiresAuth: true }, // Otentikasi diperlukan untuk barangkeluar
        children: [
          {
            path: 'add',
            name: 'barangkeluar add',
            component: () => import('../views/barangkeluar/add.vue'),
            meta: { requiresAuth: true }
          },
          {
            path: 'edit/:id',
            name: 'barangkeluar edit',
            component: () => import('../views/barangkeluar/edit.vue'),
            meta: { requiresAuth: true }
          },
          {
            path: 'delete/:id',
            name: 'barangkeluar delete',
            component: () => import('../views/barangkeluar/delete.vue'),
            meta: { requiresAuth: true }
          }
        ]
      },
      {
        path: 'barang-masuk',
        name: 'barangmasuk',
        component: () => import('../views/barangMasuk/view.vue'),
        meta: { requiresAuth: true }, // Otentikasi diperlukan untuk barangmasuk
        children: [
          {
            path: 'add',
            name: 'barang masuk tambah',
            component: () => import('../views/barangMasuk/add.vue'),
            meta: { requiresAuth: true }
          },
          {
            path: 'detail/:id',
            name: 'barang masuk detail',
            component: () => import('../views/barangMasuk/detail.vue'),
            meta: { requiresAuth: true }
          },
          {
            path: 'edit/:id',
            name: 'barang masuk edit',
            component: () => import('../views/barangMasuk/edit.vue'),
            meta: { requiresAuth: true }
          },
          {
            path: 'delete/:id',
            name: 'barang masuk delete',
            component: () => import('../views/barangMasuk/delete.vue'),
            meta: { requiresAuth: true }
          }
        ]
      },
      {
        path: 'barang-masuk/search',
        name: 'barang masuk search',
        component: () => import('../views/barangMasuk/search.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/products/category/search',
        name: 'category search',
        component: () => import('../views/category/search.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '',
        name: 'Home',
        component: () => import('../views/HomePage.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('../views/ProfilePage.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'kartu-stock',
        name: 'kartu stock',
        component: () => import('../views/stock/view.vue'),
        meta: { requiresAuth: true }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('../views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('token')
  // const isLoggedIn = AuthenticationService.isLoggedIn()

  if (to.matched.some((record) => record.meta.requiresAuth) && !isLoggedIn) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
