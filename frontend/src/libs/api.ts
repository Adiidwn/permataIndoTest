import axios from "axios"

export const Api = axios.create({
    baseURL: "http://localhost:3000/api/v1",
})

export function setAuthToken(token : string | null) {
    if (token) {
        Api.defaults.headers.common["Authorization"] = `Bearer ${token}`
    }else{
        delete Api.defaults.headers.common["Authorization"]
     }
  }
  