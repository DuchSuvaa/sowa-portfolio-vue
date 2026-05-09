<template>
  <AppHeader/>
  <router-view></router-view>
  <AppFooter/>
  <NotificationBox v-if="store.notification">{{ store.notification }}</NotificationBox>
  <ErrorBox v-if="store.error">{{ store.error }}</ErrorBox>
</template>

<script setup>
import { useStore } from './pinia/store'
import AppHeader from './components/AppHeader.vue'
import NotificationBox from './components/NotificationBox.vue'
import ErrorBox from './components/ErrorBox.vue'
import AppFooter from './components/AppFooter.vue'

const store = useStore()

</script>

<style lang="scss" scoped>

</style>
