<script setup>
import { useStore } from 'vuex'
import Sidebar from '../components/Sidebar.vue'
const store = useStore()
</script>
<template>
  <div>
    <!-- <nav class="flex items-center justify-center gap-3">
      <router-link to="/login" class="text-2xl cursor-pointer">Login</router-link>
      <router-link to="/" class="text-2xl cursor-pointer">Home</router-link>
      <router-link to="/barang-masuk" class="text-2xl cursor-pointer">Profile</router-link>
    </nav> -->
    <Sidebar />
    <div
      class="ml-[14.3rem] sidebar-collapse p-5 margin-transition"
      :style="{ marginLeft: store.state.isSidebarOpen ? '14.3rem' : '4rem' }"
    >
      <router-view />
    </div>
  </div>
</template>
