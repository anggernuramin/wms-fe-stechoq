<script setup>
import Slider from 'primevue/slider'

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  data: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <h3 class="mb-2 font-medium text-md text-slate-700">{{ title }}</h3>
  <ul class="flex flex-col gap-5">
    <li v-for="item in data" :key="item.id" class="flex flex-col gap-2">
      <div class="flex items-center justify-between w-full">
        <h3 class="text-xs text-slate-500">{{ item.name }}</h3>
        <span class="flex gap-2 text-xs text-green-600">
          <i
            class="flex items-center justify-center w-5 h-5 p-3 rotate-45 bg-green-300 rounded-full fa-solid fa-arrow-up"
          ></i>
          {{ item.percentage }}%
        </span>
      </div>
      <Slider v-model="item.value" disabled class="text-red-600" />
    </li>
  </ul>
</template>
