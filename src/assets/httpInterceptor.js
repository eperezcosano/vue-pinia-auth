import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

const baseURL = 'http://localhost:3000/api'

function setHeaders() {
    const authStore = useAuthStore()
    return {
        headers: authStore.isLogged ? { Authorization: 'Bearer ' + authStore.getToken } : {}
    }
}

export function handleResponse(promise) {
    const authStore = useAuthStore()
    return promise.then(res => {
        return Promise.resolve(res.data)
    }).catch(err => {
        if (err.response.status === 401 && authStore.isLogged) authStore.logout()
        return Promise.reject(err.response.data?.msg)
    })
}

export function post(path, body) {
    return axios.post(baseURL + path, body, setHeaders())
}

export function get(path) {
    return axios.get(baseURL + path, setHeaders())
}
