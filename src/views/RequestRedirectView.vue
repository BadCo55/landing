<script setup>
import { useAppStore } from '@/stores/appStore'
import { computed, onMounted } from 'vue'
import { inspectionQuoteLink } from '@/utils/inspectionIntent'
const store = useAppStore()
const quoteTo = computed(() => inspectionQuoteLink(store.utmParams))

onMounted(() => window.location.replace(quoteTo.value))
</script>

<template>
  <main class="campaign wrap utility-intro">
    <h1>Continue to your inspection request.</h1>
    <p>Your request form is on the Diversified Home Inspections website.</p>
    <a class="button button-primary" :href="quoteTo">Continue to the request form</a>
  </main>
</template>
