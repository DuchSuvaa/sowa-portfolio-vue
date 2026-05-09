<template>
  <HeroSection/>
  <AboutSection/>
  <FeaturesSection/>
  <PortfolioSection/>
  <ContactSection/>
</template>

<script setup>
import { useStore } from '../pinia/store'
import { onMounted, ref } from 'vue'
import HeroSection from '../components/HeroSection.vue'
import AboutSection from '../components/AboutSection.vue'
import FeaturesSection from '../components/FeaturesSection.vue'
import PortfolioSection from '../components/PortfolioSection.vue'
import ContactSection from '../components/ContactSection.vue'
import { useHead } from '@vueuse/head'

const store = useStore()
const things = ref(null)
const thing = ref(null)

onMounted(async () => {
  thing.value = await store.getDocument('stuff', 'folder')
  things.value = await store.getCollection('stuff', 'folder', 'items')
})

useHead({
  title: 'Bartosz Sowa | Portfolio',
  meta: {
    name: "description",
    description: `Potrzebujesz strony internetowej, ale nie wiesz czym się różni server od domeny?
      Dobrze trafiłeś. Tłumaczę, projektuję, koduję i oferuję atrakcyjne ceny.
    `
  }
})

</script>

<style scoped>

</style>