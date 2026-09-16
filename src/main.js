import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import { definePreset } from '@primevue/themes'
import App from './App.vue'
import router from './router'
import { useAppStore } from './stores/appStore'
import { captureAttribution, isProductionHost } from './utils/campaign'
import './assets/styles/tailwind.css'
import './assets/styles/main.css'
import './assets/styles/campaign.css'
import './assets/styles/campaign-modern.css'

const app = createApp(App)
app.use(createPinia())
app.use(createHead())
app.use(PrimeVue, {
  theme: {
    preset: definePreset(Aura, {
      semantic: {
        primary: {
          50: '#fdf1f0',
          100: '#f9d9d5',
          200: '#f0b3ad',
          300: '#e7867c',
          400: '#d95a4d',
          500: '#c92828',
          600: '#b02121',
          700: '#8f1e1e',
          800: '#741c1c',
          900: '#601c1c',
          950: '#350b0b',
        },
      },
    }),
    options: { darkModeSelector: '.dhi-dark' },
  },
})
router.beforeEach((to) => {
  let storage
  try {
    storage = window.sessionStorage
  } catch {
    /* Attribution remains available for this view. */
  }
  const params = captureAttribution(
    to.fullPath.split('?')[1]?.split('#')[0] || '',
    storage,
    useAppStore().utmParams,
  )
  useAppStore().setUTMParams(params)
})
router.afterEach((to, from, failure) => {
  if (failure) return
  document.title = to.meta.title || 'South Florida Home Inspections | Diversified'
  if (!isProductionHost(window.location.hostname) || (to.path === from.path && from.matched.length))
    return
  try {
    window.fbq?.('track', 'PageView')
  } catch {
    /* Measurement must never interrupt the page. */
  }
})
app.use(router)
app.mount('#app')
