<script setup>
import SiteHeader from '@/components/campaign/SiteHeader.vue'
import SiteFooter from '@/components/campaign/SiteFooter.vue'
import RequestQuoteView from './RequestQuoteView.vue'
import Icon from '@/components/campaign/Icon.vue'
import 'primeicons/primeicons.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@/assets/styles/quote-flow.css'
</script>
<template>
  <div class="campaign campaign--quote">
    <SiteHeader />
    <main id="main-content">
      <div class="wrap quote-intro">
        <RouterLink class="text-link" to="/"
          ><Icon name="arrow" class="back-arrow" /> Back to overview</RouterLink
        >
        <div class="quote-intro-row">
          <div>
            <p class="eyebrow">LET’S GET THE DETAILS RIGHT</p>
            <h1>Build your inspection quote.</h1>
          </div>
          <p>
            A closer look starts here. Tell us about your property and choose the inspections you
            need.
          </p>
        </div>
      </div>
      <div class="quote-flow"><RequestQuoteView /></div>
    </main>
    <SiteFooter />
  </div>
</template>
