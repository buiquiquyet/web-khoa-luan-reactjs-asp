import axios from "axios";

const request = axios.create({
    baseURL: 'https://localhost:7225/api/v1/',
    timeout: 3000000
})

request.interceptors.response.use(
    (response) => {
        return response.data
    }  ,
    (error) => {
        console.log(error);
    } 
)
// export const get = async (path, option = {}) => {
//     const res = await request.get(path, option)
//     return res.data
// }
// export const post = async (path, option = {}) => {
//     const res = await request.post(path, option)
//     return res.data
// }
export default request