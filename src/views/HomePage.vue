<script setup>
import { onMounted } from 'vue'
import Sidebar from '../components/Sidebar.vue'

const fetchData = async () => {
  console.log(`${import.meta.env.VITE_VUE_APP_BASE_URL}`)
  const response = await fetch(`${import.meta.env.VITE_VUE_APP_BASE_URL}contact`)
  const data = await response.json()
  console.log('🚀 ~ fetchData ~ data:', data)
  return data?.data
}

onMounted(async () => {
  const data = await fetchData()
  console.log('🚀 ~ onMounted ~ data:', data)
})
</script>
<template>
  <Sidebar />
</template>
