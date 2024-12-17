<template>
    <component :is="currentView" />
</template>

<script setup>
import RealtorView from './RealtorView.vue';
import InvestorView from './InvestorView.vue';
import { getUTMParams } from '@/utils/utm';
import { onMounted } from 'vue';
import { useAppStore } from '@/stores/appStore';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import NotFound from './NotFound.vue';

const appStore = useAppStore();
const route = useRoute();

const sendUTMEvent = (utmParams) => {
    if (window.gtag) {
        window.gtag('event', 'utm_tracking', {
            utm_source: utmParams.utm_source,
            utm_medium: utmParams.utm_medium,
            utm_campaign: utmParams.utm_campaign,
            utm_term: utmParams.utm_term,
            utm_content: utmParams.utm_content,
        });
    }
};

const currentView = computed(() => {
  const audience = route.params.audience;

  switch (audience) {
    case 'realtor':
      return RealtorView;
    case 'investor':
      return InvestorView;
    case 'homeowner':
      return HomeownerView;
    default:
      // Optional: Handle 404 or fallback view
      return RealtorView;
  }
});

onMounted(() => {
    const utmParams = getUTMParams(window.location.search);
    appStore.setUTMParams(utmParams);
    sendUTMEvent(utmParams);
});

</script>
