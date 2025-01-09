<template>
    <div class="bg-slate-100 dark:bg-slate-800 px-6 py-20 md:px-12 lg:px-20 text-center">
        <div class="mb-4 font-bold text-3xl">
            <span class="text-slate-900 dark:text-slate-50">Tailored for Your Needs, </span>
            <span class="text-red-600 dark:text-red-400">Trusted by Everyone</span>
        </div>
        <div class="text-slate-700 dark:text-slate-50/70 mb-[3rem]">Streamlined inspections, detailed reports, and exceptional service–<span class="font-bold">{{ tagline }}</span></div>
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
                    {{ ctaText }}
                </p>
            </div>
            <div class="flex flex-col lg:flex-row gap-5 text-end mt-10 lg:mt-0">
                <Button label="Get Started" severity="warn" class="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 shadow-md" @click="trackButtonClick('get_started', 'cta', 'realtor_landing', '#form-cta')" />
                    <Button severity="warn">
                        <a href="tel:+19542529980" class="w-100">
                            <div class="flex flex-col">
                                <p>Call Now:</p>
                                <p>(954) 252-9980</p>
                            </div>
                        </a>
                    </Button>
                <Button @click="requestQuoteClick('request_quote_click', 'cta', 'benefits_1')" label="Get Your FREE Quote!" severity="success" class="!text-2xl !text-white" raised />
            </div>
        </div>
    </div>
</template>
<script setup>
import { Button } from 'primevue';
import { useAppStore } from '@/stores/appStore';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
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

const itemsConfig = {
    realtor: [
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
    ],
    investor: [
        {
            heading: 'Streamline Closings',
            description: 'Delivered within 24 hours. Actionable insights help you move forward confidently, ensuring no costly surprises slow you down.',
            icon: 'pi pi-clock'
        },
        {
            heading: 'Tailored For Investors',
            description: 'Actionable, detail-oriented reports designed to help you make informed decisions, protect your bottom line, and maximize your ROI.',
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
            heading: 'Maximize Your Investment Potential',
            description: 'Partner with an inspection company that ensures you can focus on profit and minimize risk with clear, actionable solutions.',
            icon: 'pi pi-dollar'
        },
    ],
    homebuyer: [
        {
            heading: 'Streamline Your Home Purchase',
            description: 'Delivered within 24 hours. Actionable insights help you move forward confidently, ensuring no costly surprises with your dream home.',
            icon: 'pi pi-clock'
        },
        {
            heading: 'Tailored For Homebuyers',
            description: 'Clear, easy-to-understand reports designed to help you make informed decisions, negotiate effectively, and feel confident about your purchase.',
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
            heading: 'Peace of Mind for Your Investment',
            description: 'Partner with an inspection company that ensures your home is safe and sound, minimizing risks and protecting your long-term investment.',
            icon: 'pi pi-home'
        },
    ]
}

const pathSegment = route.path.split('/')[1];
const items = itemsConfig[pathSegment] || itemsConfig['homebuyer'];

const taglineConfig = {
    realtor: 'designed to help you close deals faster.',
    investor: 'designed to maximize your ROI.',
    homebuyer: 'designed to give you peace of mind.'
}

const tagline = taglineConfig[pathSegment] || taglineConfig['homebuyer'];

const ctaTexts = {
    realtor: 'Support Your Clients & Strengthen Your Brand',
    investor: 'Protect Your Investments & Maximize Your ROI',
    homebuyer: 'Make Confident Decisions About Your Future Home',
};

const ctaText = computed(() => {
    const path = route.path.replace('/', '');
    return ctaTexts[path] || 'Discover the Diversified Difference'
})

</script>
