import axios from 'axios'
import { ref } from 'vue'

export const getAllBarangMasuk = async () => {
  let data = []
  let error = ''
  let loading = false
  try {
    loading = true
    let res = await axios.get(`${import.meta.env.VITE_VUE_APP_BASE_URL}/barangMasuk`)
    loading = false
    data = res?.data?.data
  } catch (err) {
    loading = false
    error = err.message
  }

  return { data, error, loading }
}
