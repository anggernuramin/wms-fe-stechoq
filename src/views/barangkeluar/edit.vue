<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted, defineEmits } from 'vue'
import { UpdateBarangkeluar } from '../../services/barangkeluar.services.js'

const route = useRoute()
const router = useRouter()
const id = ref(route.params.id)
const baseUrl = import.meta.env.VITE_VUE_APP_BASE_URL
const emits = defineEmits(['dataAdded'])

const handleUpdate = async () => {
  const res = await UpdateBarangkeluar(id.value)
  console.log('🚀 ~ handleUpdate ~ res:', res)
  router.push('/barangkeluar')
  emits('dataAdded')
}

// Check for query parameter and handle update on component mount
onMounted(async () => {
  const updateId = route.query.update
  if (updateId === id.value) {
    await handleUpdate()
  }
})

const handleCancel = () => {
  emits('dataAdded')
  router.push('/barangkeluar')
}
</script>

<template>
  <section
    class="fixed top-0 bottom-0 left-0 right-0 z-50 flex items-start justify-center pt-16 bg-opacity-55 bg-TxtPrimary-700 h-[100vh] overflow-hidden"
  >
    <div class="w-1/2 rounded-md animation-scale bg-secondary">
      <form action="" @submit.prevent="handleUpdate">
        <h2 class="p-5 mb-5 text-xl text-left border-b text-slate-700">Update Category</h2>
        <p v-if="id" class="text-center">Anda akan meng-Update produk dengan ID {{ id }}, lanjutkan?</p>
        <p v-else>Loading . . .</p>

        <!-- QR Code Component -->
        <div class="flex justify-center my-4">
          <vue-qrcode :value="`${baseUrl}/barangKeluar/update/${id}`" size="200"></vue-qrcode>
        </div>

        <div class="flex items-center justify-end gap-3 p-5 mt-5 border-t">
          <router-link to="/barangkeluar" class="btn-md-error" @click="handleCancel">Batal</router-link>
          <button type="submit" class="btn-md-success">Update</button>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import { defineComponent } from 'vue'
import VueQrcode from '@chenfengyuan/vue-qrcode'

export default defineComponent({
  components: {
    VueQrcode
  }
})
</script>
