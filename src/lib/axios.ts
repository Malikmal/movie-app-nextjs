import axios from "axios";

const axiosLib = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: {
        'Authorization': 'Bearer ' + process.env.NEXT_PUBLIC_API_TOKEN
    }
})

export default axiosLib;