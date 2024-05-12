<script setup>
import { reactive, ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useVuelidate } from '@vuelidate/core'
import { required, helpers, minLength } from '@vuelidate/validators'
import { getAllCategory } from '../../services/category.services'
import { getAllProduct, addNameProduct } from '../../services/Product.services.js'
import axios from 'axios'
import { capitalizeFirstLetter } from '../../libs/capitalizeFirstLetter.js'

const state = reactive({
  product: '',
  category: '',
  keterangan: '',
  customer: '',
  tanggal: ''
})

let product = []

onMounted(async () => {
  const products = await getAllProduct()
  return (product = products)
})

const emits = defineEmits(['dataAdded'])
const router = useRouter()
const listProducts = ref([])
const displayAddButton = ref(false)
const displayAddButtonCategory = ref(false)

const isLoading = ref(false)
const isSubmit = ref(false)
const ERROR = 'error'

const rules = {
  product: { required: { ...required, message: ERROR } },
  price: { required, minLength: minLength(6) }, // Matches state.price
  customer: { required }, // Matches state.category
  keterangan: { required }, // Matches state.category
  tanggal: { required } // Matches state.category
}

const handleAddNameProduct = async (name) => {
  await addNameProduct(name)
  selectProduct(name)
}

const v$ = useVuelidate(rules, state)
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

const handleClickOutside = (event) => {
  const wrapper = document.querySelector('.wrapper-product')
  if (!wrapper.contains(event.target)) {
    listProducts.value = []
  }
}

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})

const submitAddProduct = async () => {
  if (isLoading.value || isSubmit.value) return // menghentikan mengirim form lebih dari 1 kali
  const result = await v$.value.$validate()
  // Check apakah ada error
  if (result) {
    try {
      isLoading.value = true
      const res = await axios.post(
        `${import.meta.env.VITE_VUE_APP_BASE_URL}/produk`,
        {
          Nama: capitalizeFirstLetter(state.product),
          Kategori: state.category.toUpperCase(),
          Harga_Jual: state.price
        },
        {
          headers: { 'Content-Type': 'application/json' }
        }
      )
      isSubmit.value = true
      emits('dataAdded')
      router.push('/products')
      isLoading.value = false
    } catch (error) {
      alert(error.message)
      isLoading.value = false
      isSubmit.value = false
    }
  }
}
const setNameProducts = async () => {
  if (!state.product) {
    // const product = await getAllProduct()
    // console.log('🚀 ~ setNameProducts ~ product:', product)
    return (listProducts.value = product)
  }
}

const searchNameProducts = async (e) => {
  // const product = await getAllProduct()
  const searchTerm = e.trim()
  if (!searchTerm) {
    displayAddButton.value = false
    listProducts.value = product
    return
  }

  const search = product.filter((item) => {
    return item?.Nama.toUpperCase().includes(e.toUpperCase())
  })
  if (search.length > 0) {
    displayAddButton.value = false
    listProducts.value = search
  } else {
    listProducts.value = []
    displayAddButton.value = true
  }
}
const selectProduct = (name) => {
  state.product = name
  listProducts.value = []
}
</script>

<template>
  <section
    class="absolute top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center overflow-auto bg-opacity-55 bg-TxtPrimary-700"
  >
    <div class="w-1/2 rounded-md bg-secondary animation-scale">
      <form class="p-5" @submit.prevent="submitAddProduct">
        <h2 class="mb-4 text-2xl font-normal text-left text-slate-900">Tambah Data Barang Masuk</h2>
        <div class="grid grid-cols-1 gap-4">
          <div class="relative flex flex-col gap-2">
            <label for="product" class="text-sm font-normal text-TxtPrimary-700"
              >Product<span class="text-lg text-red-700 ps-2">*</span></label
            >
            <input
              v-model="state.product"
              type="text"
              placeholder="Input Product"
              class="w-full px-3 py-2 text-sm border bg-secondary wrapper-product"
              @input="(e) => searchNameProducts(e.target.value)"
              @focus="setNameProducts"
            />
            <ul id="product" class="absolute left-0 right-0 z-50 w-full text-xs bg-white shadow-md top-20">
              <li
                v-for="item in listProducts"
                :key="item?.id_produk"
                :value="item.Nama"
                class="px-2 py-2 text-xs border-b cursor-pointer text-slate-800 hover:bg-slate-200"
                @click.prevent="() => selectProduct(item.Nama)"
              >
                {{ item.Nama }}
              </li>
            </ul>
            <span
              v-if="displayAddButton"
              class="absolute left-0 right-0 z-50 w-full text-xs text-red-700 bg-white top-20"
            >
              <button
                class="flex items-center justify-center w-full gap-3 py-1 text-sm font-medium btn-md-success text-secondary"
                @click.prevent="() => handleAddNameProduct(state.product)"
              >
                Add
                <i class="fa-solid fa-plus"></i>
              </button>
            </span>
            <span
              v-for="error in v$.product.$errors"
              :key="error.$uid"
              class="absolute left-1 right-0 z-10 w-full text-xs text-red-800 bg-white top-[76px]"
            >
              {{ error.$message }}
            </span>
          </div>

          <div class="relative flex flex-col gap-2">
            <label for="price" class="text-sm font-normal text-TxtPrimary-700"
              >Custumer<span class="text-lg text-red-700 ps-2">*</span></label
            >
            <input
              id="price"
              v-model="state.customer"
              type="text"
              placeholder="00000000"
              class="w-full px-3 py-[6px] border rounded-md bg-secondary outline-none"
              name="price"
            />

            <span
              v-for="error in v$.customer.$errors"
              :key="error.$uid"
              class="absolute left-1 right-0 z-10 w-full text-xs text-red-800 bg-white top-[76px]"
            >
              {{ error.$message }}
            </span>
          </div>

          <div class="relative flex flex-col gap-2">
            <label for="price" class="text-sm font-normal text-TxtPrimary-700"
              >Keterangan<span class="text-lg text-red-700 ps-2">*</span></label
            >
            <textarea
              id="price"
              v-model="state.keterangan"
              type="text"
              class="w-full px-3 py-[6px] border rounded-md bg-secondary outline-none"
              name="price"
            >
            </textarea>

            <span
              v-for="error in v$.keterangan.$errors"
              :key="error.$uid"
              class="absolute left-1 right-0 z-10 w-full text-xs text-red-800 bg-white top-[76px]"
            >
              {{ error.$message }}
            </span>
          </div>

          <div class="relative flex flex-col gap-2">
            <label for="price" class="text-sm font-normal text-TxtPrimary-700"
              >Tanggal<span class="text-lg text-red-700 ps-2">*</span></label
            >

            <div class="relative w-sm">
              <input
                id="tanggal"
                v-model="state.tanggal"
                type="text"
                datepicker
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Select date"
              />
            </div>

            <span
              v-for="error in v$.tanggal.$errors"
              :key="error.$uid"
              class="absolute left-1 right-0 z-10 w-full text-xs text-red-800 bg-white top-[76px]"
            >
              {{ error.$message }}
            </span>
          </div>
        </div>
        <div class="flex items-center justify-between gap-3 mt-8">
          <span class="text-xs text-slate-400">Kolom tanda * input wajib diisi</span>
          <div class="flex items-center justify-between gap-3">
            <router-link to="/barang-masuk" class="btn-md-error">Batal</router-link>
            <button
              type="submit"
              :disabled="isLoading"
              class="btn-md-success"
              :class="{ 'cursor-not-allowed opacity-50': state.loading }"
            >
              <span v-if="isLoading">Loading . . .</span>
              <span v-else>Simpan</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>
