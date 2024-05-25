<script setup>
import { useStore } from 'vuex'

const store = useStore()
</script>
<template>
  <footer
    class="p-3 mt-2 overflow-hidden transition-all bg-white rounded-md margin-transition animated faster"
    :style="{
      marginLeft: store.state.isSidebarOpen ? '15rem' : '4.7rem',
      marginRight: store.state.isSidebarOpen ? '1.2rem' : '1.2rem'
    }"
  >
    <p>
      <span class="text-slate-500"> &copy; 2024 </span>
      Future Werehouse Management System <span class="text-slate-500"> all right reserved </span>
    </p>
  </footer>
</template>
