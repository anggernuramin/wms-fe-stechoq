// import axios from "redaxios";
import axios from 'axios'

const API_URL = import.meta.env.VITE_VUE_APP_BASE_URL

export default () => {
  return axios.create({
    baseURL: `${API_URL}`
  })
}
