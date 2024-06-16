<script setup>
import { reactive, ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useVuelidate } from '@vuelidate/core'
import { required, helpers, minLength } from '@vuelidate/validators'
import { getBarangMasukById, UpdateBarangMasuk } from '../../services/barang-masuk.service.js'
import axios from 'axios'
import { capitalizeFirstLetter } from '../../libs/capitalizeFirstLetter.js'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
import { headerConfig } from '../../libs/headerConfig.js'

const toast = useToast()
const barangMasuk = ref({})
const router = useRouter()
const route = useRoute()

const id = ref(route.params.id)

const state = reactive({
  Nama_Produk: '',
  Kategori: '',
  keterangan: '',
  quantity: '',
  tanggal: ''
})

const isLoading = ref(false)
const isSubmit = ref(false)

let product = []

onMounted(async () => {
  const products = await getBarangMasukById(id.value)
  state.Nama_Produk = products.Nama_Produk
  state.Kategori = products.Kategori
  state.keterangan = products.Keterangan_BM
  state.quantity = products.Quantity_Masuk
  state.tanggal = products.tanggal
})

const emits = defineEmits(['dataAdded'])

const rules = {
  keterangan: { required },
  quantity: { required }
}

const v$ = useVuelidate(rules, state)

const submitEditBarangMasuk = async () => {
  if (isLoading.value || isSubmit.value) return // menghentikan mengirim form lebih dari 1 kali
  const result = await v$.value.$validate()
  // Check apakah ada error
  if (result) {
    try {
      isLoading.value = true

      const res = await axios.patch(
        `${import.meta.env.VITE_VUE_APP_BASE_URL}/barangMasuk/update/${id.value}`,
        {
          keterangan: state.keterangan,
          quantity: state.quantity
        },
        headerConfig
      )
      isSubmit.value = true
      emits('dataAdded')
      router.push('/barang-masuk')
      toast.success('Data Berhasil DiUpdate', {
        position: 'top-right'
      })
      isLoading.value = false
    } catch (error) {
      toast.error('Data Gagal DiUpdate', {
        position: 'top-right'
      })
      isLoading.value = false
      isSubmit.value = false
    }
  }
}
</script>

<template>
  <section
    class="absolute top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center overflow-auto bg-opacity-55 bg-TxtPrimary-700"
  >
    <div class="w-1/2 rounded-md bg-secondary animation-scale h-[70vh]">
      <form class="p-5" @submit.prevent="submitEditBarangMasuk">
        <h2 class="mb-4 text-2xl font-normal text-left text-slate-900">Edit Data Barang Masuk</h2>
        <div class="grid grid-cols-1 gap-4">
          <div class="grid grid-cols-2 gap-5">
            <div class="relative flex flex-col gap-2">
              <label for="product" class="text-sm font-normal text-TxtPrimary-700"
                >Product<span class="text-lg text-red-700 ps-2">*</span></label
              >
              <input
                v-model="state.Nama_Produk"
                disabled
                type="text"
                class="w-full px-3 py-2 text-sm border rounded-md bg-secondary wrapper-product"
              />
            </div>

            <div class="relative flex flex-col gap-2">
              <label for="product" class="text-sm font-normal text-TxtPrimary-700"
                >Kategori<span class="text-lg text-red-700 ps-2">*</span></label
              >
              <input
                v-model="state.Kategori"
                disabled
                type="text"
                class="w-full px-3 py-2 text-sm border rounded-md bg-secondary wrapper-product"
              />
            </div>
          </div>

          <div class="relative flex flex-col gap-2">
            <label for="price" class="text-sm font-normal text-TxtPrimary-700"
              >Tanggal<span class="text-lg text-red-700 ps-2">*</span></label
            >

            <div class="relative w-sm">
              <input
                id="tanggal"
                v-model="state.tanggal"
                disabled
                type="date"
                class="w-full px-3 py-[6px] border rounded-md bg-secondary outline-none"
                name="tanggal"
              />
            </div>
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
              class="absolute left-1 right-0 z-10 w-full text-xs text-red-800 bg-white top-[102px]"
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
