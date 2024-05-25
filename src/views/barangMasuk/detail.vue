<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { getBarangMasukById } from '../../services/barang-masuk.service.js'
import { useRoute } from 'vue-router'

const route = useRoute()

const id = ref(route.params.id)

const state = reactive({
  Nama_Produk: '',
  Kategori: '',
  keterangan: '',
  quantity: '',
  tanggal: ''
})

onMounted(async () => {
  const products = await getBarangMasukById(id.value)
  state.Nama_Produk = products.Nama_Produk
  state.Kategori = products.Kategori
  state.keterangan = products.Keterangan_BM
  state.quantity = products.Quantity_Masuk
  state.tanggal = products.tanggal
})
</script>

<template>
  <section
    class="absolute top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center overflow-auto bg-opacity-55 bg-TxtPrimary-700"
  >
    <div class="w-1/2 rounded-md bg-secondary animation-scale h-[75vh]">
      <form class="p-5" @submit.prevent="submitEditBarangMasuk">
        <h2 class="mb-4 text-2xl font-normal text-left text-slate-900">Detail Data Barang Masuk</h2>
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
              disabled
              type="text"
              class="w-full px-3 py-[6px] border rounded-md bg-secondary outline-none"
              name="price"
            >
            </textarea>
          </div>

          <div class="relative flex flex-col gap-2">
            <label for="price" class="text-sm font-normal text-TxtPrimary-700"
              >Quantity<span class="text-lg text-red-700 ps-2">*</span></label
            >
            <input
              id="quantity"
              v-model="state.quantity"
              disabled
              type="number"
              class="w-full px-3 py-[6px] border rounded-md bg-secondary outline-none"
              name="quantity"
            />
          </div>
        </div>
        <div class="flex items-center justify-between gap-3 mt-8">
          <span class="text-xs text-slate-400">Kolom tanda * input wajib diisi</span>
          <div class="flex items-center justify-between gap-3">
            <router-link to="/barang-masuk" class="btn-md-success">Keluar</router-link>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>
