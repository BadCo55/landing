<template>
  <div class="service-detail">
    <div>
      <p>
        Our Extra Structure Inspection provides a thorough evaluation of additional structures on
        your property, ensuring they are safe, functional, and compliant with building standards.
      </p>
      <p class="mt-3">
        Whether it's a detached garage, guest house, storage shed, or other standalone structure,
        our team assesses its overall condition and identifies any potential concerns.
      </p>
    </div>
    <Card class="service-detail-card">
      <template #content>
        <h3 class="service-detail-heading">Why Include Extra Structure Inspections?</h3>
        <ul class="service-detail-list">
          <li>
            <div class="flex items-start">
              <i class="pi pi-check" aria-hidden="true"></i>
              <p>
                <span>Ensure the safety and usability of all property assets.</span>
              </p>
            </div>
          </li>
          <li>
            <div class="flex items-start">
              <i class="pi pi-check" aria-hidden="true"></i>
              <p>
                <span>Identify potential issues that could affect the value of your property.</span>
              </p>
            </div>
          </li>
          <li>
            <div class="flex items-start">
              <i class="pi pi-check" aria-hidden="true"></i>
              <p>
                <span>Plan maintenance or upgrades with confidence.</span>
              </p>
            </div>
          </li>
        </ul>
      </template>
    </Card>
    <div class="my-5">
      <p>
        Whether the structure is for storage, living, or recreational use, our detailed inspection
        provides peace of mind and a clear understanding of its condition.
      </p>
    </div>
  </div>
</template>

<script setup>
import { Card } from 'primevue'
</script>
