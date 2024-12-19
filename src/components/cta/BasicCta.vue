<template>
  <div
      class="bg-red-900 p-20 flex justify-center md:justify-end bg-no-repeat bg-cover md:bg-contain bg-[url('/src/assets/img/cta-fade.png')]"
  >
      <div class="px-8">
          <div class="text-white font-bold text-6xl">Are you ready to</div>
          <div class="text-slate-900 font-bold text-6xl">experience dependable service?</div>
          <div class="mt-4 mb-8 text-gray-200 font-medium leading-normal">Ensure every deal closes smoothly with solutions-first comprehensive inspection reports.</div>
          <Button @click="trackButtonClick('get_started', 'cta', 'realtor_landing', '#form-cta')">
              <span class="font-bold">Get Started</span>
          </Button>
      </div>
  </div>
</template>
<script setup>
import Button from 'primevue/button';
// import { useRouter } from 'vue-router';
import { useAppStore } from '@/stores/appStore';

const appStore = useAppStore();

function scrollTo(refName) {
    appStore.scrollToSection(refName);
}

const trackButtonClick = (action, label, page, scrollTarget) => {
    console.log('Button click event triggered');
    if (window.gtag) {
        window.gtag('event', `${action}_click`, {
            event_category: 'Button Click',
            event_label: label,
            page_location: window.location.href,
            page: page,
        });
        if (window.fbq) {
            window.fbq('trackCustom', `${action}_click`, {
                button_label: label,
                page_name: page,
                url: window.location.href,
            })
        }
    } else {
        console.warn('Google Analytics gtag not initialized');
    }
    scrollTo(scrollTarget);
}

// const router = useRouter();
// const navigateToRoute = () => {
//   router.push('/get-quote');
// }
</script>
