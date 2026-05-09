<template>
  <section id="about">
    <div id="about__content">
      <div id="about__animation">
        <video poster="../assets/bs-poster.png" muted="muted" id="animation" autoplay>
          <source src="../assets/bs.mp4" type="video/mp4" id="video">
          Your browser does not support the video tag.
        </video>
      </div>
      <div id="about__text">
        <div class="stroke-magic">
          <h2> {{ t('about.h2' )}} </h2>
          <h2> {{ t('about.h2' )}} </h2>
        </div>
        <p>{{ t('about.p-1') }}</p>
        <p>{{ t('about.p-2') }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()


onMounted(() => {
  const video = document.getElementById('animation')
})

</script>

<style lang="scss" scoped>
#about {
  #about__content {
    @include flex-center;
    gap: $gap;
    @media (max-width: 600px) { 
      flex-direction: column; 
      #about__animation {
        margin-top: -1rem;
        margin-bottom: 2rem;
      }
      #about__text {
        width: 100% !important;
      }
    }
    #about__animation {
      width: 33%;
      @media (max-width: 800px) { width: 50%; }
      video {
        width: 100%;
      }
    }
    #about__text {
      width: 66%;
      p {
        text-align: center;
      }
    }
  }
}
</style>