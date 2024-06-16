<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, defineEmits } from 'vue'
import { DeleteBarangKeluar } from '../../services/barangkeluar.services.js'
import { useToast } from 'vue-toast-notification'

const route = useRoute()
const router = useRouter()
const id = ref(route.params.id)
const emits = defineEmits(['dataAdded'])
const toast = useToast()
const handleDelete = async () => {
  await DeleteBarangKeluar(id.value)
  toast.success('Data Barang Keluar Berhasil Dihapus', {
    position: 'top-right'
  })
  emits('dataAdded')
  router.push('/barangkeluar')
}
</script>

<template>
  <!-- Put this part before </body> tag -->
  <section
    class="fixed top-0 bottom-0 left-0 right-0 z-50 flex items-start justify-center pt-16 bg-opacity-55 bg-TxtPrimary-700 h-[100vh] overflow-hidden"
  >
    <div class="w-1/2 rounded-md animation-scale bg-secondary">
      <form action="" @submit.prevent="handleDelete">
        <h2 class="p-5 mb-5 text-xl text-left border-b text-slate-700">Delete Category</h2>
        <p v-if="id" class="text-center">
          Anda akan menghapus produk dengan ID <span class="font-medium text-slate-800">{{ id }}</span> , lanjutkan?
        </p>
        <p v-else>Loading . . .</p>
        <div class="flex items-center justify-end gap-3 p-5 mt-5 border-t">
          <router-link to="/barangkeluar" class="btn-md-error">Batal</router-link>
          <button type="submit" class="btn-md-success">Hapus</button>
        </div>
      </form>
    </div>
  </section>
</template>
