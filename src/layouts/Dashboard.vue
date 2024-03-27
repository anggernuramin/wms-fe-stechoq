<template>
  <div>
    <nav class="flex items-center justify-center gap-3 ">
      <router-link to="/login" class="text-2xl cursor-pointer">Login</router-link>
      <router-link to="/" class="text-2xl cursor-pointer">Home</router-link>
      <router-link to="/profile" class="text-2xl cursor-pointer">Profile</router-link>
    </nav>
    <router-view />
  </div>
</template>
