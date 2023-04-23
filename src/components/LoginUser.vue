<template>
  <form @submit.prevent="login">
    <label>E-mail
      <input v-model="email" type="text" name="email">
    </label>
    <label>Password
      <input v-model="pass" type="password" name="password">
    </label>
    <p v-if="errMsg">{{ errMsg }}</p>

    <button type="submit">Login</button>
  </form>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import { useAuthStore } from '@/stores/auth'
import router from '@/router'

const authStore = useAuthStore()

const email = ref('')
const pass = ref('')
const errMsg = ref('')

onMounted(() => {
    if (authStore.isLogged) router.push({ name: 'dashboard'})
})

function login() {
    authStore.login(email.value, pass.value)
        .then(() => router.push({ name: 'dashboard'}))
        .catch(err => errMsg.value = err)
}
</script>
