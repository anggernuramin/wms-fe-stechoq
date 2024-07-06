<script setup>
import { useStore } from 'vuex'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Auth from '../services/AuthenticationService.js'

const router = useRouter()
const location = useRoute()
const store = useStore()
const isOpenLaporan = ref(false)
const isOpenProduct = ref(false)

const toggleSidebar = () => {
  isOpenLaporan.value = false
  store.commit('toogleSidebar')
}

const handleLogout = () => {
  Auth.logout()
  router.push('/login')
}

const openOptionLaporan = () => {
  isOpenLaporan.value = !isOpenLaporan.value
}
const openOptionProduct = () => {
  isOpenProduct.value = !isOpenProduct.value
}
</script>

<template>
  <!-- md:-ml-64 -->
  <aside
    id="sideBar"
    class="sidebar fixed flex flex-col flex-wrap flex-none w-[230px] border-r border-gray-300 bg-secondary md:fixed md:top-0 md:z-30 md:shadow-xl animated faster transition h-screen overflow-hidden"
    :style="{ width: store.state.isSidebarOpen ? '230px' : '65px' }"
  >
    <header
      class="fixed flex flex-col w-[14.35rem] px-3 pt-4 pb-2 bg-secondary sidebar"
      :class="{ 'flex-col': !store.state.isSidebarOpen }"
      :style="{ width: store.state.isSidebarOpen ? '230px' : '65px' }"
    >
      <div class="flex justify-end">
        <i
          class="flex items-center justify-center p-2 rounded-sm cursor-pointer bg-slate-100 w-7 h-7 fas"
          :class="{ 'fa-chevron-left': store.state.isSidebarOpen, 'fa-chevron-right': !store.state.isSidebarOpen }"
          @click="toggleSidebar"
        ></i>
      </div>

      <div class="flex items-center justify-center gap-3">
        <img src="/assets/images/Layers.svg" alt="" class="object-contain object-center w-12 h-12 ps-3" />
        <h1 class="text-xl" :class="{ hidden: !store.state.isSidebarOpen }">Fortune</h1>
      </div>
    </header>
    <ul class="flex flex-col items-start justify-start w-full h-screen gap-1 px-3 py-6 pt-24 overflow-y-auto">
      <li class="w-full mt-4">
        <router-link
          to="/"
          class="flex items-center justify-start w-full gap-3 p-2 px-3 font-medium rounded-md"
          :class="{
            'bg-btnPrimary  text-slate-50': location.name.includes('Home'),
            'bg-secondary text-TxtPrimary-700': !location.name.includes('Home')
          }"
        >
          <i class="fas fa-briefcase"></i>

          <h2 class="text-sm" :class="{ hidden: !store.state.isSidebarOpen }">Dashboard</h2>
        </router-link>
      </li>

      <h3 class="my-2 text-xs font-medium text-TxtPrimary-700 ps-3" :class="{ hidden: !store.state.isSidebarOpen }">
        Product
      </h3>
      <li class="w-full mb-1">
        <router-link
          to="/kartu-stock"
          class="flex items-center justify-start w-full gap-3 p-2 px-3 font-medium rounded-md text-TxtPrimary-70"
          :class="{
            'bg-btnPrimary  text-slate-50': location.path === '/kartu-stock',
            'bg-secondary text-TxtPrimary-700': location.path !== '/kartu-stock'
          }"
        >
          <i class="text-md fas fa-briefcase"></i>
          <h2 class="text-sm" :class="{ hidden: !store.state.isSidebarOpen }">Kartu Stok</h2>
        </router-link>
      </li>
      <li class="w-full cursor-pointer">
        <router-link
          to="/products"
          class="flex items-center justify-start w-full gap-3 p-2 px-3 font-medium rounded-md text-TxtPrimary-70"
          :class="{
            'bg-btnPrimary  text-slate-50': location.name.includes('products'),
            'bg-secondary text-TxtPrimary-700': !location.name.includes('products')
          }"
          @click="openOptionProduct"
        >
          <i class="text-md fas fa-solid fa-bag-shopping"></i>
          <h2
            class="flex items-center justify-between w-full text-sm font-medium"
            :class="{ hidden: !store.state.isSidebarOpen }"
          >
            Products
            <i class="text-xs transition-all fas" :class="isOpenProduct ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
          </h2>
        </router-link>
        <ul
          :style="{ height: isOpenProduct ? '40px' : '0px' }"
          class="flex flex-col gap-1 mt-[6px] overflow-hidden transition display-collapse animated faster"
        >
          <li class="w-full">
            <router-link
              to="/products/category"
              class="flex items-center justify-start w-full gap-3 p-2 font-medium rounded-md ps-9 pe-3"
              :class="{
                'bg-btnPrimary  text-slate-50 hover:bg-btnPrimary': location.name.includes('category'),
                'bg-secondary text-TxtPrimary-700 hover:bg-slate-100': !location.name.includes('category')
              }"
            >
              <i class="fa-solid fa-tags"></i>
              <h2 class="text-sm font-medium" :class="{ hidden: !store.state.isSidebarOpen }">Category</h2>
            </router-link>
          </li>
        </ul>
      </li>

      <li class="w-full">
        <router-link
          to="/barang-masuk"
          class="flex items-center justify-start w-full gap-3 p-2 px-3 font-medium rounded-md text-TxtPrimary-70"
          :class="{
            'bg-btnPrimary  text-slate-50': location.path === '/barang-masuk',
            'bg-secondary text-TxtPrimary-700': location.path !== '/barang-masuk'
          }"
        >
          <i class="text-md fa-solid fa-list-check"></i>
          <h2 class="text-sm" :class="{ hidden: !store.state.isSidebarOpen }">Barang Masuk</h2>
        </router-link>
      </li>

      <li class="w-full">
        <router-link
          to="/barangkeluar"
          class="flex items-center justify-start w-full gap-3 p-2 px-3 font-medium rounded-md text-TxtPrimary-70"
          :class="{
            'bg-btnPrimary  text-slate-50': location.path === '/barangkeluar',
            'bg-secondary text-TxtPrimary-700': location.path !== '/barangkeluar'
          }"
        >
          <i class="fas fa-truck text-md"></i>
          <h2 class="text-sm" :class="{ hidden: !store.state.isSidebarOpen }">Barang Keluar</h2>
        </router-link>
      </li>

      <h3 class="my-2 text-xs font-medium ps-3 text-TxtPrimary-700" :class="{ hidden: !store.state.isSidebarOpen }">
        Pengaturan
      </h3>

      <li class="w-full mb-3">
        <button
          class="flex items-center justify-start w-full gap-3 p-2 px-3 rounded-md bg-secondary"
          @click="handleLogout"
        >
          <i class="text-TxtPrimary-700 fas fa-sign-out"></i>
          <h2 class="text-sm font-medium text-TxtPrimary-700" :class="{ hidden: !store.state.isSidebarOpen }">
            Logout
          </h2>
        </button>
      </li>
    </ul>

    <!-- end sidebar content -->
  </aside>
  <!-- Breadcrumbs -->
</template>

<style>
/* width */
::-webkit-scrollbar {
  width: 3px;
  border-radius: 30px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #ddd;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #eee;
}
.open-dropdown {
  transition: all 0.3s ease-in-out;
}
</style>
