import axios from 'axios'

const token = localStorage.getItem('token')

export const GetStock = async (id) => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_VUE_APP_BASE_URL}/stok`, {
      headers: {
        'Cache-Control': 'no-cache',
        Authorization: `Bearer ${token}`
      }
    })
    return res.data.data
  } catch (error) {
    return error.message
  }
}
