<script setup>
import Footer from './components/Footer.vue'
import Header from './components/Header.vue'
</script>
<template>
  <main class="relative min-h-screen bg-primary">
    <Header />
    <router-view />
    <Footer />
  </main>
</template>
