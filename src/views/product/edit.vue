<script setup>
import { reactive, ref, onMounted, defineEmits, onBeforeUnmount } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useVuelidate } from '@vuelidate/core'
import axios from 'axios'
import { required, helpers, minLength } from '@vuelidate/validators'
import { getAllProduct, getProductById } from '../../services/Product.services'
import { headerConfig } from '../../libs/headerConfig'
import { useToast } from 'vue-toast-notification'
const toast = useToast()
const state = reactive({
  product: '',
  category: '',
  price: ''
})

const emits = defineEmits(['dataAdded'])
const router = useRouter()
const listProducts = ref([])
const displayAddButton = ref(false)
const listCategory = ref([])
const valueCategory = ref('')
const displayAddButtonCategory = ref(false)
const route = useRoute()
const productId = route.params.id

const isLoading = ref(false)
const isSubmit = ref(false)
const ERROR = 'error'

const rules = {
  product: { required: { ...required, message: ERROR } },
  category: { required }, // Matches state.category
  price: { required, minLength: minLength(6) } // Matches state.price
}

const v$ = useVuelidate(rules, state)
onMounted(async () => {
  document.addEventListener('click', handleClickOutside)
  try {
    const response = await getProductById(productId)
    state.product = response?.Nama
    state.category = response?.Kategori
    state.price = response?.Harga_Jual
  } catch (error) {}
})

const handleClickOutside = (event) => {
  const wrapper = document.querySelector('.wrapper-product')
  const wrapperCategory = document.querySelector('.wrapper-category')
  if (!wrapper.contains(event.target)) {
    listProducts.value = []
  }
  if (!wrapperCategory.contains(event.target)) {
    listCategory.value = []
  }
}

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
let product = []

onMounted(async () => {
  const products = await getAllProduct()
  return (product = products)
})

const submitEditProduct = async () => {
  if (isLoading.value || isSubmit.value) return
  const result = await v$.value.$validate()
  if (result) {
    try {
      isLoading.value = true

      await axios.patch(
        `${import.meta.env.VITE_VUE_APP_BASE_URL}/produk/${productId}`,
        {
          Nama: capitalizeFirstLetter(state.product),
          Kategori: state.category.toUpperCase(),
          Harga_Jual: state.price
        },
        headerConfig
      )
      isSubmit.value = true
      emits('dataAdded')
      toast.success('Data Product Berhasil Diedit', {
        position: 'top-right'
      })
      router.push('/products')
      isLoading.value = false
    } catch (error) {
      toast.error('Data Product Gagal Diedit', {
        position: 'top-right'
      })
      isLoading.value = false
      isSubmit.value = false
    }
  }
}

const setNameProducts = () => {
  if (!state.product) {
    return (listProducts.value = product.slice(0, 5))
  }
}
const searchNameProducts = (e) => {
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

const setNameCategory = () => {
  if (!state.category) {
    return (listCategory.value = category.slice(0, 3))
  }
}
const searchNameCategory = (e) => {
  const searchTerm = e.trim()
  if (!searchTerm) {
    displayAddButtonCategory.value = false
    listCategory.value = category
    return
  }
  const search = category.filter((item) => {
    return item?.Nama.toUpperCase().includes(e.toUpperCase())
  })
  if (search.length > 0) {
    displayAddButtonCategory.value = false
    listCategory.value = search
  } else {
    listCategory.value = []
    displayAddButtonCategory.value = true
  }
}
const selectCategory = (name) => {
  state.category = name
  listCategory.value = []
}
</script>

<template>
  <section
    class="absolute top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center overflow-auto bg-opacity-55 bg-TxtPrimary-700"
  >
    <div class="w-1/2 rounded-md bg-secondary animation-scale">
      <form class="p-5" @submit.prevent="submitEditProduct">
        <h2 class="mb-4 text-2xl font-normal text-left text-slate-900">Edit Data Product</h2>
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
                :key="item.id"
                :value="item.name"
                class="px-2 py-2 text-xs border-b cursor-pointer text-slate-800 hover:bg-slate-200"
                @click.prevent="() => selectProduct(item.name)"
              >
                {{ item.name }}
              </li>
            </ul>

            <span
              v-for="error in v$.product.$errors"
              :key="error.$uid"
              class="absolute left-1 right-0 z-10 w-full text-xs text-red-800 bg-white top-[76px]"
            >
              {{ error.$message }}
            </span>
          </div>

          <div class="relative flex flex-col gap-2 wrapper-product">
            <label for="product" class="text-sm font-normal text-TxtPrimary-700"
              >Category<span class="text-lg text-red-700 ps-2">*</span></label
            >
            <input
              v-model="state.category"
              type="text"
              placeholder="Input Category"
              class="w-full px-3 py-2 text-sm border bg-secondary wrapper-category"
              @input="(e) => searchNameCategory(e.target.value)"
              @focus="setNameCategory"
            />
            <ul id="product" class="absolute left-0 right-0 z-50 w-full text-xs bg-white shadow-md top-20">
              <li
                v-for="item in listCategory"
                :key="item.id"
                :value="item.name"
                class="px-2 py-2 text-xs border-b cursor-pointer text-slate-800 hover:bg-slate-200"
                @click.prevent="() => selectCategory(item.name)"
              >
                {{ item.name }}
              </li>
            </ul>
            <span
              v-if="displayAddButtonCategory"
              class="absolute left-0 right-0 z-50 w-full text-xs text-red-700 bg-white top-20"
            >
              <button
                class="flex items-center justify-center w-full gap-3 py-1 text-sm font-medium btn-md-success text-secondary"
              >
                <i class="fa-solid fa-plus"></i>
                Add
              </button>
            </span>
            <span
              v-for="error in v$.category.$errors"
              :key="error.$uid"
              class="absolute left-1 right-0 z-10 w-full text-xs text-red-800 bg-white top-[76px]"
            >
              {{ error.$message }}
            </span>
          </div>

          <div class="relative flex flex-col gap-2">
            <label for="price" class="text-sm font-normal text-TxtPrimary-700"
              >Price<span class="text-lg text-red-700 ps-2">*</span></label
            >
            <input
              id="price"
              v-model="state.price"
              type="number"
              placeholder="00000000"
              class="w-full px-3 py-[6px] border rounded-md bg-secondary outline-none"
              name="price"
            />

            <span
              v-for="error in v$.price.$errors"
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
            <router-link to="/products" class="btn-md-error">Batal</router-link>
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
