<template>
  <section id="login">
    <SectionHeading headingText="Login" />
    <form @submit.prevent="login">
      <div class="form__field">
        <label for="email">email</label>
        <input type="email" id="email" v-model="loginForm.email">
      </div>
      <div class="form__field">
        <label for="password">password</label>
        <input type="password" id="password" v-model="loginForm.password">
      </div>
      <button>Login</button>
    </form>
  </section>
</template>

<script setup>
import { useStore } from '../pinia/store'
import SectionHeading from '../components/SectionHeading.vue'

const loginForm = {
  email: '',
  password: ''
}

const store = useStore()
const login = () => {
  store.login(loginForm.email, loginForm.password)
}
</script>

<style lang="scss" scoped>
#login {
  form {
    box-shadow: $box-shadow;
    border: 1px solid transparent;
    border-radius: 5px;
    max-width: 36rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    padding: 2rem;
    font-size: $base-font-size;
    .form__field {
      padding: 1rem;
      width: 100%;
      label { width: 33%;}
      input { 
        width: 66%;
        border: none;
        border-bottom: 1px solid $black;
        padding: 0.5rem 0;
        &:focus {
          outline: none;
        }
      }
      @include flex-space-between;
    }
    button {
      margin-top: 2rem;
    }
  }
}
</style>