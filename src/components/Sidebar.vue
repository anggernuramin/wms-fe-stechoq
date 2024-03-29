<script setup>
import { useStore } from 'vuex'
import { onMounted } from 'vue'

const store = useStore()
const toggleSidebar = () => {
  store.commit('toogleSidebar')
}
</script>

<template>
  <!-- md:-ml-64 -->
  <aside
    id="sideBar"
    class="sidebar fixed flex flex-col flex-wrap flex-none w-[230px] py-6 px-3 border-r border-gray-300 bg-secondary md:fixed md:top-0 md:z-30 h-screen md:shadow-xl animated faster overflow-hidden transition"
    :style="{ width: store.state.isSidebarOpen ? '230px' : '65px' }"
  >
    <ul class="flex flex-col items-start justify-start w-full h-full gap-1">
      <li class="flex items-center justify-between w-full mb-4" :class="{ 'flex-col': !store.state.isSidebarOpen }">
        <div class="flex items-center justify-center gap-3">
          <img src="/assets/images/Layers.svg" alt="" class="object-contain object-center w-12 h-12 ps-3" />
          <h1 class="text-xl" :class="{ hidden: !store.state.isSidebarOpen }">Furniture</h1>
        </div>
        <i class="cursor-pointer fa-solid fa-bars" @click="toggleSidebar"></i>
      </li>

      <li class="w-full">
        <router-link to="/" class="flex items-center justify-start w-full gap-3 p-2 px-3 rounded-md bg-secondary">
          <i class="text-TxtPrimary-700 fas fa-briefcase"></i>

          <h2 class="text-sm font-normal text-TxtPrimary-700" :class="{ hidden: !store.state.isSidebarOpen }">
            Dashboard
          </h2>
        </router-link>
      </li>

      <h3
        class="mt-2 mb-2 text-xs font-medium text-TxtPrimary-700 ps-3"
        :class="{ 'ps-1': !store.state.isSidebarOpen }"
      >
        Barang
      </h3>
      <li class="w-full">
        <router-link
          to="/barang-masuk"
          class="flex items-center justify-start w-full gap-3 p-2 px-3 rounded-md bg-btnPrimary"
        >
          <i class="text-slate-50 fas fa-briefcase"></i>
          <h2 class="text-sm font-medium text-slate-50" :class="{ hidden: !store.state.isSidebarOpen }">
            Barang Masuk
          </h2>
        </router-link>
      </li>
      <li class="w-full">
        <router-link
          to="/barang-masuk"
          class="flex items-center justify-start w-full gap-3 p-2 px-3 rounded-md bg-secondary"
        >
          <i class="text-TxtPrimary-700 fas fa-briefcase"></i>
          <h2 class="text-sm font-medium text-TxtPrimary-700" :class="{ hidden: !store.state.isSidebarOpen }">
            Barang Keluar
          </h2>
        </router-link>
      </li>
      <li class="w-full">
        <router-link
          to="/barang-masuk"
          class="flex items-center justify-start w-full gap-3 p-2 px-3 rounded-md bg-secondary"
        >
          <i class="text-TxtPrimary-700 fas fa-briefcase"></i>

          <h2 class="text-sm font-medium text-TxtPrimary-700" :class="{ hidden: !store.state.isSidebarOpen }">
            Pengiriman
          </h2>
        </router-link>
      </li>
      <li class="w-full">
        <router-link
          to="/barang-masuk"
          class="flex items-center justify-start w-full gap-3 p-2 px-3 rounded-md bg-secondary"
        >
          <i class="text-TxtPrimary-700 fas fa-briefcase"></i>

          <h2 class="text-sm font-medium text-TxtPrimary-700" :class="{ hidden: !store.state.isSidebarOpen }">
            Stock Opname
          </h2>
        </router-link>
      </li>
    </ul>
    <ul class="absolute bottom-0 flex flex-col items-start justify-start w-[80%] gap-1">
      <h3 class="text-xs font-medium ps-3 text-TxtPrimary-700" :class="{ hidden: !store.state.isSidebarOpen }">
        Pengaturan
      </h3>
      <li class="w-full">
        <router-link
          to="/barang-masuk"
          class="flex items-center justify-start w-full gap-3 p-2 px-3 rounded-md bg-secondary"
        >
          <i class="text-TxtPrimary-700 fas fa-cog"></i>
          <h2 class="text-sm font-medium text-TxtPrimary-700" :class="{ hidden: !store.state.isSidebarOpen }">
            Settings
          </h2>
        </router-link>
      </li>
      <li class="w-full mb-3">
        <router-link
          to="/barang-masuk"
          class="flex items-center justify-start w-full gap-3 p-2 px-3 rounded-md bg-secondary"
        >
          <i class="text-TxtPrimary-700 fas fa-sign-out"></i>
          <h2 class="text-sm font-medium text-TxtPrimary-700" :class="{ hidden: !store.state.isSidebarOpen }">
            Logout
          </h2>
        </router-link>
      </li>
    </ul>

    <!-- end sidebar content -->
  </aside>
  <!-- Breadcrumbs -->
</template>

<style></style>
