<template>
  <div class="service-detail">
    <div>
      <p class="mb-5">
        Our wind mitigation inspection focuses on evaluating the property’s key features and
        structural elements designed to withstand strong winds and reduce potential storm damage.
      </p>
      <Message severity="info">
        <div class="inline-flex items-center">
          <i class="pi pi-info-circle me-2 text-blue-500"></i>
          <span>
            This inspection helps homeowners qualify for potential
            <strong>insurance discounts</strong> by verifying wind-resistance features such as:
          </span>
        </div>
      </Message>
    </div>
    <Card class="service-detail-card">
      <template #content>
        <ul class="service-detail-list service-detail-list--grid">
          <li>
            <div class="flex items-start">
              <i class="pi pi-check" aria-hidden="true"></i>
              <p>
                <span class="font-bold"> Roof shape and construction materials </span>
              </p>
            </div>
          </li>
          <li>
            <div class="flex items-start">
              <i class="pi pi-check" aria-hidden="true"></i>
              <p>
                <span class="font-bold">
                  Roof-to-wall attachment methods, such as hurricane clips or straps
                </span>
              </p>
            </div>
          </li>
          <li>
            <div class="flex items-start">
              <i class="pi pi-check" aria-hidden="true"></i>
              <p>
                <span class="font-bold"> Roof deck attachment and underlayment </span>
              </p>
            </div>
          </li>
          <li>
            <div class="flex items-start">
              <i class="pi pi-check" aria-hidden="true"></i>
              <p>
                <span class="font-bold"> Impact-resistant windows and doors </span>
              </p>
            </div>
          </li>
          <li>
            <div class="flex items-start">
              <i class="pi pi-check" aria-hidden="true"></i>
              <p>
                <span class="font-bold"> Storm shutters and other wind-resistant openings </span>
              </p>
            </div>
          </li>
        </ul>
      </template>
    </Card>
    <div class="my-5">
      <p>
        Our comprehensive report provides documentation of these features, which can be submitted to
        your insurance provider to potentially lower premiums.
      </p>
      <p class="mt-3">
        This inspection ensures your home is better protected and compliant with current
        wind-resistance standards.
      </p>
    </div>
  </div>
</template>

<script setup>
import { Card, Message } from 'primevue'
</script>
