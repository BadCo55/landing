<template>
    <div class="flex lg:flex-row flex-col gap-4 bg-surface-0 dark:bg-surface-900">
        <div class="flex-1 flex items-center justify-center">
            <div class="p-6 pt-12 lg:p-12">
                <div class="flex flex-col sm:flex-row gap-10 mb-5 justify-center lg:justify-start">
                    <img :src="appStore.logoSrc" alt="" class="w-[25rem] lg:w-[30rem] shrink-0">
                    <div class="flex flex-row md:flex-col gap-5 justify-center items-center">
                        <img src="@/assets/fabi.png" alt="" class="hidden sm:block sm:w-32 sm:h-20">
                        <img src="@/assets/bbb.png" alt="" class="hidden sm:block sm:w-12 lg:mx-0">
                    </div>
                </div>
                <h1 class="text-3xl lg:text-5xl font-bold text-slate-800 dark:text-slate-50 mb-2 text-center lg:text-left">
                    {{ heroText.title }}
                </h1>
                <h1 class="text-2xl lg:text-4xl font-light text-blue-600 dark:text-slate-0 mb-4 text-center lg:text-left">
                    <span v-html="heroText.subtitle"></span>
                    <!-- Close deals faster with 
                    <span class="text-red-600 font-medium italic">detailed & actionable</span> 
                    reports -->
                </h1>
                <p class="text-slate-800 dark:text-slate-200 leading-normal mb-8 text-center lg:text-left">
                    <span class="font-bold">{{ heroText.paragraph.intro }}</span>
                    {{ heroText.paragraph.body }}
                </p>
                <div class="flex items-center justify-center lg:justify-start gap-6">
                    <Button severity="primary" label="Learn More" class="dark:!text-white" type="button" @click="trackButtonClick('learn_more', 'hero', 'realtor_landing', '#benefits-1')" />
                    <Button label="See Our Report" type="button" outlined @click="$emit('showSampleReport')" />
                </div>
            </div>
        </div>
        <div class="flex-1 overflow-hidden">
            <img :src="heroImgPath" alt="hero-1" class="h-full w-full object-cover lg:[clip-path:polygon(12%_0,100%_0%,100%_100%,0_100%)]" />
        </div>
    </div>
</template>
<script setup>
import Button from 'primevue/button';
import { useAppStore } from '@/stores/appStore';
import { useRoute, useRouter } from 'vue-router';
import { computed } from 'vue';

defineEmits(['showSampleReport']);
const appStore = useAppStore();
const route = useRoute();
const router = useRouter();

const logoSrc = new URL(`/src/assets/${appStore.logoSrc}`, import.meta.url).href;
function scrollTo(refName) {
    appStore.scrollToSection(refName);
}
const trackButtonClick = (action, label, page, scrollTarget) => {
    if (window.gtag) {
        window.gtag('event', `${action}_click`, {
            event_category: 'Button Click',
            event_label: label,
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
    scrollTo(scrollTarget);
}

const imgPaths = {
    realtor: '/img/test-img.jpg',
    investor: '/img/investor-hero.png',
    homebuyer: '/img/homebuyer-hero.jpg',
}

const heroImgPath = computed(() => {
    const path = route.path.replace('/', '');
    return imgPaths[path] || '/img/homebuyer-hero.jpg'
});

const heroTexts = {
    realtor: {
        title: 'Inspections That Realtors Trust',
        subtitle: 'Close deals faster with <span class="text-red-600 font-medium italic">detailed & accountable</span> reports',
        paragraph: {
            intro: 'Designed for Realtors:',
            body: 'actionable reports, fast turn-around time & support that helps you close deals faster while keeping your clients informed.'
        }
    },
    investor: {
        title: 'Inspections That Protect Your Profits',
        subtitle: '<span class="text-red-600 font-medium italic">Maximize ROI</span> with reliable insights and service',
        paragraph: {
            intro: 'Tailored for Investors:',
            body: 'detailed inspections, accurate repair estimates & insights to protect your bottom line and maximize ROI.'
        }
    },
    homebuyer: {
        title: 'Inspections That Bring Peace of Mind',
        subtitle: 'Confidently purchase your dream home with <span class="text-red-600 font-medium italic">actionable findings</span>',
        paragraph: {
            intro: 'Perfect for Homebuyers:',
            body: 'thorough inspections, clear communication, & peace of mind to make confident decisions on your dream home.'
        }
    },
};

const heroText = computed(() => {
    const path = route.path.replace('/', '');
    return heroTexts[path] || {
        title: 'Experience the Diversified Difference',
        subtitle: 'Thorough inspections tailored to your <span class="text-red-600 font-medium italic">unique needs</span>',
        paragraph: {
            intro: 'Solutions for everyone:',
            body: 'comprehensive inspections designed to ensure your dream home is safe and sound.'
        }
    }; // Default text
});

</script>
