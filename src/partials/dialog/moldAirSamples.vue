<template>
  <div class="service-detail">
    <div>
      <p class="mb-5">
        Mold air sampling is an essential service designed to assess the indoor air quality of your
        property and detect the presence of mold spores that could pose health risks.
      </p>
      <p>
        This inspection involves taking air samples from key areas of your home to identify hidden
        mold growth, even in spaces not easily visible.
      </p>
      <p class="mt-5">
        Our licensed inspectors collect samples using industry-standard equipment to ensure accurate
        and reliable results.
      </p>
      <p class="mt-5">
        These samples are sent to a certified laboratory for analysis, providing a detailed report
        on the type and concentration of mold spores present.
      </p>
    </div>
    <Card class="service-detail-card">
      <template #content>
        <h3 class="service-detail-heading">Why Choose Mold Air Sampling?</h3>
        <ul class="service-detail-list">
          <li>
            <div class="flex items-start">
              <i class="pi pi-check" aria-hidden="true"></i>
              <p>
                <span
                  >Detect hidden mold growth behind walls, in HVAC systems, or other concealed
                  areas.</span
                >
              </p>
            </div>
          </li>
          <li>
            <div class="flex items-start">
              <i class="pi pi-check" aria-hidden="true"></i>
              <p>
                <span
                  >Evaluate the air quality in your home for potential allergens or irritants.</span
                >
              </p>
            </div>
          </li>
          <li>
            <div class="flex items-start">
              <i class="pi pi-check" aria-hidden="true"></i>
              <p>
                <span
                  >Protect your family’s health by identifying potential mold-related issues
                  early.</span
                >
              </p>
            </div>
          </li>
        </ul>
      </template>
    </Card>
    <div class="my-5">
      <p>
        Whether you're experiencing musty odors, visible signs of mold, or health symptoms that
        could be linked to poor air quality, our mold air sampling service provides peace of mind
        and actionable insights for maintaining a healthy living environment.
      </p>
    </div>
  </div>
</template>

<script setup>
import { Card } from 'primevue'
</script>
