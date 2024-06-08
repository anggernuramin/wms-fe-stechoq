import axios from 'axios'

const token = localStorage.getItem('token')

export const getAllCategory = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_VUE_APP_BASE_URL}/category`, {
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

export const pagedCategory = async (id, limit, teks) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_VUE_APP_BASE_URL}/searchCategory?search_query=${teks}&page=${id.value - 1}&limit=${limit}`,
      {
        headers: {
          'Cache-Control': 'no-cache',
          Authorization: `Bearer ${token}`
        }
      }
    )
    return res.data.result
  } catch (error) {
    return error.message
  }
}

export const getCategoryById = async (id) => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_VUE_APP_BASE_URL}/category/${id}`, {
      headers: {
        'Cache-Control': 'no-cache',
        Authorization: `Bearer ${token}`
      }
    })
    console.log('🚀 ~ getCategoryById ~ res:', res.datadata)
    return res.data.data
  } catch (error) {
    return error.message
  }
}

export const deleteCategory = async (id) => {
  try {
    const res = await axios.delete(`${import.meta.env.VITE_VUE_APP_BASE_URL}/category/${id}`, {
      headers: {
        'Cache-Control': 'no-cache',
        Authorization: `Bearer ${token}`
      }
    })
    console.log('🚀 ~ deleteCategory ~ res:', res)
    return res.data.statusCode
  } catch (error) {
    return error.message
  }
}
