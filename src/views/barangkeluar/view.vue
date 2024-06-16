<script setup>
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import Breadcrums from '../../components/Breadcrums.vue'
import { GetBarangKeluar } from '../../services/barangkeluar.services'
import Loading from '../../components/Loading.vue'

const location = useRoute()
const data = ref([])
const isLoading = ref(false)
const totalPage = ref(0)
const currentPage = ref(0) // Inisialisasi currentPage dengan nilai 1

const search = ref('')

const fetchData = async () => {
  isLoading.value = true
  try {
    const response = await GetBarangKeluar(search.value, currentPage.value)
    totalPage.value = response.totalPages
    currentPage.value = response.currentPage
    isLoading.value = false
    return (data.value = response.data)
  } catch (error) {
    isLoading.value = false
    console.log(error.message)
  }
}

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value -= 1
    fetchData()
  }
}

const nextPage = () => {
  if (currentPage.value < totalPage.value) {
    currentPage.value += 1
    fetchData()
  }
}

onMounted(() => {
  console.log('test')
  fetchData()
})

const updateSearch = (event) => {
  search.value = event.target.value
  fetchData()
}
</script>

<template>
  <div class="overflow-x-auto">
    <section class="rounded-md shadow-md bg-secondary">
      <header class="flex items-center justify-between w-full px-5 pt-3 overflow-hidden rounded-md">
        <Breadcrums
          :path="[{ name: 'Dashboard', url: '/' }]"
          :pathActive="{ name: 'Barang Keluar', url: location?.name }"
        />

        <div class="flex gap-3">
          <router-link to="/barangkeluar/add" class="flex items-center justify-center gap-2 bg-red-400 btn-sm-success">
            <i class="fas fa-plus"></i> Barang Keluar
          </router-link>
        </div>
      </header>
      <hr class="my-4" />

      <div class="flex items-center justify-between px-5 pb-4">
        <h1 class="text-lg font-semibold text-TxtPrimary-700">Product</h1>
        <div class="flex items-center gap-5">
          <form class="outline-none" @submit.prevent="">
            <label class="py-[6px] px-2 flex items-center rounded-md border text-slate-600 gap-2 bg-secondary">
              <input
                v-model="search"
                type="text"
                class="border-0 outline-none text-slate-600 bg-secondary"
                placeholder="Search"
                @input="updateSearch"
              />
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
        </div>
      </div>
      <template v-if="isLoading">
        <Loading />
      </template>
      <table class="table rounded-sm">
        <!-- head -->
        <thead class="bg-zinc-50">
          <tr class="text-sm font-light text-slate-700 border-b-slate-100">
            <th class="font-medium">#</th>
            <th class="font-medium">Id</th>
            <th class="font-medium">Keterangan</th>
            <th class="font-medium">Nama Produk</th>
            <th class="font-medium">Kategori</th>
            <th class="font-medium">QTY</th>
            <th class="font-medium">CheckOut</th>
            <th class="font-medium">Action</th>
            <th class="font-medium">Status</th>
          </tr>
        </thead>
        <tbody class="justify-between text-sm font-light text-slate-500">
          <template v-if="data.length">
            <tr v-for="(item, index) in data" :key="index" class="font-normal border-b-slate-100">
              <td>{{ index + 1 }}</td>
              <td>{{ item.id_BK }}</td>
              <td>{{ item.Keterangan }}</td>
              <td>{{ item.Nama_Produk }}</td>
              <td>{{ item.Kategori }}</td>
              <td>{{ item.Quantity_Keluar }}</td>
              <td>
                <router-link :to="'/barangkeluar/edit/' + item.id_BK">
                  <div class="border-white btn btn-xs sm:btn-sm md:btn-xs bg-btnPrimary hover:bg-btnPrimary">
                    <i class="text-white fas fa-envelope"></i>
                  </div>
                </router-link>
              </td>
              <td class="flex gap-3">
                <router-link :to="'/barangkeluar/delete/' + item?.id_BK">
                  <i class="text-[14px] text-error fa fa-trash" aria-hidden="true"></i>
                </router-link>
              </td>
              <td>
                <div v-if="item.Status === 1" class="font-semibold text-green-500 badge badge-outline">sampai</div>
                <div v-else class="font-semibold text-red-500 badge badge-outline">belum sampai</div>
              </td>
            </tr>
          </template>

          <div
            v-if="data.length === 0 && isLoading === false"
            class="block w-full pl-4 my-5 text-lg font-normal text-left text-red-600"
          >
            <p class="block w-full">Data Barang Keluar Yang Anda Cari Tidak Ada.</p>
          </div>
        </tbody>
      </table>

      <div class="flex items-center justify-end gap-5 py-5 mt-3 border-t pe-16 text-TxtPrimary-700">
        <button
          class="cursor-pointer btn-sm-default disabled:bg-slate-200 disabled:cursor-default"
          :disabled="currentPage === 1"
          @click="previousPage"
        >
          Previous
        </button>
        <span
          >Page <b>{{ currentPage }}</b> of <b>{{ totalPage }}</b></span
        >
        <button
          class="btn-sm-default disabled:bg-slate-200 disabled:cursor-default"
          :disabled="currentPage === totalPage"
          @click="nextPage"
        >
          Next
        </button>
      </div>
    </section>
  </div>

  <router-view @dataAdded="fetchData"></router-view>
</template>
