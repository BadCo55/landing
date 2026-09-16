<script setup>
import SiteHeader from '@/components/campaign/SiteHeader.vue'
import SiteFooter from '@/components/campaign/SiteFooter.vue'
</script>
<template>
  <div class="campaign">
    <SiteHeader />
    <main id="main-content" class="wrap utility-intro not-found">
      <p class="eyebrow">PAGE NOT FOUND</p>
      <h1>Let’s get you<br />back on solid ground.</h1>
      <p>This page may have moved. Our team can still help with your inspection.</p>
      <RouterLink class="button button-primary" to="/">Back to the home page</RouterLink>
    </main>
    <SiteFooter />
  </div>
</template>
