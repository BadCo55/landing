<template>
    <div class="bg-slate-100 dark:bg-slate-900 px-3 py-12 md:px-12">
        <div class="text-center">
          <h1 class="text-2xl text-slate-900 dark:text-slate-200 font-bold mb-2">Frequently Asked Questions</h1>
          <p class="text-slate-700 dark:text-slate-200/70 leading-normal">Get the answers to your most common questions about our services, process, and reports. We're here to make your inspection experience seamless and stress-free.</p>
        </div>
        <div class="mt-12 mx-0 lg:mx-10 bg-slate-50 dark:bg-slate-800 rounded-lg p-5">
            <template v-for="(item, index) of faqs" :key="index">
                <div class="flex items-start gap-4 md:flex-row flex-col">
                    <div class="flex-1 text-slate-900 dark:text-slate-100/80 font-medium text-lg leading-normal">
                        {{ item.title }}
                    </div>
                    <div class="flex-1 text-slate-800/70 dark:text-slate-100/80 font-medium leading-normal">
                        {{ item.description }}
                    </div>
                </div>
                <hr v-if="index < faqs.length - 1" class="my-6 mx-0 border-t border-0 border-slate" />
            </template>
        </div>
    </div>
  </template>
  <script setup>
  import { ref } from 'vue';
  
  const faqs = ref([
    {
        title: 'How quickly can you schedule an inspection?',
        description: 'We can typically schedule inspections within 24-48 hours, depending on availability. Rush services are available for urgent requests.'
    },
    {
        title: 'How long does an inspection take?',
        description: 'The time depends on the property\'s size and condition. On average, inspections take 2-4 hours. Larger or more complex properties may require more time. Budget approximately 1 hour per 1,000 square feet.'
    },
    {
        title: 'Can clients attend the inspection?',
        description: 'Absolutely! We encourage clients to attend so they can learn about the property and ask questions in real time.'
    },
    {
        title: 'How soon after the inspection with a receive the report?',
        description: 'Inspection reports are delivered within 24 hours. For very large properties or those in very poor condition, delivery may take up to 48 hours. Friday & weekend inspections are delivered on Monday.'
    },
    {
        title: "What qualifications do your inspectors have?",
        description: 'All of our inspectors are licensed and experienced with specialized training. We are also owned and operated by a licensed General Contractor which provides added expertise.'
    },
    {
        title: "Do you offer re-inspections?",
        description: 'Yes, we offer re-inspections to verify that repairs or corrections have been completed satisfactorily, whether for insurance reports, repair verification, or general peace of mind.'
    },
    {
        title: "What areas do you serve?",
        description: 'We serve Miami-Dade, Broward, and Palm Beach Counties. We can also accommodate requests beyond these areas on a case-by-case basis.'
    },
    {
        title: "How do you handle issues that arise during the inspection?",
        description: 'Our approach is solutions-based. We clearly identify issues and provide actionable recommendations without unnecessarily alarming your clients. Our goal is to guide the decision-making process without jeopardizing the deal.'
    },
    {
        title: "What makes your inspection company different from others?",
        description: 'We combine deep construction expertise, family-owned values, tailored and thorough reports, with consistent quality across all of our inspectors and services. We also provide ongoing support post-inspection and are committed to constant improvement.'
    },
    {
        title: "What is the cost of your inspection service?",
        description: 'Our pricing is competitive and depends on the type of inspection and property size. For a detailed quote, please contact us directly.'
    },
    {
        title: "Do you offer any guarantees or warranties?",
        description: 'While we do not offer specific warranties, our detailed reports are designed to minimize surprises for buyers. We\'re always available to address follow-up questions or concerns.'
    },
    {
        title: "How do you handle scheduling and payments?",
        description: 'Scheduling is easy via phone or online. We accept credit cards, cash, check, money orders, and online payments through secure platforms.'
    },
    {
        title: "Can you perform inspections on weekends or after hours?",
        description: 'Yes, we offer Saturday inspections and accommodate after-hours requests by special arrangement.'
    },
    {
        title: "Do you perform repairs as well?",
        description: 'No, to maintain objectivity, we do not perform repairs. However, we provide a list of trusted contractors upon request.'
    },
  ]);
  </script>
  