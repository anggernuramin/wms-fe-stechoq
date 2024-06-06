import axios from 'axios'

export const GetBarangKeluar = async (teks, id) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_VUE_APP_BASE_URL}/barangKeluar?search=${teks}&page=${id.value}`,
      {
        headers: {
          'Cache-Control': 'no-cache',
          Authorization: `Bearer ${import.meta.env.VITE_VUE_TOKEN}`
        }
      }
    )
    return res.data.data
  } catch (error) {
    return error.message
  }
}

export const GetBarangKeluarID = async (teks) => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_VUE_APP_BASE_URL}/barangKeluar/getByID/${teks}`, {
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

export const DeleteBarangKeluar = async (id) => {
  try {
    const res = await axios.delete(`${import.meta.env.VITE_VUE_APP_BASE_URL}/barangKeluar/delete/${id}`, {
      headers: {
        'Cache-Control': 'no-cache',
        Authorization: `Bearer ${import.meta.env.VITE_VUE_TOKEN}`
      }
    })
    console.log('🚀 ~ deleteBarangKeluar ~ res:', res)
    return res.data.statusCode
  } catch (error) {
    return error.message
  }
}

export const UpdateBarangkeluar = async (id) => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_VUE_APP_BASE_URL}/barangKeluar/update/${id}`, {
      headers: {
        'Cache-Control': 'no-cache',
        Authorization: `Bearer ${import.meta.env.VITE_VUE_TOKEN}`
      }
    })
    console.log('🚀 ~ deleteBarangKeluar ~ res:', res)
    return res.data.statusCode
  } catch (error) {
    return error.message
  }
}

export const submitAddout = async (data) => {
  try {
    const res = await axios.post(`${import.meta.env.VITE_VUE_APP_BASE_URL}/barangKeluar/createProduk`, data, {
      headers: {
        'Cache-Control': 'no-cache',
        Authorization: `Bearer ${import.meta.env.VITE_VUE_TOKEN}`
      }
    })
    console.log('POST request successful:', res)
    return res.data
  } catch (error) {
    console.error('Error submitting data:', error)
    throw new Error(error.message)
  }
}
