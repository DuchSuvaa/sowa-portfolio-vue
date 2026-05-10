<template>
  <section id="admin">
    <SectionHeading :headingText="t('admin.h2')" />
    <div class="admin__content">
      <ManagePortfolio/>
      <button @click="logout">Logout</button>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { useStore } from '../pinia/store'
import ManagePortfolio from '../components/ManagePortfolio.vue'
import SectionHeading from '../components/SectionHeading.vue'

const { t } = useI18n()
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