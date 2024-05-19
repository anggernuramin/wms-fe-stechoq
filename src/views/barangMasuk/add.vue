<!-- eslint-disable vue/no-parsing-error -->
<script setup>
import { reactive, ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useVuelidate } from '@vuelidate/core'
import { required, helpers, minLength } from '@vuelidate/validators'
import { getAllCategory } from '../../services/category.services'
import { getAllProduct, addNameProduct } from '../../services/Product.services.js'
import axios from 'axios'
import { capitalizeFirstLetter } from '../../libs/capitalizeFirstLetter.js'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'

const toast = useToast()

const state = reactive({
  product: '',
  category: '',
  keterangan: '',
  tanggal: '',
  quantity: ''
})

const date = ref(new Date())
const showDate = ref(false)

let product = []

onMounted(async () => {
  const products = await getAllProduct()
  return (product = products)
})

const emits = defineEmits(['dataAdded'])
const router = useRouter()
const listProducts = ref([])
const displayAddButton = ref(false)

const statusMessageAdd = ref('Add +')
const isLoading = ref(false)
const isSubmit = ref(false)
const ERROR = 'error'

const rules = {
  product: { required: { ...required, message: ERROR } },
  keterangan: { required },
  tanggal: { required },
  quantity: { required },
  category: { required }
}

const handleAddNameProduct = async (name, kategori) => {
  statusMessageAdd.value = 'Loading. . .'
  await addNameProduct(name)
    .then(() => (statusMessageAdd.value = 'Berhasil'))
    .catch(() => (statusMessageAdd.value = 'Gagal'))
  selectProduct(name, kategori)
  setTimeout(() => {
    displayAddButton.value = false
  }, 1000)
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

const submitAddBarangMasuk = async () => {
  if (isLoading.value || isSubmit.value) return // menghentikan mengirim form lebih dari 1 kali
  const result = await v$.value.$validate()
  // Check apakah ada error
  if (result) {
    try {
      isLoading.value = true
      const res = await axios.post(
        `${import.meta.env.VITE_VUE_APP_BASE_URL}/barangMasuk/create`,
        {
          nama_produk: state.product,
          kategori: state.category,
          keterangan: state.keterangan,
          tanggal: state.tanggal,
          quantity: state.quantity
        },
        {
          headers: { 'Content-Type': 'application/json' }
        }
      )
      isSubmit.value = true
      emits('dataAdded')
      router.push('/barang-masuk')
      toast.success('Data Berhasil Ditambahkan', {
        position: 'top-right'
      })
      isLoading.value = false
    } catch (error) {
      toast.error('Data Gagal Ditambahkan', {
        position: 'top-right'
      })
      isLoading.value = false
      isSubmit.value = false
    }
  }
}

const setNameProducts = async () => {
  if (!state.product) {
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
const selectProduct = (name, kategori) => {
  state.category = kategori
  state.product = name
  listProducts.value = []
}

const handleDate = () => {
  showDate.value = !showDate.value
}

const handleSetDate = () => {
  console.log('🚀 ~ handleSetDate ~ value:', date.value)
  if (date.value) {
    return (state.tanggal = date.value.toISOString().split('T')[0]) // Convert to yyyy-mm-dd format
  }
}

watch(date, (newDate) => {
  return (state.tanggal = newDate.toISOString().split('T')[0]) // Convert to yyyy-mm-dd format
})

watch(displayAddButton, (displayCurrentButton) => {
  // update pilihan data barang
  const fetchProduct = async () => {
    const products = await getAllProduct()
    return (product = products)
  }
  fetchProduct()
})
</script>

<template>
  <section
    class="absolute top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center overflow-auto bg-opacity-55 bg-TxtPrimary-700"
  >
    <div class="w-1/2 rounded-md bg-secondary animation-scale h-[65vh] overflow-y-scroll">
      <form class="p-5" @submit.prevent="submitAddBarangMasuk">
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
                @click.prevent="() => selectProduct(item.Nama, item?.Kategori)"
              >
                {{ item.Nama }}
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

          <div class="relative flex flex-col gap-2">
            <label for="price" class="text-sm font-normal text-TxtPrimary-700"
              >Keterangan<span class="text-lg text-red-700 ps-2">*</span></label
            >
            <textarea
              placeholder="Keterangan Barang Masuk"
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
              class="absolute left-1 right-0 z-10 w-full text-xs text-red-800 bg-white top-[102px]"
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
                type="date"
                class="w-full px-3 py-[6px] border rounded-md bg-secondary outline-none"
                name="tanggal"
                @click="handleDate"
              />
              <div v-if="showDate" class="absolute top-[-280px]">
                <VDatePicker v-model="date" @click="handleSetDate" mode="date" />
              </div>
            </div>

            <span
              v-for="error in v$.tanggal.$errors"
              :key="error.$uid"
              class="absolute left-1 right-0 z-10 w-full text-xs text-red-800 bg-white top-[76px]"
            >
              {{ error.$message }}
            </span>
          </div>

          <div class="relative flex flex-col gap-2">
            <label for="price" class="text-sm font-normal text-TxtPrimary-700"
              >Quantity<span class="text-lg text-red-700 ps-2">*</span></label
            >
            <input
              id="quantity"
              placeholder="0"
              v-model="state.quantity"
              type="number"
              class="w-full px-3 py-[6px] border rounded-md bg-secondary outline-none"
              name="quantity"
            />

            <span
              v-for="error in v$.quantity.$errors"
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
