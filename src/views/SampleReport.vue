<template>
    <div class="flex flex-col min-h-screen overflow-x-hidden">
        <div class="p-5 lg:p-10">
            <p class="text-center font-medium text-2xl mb-5 bg-slate-100 dark:bg-slate-800 rounded-xl p-2">The First 3 Pages: <span class="font-extralight">Basics</span></p>
    
            <div class="flex flex-col-reverse lg:flex-col xl:flex-row gap-5 lg:gap-10 mb-10">
                <!-- First two pages side-by-side -->
                <div class="flex-1 justify-center gap-5 mx-auto">
                    <div class="flex gap-5">
                        <div>
                            <p class="text-center font-medium text-2xl mb-3 bg-slate-100 dark:bg-slate-800 rounded-lg">Title</p>
                            <img src="/img/report/asset1.svg" alt="Page 01" class="w-full rounded-lg shadow-lg bg-white border" />
                        </div>
                        <div>
                            <p class="text-center font-medium text-2xl mb-3 bg-slate-100 dark:bg-slate-800 rounded-lg">Letter</p>
                            <img src="/img/report/asset2.svg" alt="Page 02" class="w-full rounded-lg shadow-lg bg-white border" />
                        </div>
                        <div>
                            <p class="text-center font-medium text-2xl mb-3 bg-slate-100 dark:bg-slate-800 rounded-lg">Checklist</p>
                            <img src="/img/report/asset3.svg" alt="Page 02" class="w-full rounded-lg shadow-lg bg-white border" />
                        </div>
                    </div>
                </div>
                <!-- Remaining content -->
                <div class="flex-1 rounded-xl mb-auto">
                    <div class="flex flex-col ">
                        <h5 class="text-3xl font-light dark:text-slate-100 dark:bg-slate-700 bg-slate-100 text-slate-700 rounded-xl p-2 px-4 mb-3">The Basics</h5>
                        <div class="px-4 leading-relaxed">
                            <p class="text-lg font-light dark:text-slate-400 mb-2">The first 3 pages are the title page, a letter to our client, and a checklist of all inspected areas.</p>
                            <Divider />
                            <p class="text-lg font-light dark:text-slate-400 mb-1 mt-10 lg:mt-0">You'll find basic information here like:</p>
                            <ul class="list-disc ms-10 font-light dark:text-gray-400 text-lg">
                                <li>Inspection #</li>
                                <li>Property Address</li>
                                <li>Date</li>
                                <li>Inspection Fee</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <p class="text-center font-medium text-2xl mb-5 bg-slate-100 dark:bg-slate-800 rounded-xl p-2">The Next 10-15 Pages: <span class="font-extralight">What Matters Most</span></p>
            <div class="flex flex-col xl:flex-row gap-5 lg:gap-10 mb-10">
                <!-- Remaining content -->
                <div class="flex-1  rounded-xl mb-auto">
                    <div class="flex flex-col">
                        <h5 class="text-3xl font-light dark:text-slate-100 dark:bg-slate-700 bg-slate-100 text-slate-700 rounded-xl p-2 px-4 mb-3">The Good Stuff</h5>
                        <div class="lg:px-4 leading-relaxed">
                            <p class="text-lg font-light dark:text-slate-400 mb-2">The next 10-15 pages (depending on property conditions), are where you'll find the main content for your report. <span class="font-medium dark:text-slate-300">This is where decisions are made.</span></p>
                            <div class="flex items-center gap-5 flex-col lg:flex-row justify-between">
                                <p class="font-medium dark:text-red-400 text-blue-500">Feel free to scroll through the report pages so you can get a feel for how everything is laid out.</p>
                                <div class="w-full lg:hidden">
                                    <Button label="Bring me there!" severity="primary" class="my-5 w-full lg:w-1/3" @click="scrollTo('#reportGallery')" />
                                </div>
                            </div>
                            <Divider />
                            <h5 class="text-3xl font-medium text-red-500 dark:text-slate-200 dark:font-semibold mb-3 mt-10 lg:mt-0 text-center lg:text-start lg:ps-3">What am I looking at?</h5>
    
                            <Message severity="info" class="mb-5">
                                <span class="font-bold">Tip: </span>
                                <span class="font-light">Don't forget to expand the other topics below to see all of our report's benefits!</span>
                            </Message>
                            
                            <Accordion value="0">
                                <AccordionPanel value="0">
                                    <AccordionHeader>
                                        <div class="flex items-center gap-3">
                                            <!-- Circle Container -->
                                            <div 
                                                class="flex items-center justify-center bg-slate-700 dark:bg-slate-400 text-slate-300 dark:text-slate-700 rounded-full" 
                                                style="width: 3rem; height: 3rem; flex-shrink: 0;"
                                            >
                                                <i class="fa fa-th-list" style="font-size: 1.5rem;"></i>
                                            </div>
                                            <!-- Text -->
                                            <p class="text-2xl leading-tight">
                                                Clear Organization & Easy Reference
                                            </p>
                                        </div>
                                    </AccordionHeader>
                                    <AccordionContent>
                                        <div class="flex flex-col gap-5 text-lg">
                                            <p>Our reports are designed with a <span class="text-blue-600 dark:text-blue-400 font-light">clear and easy-to-follow layout</span>.</p>
                                            <p>Each section is dedicated to a specific area of the property, such as the electrical system, plumbing, HVAC system, and more.</p>
                                            <p>Quickly locate the information you need without having to wade through tons of technical jargon.</p>
                                            <Message severity="warn">
                                                <span class="font-bold">Pro Tip: </span>
                                                <span class="font-light">Use this to your advantage. Share your report with contractors for easy post-inspection repairs.</span>
                                            </Message>
                                        </div>
                                    </AccordionContent>
                                </AccordionPanel>
                                <AccordionPanel value="1">
                                    <AccordionHeader>
                                        <div class="flex items-center gap-3">
                                            <!-- Circle Container -->
                                            <div 
                                                class="flex items-center justify-center bg-slate-700 dark:bg-slate-400 text-slate-300 dark:text-slate-700 rounded-full" 
                                                style="width: 3rem; height: 3rem; flex-shrink: 0;"
                                            >
                                                <i class="pi pi-camera" style="font-size: 1.5rem;"></i>
                                            </div>
                                            <!-- Text -->
                                            <p class="text-2xl leading-tight">
                                                Itemized Deficiencies with Photos and Estimates
                                            </p>
                                        </div>
                                    </AccordionHeader>
                                    <AccordionContent>
                                        <div class="flex flex-col gap-3 text-lg">
                                            <p>Each identified deficiency in our report is <span class="text-blue-600 dark:text-blue-400 font-light">carefully itemized</span>  to bring you clear understanding.</p>
                                            <p>We include <span class="text-blue-600 dark:text-blue-400 font-light">high-quality photos</span> and <span class="text-blue-600 dark:text-blue-400 font-light">written estimates</span> for all necessary repairs, enabling you to make informed decisions and prioritize repairs.</p>
                                            <Message severity="warn">
                                                <span class="font-bold">Did You Know? </span>
                                                <span class="font-light">We're owned and operated by a licensed General Contractor. Our estimates are carefully monitored and constantly updated so we keep up with current industry standards.</span>
                                            </Message>
                                        </div>
                                    </AccordionContent>
                                </AccordionPanel>
                                <AccordionPanel value="2">
                                    <AccordionHeader>
                                        <div class="flex items-center gap-3">
                                            <!-- Circle Container -->
                                            <div 
                                                class="flex items-center justify-center bg-slate-700 dark:bg-slate-400 text-slate-300 dark:text-slate-700 rounded-full" 
                                                style="width: 3rem; height: 3rem; flex-shrink: 0;"
                                            >
                                                <i class="pi pi-chart-bar" style="font-size: 1.5rem;"></i>
                                            </div>
                                            <!-- Text -->
                                            <p class="text-2xl leading-tight">
                                                Area Specific Totals for Easy Negotiation
                                            </p>
                                        </div>
                                    </AccordionHeader>
                                    <AccordionContent>
                                        <div class="flex flex-col gap-3 text-lg">
                                            <p>Our reports <span class="text-blue-600 dark:text-blue-400 font-light">break down the total cost of deficiencies</span> for each inspected area.</p>
                                            <p>Clear & concise summaries help you address specific concerns with contractors, sellers, or buyers: <span class="text-blue-600 dark:text-blue-400 font-light">making negotiations more effective.</span></p>
                                            <Message severity="warn">
                                                <span class="font-bold">Don't Forget: </span>
                                                <span class="font-light">It's best practice to obtain at least 3 written estimates for major repairs before moving forward.</span>
                                            </Message>
                                        </div>
                                    </AccordionContent>
                                </AccordionPanel>
                                <AccordionPanel value="3">
                                    <AccordionHeader>
                                        <div class="flex items-center gap-3">
                                            <!-- Circle Container -->
                                            <div 
                                                class="flex items-center justify-center bg-slate-700 dark:bg-slate-400 text-slate-300 dark:text-slate-700 rounded-full" 
                                                style="width: 3rem; height: 3rem; flex-shrink: 0;"
                                            >
                                                <i class="pi pi-exclamation-circle" style="font-size: 1.5rem;"></i>
                                            </div>
                                            <!-- Text -->
                                            <p class="text-2xl leading-tight">
                                                Clearly Identifiable 4-Point Deficiencies
                                            </p>
                                        </div>
                                    </AccordionHeader>
                                    <AccordionContent>
                                        <div class="flex flex-col gap-3 text-lg">
                                            <p>Our reports <span class="text-blue-600 dark:text-blue-400 font-light">highlight 4-point related deficiencies</span> making issues that are critical to insurance requirements easily identifiable.</p>
                                            <p>Easily address key concerns and <span class="text-blue-600 dark:text-blue-400 font-light">ensure smooth insurance approvals.</span></p>
                                            <Message severity="warn">
                                                <span class="font-bold">Warning! </span>
                                                <span class="font-light">You should never send your main inspection report to an insurance carrier. Don't ask, don't tell.</span>
                                            </Message>
                                        </div>
                                    </AccordionContent>
                                </AccordionPanel>
                                <AccordionPanel value="4">
                                    <AccordionHeader>
                                        <div class="flex items-center gap-3">
                                            <!-- Circle Container -->
                                            <div 
                                                class="flex items-center justify-center bg-slate-700 dark:bg-slate-400 text-slate-300 dark:text-slate-700 rounded-full" 
                                                style="width: 3rem; height: 3rem; flex-shrink: 0;"
                                            >
                                                <i class="fa fa-file-invoice-dollar" style="font-size: 1.5rem;"></i>
                                            </div>
                                            <!-- Text -->
                                            <p class="text-2xl leading-tight">
                                                Comprehensive Repair Estimates & Final Total
                                            </p>
                                        </div>
                                    </AccordionHeader>
                                    <AccordionContent>
                                        <div class="flex flex-col gap-3 text-lg">
                                            <p>Our reports include a <span class="text-blue-600 dark:text-blue-400 font-light">dedicated page summarizing repair estimates,</span> broken down by each inspected area and totaled for <span class="text-blue-600 dark:text-blue-400 font-light">complete transparency</span>.</p>
                                            <p>You get a <span class="text-blue-600 dark:text-blue-400 font-light">clear overview </span> of the financial impact of all deficiencies.</p>
                                            <p><span class="text-blue-600 dark:text-blue-400 font-light">We help make it easier to</span> plan, budget and <span class="text-blue-600 dark:text-blue-400 font-light">negotiate effectively</span>.</p>
                                        </div>
                                    </AccordionContent>
                                </AccordionPanel>
                            </Accordion>
                            
                        </div>
                    </div>
                </div>
                <!-- Images Container -->
                <div class="flex-1 justify-center mx-auto w-full bg-gray-200 dark:bg-slate-800 rounded-xl p-5" id="reportGallery">
                    <p class="text-center font-medium text-2xl mb-5 bg-slate-100 dark:bg-slate-700 rounded-xl p-2">General Conditions Report</p>
    
                    <!-- PrimeVue Carousel for mobile devices -->
                    <div class="w-full xl:w-3/4 2xl:w-1/2 overflow-hidden justify-center mx-auto">
                        <Galleria
                            :value="galleryData"
                            :circular="true"
                            :numVisible="5"
                            v-model:activeIndex="activeIndex"
                        >
                            <template #item="slotProps">
                                <div class="flex flex-col w-full dark:text-slate-800">
                                    <div class="m-2 p-2 rounded-lg bg-gray-100">
                                        <p class="text-xl font-medium">{{ slotProps.item.caption }}</p>
    
                                        <p class="text-lg font-light">{{ slotProps.item.note }}</p>
                                    </div>
                                    <img :src="slotProps.item.image" alt="" class="rounded-t-lg bg-white ">
                                </div>
                            </template>
                            <template #thumbnail="slotProps">
                                <img :src="slotProps.item.image" width="80%" class="bg-white space-y-5 rounded-xs" alt="">
                            </template>
                        </Galleria>
                    </div>
                    <Message class="mt-5">
                        <span class="font-bold">TIP: </span>
                        <span class="font-light">Click the arrows above to scroll through the report</span>
                    </Message>
                </div>
            </div>
        </div>
        <BasicCta class="mb-5" />
        <div class="p-5 lg:p-10">
            <p class="text-center font-medium text-2xl mb-5 bg-slate-100 dark:bg-slate-800 rounded-xl p-2">Then: <span class="font-extralight">Deficiency Photos</span></p>
            <div class="flex flex-col-reverse lg:flex-col xl:flex-row gap-5 lg:gap-10 mb-10">
                <!-- Images Container -->
                <div class="flex-1 justify-center mx-auto w-full bg-gray-200 dark:bg-slate-800 rounded-xl p-5">
                    <p class="text-center font-medium text-2xl mb-5 bg-slate-100 dark:bg-slate-700 rounded-xl p-2">Deficiency Photo Report</p>
    
                    <!-- PrimeVue Carousel for mobile devices -->
                    <div class="w-full xl:w-3/4 2xl:w-1/2 overflow-hidden justify-center mx-auto">
                        <Galleria
                            :value="imagePagePaths"
                            :circular="true"
                            :numVisible="3"
                        >
                            <template #item="slotProps">
                                <img :src="slotProps.item" alt="" class="border rounded-t-lg bg-white ">
                            </template>
                            <template #thumbnail="slotProps">
                                <img :src="slotProps.item" width="80%" class="bg-white space-y-5 rounded-xs" alt="">
                            </template>
                        </Galleria>
                    </div>
                </div>
                <!-- Remaining content -->
                <div class="flex-1 rounded-xl mb-auto">
                    <div class="flex flex-col">
                        <h5 class="text-3xl font-light dark:text-slate-100 dark:bg-slate-700 bg-slate-100 text-slate-700 rounded-xl p-2 px-4 mb-3">See it Yourself</h5>
                        <div class="lg:px-4 leading-relaxed">
                            <p class="text-lg font-light dark:text-slate-400 mb-2">Our inspections include a <span class="text-blue-600 dark:text-blue-400 font-light">complete high-quality photo report</span> referencing each and every functional deficiency and note.</p>
                            <p class="text-lg font-light dark:text-slate-400 mb-2">Photos are listed in order of deficiency, so first page deficiencies are first on the photo report.</p>
                            <p class="text-lg font-light dark:text-slate-400 mb-2">We place our photos <span class="text-blue-600 dark:text-blue-400 font-light">at the bottom of our report for easy reference of all the vital information first</span>, without having to flip through pages and pages of photos.</p>
                        </div>
                    </div>
                </div>
            </div>
    
            <p class="text-center font-medium text-2xl bg-slate-100 dark:bg-slate-800 rounded-xl p-2 mb-5">Finally: <span class="font-extralight">Vendor Reports</span></p>
            <div class="flex flex-col-reverse lg:flex-col xl:flex-row gap-5 lg:gap-10 mb-10">
                <!-- Remaining content -->
                <div class="flex-1 rounded-xl mb-auto">
                    <div class="flex flex-col">
                        <h5 class="text-3xl font-light dark:text-slate-100 dark:bg-slate-700 bg-slate-100 text-slate-700 rounded-xl p-2 px-4 mb-3">Major Components By Licensed Professionals</h5>
                        <div class="lg:px-4 leading-relaxed">
                            <p class="text-lg font-light dark:text-slate-400 mb-2">We send additional inspectors licensed in their field for most major components of the home.</p>
                            <p class="text-lg font-light dark:text-slate-400 mb-2">These commonly include: <span class="text-blue-600 dark:text-blue-400 font-light">Roof, Termite, Seawall, Environmental, and more</span>.</p>
                            <p class="text-lg font-light dark:text-slate-400 mb-2">By doing this, we ensure that you have <span class="text-blue-600 dark:text-blue-400 font-light">accurate repair or replacement estimates</span> by given individuals who actually work in that field.</p>
                            <Message severity="warn">
                                <span class="font-bold">Pro Tip: </span>
                                <span class="font-light">Make sure you always get at least 3 written estimates for any major repairs so you can get the best quote with the most qualified</span>
                            </Message>
                        </div>
                    </div>
                </div>
                <!-- Images Container -->
                <div class="flex-1">
                    <Message class="mb-5">
                        <span class="font-bold">Tip: </span>
                        <span class="font-light">Expand the items below to see a sample!</span>
                    </Message>
                    <Accordion>
                        <AccordionPanel value="0">
                            <AccordionHeader>
                                <div class="flex items-center gap-3">
                                    <!-- Circle Container -->
                                    <div 
                                        class="flex items-center justify-center bg-slate-700 dark:bg-slate-400 text-slate-300 dark:text-slate-700 rounded-full" 
                                        style="width: 3rem; height: 3rem; flex-shrink: 0;"
                                    >
                                        <i class="fas fa-house-damage" style="font-size: 1.5rem;"></i>
                                    </div>
                                    <!-- Text -->
                                    <p class="text-2xl leading-tight">
                                        Detailed Roof Report
                                    </p>
                                </div>
                            </AccordionHeader>
                            <AccordionContent>
                                <!-- PrimeVue Carousel for mobile devices -->
                                <div class="w-full xl:w-3/4 2xl:w-1/2 overflow-hidden justify-center mx-auto">
                                    <Galleria
                                        :value="sampleRoofPaths"
                                        :circular="true"
                                        :numVisible="3"
                                    >
                                        <template #item="slotProps">
                                            <img :src="slotProps.item" alt="" class="border rounded-t-lg bg-white ">
                                        </template>
                                        <template #thumbnail="slotProps">
                                            <img :src="slotProps.item" width="80%" class="bg-white space-y-5 rounded-xs" alt="">
                                        </template>
                                    </Galleria>
                                </div>
                            </AccordionContent>
                        </AccordionPanel>
                        <AccordionPanel value="1">
                            <AccordionHeader>
                                <div class="flex items-center gap-3">
                                    <!-- Circle Container -->
                                    <div 
                                        class="flex items-center justify-center bg-slate-700 dark:bg-slate-400 text-slate-300 dark:text-slate-700 rounded-full" 
                                        style="width: 3rem; height: 3rem; flex-shrink: 0;"
                                    >
                                        <i class="fas fa-bug" style="font-size: 1.5rem;"></i>
                                    </div>
                                    <!-- Text -->
                                    <p class="text-2xl leading-tight">
                                        Detailed Termite Report
                                    </p>
                                </div>
                            </AccordionHeader>
                            <AccordionContent>
                                <div class="w-full xl:w-3/4 2xl:w-1/2 overflow-hidden justify-center mx-auto">
                                    <Galleria
                                        :value="sampleTermitePaths"
                                        :circular="true"
                                        :numVisible="3"
                                    >
                                        <template #item="slotProps">
                                            <img :src="slotProps.item" alt="" class="border rounded-t-lg bg-white ">
                                        </template>
                                        <template #thumbnail="slotProps">
                                            <img :src="slotProps.item" width="80%" class="bg-white space-y-5 rounded-xs" alt="">
                                        </template>
                                    </Galleria>
                                </div>
                            </AccordionContent>
                        </AccordionPanel>
                    </Accordion>
                </div>
            </div>
        </div>
        <FormCta id="form-cta" />
    </div>
</template>

<script setup>
import { Galleria, Divider, Accordion, AccordionContent, AccordionPanel, AccordionHeader, Message, Button } from 'primevue';
import { useHead } from '@vueuse/head';
import { getUTMParams } from '@/utils/utm';
import { useAppStore } from '@/stores/appStore';
import BasicCta from '@/components/cta/BasicCta.vue';
import FormCta from '@/components/cta/FormCta.vue';
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';

const appStore = useAppStore();
const route = useRoute();
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

useHead({
    title: 'Sample Report - Diversified Home Inspections, Inc.',
    meta: [
        { name: 'description', content: 'View a live demo of our sample report.' },
    ]
})

// Track the active index
const activeIndex = ref(0);

// Watch for changes in the active index
watch(activeIndex, (newValue, oldValue) => {
    scrollTo('#reportGallery');
});

const imagePaths = [
    "/img/report/asset4.svg",
    "/img/report/asset5.svg",
    "/img/report/asset6.svg",
    "/img/report/asset7.svg",
    "/img/report/asset8.svg",
    "/img/report/asset9.svg",
    "/img/report/asset10.svg",
    "/img/report/asset11.svg",
    "/img/report/asset12.svg",
    "/img/report/asset13.svg",
];

const imagePagePaths = [
    "/img/report/report-images-01.png",
    "/img/report/report-images-02.png",
    "/img/report/report-images-03.png",
    "/img/report/report-images-04.png",
    "/img/report/report-images-05.png",
    "/img/report/report-images-06.png",
    "/img/report/report-images-07.png",
    "/img/report/report-images-08.png",
    "/img/report/report-images-09.png",
    "/img/report/report-images-10.png",
    "/img/report/report-images-11.png",
];

const sampleRoofPaths = [
    "/img/report/roof/sample_roof_1.png",
    "/img/report/roof/sample_roof_2.png",
    "/img/report/roof/sample_roof_3.png",
    "/img/report/roof/sample_roof_4.png",
    "/img/report/roof/sample_roof_5.png",
    "/img/report/roof/sample_roof_6.png",
    "/img/report/roof/sample_roof_7.png",
    "/img/report/roof/sample_roof_8.png",
    "/img/report/roof/sample_roof_9.png",
    "/img/report/roof/sample_roof_10.png",
    "/img/report/roof/sample_roof_11.png",
    "/img/report/roof/sample_roof_12.png",
];

const sampleTermitePaths = [
    "/img/report/termite/sample_termite_1.png",
    "/img/report/termite/sample_termite_2.png",
];




const captions = [
  "Page 4 - Grounds & Sprinklers",
  "Page 5 - General Roof & Attic",
  "Page 6 - Electrical",
  "Page 7 - HVAC, Heat & Fireplace",
  "Page 8 - Plumbing",
  "Page 9 - Plumbing (continued)",
  "Page 10 - Appliances",
  "Page 11 - Structural",
  "Page 12 - Structural (continued)",
  "Page 13 - Estimate Totals",
];

const notes = [
    'Notice how each page is dedicated to a specific inspected area.',
    'Every inspected area includes a general data and conditions section and a deficiencies section.',
    'See how all 4-Point related deficiencies are identified with an asterisk (*)',
    'Information is easily identifiable at a glance, without unnecessary fluff',
    'Depending on property conditions, the inspected area may extend beyond 1 page',
    'Each inspected area includes it\'s own estimate total for all related deficiencies',
    'All appliances are run through a full cycle and inspected for general condition',
    'Notes & recommendations are included for items the inspector would like to bring your attention to, but aren\'t necessarily deficient.',
    '',
    'Every report includes a final estimates on repairs page. This totals each individual inspected area, and then adds them all up at the bottom.',
]

function scrollTo(refName) {
    appStore.scrollToSection(refName);
}

const galleryData = imagePaths.map((image, index) => ({
  image,
  caption: captions[index],
  note: notes[index],
}));

</script>