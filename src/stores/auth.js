import { defineStore } from 'pinia'
import { get, post, handleResponse} from '@/assets/httpInterceptor'

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        user: JSON.parse(localStorage.getItem('user'))
    }),
    actions: {
        login(email, pass) {
            const req = post('/login', {email, pass})
            return handleResponse(req).then(res => {
                localStorage.setItem('user', JSON.stringify(res))
                this.user = res
            })
        },
        validate() {
            if (!this.isLogged) return Promise.reject()
            const req = get('/validate')
            return handleResponse(req)
        },
        logout() {
            localStorage.removeItem('user')
            this.user = null
            location.reload()
        }
    },
    getters: {
        isLogged(state) {
            return !!state.user
        },
        getToken(state) {
            return state.user?.token
        }
    }
})
