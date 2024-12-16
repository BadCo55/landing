<template>
    <RealtorView />
</template>

<script setup>
import RealtorView from './RealtorView.vue';
import { getUTMParams } from '@/utils/utm';
import { onMounted } from 'vue';
import { useAppStore } from '@/stores/appStore';

const appStore = useAppStore();

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

onMounted(() => {
    const utmParams = getUTMParams(window.location.search);
    appStore.setUTMParams(utmParams);
    sendUTMEvent(utmParams);
    console.log(utmParams);
});

</script>
