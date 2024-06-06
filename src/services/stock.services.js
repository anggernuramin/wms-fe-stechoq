import axios from 'axios'

export const GetStock = async (id) => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_VUE_APP_BASE_URL}/stok?page=${id}`, {
      headers: {
        'Cache-Control': 'no-cache',
        Authorization: `Bearer ${import.meta.env.VITE_VUE_TOKEN}`
      }
    })
    return res.data.data
  } catch (error) {
    return error.message
  }
}
