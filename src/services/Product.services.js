import axios from 'axios'
import { capitalizeFirstLetter } from '../libs/capitalizeFirstLetter'
import { headerConfig } from '../libs/headerConfig.js'

export const getAllProduct = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_VUE_APP_BASE_URL}/produk`, headerConfig)
    return res.data.data
  } catch (error) {
    return error.message
  }
}

export const pagedProduct = async (query, page, limit) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_VUE_APP_BASE_URL}/searchProduk?search=${query}&page=${page}&limit=${limit}`,

      headerConfig
    )
    return res.data
  } catch (error) {
    return error.message
  }
}

export const getProductById = async (id) => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_VUE_APP_BASE_URL}/produk/${id}`, headerConfig)
    return res.data.data
  } catch (error) {
    return error.message
  }
}

export const deleteProduct = async (id) => {
  try {
    const res = await axios.delete(`${import.meta.env.VITE_VUE_APP_BASE_URL}/produk/${id}`, headerConfig)

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
      headerConfig
    )
    return res
  } catch (error) {
    return error.message
  }
}
