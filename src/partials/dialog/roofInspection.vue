<template>
  <div class="service-detail">
    <div>
      <p>
        Our roof inspection provides a detailed evaluation of the roof’s condition, performed by a
        licensed roofing contractor.
      </p>
      <p class="pt-3">We thoroughly assess all conditions, including:</p>
    </div>
    <Card class="service-detail-card">
      <template #content>
        <ul class="service-detail-list service-detail-list--grid">
          <li>
            <div class="flex items-start">
              <i class="pi pi-check" aria-hidden="true"></i>
              <p>
                <span class="font-bold"> Covering </span>
              </p>
            </div>
          </li>
          <li>
            <div class="flex items-start">
              <i class="pi pi-check" aria-hidden="true"></i>
              <p>
                <span class="font-bold"> Flashing </span>
              </p>
            </div>
          </li>
          <li>
            <div class="flex items-start">
              <i class="pi pi-check" aria-hidden="true"></i>
              <p>
                <span class="font-bold"> Vents </span>
              </p>
            </div>
          </li>
          <li>
            <div class="flex items-start">
              <i class="pi pi-check" aria-hidden="true"></i>
              <p>
                <span class="font-bold"> Fascia </span>
              </p>
            </div>
          </li>
          <li>
            <div class="flex items-start">
              <i class="pi pi-check" aria-hidden="true"></i>
              <p>
                <span class="font-bold"> Soffits </span>
              </p>
            </div>
          </li>
          <li>
            <div class="flex items-start">
              <i class="pi pi-check" aria-hidden="true"></i>
              <p>
                <span class="font-bold"> Damage </span>
              </p>
            </div>
          </li>
          <li>
            <div class="flex items-start">
              <i class="pi pi-check" aria-hidden="true"></i>
              <p>
                <span class="font-bold"> Wear & Tear </span>
              </p>
            </div>
          </li>
          <li>
            <div class="flex items-start">
              <i class="pi pi-check" aria-hidden="true"></i>
              <p>
                <span class="font-bold"> Potential and/or Active Leaks </span>
              </p>
            </div>
          </li>
        </ul>
      </template>
    </Card>
    <div class="mt-5">
      <p class="mb-5">
        By relying on the expertise of a licensed roofing professional, we ensure an accurate and
        comprehensive analysis of the roof’s integrity and functionality and are able to provide you
        with accurate repair or replacement estimates.
      </p>
      <Message severity="info">
        <div class="inline-flex items-center">
          <i class="pi pi-info-circle me-2 text-blue-500"></i>
          <span>
            Our roof inspection also identifies any overhanging trees or vegetation that could cause
            damage or reduce the life expectancy of your roof structure.
          </span>
        </div>
      </Message>
    </div>
  </div>
</template>

<script setup>
import { Card, Message } from 'primevue'
</script>
