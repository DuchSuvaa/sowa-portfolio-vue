<template>
  <section id="portfolio">
    <div class="stroke-magic">
      <h2>{{ t('portfolio.h2' )}}</h2>  
      <h2>{{ t('portfolio.h2' )}}</h2>  
    </div>
    <div class="portfolio__list">
      <ListItem v-for="item in items" :key="item.id" :item="item" @removed="remove" />
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n'
import { useStore } from '../pinia/store'
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

const { t } = useI18n()
</script>

<style lang="scss">
#manage-portfolio, #portfolio {
  width: 100%;
  .manage-portfolio__list, .portfolio__list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 1fr;
    @media (max-width: 800px) { grid-template-columns: repeat(2, 1fr); }
    @media (max-width: 450px) { grid-template-columns: repeat(1, 1fr); }
    gap: $gap;
  }
}
</style>