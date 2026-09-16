<template>
  <div class="service-detail">
    <div>
      <p>
        Our general inspection is a comprehensive inspection of all areas of the building including:
      </p>
    </div>
    <Card class="service-detail-card">
      <template #content>
        <ul class="service-detail-list service-detail-list--grid">
          <li>
            <div class="flex items-start">
              <i class="pi pi-check" aria-hidden="true"></i>
              <span class="font-bold"> Grounds </span>
            </div>
          </li>
          <li>
            <div class="flex items-start">
              <i class="pi pi-check" aria-hidden="true"></i>
              <span class="font-bold"> Sprinklers </span>
            </div>
          </li>
          <li>
            <div class="flex items-start">
              <i class="pi pi-check" aria-hidden="true"></i>
              <span class="font-bold"> Attic </span>
            </div>
          </li>
          <li>
            <div class="flex items-start">
              <i class="pi pi-check" aria-hidden="true"></i>
              <p>
                <span class="font-bold"> Electrical System </span>
                (Interior & Exterior)
              </p>
            </div>
          </li>
          <li>
            <div class="flex items-start">
              <i class="pi pi-check" aria-hidden="true"></i>
              <span class="font-bold"> HVAC, Heat & Fireplace Systems </span>
            </div>
          </li>
          <li>
            <div class="flex items-start">
              <i class="pi pi-check" aria-hidden="true"></i>
              <span class="font-bold"> Plumbing & Gas Systems </span>
            </div>
          </li>
          <li>
            <div class="flex items-start">
              <i class="pi pi-check" aria-hidden="true"></i>
              <span class="font-bold"> Appliances </span>
            </div>
          </li>
          <li>
            <div class="flex items-start">
              <i class="pi pi-check" aria-hidden="true"></i>
              <p>
                <span class="font-bold"> Interior & Exterior Structural Systems </span>
                (gutters, siding, walls, floors, ceilings, windows & doors)
              </p>
            </div>
          </li>
        </ul>
      </template>
    </Card>
  </div>
</template>

<script setup>
import { Card } from 'primevue'
</script>
