<template>
  <router-link
    :to="to"
    class="flex items-center justify-start w-full gap-3 p-2 px-3 rounded-md"
    :class="computedClasses"
  >
    <slot></slot>
  </router-link>
</template>

<script setup>
const props = defineProps({
  to: {
    type: String,
    default: ''
  },
  location: {
    type: String,
    default: ''
  }
})

console.log('🚀 ~ location:', props.location)

const computedClasses = {
  'bg-btnPrimary text-slate-50': location === props.to,
  'bg-secondary text-TxtPrimary-700': location !== props.to
}
</script>
