<template>
  <section id="features">
    <div class="stroke-magic">
      <h2>{{ t('features.h2' )}}</h2>
      <h2>{{ t('features.h2' )}}</h2>
    </div>

    <div class="features__content">
      <div class="features__feature">
        <div class="features__image-container">
          <img src="../assets/responsive.svg">
        </div>
        <div class="features__text">
          <h3>{{ t('features.h3-1' )}}</h3>
          <p>{{ t('features.p-1' )}}</p>
        </div>
      </div>
      <div class="features__feature">
        <div class="features__image-container">
          <img src="../assets/options.svg">
        </div>
        <div class="features__text">
          <h3>{{ t('features.h3-2' )}}</h3>
          <p>{{ t('features.p-2' )}}</p>
        </div>
      </div>
      <div class="features__feature">
        <div class="features__image-container">
          <img src="../assets/fast.svg">
        </div>
        <div class="features__text">
          <h3>{{ t('features.h3-3' )}}</h3>
          <p>{{ t('features.p-3' )}}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
</script>

<style lang="scss" scoped>
#features {
  .features__content {
    @include flex-center;
    align-items: stretch;
    gap: $gap;
    .features__feature {
      padding: 4rem;
      width: 34%;
      @include flex-start;
      flex-direction: column;
      background-color: white;
      box-shadow: $box-shadow;
      .features__image-container {
        height: 25%;
        width: 100%;
        @include flex-center;
        height: 4rem;
      }
      .features__text {
        height: 75;
        p {
          text-align: center;
          font-size: 1.3rem;
        }
      }
    }
  }
}

@media (max-width: 800px) {
  #features {
    .features__content {
      flex-flow: row wrap;
      .features__feature {
        flex: 1 1 22rem;
        @media (max-width: 360px) {
          padding: 2rem 4rem;
        }
      }
    }
  }
}
</style>