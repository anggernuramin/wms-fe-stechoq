<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const login = () => {
  router.push('/')
}
</script>
<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="">Name</label>
        <input type="text" class="form-control" name="" aria-describedby="helpId     " placeholder="Name" />
      </div>
      <button class="px-4 py-2 text-white bg-blue-600 rounded-md">Login</button>
    </form>
  </div>
</template>
