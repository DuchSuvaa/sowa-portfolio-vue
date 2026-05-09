<template>
  <section id="hero">
    <div class="stroke-magic">
      <h1 v-html="$t('hero.h1')"></h1>
      <h1 v-html="$t('hero.h1')"></h1>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style lang="scss" scoped>
#hero {
  background-image: url("/hero-bg.png");
  background-size: cover;
  @include flex-center;
  flex: auto auto auto;
  @media (max-width: 800px) { h1 { font-size: 5rem; } }
  @media (max-width: 500px) { h1 { font-size: 4rem; } }
}

</style>