<template>
  <div id="manage-portfolio">
    <div class="manage-portfolio__list">
      <ListItem v-for="item in store.portfolio" :key="item.id" :item="item" />
      <AddItem/>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useStore } from '../../pinia/store'
import AddItem from './AddItem.vue'
import ListItem from '../ListItem.vue'

const store = useStore()

onMounted(async () => {
  await store.fetchPortfolio()
})
</script>

<style lang="scss">

</style>