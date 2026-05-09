<template>
  <div class="footer__wrapper">
    <footer>
      <span>{{ t('footer.note', ['@']) }}</span>
      <span v-html="$t('footer.animation')"></span>
    </footer>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
</script>

<style lang="scss">
.footer__wrapper {
  font-size: 1.6rem;
  background-color: $black;
  padding: 1rem;
  footer {
    color: white;
    span {
      a, a:visited {
        color: $blue;
      }
      a:hover, a:active {
        color: lighten($blue, 10%);
      }
    }
  }
}
</style>