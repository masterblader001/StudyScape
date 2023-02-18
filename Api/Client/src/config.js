import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: "https://tranquil-basin-95650.herokuapp.com/api"
})