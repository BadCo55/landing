import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '@/views/LandingView.vue'
import NotFound from '@/views/NotFound.vue'
import SampleReport from '@/views/SampleReport.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LandingView,
    },
    {
      path: '/:audience',
      name: 'audience',
      component: LandingView,
    },
    {
      path: '/sample-report',
      name: 'sampleReport',
      component: SampleReport,
    },
    {
      path: '/404',
      name: '404',
      component: NotFound,
    },
    {
      path: '/:pathMatch(.*)*', // Catch-all route
      name: 'NotFound',
      redirect: '/404', // Redirect to the 404 route
    },
  ],
})

export default router
