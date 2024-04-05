<script setup>
import { useRoute } from 'vue-router'
const id = useRoute()
</script>
<template>
  <!-- Put this part before </body> tag -->
  <section
    class="absolute top-0 bottom-0 left-0 right-0 z-50 flex items-start justify-center pt-20 overflow-auto bg-opacity-55 bg-TxtPrimary-700"
  >
    <div class="w-2/6 rounded-md bg-secondary">
      <form action="" class="p-5">
        <h2 class="mb-4 text-2xl text-center">Delete Product</h2>
        <p>
          Are you sure Delete Product ID = <span class="text-sm text-btnPrimary">{{ id.params.id }}</span>
        </p>
        <div class="flex items-center justify-end gap-3 mt-4">
          <router-link to="/products" class="btn btn-danger">Cancel</router-link>
          <button type="submit" class="btn btn-primary">Delet</button>
        </div>
      </form>
    </div>
  </section>
  <!-- <router-link to="/products" class="btn bg-btnPrimary">Close</router-link> -->
</template>
