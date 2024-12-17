<template>
    <div class="flex lg:flex-row flex-col gap-4 bg-surface-0 dark:bg-surface-900">
        <div class="flex-1 flex items-center justify-center">
            <div class="p-6 pt-12 lg:p-12">
                <div class="flex gap-10 mb-5">
                    <img :src="logoSrc" alt="" class="w-[25rem]">
                    <div class="flex flex-col gap-5 justify-center">
                        <img src="@/assets/fabi.png" alt="" class="w-24 rounded-full">
                        <img src="@/assets/bbb.png" alt="" class="w-12 mx-auto">
                    </div>
                </div>
                <h1 class="text-3xl lg:text-5xl font-bold text-slate-800 dark:text-slate-50 mb-2 text-center lg:text-left">
                    Inspections That Realtors Trust.
                </h1>
                <h1 class="text-2xl lg:text-4xl font-light text-blue-600 dark:text-slate-0 mb-4 text-center lg:text-left">
                    Close deals faster with 
                    <span class="text-red-600 font-medium italic">detailed & actionable</span> 
                    reports
                </h1>
                <p class="text-slate-800 dark:text-slate-200 leading-normal mb-8 text-center lg:text-left">
                    <span class="font-bold">Designed for Realtors:</span>
                    actionable reports, fast turn-around, & support that helps you close deals faster while keeping clients informed.
                </p>
                <div class="flex items-center justify-center lg:justify-start gap-6">
                    <Button label="Learn More" type="button" @click="trackButtonClick('learn_more', 'hero', 'realtor_landing', '#benefits-1')" />
                    <!-- <Button label="Live Demo" type="button" outlined /> -->
                </div>
            </div>
        </div>
        <div class="flex-1 overflow-hidden">
            <img src="@/assets/test-img.jpg" alt="hero-1" class="h-full w-full object-cover lg:[clip-path:polygon(12%_0,100%_0%,100%_100%,0_100%)]" />
        </div>
    </div>
</template>
<script setup>
import Button from 'primevue/button';
import { useAppStore } from '@/stores/appStore';
const appStore = useAppStore();

const logoSrc = new URL(`/src/assets/${appStore.logoSrc}`, import.meta.url).href;
function scrollTo(refName) {
    appStore.scrollToSection(refName);
}
const trackButtonClick = (action, label, page, scrollTarget) => {
    if (window.gtag) {
        window.gtag('event', action, {
            event_category: 'Button Click',
            event_label: label,
            page_location: page,
        });
    }
    
    scrollTo(scrollTarget);
}
</script>
