<script setup>
import { onMounted, ref } from 'vue'
import { searchBarangMasuk } from '../../services/barang-masuk.service'
import { useRoute, useRouter } from 'vue-router'
import { getAllCategory } from '../../services/category.services'

const router = useRouter()
const barangMasuk = ref([])
const resultBarangMasuk = ref([])
const selectCategory = ref('')
const category = ref([])
const isLoading = ref(false)
const currentPage = ref(0)
const route = useRoute()
const query = ref(route.query)

onMounted(() => {
  query.value = route.query.queries
})

onMounted(async () => {
  try {
    isLoading.value = true
    const res = await searchBarangMasuk(query.value)
    barangMasuk.value = res
    isLoading.value = false
  } catch (error) {
    toast.error(error)
    isLoading.value = false
  }
})

const fetchData = async () => {
  try {
    isLoading.value = true
    const res = await searchBarangMasuk(query.value)
    category.value = await getAllCategory()
    barangMasuk.value = res
    resultBarangMasuk.value = res
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
  e.preventDefault()
  const queries = query.value
  router.push({ path: '/barang-masuk/search', query: { queries } })
  const res = await searchBarangMasuk(queries)
  barangMasuk.value = res
  resultBarangMasuk.value = res
}

const sortingBarangMasuk = (name) => {
  selectCategory.value = name
  if (!name) {
    return (resultBarangMasuk.value = barangMasuk.value)
  }

  if (name == 'All') {
    return (resultBarangMasuk.value = barangMasuk.value)
  }
  const filterData = barangMasuk.value.filter((item) => {
    return item.Kategori.toUpperCase().includes(name.toUpperCase())
  })

  return (resultBarangMasuk.value = filterData)
}
</script>

<template>
  <div class="relative overflow-x-auto max-h-[100vh]">
    <section class="rounded-md shadow-md bg-secondary">
      <header class="flex items-center justify-between w-full px-5 pt-3 overflow-hidden rounded-md">
        <h1 class="font-medium text-md text-slate-700">
          <router-link to="/" class="text-slate-400">Dashboard</router-link> /
          <router-link to="/barang-masuk" class="text-slate-400"> Barang Masuk</router-link>
          / Search
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
              <input
                v-model="query"
                type="search"
                class="border-0 outline-none text-slate-600 bg-secondary"
                placeholder="Search By Name Product"
              />
              <button type="submit" @click="handleSearchBarangMasuk">
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

          <div class="border rounded-md dropdown dropdown-end">
            <div
              tabindex="0"
              role="button"
              class="py-[4px] m-1 bg-secondary flex justify-center items-center gap-5 text-sm px-5"
            >
              Semua Kategori <i class="text-xs fas fa-chevron-down"></i>
            </div>
            <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-primary rounded-box w-52">
              <li v-for="(item, index) in category" :key="index" class="transition-all hover:bg-slate-200">
                <a @click="sortingBarangMasuk(item.Nama)" class="font-normal text-slate-800">{{ item.Nama }}</a>
              </li>
              <li
                class="py-2 pl-5 pr-2 font-normal transition-all text-slate-800 hover:bg-slate-200"
                @click="sortingBarangMasuk(All)"
              >
                All
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div v-if="isLoading" class="flex items-center justify-center min-h-[75vh]">
        <span class="my-16 loading loading-spinner loading-lg"></span>
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
            <div v-else class="block w-full pl-4 my-5 text-lg font-normal text-left text-red-600">
              <p class="block w-full">
                Data
                <span class="font-bold">{{ selectCategory ? `dengan Kategory ${selectCategory}` : null }}</span> Tidak
                ada
              </p>
            </div>
          </tbody>
        </table>
        <div class="flex items-center justify-end gap-5 py-5 mt-3 border-t pe-16 text-TxtPrimary-700">
          <button class="btn-sm-default">Previous</button>
          <span
            >Page <b>{{ currentPage.value }}</b> of <b>10</b></span
          >
          <button class="btn-sm-default">Next</button>
        </div>
      </template>
    </section>
  </div>
  <router-view @dataAdded="fetchData"></router-view>
</template>
