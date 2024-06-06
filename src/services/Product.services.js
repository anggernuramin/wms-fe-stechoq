import axios from 'axios'
import { capitalizeFirstLetter } from '../libs/capitalizeFirstLetter'

export const getAllProduct = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_VUE_APP_BASE_URL}/produk`, {
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

export const pagedProduct = async (id, limit, teks) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_VUE_APP_BASE_URL}/searchProduk?search_query=${teks}&page=${id.value - 1}&limit=${limit}`,
      {
        headers: {
          'Cache-Control': 'no-cache',
          Authorization: `Bearer ${import.meta.env.VITE_VUE_TOKEN}`
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
    const res = await axios.get(`${import.meta.env.VITE_VUE_APP_BASE_URL}/produk/${id}`, {
      headers: {
        'Cache-Control': 'no-cache',
        Authorization: `Bearer ${import.meta.env.VITE_VUE_TOKEN}`
      }
    })
    console.log('🚀 ~ getProductById ~ res:', res.datadata)
    return res.data.data
  } catch (error) {
    return error.message
  }
}

export const deleteProduct = async (id) => {
  try {
    const res = await axios.delete(`${import.meta.env.VITE_VUE_APP_BASE_URL}/produk/${id}`, {
      headers: {
        'Cache-Control': 'no-cache',
        Authorization: `Bearer ${import.meta.env.VITE_VUE_TOKEN}`
      }
    })

    console.log('🚀 ~ deleteProduct ~ res:', res)
    return res.data.statusCode
  } catch (error) {
    return error.message
  }
}

export const addNameProduct = async (name) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_VUE_APP_BASE_URL}/seriProduk`,
      {
        seri: capitalizeFirstLetter(name)
      },
      {
        headers: {
          'Cache-Control': 'no-cache',
          Authorization: `Bearer ${import.meta.env.VITE_VUE_TOKEN}`
        }
      }
    )
    return res
  } catch (error) {
    return error.message
  }
}
