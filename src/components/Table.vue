<template>
  <div class="p-6 mt-2 bg-white rounded-md card">
    <h2 class="text-xl font-medium text-slate-700">Top Product</h2>
    <DataTable :value="products">
      <Column field="No" header="No"></Column>
      <Column field="Nama_Produk" header="Nama"></Column>
      <Column field="Kategori" header="Kategori"></Column>
      <Column field="Quantity_Keluar" header="Quantity"></Column>
    </DataTable>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import 'primevue/resources/themes/aura-light-green/theme.css'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { getTopProduct } from '../services/dashboard-service.js'

const products = ref([])

onMounted(async () => {
  const data = await getTopProduct()
  if (data.length > 0) {
    products.value = data.map((item, index) => ({
      No: index + 1,
      Nama_Produk: item.Nama_Produk,
      Kategori: item.Kategori,
      Quantity_Keluar: item.Quantity_Keluar
    }))
  }
})
</script>
