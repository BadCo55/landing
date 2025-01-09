<template>
  <div
      class="bg-red-900 p-20 flex justify-center md:justify-end bg-no-repeat bg-cover md:bg-contain bg-[url('/src/assets/img/cta-fade.png')]"
  >
      <div class="px-8 text-center lg:text-start">
          <div class="text-white font-bold text-6xl">Are you ready to</div>
          <div class="text-slate-900 font-bold text-6xl">experience dependable service?</div>
          <div class="mt-4 mb-8 text-gray-200 font-medium leading-normal">{{ tagline }}</div>
          <div class="flex flex-col lg:flex-row gap-5">
                <Button @click="trackButtonClick('get_started', 'cta', 'realtor_landing', '#form-cta')" label="Get Started" class="w-full lg:w-auto dark:!text-white" />
                <a href="tel:+19542529980" class="w-full lg:w-auto">
                    <Button class="w-full lg:w-auto dark:!text-white">
                        <div class="flex flex-col">
                            <p>Call Now:</p>
                            <p>(954) 252-9980</p>
                        </div>
                    </Button>
                </a>
                <Button @click="requestQuoteClick('request_quote_click', 'cta', 'basic_cta')" severity="success" label="Get Your FREE Quote!" class="dark:!text-white font-bold !text-xl" raised />
          </div>
      </div>
  </div>
</template>
<script setup>
import Button from 'primevue/button';
import { useRoute, useRouter } from 'vue-router';
import { useAppStore } from '@/stores/appStore';
import { computed } from 'vue';

const appStore = useAppStore();
const route = useRoute();
const router = useRouter();
function scrollTo(refName) {
    appStore.scrollToSection(refName);
}

const requestQuoteClick = (action, label, page) => {
    if (window.gtag) {
        window.gtag('event', action, {
            category: 'Button Click',
            label: label,
            page_location: window.location.href,
            page: page,
        });
    }
    if (window.fbq) {
        window.fbq('trackCustom', `${action}_click`, {
            button_label: label,
            page_name: page,
            url: window.location.href,
        })
    }
    router.push('/request-quote');
}

const trackButtonClick = (action, label, page, scrollTarget) => {
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

const tagline = computed(() => {
    const routeTaglines = {
        '/realtor': 'Ensure every deal closes smoothly with solutions-first comprehensive inspection reports.',
        '/investor': 'Maximize your ROI with detailed and trustworthy property evaluations.',
        '/homebuyer': 'Purchase your dream home with confidence and peace of mind.',
    };
    return routeTaglines[route.path] || '';
});

// const router = useRouter();
// const navigateToRoute = () => {
//   router.push('/get-quote');
// }
</script>
