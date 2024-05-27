// import axios from "redaxios";
import axios from 'axios'

const API_URL = 'http://localhost:5173'

// class AuthenticationService{
//     async register(user){
//         console.log(user);
//         const response = await axios.create(`${API_URL}`,user);
//         return response.data;
//     }
// }

// export default new AuthenticationService();

export default () => {
  return axios.create({
    baseURL: `${API_URL}`
  })
}
