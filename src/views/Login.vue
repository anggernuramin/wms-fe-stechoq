<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const login = () => {
  router.push("/");
};
</script>
<template>
    <div class="h-screen flex justify-center items-center flex-col">
  <form @submit.prevent="login">
    <div class="form-group">
      <label for="">Name</label>
      <input
        type="text"
        class="form-control"
        name=""
        id=""
        aria-describedby="helpId"
        placeholder="Name"
      />
    </div>
    <button class="bg-blue-600 px-4 py-2 rounded-md text-white">Login</button>
  </form>
</div>
</template>
