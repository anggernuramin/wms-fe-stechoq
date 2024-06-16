<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const isScrolled = ref(false)
const user = computed(() => store.getters.getUser)

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
    <div class="flex flex-col gap-1 pl-2">
      <h1 class="text-2xl font-medium text-slate-800">Selamat Datang, {{ user?.username }}</h1>
      <p class="text-xs text-slate-400">Manage incoming and outgoing goods and track inventory levels.</p>
    </div>
    <div class="flex items-center justify-center gap-4">
      <h2>{{ user?.username }}</h2>
      <img src="/assets/images/user.png" class="w-10 h-10 rounded-full" />
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
