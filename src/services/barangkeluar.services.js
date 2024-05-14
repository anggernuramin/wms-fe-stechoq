import axios from 'axios'

export const GetBarangKeluar = async (teks, id) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_VUE_APP_BASE_URL}/barangKeluar?search=${teks}&page=${id.value}`,
      {
        headers: {
          'Cache-Control': 'no-cache' // Mengatur header Cache-Control untuk memastikan data selalu diambil dari server
        }
      }
    )
    return res.data.data
  } catch (error) {
    return error.message
  }
}
// export const GetBarangKeluarbyID = async (teks) => {
//     try {
//       const res = await axios.get(`${import.meta.env.VITE_VUE_APP_BASE_URL}/barangKeluar?search=${teks}`, {
//         headers: {
//           'Cache-Control': 'no-cache' // Mengatur header Cache-Control untuk memastikan data selalu diambil dari server
//         }
//       })
//       return res.data.data
//     } catch (error) {
//       return error.message
//     }
//   }
export const DeleteBarangKeluar = async (id) => {
  try {
    const res = await axios.delete(`${import.meta.env.VITE_VUE_APP_BASE_URL}/barangKeluar/delete/${id}`)
    console.log('🚀 ~ deleteBarangKeluar ~ res:', res)
    return res.data.statusCode
  } catch (error) {
    return error.message
  }
}

export const UpdateBarangkeluar = async (id) => {
  try {
    const res = await axios.patch(`${import.meta.env.VITE_VUE_APP_BASE_URL}/barangKeluar/update/${id}`)
    console.log('🚀 ~ deleteBarangKeluar ~ res:', res)
    return res.data.statusCode
  } catch (error) {
    return error.message
  }
}
