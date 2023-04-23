import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const baseURL = 'http://localhost:3000'

function setHeaders(token) {
    return {
        headers: token ? { Authorization: 'Bearer ' + token } : {}
    }
}

export function handleResponse(promise) {
    return promise.then(res => {
        return Promise.resolve(res.data)
    }).catch(err => {
        if (err.response.status === 401 && authStore.isLogged) authStore.logout()
        return Promise.reject(err.response.data?.msg)
    })
}

export function post(path, body) {
    return axios.post(baseURL + path, body, setHeaders(authStore.getToken))
}

export function get(path) {
    return axios.get(baseURL + path, setHeaders(authStore.getToken))
}
