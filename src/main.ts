import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import './scss/style.scss'
import App from './App.vue'
import { auth } from './firebase/config'
import { onAuthStateChanged } from 'firebase/auth'
import { createI18n, useI18n } from 'vue-i18n'
import pl from './locales/pl.json'
import en from './locales/en.json'
import cz from './locales/cz.json'
import ru from './locales/ru.json'
import { createHead } from '@vueuse/head'

const i18n = createI18n({
  legacy: false,
  messages: { pl, en, cz, ru },
  locale: 'pl',
  fallbackLocale: 'pl',
  localeDir: 'locales',
  globalInjection: true,
  warnHtmlMessage: false
})

let app: any
const head = createHead()
const pinia = createPinia()

onAuthStateChanged(auth, () => {
  if (!app) {
    app = createApp(App)
      .use(head)
      .use(pinia)
      .use(i18n)
      .use(router)
      .mount('#app')
  }
})
