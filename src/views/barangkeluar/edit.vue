<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted, defineEmits, nextTick } from 'vue'
import { UpdateBarangkeluar, GetBarangKeluarID, GetBarangKeluar } from '../../services/barangkeluar.services.js'
import html2pdf from 'html2pdf.js'
import VueQrcode from '@chenfengyuan/vue-qrcode'
import { useToast } from 'vue-toast-notification'

// Define reactive variables and route handlers
const route = useRoute()
const data = ref()
const router = useRouter()
const id = ref(route.params.id)
const baseUrl = import.meta.env.VITE_VUE_APP_BASE_URL
const emits = defineEmits(['dataAdded'])
const visible = ref(false)
const toast = useToast()
// Function to fetch data based on ID
const TakeMe = async () => {
  try {
    const response = await GetBarangKeluarID(id.value)
    data.value = response
    console.log('Data received:', data.value)
  } catch (error) {
    console.log(error.message)
  }
}

// Function to handle update
const handleUpdate = async () => {
  await UpdateBarangkeluar(id.value)
  toast.success('Data Barang Keluar Berhasil Diedit', {
    position: 'top-right'
  })
  router.push('/barangkeluar')
  emits('dataAdded')
}

// Check for query parameter and handle update on component mount
onMounted(async () => {
  const updateId = route.query.update
  if (updateId === id.value) {
    await handleUpdate()
  }
  await TakeMe()
  console.log('TakeMe called')
})

// Function to handle cancel action
const handleCancel = () => {
  emits('dataAdded')
  router.push('/barangkeluar')
}

// Function to export the content to PDF
const exportToPDF = async () => {
  visible.value = false // Set table to visible

  const element = document.getElementById('pdf_export')
  if (element) {
    html2pdf(element, {
      margin: 1,
      filename: 'Bukti_Surat_Jalan.pdf'
    })
    console.log('🚀 berhasil')
    emits('dataAdded')
    router.push('/barangkeluar')
  } else {
    console.error('Element with ID "qrcode" not found!')
  }
  visible.value = true
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
        <div id="pdf_export" class="flex flex-col items-center my-4">
          <div v-show="visible" class="hero">
            <div class="text-center hero-content">
              <div class="max-w-md">
                <h1 class="text-5xl font-bold">Surat Jalan Fortune Code</h1>
                <p class="py-3 text-xs text-left">- from team 1 fortune made with ❤️</p>
              </div>
            </div>
          </div>
          <vue-qrcode :value="`${baseUrl}/barangKeluar/update/${id}`" size="200"></vue-qrcode>
          <br />
          <p v-show="visible" class="py-6 hero-content">
            surat jalan ini ditunjukan sebagai bukti jalan yang di gunakan untuk sebagai bukti jalan dan bukti
            pengiriman, scan barcode jika sudah selesai dalam mengirim barang ini lalu serahkan barang nya
          </p>
          <div v-show="visible" class="overflow-x-auto">
            <table class="table">
              <thead>
                <tr>
                  <th>Nomor</th>
                  <th>ID</th>
                  <th>Nama Produk</th>
                  <th>Nomor</th>
                  <th>ID</th>
                  <th>Nama Produk</th>
                </tr>
              </thead>
              <tbody class="text-xs font-light text-TxtPrimary-700">
                <template v-if="data">
                  <tr class="font-normal border-b-slate-100">
                    <td>1</td>
                    <td>{{ data.id_BK }}</td>
                    <td>{{ data.Keterangan }}</td>
                    <td>{{ data.Nama_Produk }}</td>
                    <td>{{ data.Kategori }}</td>
                    <td>{{ data.Quantity_Keluar }}</td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
        </div>

        <div class="flex items-center justify-end gap-3 p-5 mt-5 border-t">
          <router-link to="/barangkeluar" class="btn-md-error" @click="handleCancel">Batal</router-link>
          <button type="button" class="btn-md-success" @click="exportToPDF">Export to PDF</button>
        </div>
      </form>
    </div>
  </section>
</template>
