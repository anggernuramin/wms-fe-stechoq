import { required } from '@vuelidate/validators';
<script setup>
const props = defineProps({
  path: {
    type: Array,
    required: true
  },
  pathActive: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <h1 class="font-medium text-md text-slate-700">
    <router-link v-for="item in path" :key="item.id" :to="item.url" class="text-slate-400">
      {{ item?.name }} <span class="text-md text-slate-700">/ </span>
    </router-link>

    <router-link :to="pathActive.url">
      {{ pathActive?.name }}
    </router-link>
  </h1>
  <slot />
</template>
