<script setup>
import { useRoute } from 'vue-router'
const id = useRoute()
</script>
<template>
  <!-- Put this part before </body> tag -->
  <section
    class="absolute top-0 bottom-0 left-0 right-0 z-50 flex items-start justify-center pt-16 bg-opacity-55 bg-TxtPrimary-700 min-[100vh] overflow-hidden"
  >
    <div class="w-1/2 rounded-md animation-scale bg-secondary">
      <form action="" class="">
        <h2 class="p-5 mb-5 text-xl text-left border-b text-slate-700">Delete Product</h2>
        <p class="text-center">
          Anda akan menghapus produk qqqq, lanjutkan? Are you sure Delete Product ID =
          <span class="text-sm text-btnPrimary">{{ id.params.id }}</span>
        </p>
        <div class="flex items-center justify-end gap-3 p-5 mt-5 border-t">
          <router-link to="/products" class="btn-md-error">Batal</router-link>
          <button type="submit" class="btn-md-success">Hapus</button>
        </div>
      </form>
    </div>
  </section>
  <!-- <router-link to="/products" class="btn bg-btnPrimary">Close</router-link> -->
</template>
<style></style>
