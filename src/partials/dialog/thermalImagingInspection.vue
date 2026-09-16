<template>
  <div class="service-detail">
    <div>
      <p class="mb-5">
        Thermal imaging is an advanced diagnostic tool used to identify potential issues in your
        home that may not be visible to the naked eye. By detecting temperature variations, this
        non-invasive method helps uncover hidden problems, allowing you to address them before they
        escalate.
      </p>
      <p>
        Our licensed inspectors use state-of-the-art thermal cameras to perform a detailed scan of
        your property, providing insights into areas such as:
      </p>
    </div>
    <ul class="service-detail-list service-detail-list--grid">
      <li class="mb-2">
        <div class="flex items-start">
          <i class="pi pi-check" aria-hidden="true"></i>
          <p>
            <span
              ><strong>Moisture Intrusion:</strong> Locate hidden leaks or water damage in walls,
              ceilings, or floors.</span
            >
          </p>
        </div>
      </li>
      <li class="mb-2">
        <div class="flex items-start">
          <i class="pi pi-check" aria-hidden="true"></i>
          <p>
            <span
              ><strong>Electrical Hotspots:</strong> Identify overheating circuits, wiring, or
              electrical panels.</span
            >
          </p>
        </div>
      </li>
      <li class="mb-2">
        <div class="flex items-start">
          <i class="pi pi-check" aria-hidden="true"></i>
          <p>
            <span
              ><strong>Insulation Deficiencies:</strong> Detect areas with inadequate insulation,
              leading to energy inefficiency.</span
            >
          </p>
        </div>
      </li>
      <li class="mb-2">
        <div class="flex items-start">
          <i class="pi pi-check" aria-hidden="true"></i>
          <p>
            <span
              ><strong>HVAC Performance:</strong> Assess uneven heating or cooling that may indicate
              system issues.</span
            >
          </p>
        </div>
      </li>
      <li class="mb-2">
        <div class="flex items-start">
          <i class="pi pi-check" aria-hidden="true"></i>
          <p>
            <span
              ><strong>Structural Concerns:</strong> Spot thermal anomalies that could indicate
              structural weaknesses.</span
            >
          </p>
        </div>
      </li>
    </ul>
    <Card class="service-detail-card">
      <template #content>
        <h3 class="service-detail-heading">Why Thermal Imaging?</h3>
        <ul class="service-detail-list">
          <li>
            <div class="flex items-start">
              <i class="pi pi-check" aria-hidden="true"></i>
              <p>
                <span>Detect issues early to prevent costly repairs.</span>
              </p>
            </div>
          </li>
          <li>
            <div class="flex items-start">
              <i class="pi pi-check" aria-hidden="true"></i>
              <p>
                <span>Gain a deeper understanding of your home’s condition.</span>
              </p>
            </div>
          </li>
          <li>
            <div class="flex items-start">
              <i class="pi pi-check" aria-hidden="true"></i>
              <p>
                <span>Enjoy peace of mind with a comprehensive inspection.</span>
              </p>
            </div>
          </li>
        </ul>
      </template>
    </Card>
    <div class="my-5">
      <p>
        Thermal imaging adds an invaluable layer of detail to your inspection, providing you with
        the confidence to make informed decisions about your property.
      </p>
    </div>
  </div>
</template>

<script setup>
import { Card } from 'primevue'
</script>
