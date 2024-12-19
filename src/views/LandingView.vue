<template>
    <component :is="currentView" />
</template>

<script setup>
import RealtorView from './RealtorView.vue';
import InvestorView from './InvestorView.vue';
import { getUTMParams } from '@/utils/utm';
import { onMounted, onUnmounted } from 'vue';
import { useAppStore } from '@/stores/appStore';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
// import NotFound from './NotFound.vue';

const appStore = useAppStore();
const route = useRoute();

const currentView = computed(() => {
  switch (route.params.audience) {
    case 'realtor':
      return RealtorView;
    case 'investor':
      return InvestorView;
    default:
      return RealtorView;
  }
});

let exitIntentTriggered = false;
let inactivityTimer;
const utmSent = sessionStorage.getItem('utm_event_sent'); // Check sessionStorage

const sendUTMEvent = (utmParams) => {
    if (!utmSent) { // Only send UTM event if not already sent
        if (window.gtag) {
            window.gtag('event', 'utm_tracking', {
                utm_source: utmParams.utm_source,
                utm_medium: utmParams.utm_medium,
                utm_campaign: utmParams.utm_campaign,
                utm_term: utmParams.utm_term,
                utm_content: utmParams.utm_content,
            });
        }
        sessionStorage.setItem('utm_event_sent', 'true'); // Mark as sent
    }
};

const trackExitIntent = (reason) => {
  if (!exitIntentTriggered) {
    exitIntentTriggered = true;

    // Google Analytics
    if (window.gtag) {
      window.gtag('event', 'exit_intent', {
        event_category: 'User Behavior',
        event_label: reason,
        page_location: window.location.href,
      });
    }
    // Facebook Pixel
    if (window.fbq) {
      window.fbq('trackCustom', 'exit_intent', {
        reason,
        page_location: window.location.href,
      });
    }
  }
};

const handleBeforeUnload = (event) => {
  if (!exitIntentTriggered) {
    event.preventDefault();
    event.returnValue = '';
    trackExitIntent('beforeunload');
  }
};

const handleMouseLeave = (event) => {
  if (event.clientY <= 0) {
    trackExitIntent('mouseleave');
  }
};


const handleBackButton = () => {
  trackExitIntent('back_button');
};

const resetInactivityTimer = () => {
  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(() => {
    if (window.gtag) {
      window.gtag('event', 'user_inactive', {
        event_category: 'User Behavior',
        event_label: 'User inactive for 30 seconds',
        page_location: window.location.href,
      });
    }
    if (window.fbq) {
      window.fbq('trackCustom', 'user_inactive', {
        reason: 'User inactive for 30 seconds',
        page_location: window.location.href,
      });
    }
  }, 30000); // 30 seconds of inactivity
};

onMounted(() => {
  const utmParams = getUTMParams(window.location.search);
  appStore.setUTMParams(utmParams);
  sendUTMEvent(utmParams);

  // PageView for Facebook Pixel
  if (window.fbq) {
    window.fbq('track', 'PageView', {
      page_name: route.params.audience || 'home',
    });
  }

  // Attach event listeners
  window.addEventListener('beforeunload', handleBeforeUnload);
  document.addEventListener('mouseleave', handleMouseLeave);
  document.addEventListener('touchstart', resetInactivityTimer);
  document.addEventListener('scroll', resetInactivityTimer);
  window.addEventListener('popstate', handleBackButton);
});

onUnmounted(() => {
  window.removeEventListener('beforeunload', handleBeforeUnload);
  document.removeEventListener('mouseleave', handleMouseLeave);
  document.removeEventListener('touchstart', resetInactivityTimer);
  document.removeEventListener('scroll', resetInactivityTimer);
  window.removeEventListener('popstate', handleBackButton);
});

</script>
