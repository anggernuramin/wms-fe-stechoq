import axios from 'axios'
import { headerConfig } from '../libs/headerConfig'
import Api from '../config/Api'

export const getAllJumlahStockBarang = async () => {
  try {
    const res = await Api().get('/qtyProduk', headerConfig)
    return res.data.data
  } catch (error) {
    return error.message
  }
}

export const getAllJumlahSaldoBarang = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_VUE_APP_BASE_URL}/balanceProduk`, headerConfig)
    return res.data.result
  } catch (error) {
    return error.message
  }
}

export const getAllStockReport = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_VUE_APP_BASE_URL}/compareProduk`, headerConfig)
    console.log('🚀 ~ getAllStockReport ~ res:', res?.data)
    return res.data.result
  } catch (error) {
    return error.message
  }
}
