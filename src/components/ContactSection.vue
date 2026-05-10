<template>
  <section id="contact">
    <SectionHeading :headingText="t('contact.h2')" />
    <div class="contact__options">
      <div class="contact__option">
        <div class="contact__image-container">
          <img src="../assets/envelope.svg">
        </div>
        <a href="mailto:bga.sowa@gmail.com">bga.sowa@gmail.com</a>
      </div>
      <div class="contact__option">
        <div class="contact__image-container">
          <img src="../assets/phone.svg">
        </div>
        <a href="tel:+48600892348">+48 600 892 348</a>
      </div>
      <div class="contact__option">
        <div class="contact__image-container">
          <img src="../assets/pin.svg">
        </div>
        <span>{{ t('contact.location') }}</span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import SectionHeading from './SectionHeading.vue'

const { t } = useI18n()
</script>

<style lang="scss" scoped>
#contact {
  .contact__options {
    display: flex;
    gap: 2rem;
    .contact__option {
      flex: 1;
      @include flex-center;
      flex-direction: column;
      background-color: white;
      box-shadow: $box-shadow;
      padding: 4rem;
      .contact__image-container {
        height: 80%;
        @include flex-center;
        margin-bottom: 1rem;
        img {
          transform: scale(0.7);
        }
      }
      a, span {
        font-size: 1.6rem;
      }
    }
  }
}

@media (max-width: 800px) {
  #contact {
    .contact__options {
      flex-flow: row wrap;
      .contact__option {
        flex-basis: 22rem;
        @media (max-width: 360px) {
          padding: 2rem 4rem;
        }
      }    
    }
  }
}
</style>