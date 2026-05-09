<template>
  <div id="manage-portfolio">
    <div class="manage-portfolio__list">
      <ListItem v-for="item in items" :key="item.id" :item="item" @removed="remove"/>
      <AddItem/>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useStore } from '../pinia/store'
import AddItem from '../components/AddItem.vue'
import ListItem from '../components/ListItem.vue'

const store = useStore()
const items = ref(null)

onMounted(async () => {
  items.value = await store.getCollection('portfolio')
  items.value.sort( (a, b) => {
    if (parseInt(a.order) < parseInt(b.order)) { return 1 }
    if (parseInt(a.order) > parseInt(b.order)) { return -1 }
    return 0;
  })
})

const remove = (id) => {
  items.value = items.value.filter( item => item.id !== id )
}
</script>

<style lang="scss">

</style>