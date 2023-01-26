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
    //baseURL:"http://localhost:8090"
    baseURL:"http://103.250.10.196:8090"
})
