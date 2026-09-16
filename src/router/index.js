import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '@/views/LandingView.vue'
import { inspectionIntents } from '@/utils/inspectionIntent'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: LandingView },
    { path: '/:audience(homebuyer|realtor|investor)', name: 'audience', component: LandingView },
    ...Object.entries(inspectionIntents).map(([inspection, service]) => ({
      path: service.path,
      name: `service-${inspection}`,
      component: () => import('@/views/ServiceLandingView.vue'),
      meta: { inspection, title: `${service.label} in South Florida | Diversified` },
    })),
    {
      path: '/request-quote',
      name: 'quote',
      component: () => import('@/views/CampaignQuoteView.vue'),
      meta: { title: 'Request Your Inspection Quote | Diversified' },
    },
    {
      path: '/sample-report',
      name: 'sampleReport',
      component: () => import('@/views/CampaignReportView.vue'),
      meta: { title: 'Explore a Sample Inspection Report | Diversified' },
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: () => import('@/views/PrivacyView.vue'),
      meta: { title: 'Privacy | Diversified Home Inspections' },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/CampaignNotFound.vue'),
      meta: { title: 'Page Not Found | Diversified' },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash)
      return {
        el: to.hash,
        top: 110,
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'instant'
          : 'smooth',
      }
    return { top: 0 }
  },
})
router.beforeEach((to) => {
  if (to.query['sample-report'] === 'true') {
    const query = { ...to.query }
    delete query['sample-report']
    return { path: '/sample-report', query }
  }
})
export default router
