<script setup>
import { reactive, ref, defineEmits, onMounted } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import axios from 'axios'
import { useRouter, useRoute } from 'vue-router'
import { getCategoryById } from '../../services/category.services'
import { headerConfig } from '../../libs/headerConfig'
import { useToast } from 'vue-toast-notification'

// mengirimakan data ke parent element
const emits = defineEmits(['dataAdded'])
const router = useRouter()
const route = useRoute()
const id = ref(route.params.id)
const toast = useToast()
// digunakan untuk menympan state data primitif seperti object dan array
const state = reactive({
  name: ''
})
// digunakan untuk menyimpan data state non-primitif seperti number,string,boolean
const isLoading = ref(false)
const isSubmit = ref(false)
const ERROR = 'error'

const rules = {
  name: { required: { ...required, message: ERROR } }
}

const v$ = useVuelidate(rules, state)

onMounted(async () => {
  try {
    const category = await getCategoryById(id.value)
    state.name = category?.Nama
  } catch (error) {
    error.message
  }
})

const submitEditProduct = async () => {
  if (isLoading.value || isSubmit.value) return // menghentikan mengirim form lebih dari 1 kali
  const result = await v$.value.$validate()
  // Check apakah ada error
  if (result) {
    try {
      isLoading.value = true

      const res = await axios.patch(
        `${import.meta.env.VITE_VUE_APP_BASE_URL}/category/${id.value}`,
        {
          id: id.value,
          Nama: state.name.toUpperCase()
        },
        headerConfig
      )
      isSubmit.value = true
      emits('dataAdded')
      toast.success('Kategori Berhasil Diedit', {
        position: 'top-right'
      })
      router.push('/products/category')
      isLoading.value = false
    } catch (error) {
      alert(error.message)
      isLoading.value = false
      isSubmit.value = false
    }
  }
}
</script>

<template>
  <router-link to="/products/category" class="text-slate-400">Category</router-link>

  <section
    class="fixed top-0 bottom-0 left-0 right-0 z-50 flex justify-end bg-opacity-55 bg-TxtPrimary-700 display w-[100%] min-[100vh] overflow-hidden"
  >
    <div class="w-1/2 pt-5 animasi-lebar bg-secondary">
      <form class="px-5 pb-5" @submit.prevent="submitEditProduct">
        <h2 class="mb-4 text-2xl font-normal text-left text-slate-900">Edit Category</h2>
        <div class="grid grid-cols-1 gap-5">
          <div class="flex flex-col gap-2">
            <label for="price" class="text-sm font-normal text-TxtPrimary-700"
              >Name Category<span class="text-lg text-red-700 ps-2">*</span></label
            >
            <input
              id="price"
              v-model="state.name"
              type="text"
              placeholder="Name Category"
              class="w-full px-3 py-[6px] border rounded-md bg-secondary outline-none"
              name="price"
            />
            <span v-for="error in v$.name.$errors" :key="error.$uid" class="text-xs text-red-80">
              {{ error.$message }}
            </span>
          </div>
        </div>
        <div class="absolute bottom-0 right-0 flex items-center justify-between w-1/2 gap-3 p-5 pt-5 pr-5 mt-4">
          <span class="text-xs text-slate-400">Kolom tanda * input wajib diisi</span>
          <div class="flex items-center justify-between gap-3">
            <router-link to="/products/category" class="btn-md-error">Batal</router-link>
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
<style>
@keyframes lebar {
  0% {
    width: 0%;
  }
  100% {
    width: 50%;
  }
}

.animasi-lebar {
  animation-name: lebar;
  animation-duration: 0.5s; /* durasi animasi */
  animation-timing-function: ease-in-out; /* kurva pergerakan animasi */
  animation-fill-mode: forwards; /* elemen tetap berada pada akhir animasi */
}
</style>
