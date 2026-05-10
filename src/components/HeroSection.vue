<template>
  <section id="hero">
    <SectionHeading :headingText="t('hero.h1')" level="h1" />
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import SectionHeading from './SectionHeading.vue'

const { t } = useI18n()
</script>

<style lang="scss" scoped>
#hero {
  background-image: url("/hero-bg.png");
  background-size: cover;
  @include flex-center;
}
</style>