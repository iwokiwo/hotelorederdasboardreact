import axios from 'axios'

const axiosInstance = axios.create()

// axiosInstance.interceptors.response.use(
//     (response) => response,
//     (error) =>
//         Promise.reject(
//             (error.response && error.response.data) || 'Something went wrong!'
//         )
// )


// export default axiosInstance


export default axios.create({
    // baseURL:"http://localhost:8085/api/v1/"  
    //baseURL:"http://147.139.139.7:8085/api/v1/"

    baseURL:"http://localhost:8010"
})
