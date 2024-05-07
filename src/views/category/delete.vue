<script setup>
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref, defineEmits } from 'vue'
import { getCategoryById, deleteCategory } from '../../services/category.services'
const route = useRoute()
const router = useRouter()
const id = ref(route.params.id)
const data = ref(null)
const emits = defineEmits(['dataAdded'])

onMounted(async () => {
  try {
    const category = await getCategoryById(id.value)
    data.value = category
    console.log('🚀 ~ onMounted ~ category:', data.value)
  } catch (error) {
    console.log(error.message)
  }
})
const handleDelete = async () => {
  const res = await deleteCategory(id.value)
  console.log('🚀 ~ handleDelete ~ res:', res)
  emits('dataAdded')
  router.push('/products/category')
}
</script>
<template>
  <!-- Put this part before </body> tag -->
  <section
    class="fixed top-0 bottom-0 left-0 right-0 z-50 flex items-start justify-center pt-16 bg-opacity-55 bg-TxtPrimary-700 h-[100vh] overflow-hidden"
  >
    <div class="w-1/2 rounded-md animation-scale bg-secondary">
      <form action="" @submit.prevent="handleDelete">
        <h2 class="p-5 mb-5 text-xl text-left border-b text-slate-700">Delete Category</h2>
        <p v-if="data" class="text-center">Anda akan menghapus produk {{ data.Nama }}, lanjutkan?</p>
        <p v-else>Loading . . .</p>
        <div class="flex items-center justify-end gap-3 p-5 mt-5 border-t">
          <router-link to="/products/category" class="btn-md-error">Batal</router-link>
          <button type="submit" class="btn-md-success">Hapus</button>
        </div>
      </form>
    </div>
  </section>
</template>
<style></style>
