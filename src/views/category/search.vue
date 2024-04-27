<script setup>
import { useRoute } from 'vue-router'
import { onMounted, watchEffect, ref } from 'vue'
import axios from 'axios'
import Breadcrums from '../../components/Breadcrums.vue'

const location = useRoute()
const data = ref([])
const errorMessage = ref('')
const isLoading = ref(false)

const fetchData = async () => {
  try {
    isLoading.value = true
    const res = await axios.get(`${import.meta.env.VITE_VUE_APP_BASE_URL}/category`, {
      headers: {
        'Cache-Control': 'no-cache' // Mengatur header Cache-Control untuk memastikan data selalu diambil dari server
      }
    })
    isLoading.value = false
    data.value = res.data.data
  } catch (error) {
    isLoading.value = false
    console.log(error.message)
  }
}
onMounted(() => {
  fetchData()
  console.log('rerender')
})
</script>

<template>
  <div class="overflow-x-auto">
    <section class="rounded-md shadow-md bg-secondary">
      <header class="flex items-center justify-between w-full px-5 pt-3 overflow-hidden rounded-md">
        <Breadcrums
          :path="[
            { name: 'Dashboard', url: '/' },
            { name: 'Products', url: '/products' },
            { name: 'Category', url: '/products/category' }
          ]"
          :pathActive="{ name: 'Search', url: location?.name }"
        />
        <!--  -->
        <div class="flex gap-3">
          <button class="flex items-center justify-center gap-2 btn-sm-default">
            <i class="fas fa-filter"></i>Export
          </button>
          <router-link
            to="/products/category/add"
            class="flex items-center justify-center gap-2 bg-red-400 btn-sm-success"
          >
            <i class="fas fa-plus"></i>Tambah Category
          </router-link>
        </div>
      </header>
      <hr class="my-4" />

      <div class="flex items-center justify-between px-5 pb-4">
        <h1 class="text-lg font-semibold text-TxtPrimary-700">Category</h1>
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
        </div>
      </div>
      <template v-if="isLoading"> <h1>Loading . . .</h1></template>
      <table class="table rounded-sm">
        <!-- head -->
        <thead class="bg-zinc-50">
          <tr class="text-sm font-light text-slate-700 border-b-slate-100">
            <th class="font-medium">#</th>
            <th class="font-medium">Id. Category</th>
            <th class="font-medium">Nama Category</th>
            <th class="font-medium">Qty</th>
            <th class="font-medium">Action</th>
          </tr>
        </thead>
        <tbody class="justify-between text-sm font-light text-slate-500">
          <template v-if="data.length">
            <tr v-for="(item, index) in data" :key="index" class="font-normal border-b-slate-100">
              <td>{{ index + 1 }}</td>
              <td>{{ item.id }}</td>
              <td>{{ item.Nama }}</td>
              <td>{{ item.Qty }}</td>
              <td class="flex gap-3">
                <i class="text-[14px] text-warning fa fa-pencil" aria-hidden="true"></i>
                <router-link :to="'/products/category/delete/' + item.id">
                  <i class="text-[14px] text-error fa fa-trash" aria-hidden="true"></i>
                </router-link>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
      <template v-if="errorMessage">
        {{ errorMessage }}
      </template>
      <div class="flex items-center justify-end gap-5 py-5 mt-3 border-t pe-16 text-TxtPrimary-700">
        <button class="btn-sm-default">Previous</button>
        <span>Page <b>1</b> of <b>10</b></span>
        <button class="btn-sm-default">Next</button>
      </div>
    </section>
  </div>

  <router-view @dataAdded="fetchData"></router-view>
</template>
