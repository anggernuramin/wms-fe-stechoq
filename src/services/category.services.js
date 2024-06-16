import axios from 'axios'
import { headerConfig } from '../libs/headerConfig'

const token = localStorage.getItem('token')

export const getAllCategory = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_VUE_APP_BASE_URL}/category`, headerConfig)
    return res.data.data
  } catch (error) {
    return error.message
  }
}

export const pagedCategory = async (query, page, limit) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_VUE_APP_BASE_URL}/searchCategory?search=${query}&page=${page}&limit=${limit}`,
      headerConfig
    )
    return res.data
  } catch (error) {
    return error.message
  }
}

export const getCategoryById = async (id) => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_VUE_APP_BASE_URL}/category/${id}`, headerConfig)
    return res.data.data
  } catch (error) {
    return error.message
  }
}

export const deleteCategory = async (id) => {
  try {
    const res = await axios.delete(`${import.meta.env.VITE_VUE_APP_BASE_URL}/category/${id}`, headerConfig)
    return res.data.statusCode
  } catch (error) {
    return error.message
  }
}
