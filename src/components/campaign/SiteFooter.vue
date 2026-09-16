<script setup>
import logo from '@/assets/logo-dark.svg'
import Icon from './Icon.vue'
import { trackEvent } from '@/utils/campaign'
</script>
<template>
  <footer class="site-footer">
    <div class="wrap">
      <div class="footer-top">
        <div>
          <RouterLink to="/" aria-label="Diversified Home Inspections home"
            ><img :src="logo" width="224" height="81" alt="Diversified Home Inspections"
          /></RouterLink>
          <p>Clarity for your next move.<br />Serving South Florida since 1998.</p>
        </div>
        <div>
          <p class="footer-label">LET’S TALK</p>
          <a
            class="footer-number"
            href="tel:+19542529980"
            @click="trackEvent('phone_click', { placement: 'footer' })"
            >(954) 252-9980</a
          ><a href="mailto:office@diversifiedhomeinspections.com"
            >office@diversifiedhomeinspections.com</a
          >
          <p>Monday–Friday · 9am–5pm</p>
        </div>
        <div>
          <p class="footer-label">ROOTED IN SOUTH FLORIDA</p>
          <p>16201 SW 49th Street<br />Southwest Ranches, FL 33331</p>
          <a
            class="footer-main-link"
            href="https://diversifiedhomeinspections.com/"
            target="_blank"
            rel="noopener"
            >Visit our main website <Icon name="diagonal"
          /></a>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© {{ new Date().getFullYear() }} Diversified Home Inspections, Inc.</span
        ><span>Owner: Inspector #HI857 · General Contractor #RB29003504</span
        ><RouterLink to="/privacy">Privacy</RouterLink>
      </div>
    </div>
  </footer>
</template>
