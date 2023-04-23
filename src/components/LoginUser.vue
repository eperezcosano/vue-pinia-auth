<template>
  <form @submit.prevent="login">
    <label>E-mail
      <input v-model="email" type="email" name="email" value>
    </label>
    <label>Password
      <input v-model="pass" type="password" name="password" value>
    </label>
    <p v-if="errMsg">{{ errMsg }}</p>

    <button type="submit">Login</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const email = ref('')
const pass = ref('')
const errMsg = ref('')

function login() {
    authStore.login(email, pass)
        .then(() => this.$router.push({ name: 'dashboard'}))
        .catch(err => errMsg.value = err)
}
</script>
