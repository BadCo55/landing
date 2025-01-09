<template>
    <div class="bg-slate-50 dark:bg-slate-800 px-3 py-20 md:px-12 lg:px-20">
        <div class="text-center">
          <div class="font-bold text-slate-900 dark:text-slate-50 text-4xl mb-4">More reasons why clients prefer us</div>
          <div class="text-slate-700 dark:text-slate-100/80 mb-8 leading-normal">Make your transaction easier, every step of the way.</div>
        </div>
        <div class="lg:p-4 rounded-lg bg-slate-50 dark:bg-slate-900">
            <div class="flex flex-wrap">
                <div class="w-full lg:w-6/12 lg:p-4">
                    <Accordion>
                        <AccordionPanel v-for="(item, index) in benefits" :key="index" :value="index">
                            <AccordionHeader
                              @click="trackButtonClick('accordion_1', item.title, 'realtor_landing')"
                            >
                                <div class="flex items-center">
                                    <span class="inline-flex items-center justify-center rounded-full bg-slate-50 dark:bg-slate-500 mr-2 text-slate-700 dark:text-slate-100" style="width: 2rem; height: 2rem">
                                        <i :class="item.icon" />
                                    </span>
                                    <span class="text-slate-700 dark:text-slate-200">{{ item.title }}</span>
                                </div>
                            </AccordionHeader>
                            <AccordionContent>
                                <p class="leading-normal">{{ item.description }}</p>
                            </AccordionContent>
                        </AccordionPanel>
                    </Accordion>
                </div>
                <div class="w-full lg:w-6/12 lg:p-4">
                    <Accordion>
                        <AccordionPanel v-for="(item, index) in benefits2" :key="index" :value="index">
                            <AccordionHeader
                              @click="trackButtonClick('accordion_2', item.title, 'realtor_landing')"
                            >
                                <div class="flex items-center">
                                    <span class="inline-flex items-center justify-center rounded-full bg-slate-50 dark:bg-slate-500 mr-2 text-slate-700 dark:text-slate-100" style="width: 2rem; height: 2rem">
                                        <i :class="item.icon" />
                                    </span>
                                    <span class="text-slate-700 dark:text-slate-200">{{ item.title }}</span>
                                </div>
                            </AccordionHeader>
                            <AccordionContent>
                                <p class="leading-normal">{{ item.description }}</p>
                            </AccordionContent>
                        </AccordionPanel>
                    </Accordion>
                </div>
            </div>
        </div>
    </div>
  </template>
  <script setup>
  import Accordion from 'primevue/accordion';
  import AccordionContent from 'primevue/accordioncontent';
  import AccordionHeader from 'primevue/accordionheader';
  import AccordionPanel from 'primevue/accordionpanel';
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';

  const route = useRoute();
  
  // const benefits = [
  //   {
  //     title: 'Non-Alarming, Solutions-First Approach',
  //     description: 'Our reports provide honest assessments without alarming clients unnecessarily, making it easier for realtors to manage client expectations & maintain trust.',
  //     icon: 'pi pi-lightbulb'
  //   },
  //   {
  //     title: 'Smoother Transactions',
  //     description: 'Comprehensive, clear reports help realtors address potential issues upfront, reducing surprises and delays during closing.',
  //     icon: 'pi pi-sync'
  //   },
  //   {
  //     title: 'Expertise in Construction',
  //     description: 'Led by a licensed General Contractor, our team understands structural nuances, which helps realtors navigate complex property issues confidently.',
  //     icon: 'pi pi-wrench'
  //   },
  //   {
  //     title: 'Clear Post-Inspection Explanations',
  //     description: 'Our inspectors take time to walk clients through the report, explaining findings in clear, straightforward language so clients feel informed and confident about their decisions.',
  //     icon: 'pi pi-comments'
  //   },
  //   {
  //     title: 'Consistent & Reliable Experience',
  //     description: 'Clients can expect the same high level of service, thoroughness, and professionalism on every inspection, building trust and reliability with every transaction.',
  //     icon: 'pi pi-check-circle'
  //   },
  //   {
  //     title: 'Contractor Referrals for Repairs',
  //     description: 'We offer trusted contractor referrals for any needed repairs, simplifying the process for clients and helping realtors streamline post-inspection repairs.',
  //     icon: 'pi pi-share-alt'
  //   },
  // ];
  
  // const benefits2 = [
  //   {
  //     title: 'Increased Client Satisfaction',
  //     description: 'Our thorough, easy-to-understand reports give clients peace of mind, reflecting positively on the realtor\'s referral and support.',
  //     icon: 'pi pi-star'
  //   },
  //   {
  //     title: 'Post-Inspection Support',
  //     description: 'We assist clients with follow-up questions and next steps, taking the burden off realtors to provide technical guidance on inspection findings.',
  //     icon: 'pi pi-user-plus'
  //   },
  //   {
  //     title: 'Reliable Reinspection Services',
  //     description: 'Fast, professional reinspections allow realtors to verify repairs, providing assurance to buyers and aiding in smoother final negotiations.',
  //     icon: 'pi pi-refresh'
  //   },
  //   {
  //     title: 'Faster Closing Times',
  //     description: 'Efficient scheduling and quick report turnaround allow realtors to keep transactions on track, enhancing their clients\' experience.',
  //     icon: 'pi pi-clock'
  //   },
  //   {
  //     title: 'Added Value Services',
  //     description: 'Advanced tools like thermal imaging and drone technology enhance inspection quality, helping realtors showcase comprehensive service to clients.',
  //     icon: 'pi pi-chart-line'
  //   },
  // ];
  
  // Flags to prevent duplicate tracking
  
  
// Dynamic benefits (6 items) based on route
const benefits = computed(() => {
    const routeBenefits = {
        '/realtor': [
            {
                title: 'Non-Alarming, Solutions-First Approach',
                description: 'Our reports provide honest assessments without alarming clients unnecessarily, making it easier for realtors to manage client expectations & maintain trust.',
                icon: 'pi pi-lightbulb',
            },
            {
                title: 'Smoother Transactions',
                description: 'Comprehensive, clear reports help realtors address potential issues upfront, reducing surprises and delays during closing.',
                icon: 'pi pi-sync',
            },
            {
                title: 'Expertise in Construction',
                description: 'Led by a licensed General Contractor, our team understands structural nuances, which helps realtors navigate complex property issues confidently.',
                icon: 'pi pi-wrench',
            },
            {
                title: 'Clear Post-Inspection Explanations',
                description: 'Our inspectors take time to walk clients through the report, explaining findings in clear, straightforward language so clients feel informed and confident about their decisions.',
                icon: 'pi pi-comments',
            },
            {
                title: 'Consistent & Reliable Experience',
                description: 'Clients can expect the same high level of service, thoroughness, and professionalism on every inspection, building trust and reliability with every transaction.',
                icon: 'pi pi-check-circle',
            },
            {
                title: 'Contractor Referrals for Repairs',
                description: 'We offer trusted contractor referrals for any needed repairs, simplifying the process for clients and helping realtors streamline post-inspection repairs.',
                icon: 'pi pi-share-alt',
            },
        ],
        '/investor': [
            {
                title: 'Maximize Investment Potential',
                description: 'Detailed inspections highlight risks and opportunities, empowering investors to make confident decisions.',
                icon: 'pi pi-chart-line',
            },
            {
                title: 'Fast Turnaround Times',
                description: 'Quick scheduling and reporting allow investors to act swiftly on property opportunities.',
                icon: 'pi pi-clock',
            },
            {
                title: 'Advanced Technology',
                description: 'Tools like thermal imaging and drone inspections provide investors with comprehensive insights.',
                icon: 'pi pi-camera',
            },
            {
                title: 'Comprehensive Risk Analysis',
                description: 'Thorough inspections identify potential liabilities, protecting your investment.',
                icon: 'pi pi-shield',
            },
            {
                title: 'Seamless Repairs Coordination',
                description: 'We connect investors with trusted contractors, ensuring repairs are handled efficiently.',
                icon: 'pi pi-wrench',
            },
            {
                title: 'Expert Market Insights',
                description: 'With years of experience, we provide investors with actionable insights for smarter property decisions.',
                icon: 'pi pi-compass',
            },
        ],
        '/homebuyer': [
            {
                title: 'Confidence in Your Purchase',
                description: 'Thorough inspections help buyers understand the condition of their future home, ensuring peace of mind.',
                icon: 'pi pi-home',
            },
            {
                title: 'Clear Explanations',
                description: 'Inspectors explain findings in simple terms, helping buyers make informed decisions.',
                icon: 'pi pi-comments',
            },
            {
                title: 'Support Beyond Inspection',
                description: 'Our team is available to answer questions and guide buyers even after the inspection is complete.',
                icon: 'pi pi-user-plus',
            },
            {
                title: 'Detailed Reports',
                description: 'Comprehensive reports provide a clear overview of the property\'s condition and potential repairs.',
                icon: 'pi pi-file',
            },
            {
                title: 'Access to Trusted Resources',
                description: 'We connect buyers with reliable contractors to simplify repairs and maintenance.',
                icon: 'pi pi-share-alt',
            },
            {
                title: 'Thorough Safety Checks',
                description: 'Our inspections prioritize safety, ensuring your new home is ready for you and your family.',
                icon: 'pi pi-shield',
            },
        ],
    };
    return routeBenefits[route.path] || routeBenefits['/homebuyer'];
});

// Dynamic benefits2 (5 items) based on route
const benefits2 = computed(() => {
    const routeBenefits2 = {
        '/realtor': [
            {
                title: 'Increased Client Satisfaction',
                description: 'Our thorough, easy-to-understand reports give clients peace of mind, reflecting positively on the realtor\'s referral and support.',
                icon: 'pi pi-star',
            },
            {
                title: 'Post-Inspection Support',
                description: 'We assist clients with follow-up questions and next steps, taking the burden off realtors to provide technical guidance on inspection findings.',
                icon: 'pi pi-user-plus',
            },
            {
                title: 'Reliable Reinspection Services',
                description: 'Fast, professional reinspections allow realtors to verify repairs, providing assurance to buyers and aiding in smoother final negotiations.',
                icon: 'pi pi-refresh',
            },
            {
                title: 'Faster Closing Times',
                description: 'Efficient scheduling and quick report turnaround allow realtors to keep transactions on track, enhancing their clients\' experience.',
                icon: 'pi pi-clock',
            },
            {
                title: 'Added Value Services',
                description: 'Advanced tools like thermal imaging and drone technology enhance inspection quality, helping realtors showcase comprehensive service to clients.',
                icon: 'pi pi-chart-line',
            },
        ],
        '/investor': [
            {
                title: 'Comprehensive Due Diligence',
                description: 'Our inspections provide the critical insights investors need to assess property value and risk.',
                icon: 'pi pi-briefcase',
            },
            {
                title: 'Time-Saving Services',
                description: 'Efficient processes and detailed reports save investors valuable time.',
                icon: 'pi pi-clock',
            },
            {
                title: 'Enhanced Portfolio Protection',
                description: 'Detailed inspections identify issues early, safeguarding your investments.',
                icon: 'pi pi-lock',
            },
            {
                title: 'Advanced Reporting',
                description: 'Detailed, actionable reports help investors plan for the future of their investments.',
                icon: 'pi pi-file',
            },
            {
                title: 'Cost-Saving Insights',
                description: 'Inspections identify critical issues early, reducing long-term costs for investors.',
                icon: 'pi pi-wallet',
            },
        ],
        '/homebuyer': [
            {
                title: 'Transparency in Condition',
                description: 'Detailed reports ensure buyers understand exactly what they\'re purchasing.',
                icon: 'pi pi-search',
            },
            {
                title: 'Focused on Your Needs',
                description: 'Inspections tailored to help buyers feel confident in their next big step.',
                icon: 'pi pi-heart',
            },
            {
                title: 'Access to Trusted Resources',
                description: 'We connect buyers with reliable contractors to simplify repairs and maintenance.',
                icon: 'pi pi-share-alt',
            },
            {
                title: 'Comprehensive Insights',
                description: 'Our reports cover every detail, ensuring no surprises post-purchase.',
                icon: 'pi pi-info-circle',
            },
            {
                title: 'Peace of Mind',
                description: 'Thorough inspections ensure your new home is ready for you and your family.',
                icon: 'pi pi-shield',
            },
        ],
    };
    return routeBenefits2[route.path] || routeBenefits2['/homebuyer'];
});
  
  
  const trackedEvents = new Set();

  const trackButtonClick = (action, label, page) => {
      const uniqueEventKey = `${action}_${label}`; // Unique identifier for the event

      if (!trackedEvents.has(uniqueEventKey)) {
          // Add the event to the tracked set
          trackedEvents.add(uniqueEventKey);

          // Google Analytics tracking
          if (window.gtag) {
              window.gtag('event', `${action}_click`, {
                  event_category: 'Button Click',
                  event_label: label,
                  page_location: window.location.href,
                  page: page,
              });
          }

          // Facebook Pixel tracking
          if (window.fbq) {
              window.fbq('trackCustom', `${action}_click`, {
                  button_label: label,
                  page_name: page,
                  url: window.location.href,
              });
          }
      }
  };
  
  </script>
  