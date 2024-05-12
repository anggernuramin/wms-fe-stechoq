<script setup>
import { onMounted, ref } from 'vue'
import { getAllBarangMasuk } from '../../services/barang-masuk.service'

const barangMasuk = ref([])
const isLoading = ref(false)

onMounted(async () => {
  isLoading.value = true // Set isLoading menjadi true saat memuat data
  const { data, loading, error } = await getAllBarangMasuk()
  console.log('🚀 ~ onMounted ~ fetch:', await data)
  isLoading.value = loading // Set isLoading berdasarkan nilai loading dari getAllBarangMasuk
  barangMasuk.value = data
})
</script>
<template>
  <div class="overflow-x-auto">
    <section class="rounded-md shadow-md bg-secondary">
      <header class="flex items-center justify-between w-full px-5 pt-3 overflow-hidden rounded-md">
        <h1 class="font-medium text-md text-slate-700">
          <router-link to="/" class="text-slate-400">Dashboard</router-link> / Barang Masuk
        </h1>
        <div class="flex gap-3">
          <button class="flex items-center justify-center gap-2 btn-sm-default">
            <i class="fas fa-filter"></i>Export
          </button>
          <router-link to="/barang-masuk/add" class="flex items-center justify-center gap-2 btn-sm-success">
            <i class="fas fa-plus"></i>Tambah Barang Masuk
          </router-link>
        </div>
      </header>
      <hr class="my-4" />

      <div class="flex items-center justify-between px-5 pb-4">
        <h1 class="text-lg font-semibold text-TxtPrimary-700">Barang Masuk</h1>
        <div class="flex items-center gap-5">
          <form action="" class="outline-none">
            <label class="py-[6px] px-2 flex items-center rounded-md border text-slate-600 gap-2 bg-secondary">
              <input type="search" class="border-0 outline-none text-slate-600 bg-secondary" placeholder="Search" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                class="w-4 h-4 opacity-70"
              >
                <path
                  fill-rule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clip-rule="evenodd"
                />
              </svg>
            </label>
          </form>
          <div class="border rounded-md dropdown dropdown-end">
            <div
              tabindex="0"
              role="button"
              class="py-[4px] m-1 bg-secondary flex justify-center items-center gap-5 text-sm px-5"
            >
              Semua Kategori <i class="text-xs fas fa-chevron-down"></i>
            </div>
            <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-primary rounded-box w-52">
              <li><a>Oppo</a></li>
              <li><a>Vivo</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div v-if="isLoading" class="flex items-center justify-center mt-16 mb-20">
        <span class="loading loading-spinner loading-lg"></span>
      </div>
      <template v-else>
        <table class="table rounded-sm">
          <!-- head -->
          <thead class="bg-zinc-50">
            <tr class="text-sm font-light text-slate-700 border-b-slate-100">
              <th class="font-medium">#</th>
              <th class="font-medium">Kode</th>
              <th class="font-medium">Barang</th>
              <th class="font-medium">Kategori</th>

              <th class="font-medium">Customer</th>
              <th class="font-medium">Keterangan</th>
              <th class="font-medium">Tanggal</th>
              <th class="font-medium">Aksi</th>
            </tr>
          </thead>
          <tbody class="text-xs font-light text-TxtPrimary-700">
            <template v-if="barangMasuk.length">
              <tr v-for="(item, index) in barangMasuk" :key="index" class="font-normal border-b-slate-100">
                <td>{{ index + 1 }}</td>
                <td>{{ item.id_BM }}</td>
                <td>{{ item.Nama_Produk }}</td>
                <td>{{ item.Kategori }}</td>
                <td>Customer</td>
                <td>{{ item.Keterangan_BM }}</td>
                <td>{{ item.createdAt }}</td>
                <td class="flex gap-3">
                  <router-link :to="'/products/category/detail/' + item?.id_BM">
                    <i class="text-[14px] text-slate-700 fa-solid fa-eye" aria-hidden="true"></i>
                  </router-link>
                  <router-link :to="'/products/category/edit/' + item?.id_BM">
                    <i class="text-[14px] text-warning fa fa-pencil" aria-hidden="true"></i>
                  </router-link>
                  <router-link :to="'/products/category/delete/' + item?.id_BM">
                    <i class="text-[14px] text-error fa fa-trash" aria-hidden="true"></i>
                  </router-link>
                </td>
              </tr>
            </template>
          </tbody>
        </table>

        <div class="flex items-center justify-end gap-5 py-5 mt-3 border-t pe-16 text-TxtPrimary-700">
          <button class="btn-sm-default">Previous</button>
          <span>Page <b>1</b> of <b>10</b></span>
          <button class="btn-sm-default">Next</button>
        </div>
      </template>
    </section>
  </div>
  <router-view></router-view>
</template>
