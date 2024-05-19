import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
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
      children: [
        {
          path: 'products',
          name: 'products',
          component: () => import('../views/product/view.vue'),
          children: [
            {
              path: 'add',
              name: 'products add',
              component: () => import('../views/product/add.vue')
            },
            {
              path: 'edit/:id',
              name: 'products edit',
              component: () => import('../views/product/edit.vue')
            },
            {
              path: 'delete/:id',
              name: 'products delete',
              component: () => import('../views/product/delete.vue')
            }
          ]
        },
        {
          path: 'products/category',
          name: 'category',
          component: () => import('../views/category/view.vue'),
          children: [
            {
              path: 'add',
              name: 'category add',
              component: () => import('../views/category/add.vue')
            },

            {
              path: 'edit/:id',
              name: 'category edit',
              component: () => import('../views/category/edit.vue')
            },
            {
              path: 'delete/:id',
              name: 'category delete',
              component: () => import('../views/category/delete.vue')
            }
          ]
        },
        {
          path: 'barangkeluar',
          name: 'barangkeluar',
          component: () => import('../views/barangkeluar/view.vue'),
          children: [
            {
              path: 'add',
              name: 'barangkeluar add',
              component: () => import('../views/barangkeluar/add.vue')
            },
            {
              path: 'edit/:id',
              name: 'barangkeluar edit',
              component: () => import('../views/barangkeluar/edit.vue')
            },
            {
              path: 'delete/:id',
              name: 'barangkeluar delete',
              component: () => import('../views/barangkeluar/delete.vue')
            }
          ]
        },
        {
          path: 'barang-masuk',
          name: 'barangmasuk',
          component: () => import('../views/barangMasuk/view.vue'),
          children: [
            {
              path: 'add',
              name: 'barang masuk tambah',
              component: () => import('../views/barangMasuk/add.vue')
            },

            {
              path: 'detail/:id',
              name: 'barang masuk detail',
              component: () => import('../views/barangMasuk/detail.vue')
            },
            {
              path: 'edit/:id',
              name: 'barang masuk edit',
              component: () => import('../views/barangMasuk/edit.vue')
            },
            {
              path: 'delete/:id',
              name: 'barang masuk delete',
              component: () => import('../views/barangMasuk/delete.vue')
            }
          ]
        },
        {
          path: 'barang-masuk/search',
          name: 'barang masuk search',
          component: () => import('../views/barangMasuk/search.vue')
        },
        {
          path: '/products/category/search',
          name: 'category search',
          component: () => import('../views/category/search.vue')
        },
        {
          path: '',
          name: 'Home',
          component: () => import('../views/HomePage.vue')
        },
        {
          path: 'profile',
          name: 'Profile',
          component: () => import('../views/ProfilePage.vue')
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
