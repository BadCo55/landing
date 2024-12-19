<template>
    <div class="bg-slate-100 dark:bg-slate-800 px-6 py-20 md:px-12 lg:px-20 text-center">
        <div class="mb-4 font-bold text-3xl">
            <span class="text-slate-900 dark:text-slate-50">Tailored for Realtors, </span>
            <span class="text-red-600 dark:text-red-400">Trusted by Homeowners</span>
        </div>
        <div class="text-slate-700 dark:text-slate-50/70 mb-[3rem]">Streamlined inspections, detailed reports, and exceptional service–<span class="font-bold">designed to help you close deals faster.</span></div>
        <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-3.5 gap-y-6">
            <div class="w-full p-4" v-for="(item, index) in items" :key="index">
                <span
                    class="w-16 h-16 mb-6 rounded-lg flex items-center justify-center mx-auto bg-white dark:bg-slate-200 shadow-[0px_2px_6px_0px_rgba(0,0,0,0.12),0px_0px_2px_0px_rgba(0,0,0,0.06),0px_4px_10px_0px_rgba(0,0,0,0.03)]"
                    >
                    <i :class="item.icon" v-if="item.icon === 'fa-regular fa-handshake'" class="font-light text-red-500 dark:text-red-500" style="font-size: 3rem" />
                    <i :class="item.icon" v-else class="text-red-500 dark:text-red-500" style="font-size: 2rem" />
                </span>
                <div class="text-slate-700 dark:text-slate-50 text-xl mb-2 font-bold">
                    {{ item.heading }}
                </div>
                <ul class="text-slate-500 dark:text-slate-200/70 leading-normal max-w-sm mx-auto text-center">
                    {{ item.description }}
                </ul>
            </div>
        </div>

        <div class="flex flex-col lg:flex-row rounded-2xl p-6 py-10 items-center bg-gradient-to-r from-blue-500 via-blue-400 to-blue-200 my-10">
            <div class="flex-1 text-center lg:text-start">
                <p class="uppercase text-xl lg:text-2xl font-light text-blue-50">
                    Take the next step
                </p>
                <p class="text-2xl lg:text-4xl font-medium text-blue-50">
                    Support Your Clients & Strengthen Your Brand
                </p>
            </div>
            <div class="flex gap-5 text-end mt-10 lg:mt-0">
                <Button label="Get Started" severity="warn" class="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 shadow-md" @click="trackButtonClick('get_started', 'cta', 'realtor_landing', '#form-cta')" />
                <a href="tel:+19542529980">
                    <Button severity="warn">
                        <div class="flex flex-col">
                            <p>Call Now:</p>
                            <p>(954) 252-9980</p>
                        </div>
                    </Button>
                </a>
            </div>
        </div>
    </div>
</template>
<script setup>
import { Button } from 'primevue';
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

const items = [
    {
        heading: 'Streamline Closings',
        description: 'Delivered within 24 hours. Actionable insights help you maintain momentum without alarming clients. We help you keep the deal moving.',
        icon: 'pi pi-clock'
    },
    {
        heading: 'Tailored For Realtors',
        description: 'Non-alarming, easy-to-understand reports designed to manage expectations and make negotiations more efficient for your clients.',
        icon: 'fa-regular fa-handshake fa-lg'
    },
    {
        heading: 'Save Time & Effort',
        description: 'Short-notice inspections? No problem. Our flexible scheduling ensures you can meet tight deadlines without delays.',
        icon: 'pi pi-calendar-clock'
    },
    {
        heading: 'Trusted Expertise',
        description: 'With over 47,000 inspections performed and a licensed General Contractor leading, we deliver the expertise realtors trust to get the job done right.',
        icon: 'pi pi-shield'
    },
    {
        heading: 'Clear & Comprehensive Reporting',
        description: 'Detailed, yet simple reports with photos and estimates make it easy for clients and realtors to understand every finding.',
        icon: 'pi pi-chart-bar'
    },
    {
        heading: 'Strengthen Client Relationships',
        description: 'Partner with an inspection company that enhances your reputation and contributes to a smooth home-buying experience.',
        icon: 'pi pi-heart'
    },
]




</script>
