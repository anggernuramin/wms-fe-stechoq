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

onMounted(() => {
  products.value = [
    {
      code: '1',
      name: 'Samsung a05s',
      category: 'Samsung',
      quantity: 10
    },
    {
      code: '2',
      name: 'Oppo a3s',
      category: 'Oppo',
      quantity: 4
    },
    {
      code: '3',
      name: 'iPhone 12',
      category: 'Apple',
      quantity: 15
    },
    {
      code: '4',
      name: 'Xiaomi Redmi Note 9',
      category: 'Xiaomi',
      quantity: 8
    },
    {
      code: '5',
      name: 'Huawei P30',
      category: 'Huawei',
      quantity: 12
    },
    {
      code: '6',
      name: 'OnePlus 8T',
      category: 'OnePlus',
      quantity: 6
    },
    {
      code: '7',
      name: 'Sony Xperia 5',
      category: 'Sony',
      quantity: 7
    },
    {
      code: '8',
      name: 'Nokia 7.2',
      category: 'Nokia',
      quantity: 9
    },
    {
      code: '9',
      name: 'LG Velvet',
      category: 'LG',
      quantity: 5
    },
    {
      code: '10',
      name: 'Google Pixel 5',
      category: 'Google',
      quantity: 11
    }
  ]
})

const products = ref()
</script>
