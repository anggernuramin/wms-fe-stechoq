<template>
  <div class="p-6 mt-2 bg-white rounded-md card">
    <h2 class="text-xl font-medium text-slate-700">Top Product</h2>
    <DataTable :value="products">
      <Column field="code" header="No"></Column>
      <Column field="name" header="Name"></Column>
      <Column field="category" header="Category"></Column>
      <Column field="quantity" header="Quantity"></Column>
    </DataTable>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import 'primevue/resources/themes/aura-light-green/theme.css'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import ColumnGroup from 'primevue/columngroup' // optional
import Row from 'primevue/row' // optional

onMounted(() => {
  products.value = [
    {
      code: '001',
      name: 'Apple',
      category: 'Fruits',
      quantity: 10
    },
    {
      code: '002',
      name: 'Orange',
      category: 'Fruits',
      quantity: 20
    },
    {
      code: '003',
      name: 'Banana',
      category: 'Fruits',
      quantity: 30
    }
  ]
})

const products = ref()
</script>
