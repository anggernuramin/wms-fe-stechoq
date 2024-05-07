import axios from 'axios'

export const getAllProduct = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_VUE_APP_BASE_URL}/produk`, {
      headers: {
        'Cache-Control': 'no-cache' // Mengatur header Cache-Control untuk memastikan data selalu diambil dari server
      }
    })
    return res.data.data
  } catch (error) {
    return error.message
  }
}

export const pagedProduct = async (id, limit, teks) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_VUE_APP_BASE_URL}/searchProduk?search_query=${teks}&page=${id.value - 1}&limit=${limit}`,
      {
        headers: {
          'Cache-Control': 'no-cache' // Mengatur header Cache-Control untuk memastikan data selalu diambil dari server
        }
      }
    )
    return res.data.result
  } catch (error) {
    return error.message
  }
}

export const getProductById = async (id) => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_VUE_APP_BASE_URL}/produk/${id}`)
    console.log('🚀 ~ getProductById ~ res:', res.datadata)
    return res.data.data
  } catch (error) {
    return error.message
  }
}

export const deleteProduct = async (id) => {
  try {
    const res = await axios.delete(`${import.meta.env.VITE_VUE_APP_BASE_URL}/produk/${id}`)
    console.log('🚀 ~ deleteProduct ~ res:', res)
    return res.data.statusCode
  } catch (error) {
    return error.message
  }
}
