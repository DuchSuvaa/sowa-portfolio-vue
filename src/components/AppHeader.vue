<template>
  <div id="header__wrapper" @click.stop>
    <header>
      <div id="header__logo">
        <RouterLink to="/" v-if="route.path !== '/'">
          <img src="/sowa-logo-3.png">
        </RouterLink>
        <a href="#hero" v-else>
          <img src="/sowa-logo-3.png">
        </a>
      </div>
      <nav :class="{ 'header__menu-active': store.navActive  }" @click="store.navActive = false">
        <a href="/#about">{{ t( 'nav.about' )}}</a>
        <a href="/#features">{{ t( 'nav.services' )}}</a>
        <a href="/#portfolio">{{ t( 'nav.portfolio' )}}</a>
        <a href="/#contact">{{ t( 'nav.contact' )}}</a>
      </nav>
      <div id="header__language" @click="store.langMenuActive = !store.langMenuActive" :data-locale="locale">
        <img :src="images[locale]" />
          <div class="language-options-wrapper" :class="{active: store.langMenuActive}">
            <div class="language-options">
              <div v-for="language in Object.keys(images)" :key="language" @click.stop="change(language)" :class="{ hidden: locale === language }">
                <img :src="images[language]" /> 
              </div>
            </div>           
          </div>
      </div>
      <div class="header__menu-icon" @click="store.navActive = !store.navActive">
        <svg width="32" height="32" viewBox="0 0 512 512">
          <path fill="#888888" d="M32 96v64h448V96H32zm0 128v64h448v-64H32zm0 128v64h448v-64H32z"/>
        </svg>
      </div>
    </header>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from '../pinia/store'
import pl from '../assets/lang-pl.svg'
import en from '../assets/lang-en.png'
import cz from '../assets/lang-cz.svg'
import ru from '../assets/lang-ru.svg'
import { useRoute } from 'vue-router'

const { t, locale } = useI18n()
const images = ref({ pl, en, cz, ru })
const store = useStore()
const route = useRoute()

const change = language => {
  store.langMenuActive = false
  locale.value = language
}

document.querySelector('body').addEventListener('click', () => {
  store.langMenuActive = false
  store.navActive = false
})

</script>

<style lang="scss" scoped>
header {
  a, #header__language {
    font-size: 2rem;
    color: $black;
    font-weight: bold;
  }
  #header__logo {
    height: 5rem;
    width: 5rem;
    a {
      display: block;
      height: 100%;
      width: 100%;
    }
    img {
      display: block;
      height: 100%;
      width: 100%;
      object-fit: contain;
    }
  }
  nav {
    background-color: white;
    a {
      &:not(:last-child) {
        margin-right: 3rem;
      }
      &:hover {
        color: $blue;
      }
    }
  }
  #header__language {
    color: $black;
    position: relative;
    padding: 0 1rem;
    user-select: none;
    cursor: pointer;
    &:before {
      content: attr(data-locale);
      text-transform: uppercase;
      @include flex-center;
      flex-direction: row;
      width: 2rem;
      height: 2rem;
      position: relative;
      top: 1rem;
      right: -4rem;
      margin-right: 3.5rem;
    }
    img {
      display: block;
      width: 2.5rem;
      margin-top: -0.4rem;
      margin-bottom: -0.4rem;
      position: relative;
      top: -1rem;
    }
    .language-options-wrapper {
      position: absolute;
      top: 4rem;
      left: 0;
      height: 0;
      overflow: hidden;
      transition: height 0.5s ease;
      border: 1px solid transparent;
      border-radius: 6px;
      .language-options {
        background-color: white;
        padding: 1rem;
        box-sizing: border-box;
        div {
          img {
          margin: 0;
          margin-top: 1rem;
        }
        }
      }
    }
    .active {
      height: 11.5rem;
      transition: height 0.5s ease;
    }
    .hidden {
      display: none;
    }
  }
  .header__menu-icon {
    cursor: pointer;
    svg {
      display: block;
    }
  }
}
</style>

