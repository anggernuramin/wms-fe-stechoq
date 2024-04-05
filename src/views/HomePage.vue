<script setup>
import { onMounted } from 'vue'
import Sidebar from '../components/Sidebar.vue'

const fetchData = async () => {
  // console.log(`${import.meta.env.VITE_VUE_APP_BASE_URL}`)
  // const response = await fetch(`${import.meta.env.VITE_VUE_APP_BASE_URL}contact`)
  // const data = await response.json()
  // console.log('🚀 ~ fetchData ~ data:', data)
  // return data?.data
}

onMounted(async () => {
  const data = await fetchData()
})
</script>
<template>
  <!-- start sidebar -->
  <div class="bg-[rgb(240,241,243)] w-full min-h-screen flex justify-between gap-5 overflow-hidden">
    <div class="w-[60%] overflow-hidden">
      <section class="p-6 bg-white rounded-md">
        <h2 class="text-xl font-medium">Summary Packing</h2>
        <div class="flex justify-between">
          <div class="rounded-md flex bg-white w-[275px] py-4 justify-start items-center p-5 gap-3">
            <img src="/assets/images/Layers.svg" alt="" class="rounded-full h-7 w-7" />
            <div class="flex flex-col">
              <span class="text-xl">Rp 10.000.000,00</span>
              <h3 class="text-md">Jumlah Stok Barang</h3>
            </div>
          </div>
          <div class="rounded-md flex bg-white w-[275px] py-4 justify-start items-center p-5 gap-3">
            <img src="/assets/images/Layers.svg" alt="" class="rounded-full h-7 w-7" />
            <div class="flex flex-col">
              <span class="text-xl">Rp 13.000.000,00</span>
              <h3 class="text-md">Jumlah Saldo Barang</h3>
            </div>
          </div>
        </div>
      </section>

      <section class="mt-3">
        <img src="/assets/images/StockReport.svg" alt="" />
      </section>
    </div>
    <div class="w-[40%]">
      <img src="/assets/images/Rectangle1.svg" alt="" />
    </div>
  </div>
  <!-- end sidbar -->
</template>
