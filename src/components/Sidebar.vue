<script setup></script>
<template>
  <!-- md:-ml-64 -->
  <aside
    id="sideBar"
    class="fixed flex flex-col flex-wrap flex-none w-64 p-6 border-r border-gray-300 bg-secondary md:fixed md:top-0 md:z-30 md:h-screen md:shadow-xl animated faster"
  >
    <ul class="flex flex-col items-start justify-start w-full h-full gap-7">
      <li class="flex items-center justify-center gap-3 mb-2">
        <img src="/assets/images/Layers.svg" alt="" class="object-contain object-center w-12 h-12 ps-3" />
        <h1 class="text-3xl">Furniture</h1>
      </li>
      <li class="flex items-center justify-start w-full gap-3 rounded-md">
        <i class="text-btnPrimary fa-solid fa-house ps-3"></i>
        <h2 class="font-normal text-TxtPrimary-700">Dashboard</h2>
      </li>
      <li class="flex items-center justify-center gap-3">
        <i class="text-btnPrimary fa-solid fa-house ps-3"></i>
        <h2 class="font-normal text-TxtPrimary-700">Barang Masuk</h2>
      </li>
      <li class="flex items-center justify-center gap-3">
        <i class="text-btnPrimary fa-solid fa-house ps-3"></i>
        <h2 class="font-normal text-TxtPrimary-700">Barang Keluar</h2>
      </li>
      <li class="flex items-center justify-center gap-3">
        <i class="text-btnPrimary fa-solid fa-house ps-3"></i>
        <h2 class="font-normal text-TxtPrimary-700">Pengiriman</h2>
      </li>
      <li class="flex items-center justify-center gap-3">
        <i class="text-btnPrimary fa-solid fa-house ps-3"></i>
        <h2 class="font-normal text-TxtPrimary-700">Stock Opname</h2>
      </li>
    </ul>

    <!-- end sidebar content -->
  </aside>
  <!-- Breadcrumbs -->
  <!-- start sidebar -->
  <div class="bg-[rgb(240,241,243)] w-full min-h-screen pl-[17.1rem] p-6 flex justify-between gap-5 overflow-hidden">
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
