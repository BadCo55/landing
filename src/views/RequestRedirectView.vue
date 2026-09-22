<script setup>
import { onMounted } from 'vue'
import { INSPECTION_REQUEST_URL } from '@/utils/inspectionIntent'

onMounted(() => window.location.replace(INSPECTION_REQUEST_URL))
</script>

<template>
  <main class="campaign wrap utility-intro">
    <h1>Continue to your inspection request.</h1>
    <p>Your request form is on the Diversified Home Inspections website.</p>
    <a class="button button-primary" :href="INSPECTION_REQUEST_URL">Continue to the request form</a>
  </main>
</template>
