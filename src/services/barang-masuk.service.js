import axios from 'axios'
import { headerConfig } from '../libs/headerConfig'

export const getBarangMasukById = async (id) => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_VUE_APP_BASE_URL}/barangMasuk/${id}`, headerConfig)
    return res.data.data
  } catch (error) {
    return error.message
  }
}

export const getAllBarangMasuk = async (page) => {
  try {
    let res = await axios.get(`${import.meta.env.VITE_VUE_APP_BASE_URL}/searchBM?page=${page}&limit=10 `, headerConfig)
    return res.data?.result
  } catch (err) {
    return err.message
  }
}

export const UpdateBarangMasuk = async (payload, id) => {
  try {
    await axios.patch(
      `${import.meta.env.VITE_VUE_APP_BASE_URL}/barangMasuk/update/${id} `,
      JSON.stringify(payload),
      headerConfig
    )
  } catch (err) {
    return err.message
  }
}

export const deleteBarangMasuk = async (id) => {
  try {
    let res = await axios.delete(`${import.meta.env.VITE_VUE_APP_BASE_URL}/barangMasuk/delete/${id} `, headerConfig)
    return res
  } catch (err) {
    return err.message
  }
}

export const searchBarangMasuk = async (query) => {
  try {
    let res = await axios.get(
      `${import.meta.env.VITE_VUE_APP_BASE_URL}/searchBM?search_query=${query}&page=0&limit=10`,

      headerConfig
    )
    return res.data.result
  } catch (err) {
    return err.message
  }
}
