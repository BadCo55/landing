<template>
    <div class="bg-slate-50 dark:bg-slate-800 px-3 py-20 md:px-12 lg:px-20">
        <div class="text-center">
          <div class="font-bold text-slate-900 dark:text-slate-50 text-4xl mb-4">More reasons why realtors prefer us</div>
          <div class="text-slate-700 dark:text-slate-100/80 mb-8 leading-normal">Egestas dui id ornare arcu odio. Egestas fringilla phasellus faucibus scelerisque eleifend.</div>
        </div>
        <div class="lg:p-4 rounded-lg bg-slate-50 dark:bg-slate-900">
            <div class="flex flex-wrap">
                <div class="w-full lg:w-6/12 lg:p-4">
                    <Accordion>
                        <AccordionPanel v-for="(item, index) in benefits" :key="index" :value="index">
                            <AccordionHeader>
                                <div class="flex items-center">
                                    <span class="inline-flex items-center justify-center rounded-full bg-slate-300 dark:bg-slate-500 mr-2 text-slate-700 dark:text-slate-100" style="width: 2rem; height: 2rem">
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
                            <AccordionHeader>
                                <div class="flex items-center">
                                    <span class="inline-flex items-center justify-center rounded-full bg-slate-300 dark:bg-slate-500 mr-2 text-slate-700 dark:text-slate-100" style="width: 2rem; height: 2rem">
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
  
  const benefits = [
    {
      title: 'Non-Alarming, Solutions-First Approach',
      description: 'Our reports provide honest assessments without alarming clients unnecessarily, making it easier for realtors to manage client expectations & maintain trust.',
      icon: 'pi pi-lightbulb'
    },
    {
      title: 'Smoother Transactions',
      description: 'Comprehensive, clear reports help realtors address potential issues upfront, reducing surprises and delays during closing.',
      icon: 'pi pi-sync'
    },
    {
      title: 'Expertise in Construction',
      description: 'Led by a licensed General Contractor, our team understands structural nuances, which helps realtors navigate complex property issues confidently.',
      icon: 'pi pi-wrench'
    },
    {
      title: 'Clear Post-Inspection Explanations',
      description: 'Our inspectors take time to walk clients through the report, explaining findings in clear, straightforward language so clients feel informed and confident about their decisions.',
      icon: 'pi pi-comments'
    },
    {
      title: 'Consistent & Reliable Experience',
      description: 'Clients can expect the same high level of service, thoroughness, and professionalism on every inspection, building trust and reliability with every transaction.',
      icon: 'pi pi-check-circle'
    },
    {
      title: 'Contractor Referrals for Repairs',
      description: 'We offer trusted contractor referrals for any needed repairs, simplifying the process for clients and helping realtors streamline post-inspection repairs.',
      icon: 'pi pi-share-alt'
    },
  ];
  
  const benefits2 = [
    {
      title: 'Increased Client Satisfaction',
      description: 'Our thorough, easy-to-understand reports give clients peace of mind, reflecting positively on the realtor\'s referral and support.',
      icon: 'pi pi-star'
    },
    {
      title: 'Post-Inspection Support',
      description: 'We assist clients with follow-up questions and next steps, taking the burden off realtors to provide technical guidance on inspection findings.',
      icon: 'pi pi-user-plus'
    },
    {
      title: 'Reliable Reinspection Services',
      description: 'Fast, professional reinspections allow realtors to verify repairs, providing assurance to buyers and aiding in smoother final negotiations.',
      icon: 'pi pi-refresh'
    },
    {
      title: 'Faster Closing Times',
      description: 'Efficient scheduling and quick report turnaround allow realtors to keep transactions on track, enhancing their clients\' experience.',
      icon: 'pi pi-clock'
    },
    {
      title: 'Added Value Services',
      description: 'Advanced tools like thermal imaging and drone technology enhance inspection quality, helping realtors showcase comprehensive service to clients.',
      icon: 'pi pi-chart-line'
    },
  ];
  
  
  </script>
  