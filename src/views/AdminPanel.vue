<template>
  <section id="admin">
    <div class="stroke-magic">
      <h2>Admin</h2>
      <h2>Admin</h2>
    </div>
    <div class="admin__content">
      <ManagePortfolio/>
      <button @click="logout">Logout</button>
    </div>
  </section>
</template>

<script setup>
import { useStore } from '../pinia/store'
import ManagePortfolio from '../components/ManagePortfolio.vue';

const store = useStore()

const logout = () => {
  store.logout()
}
</script>

<style lang="scss" scoped>
  #admin {
    font-size: $base-font-size;
    .admin__content {
      @include flex-center;
      flex-direction: column;
      margin-bottom: 2rem;
      button {
        margin-top: 3rem;
      }
    }
  }
</style>