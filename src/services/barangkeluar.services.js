import axios from 'axios'
import { headerConfig } from '../libs/headerConfig'

export const GetBarangKeluar = async (query, page) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_VUE_APP_BASE_URL}/barangKeluar?search=${query}&page=${page}`,

      headerConfig
    )
    return res.data
  } catch (error) {
    return error.message
  }
}

export const GetBarangKeluarID = async (teks) => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_VUE_APP_BASE_URL}/barangKeluar/getByID/${teks}`, headerConfig)
    return res.data.data
  } catch (error) {
    return error.message
  }
}

export const DeleteBarangKeluar = async (id) => {
  try {
    const res = await axios.delete(`${import.meta.env.VITE_VUE_APP_BASE_URL}/barangKeluar/delete/${id}`, headerConfig)
    return res.data.statusCode
  } catch (error) {
    return error.message
  }
}

export const UpdateBarangkeluar = async (id) => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_VUE_APP_BASE_URL}/barangKeluar/update/${id}`, headerConfig)
    return res.data.statusCode
  } catch (error) {
    return error.message
  }
}

export const submitAddout = async (data) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_VUE_APP_BASE_URL}/barangKeluar/createProduk`,
      data,
      headerConfig
    )
    return res.data
  } catch (error) {
    throw new Error(error.message)
  }
}
