<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <nav
    class="sticky top-0 z-40 flex items-center justify-between p-3 overflow-hidden transition-all rounded-md rounded-t-none rounded-tr-none margin-transition backdrop-blur faster"
    :class="{ 'bg-white': !isScrolled, 'bg-transparent': isScrolled }"
    :style="{
      marginLeft: store.state.isSidebarOpen ? '15rem' : '4.7rem',
      marginRight: store.state.isSidebarOpen ? '1.2rem' : '1.2rem'
    }"
  >
    <h1 class="pl-2 text-xl text-slate-600">Dashboard</h1>
    <div class="flex items-center justify-center gap-4">
      <h2>Super Admin</h2>
      <img src="/public/assets/images/user.png" class="w-10 h-10 rounded-full" />
    </div>
  </nav>
</template>

<style scoped>
nav {
  transition: background-color 0.3s ease;
}
.margin-transition {
  transition: margin 0.3s ease-in-out;
  -webkit-transition: margin 0.3s ease-in-out;
  -moz-transition: margin 0.3s ease-in-out;
  -ms-transition: margin 0.3s ease-in-out;
  -o-transition: margin 0.3s ease-in-out;
}
</style>
