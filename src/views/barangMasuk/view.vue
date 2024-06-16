<script setup>
import { onMounted, ref } from 'vue'
import { getAllBarangMasuk } from '../../services/barang-masuk.service'
import { getAllCategory } from '../../services/category.services.js'
import { useRouter } from 'vue-router'
import Loading from '../../components/Loading.vue'
const barangMasuk = ref([])
const resultBarangMasuk = ref([])
const selectCategory = ref('Semua Category')
const category = ref([])
const query = ref('')
const isLoading = ref(false)
const currentPage = ref(1) // Inisialisasi currentPage dengan nilai 1
const totalLimit = ref(10)
const router = useRouter()
const totalPage = ref(0)

onMounted(async () => {
  try {
    isLoading.value = true
    const res = await getAllBarangMasuk(currentPage.value, totalLimit.value)
    category.value = await getAllCategory()
    totalPage.value = res.totalPage
    barangMasuk.value = res.result
    isLoading.value = false
  } catch (error) {
    toast.error(error)
    isLoading.value = false
  }
})
const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value -= 1
    fetchData()
  }
}

const nextPage = () => {
  if (currentPage.value < totalLimit.value) {
    currentPage.value += 1
    fetchData()
  }
}

const fetchData = async () => {
  try {
    isLoading.value = true
    const res = await getAllBarangMasuk(currentPage.value, totalLimit.value)
    barangMasuk.value = res.result
    resultBarangMasuk.value = res.result
    isLoading.value = false
  } catch (error) {
    toast.error(error)
    isLoading.value = false
  }
}

onMounted(() => {
  fetchData()
})

const handleSearchBarangMasuk = async (e) => {
  const queries = query.value
  e.preventDefault()
  router.push({ path: '/barang-masuk/search', query: { queries } })
}

const sortingBarangMasuk = (name) => {
  console.log('🚀 ~ sortingBarangMasuk ~ name:', name)
  selectCategory.value = name
  if (!name) {
    return (resultBarangMasuk.value = barangMasuk.value)
  }

  if (name == 'All') {
    return (resultBarangMasuk.value = barangMasuk.value)
  }

  const filterData = barangMasuk.value.map((item) => {
    return (resultBarangMasuk.value = item.Kategori.toUpperCase().includes(name.toUpperCase()))
  })

  return (resultBarangMasuk.value = filterData)
}
</script>

<template>
  <div class="relative h-full overflow-x-auto">
    <section class="rounded-md shadow-md bg-secondary">
      <header class="flex items-center justify-between w-full px-5 pt-3 overflow-hidden rounded-md">
        <h1 class="font-medium text-md text-slate-700">
          <router-link to="/" class="text-slate-400">Dashboard</router-link> / Barang Masuk
        </h1>
        <div class="flex gap-3">
          <router-link to="/barang-masuk/add" class="flex items-center justify-center gap-2 btn-sm-success">
            <i class="fas fa-plus"></i>Tambah Barang Masuk
          </router-link>
        </div>
      </header>

      <hr class="my-4" />
      <div class="flex items-center justify-between px-5 pb-4">
        <h1 class="text-lg font-semibold text-TxtPrimary-700">Barang Masuk</h1>
        <div class="flex items-center w-[25%] gap-5">
          <form action="" class="w-full outline-none">
            <label class="py-[6px] px-2 flex items-center rounded-md border text-slate-600 gap-2 bg-secondary">
              <input
                v-model="query"
                type="search"
                class="w-full border-0 outline-none text-slate-600 bg-secondary"
                placeholder="Search By Name Product"
              />
              <button
                type="submit"
                class="flex items-center justify-center gap-2 px-2 py-1 text-white rounded-md bg-btnPrimary"
                @click="handleSearchBarangMasuk"
              >
                Cari
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
              </button>
            </label>
          </form>
        </div>
      </div>
      <div v-if="isLoading">
        <Loading />
      </div>
      <template v-else>
        <table class="table rounded-sm">
          <thead class="bg-zinc-50">
            <tr class="text-sm font-light text-slate-700 border-b-slate-100">
              <th class="font-medium">#</th>
              <th class="font-medium">Kode</th>
              <th class="font-medium">Product</th>
              <th class="font-medium">Kategori</th>
              <th class="font-medium">Keterangan</th>
              <th class="font-medium">Tanggal</th>
              <th class="font-medium">Aksi</th>
            </tr>
          </thead>
          <tbody class="text-xs font-light text-TxtPrimary-700">
            <template v-if="resultBarangMasuk.length > 0">
              <tr v-for="(item, index) in barangMasuk" :key="index" class="font-normal border-b-slate-100">
                <td>{{ index + 1 }}</td>
                <td>{{ item?.id_BM }}</td>
                <td>{{ item?.Nama_Produk }}</td>
                <td>{{ item?.Kategori }}</td>
                <td>{{ item?.Keterangan_BM }}</td>
                <td>{{ item?.tanggal }}</td>

                <td class="flex gap-3">
                  <router-link :to="'/barang-masuk/detail/' + item?.id_BM">
                    <i class="text-[14px] text-slate-700 fa-solid fa-eye" aria-hidden="true"></i>
                  </router-link>
                  <router-link :to="'/barang-masuk/edit/' + item?.id_BM">
                    <i class="text-[14px] text-warning fa fa-pencil" aria-hidden="true"></i>
                  </router-link>
                  <router-link :to="'/barang-masuk/delete/' + item?.id_BM">
                    <i class="text-[14px] text-error fa fa-trash" aria-hidden="true"></i>
                  </router-link>
                </td>
              </tr>
            </template>
            <div
              v-if="resultBarangMasuk.length === 0 && isLoading === false"
              class="block w-full pl-4 my-5 text-lg font-normal text-left text-red-600"
            >
              <p class="block w-full">Data Barang Masuk Tidak Ada.</p>
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
      </template>
    </section>
  </div>
  <router-view @dataAdded="fetchData"></router-view>
</template>
