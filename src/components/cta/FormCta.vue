<template>
  <div
    class="bg-red-900 relative p-5 md:p-20 flex flex-col-reverse md:flex-row justify-center items-center bg-cover bg-no-repeat bg-[url('@/assets/img/downtown-miami.jpg')]"
    style="background-position: center; background-size: cover;"
  >
    <!-- Red Overlay -->
    <div class="absolute inset-0 bg-red-900 opacity-80"></div>

    <!-- Content Section: Why Choose Us -->
    <div class="relative z-10 text-white w-full md:w-1/2 md:pr-10 text-left mb-10 md:mb-0 mt-10">
      <img :src="appStore.logoDark" alt="" class="mx-auto lg:mx-0 w-[20rem] mb-10 bg-slate-900/40 p-3 rounded-xl">

      <h2 class="text-3xl md:text-5xl font-bold mb-6">Why Choose Us?</h2>
      <ul class="space-y-4 text-lg mb-8">
        <li>
          <i class="pi pi-check-circle text-green-500 mr-2"></i>
          Non-Alarming, Solutions-First Approach
        </li>
        <li>
          <i class="pi pi-check-circle text-green-500 mr-2"></i>
          Licensed General Contractor Expertise
        </li>
        <li>
          <i class="pi pi-check-circle text-green-500 mr-2"></i>
          Quick Turnaround Times for Smooth Transactions
        </li>
        <li>
          <i class="pi pi-check-circle text-green-500 mr-2"></i>
          Comprehensive, Clear Reports with Cost Estimates
        </li>
        <li>
          <i class="pi pi-check-circle text-green-500 mr-2"></i>
          Consistent, Reliable, and Professional Service
        </li>
      </ul>

      <!-- Contact Details -->
      <div class="text-lg space-y-2 mt-10">
        <div class="flex items-center">
          <i class="pi pi-phone text-green-500 mr-3"></i>
          <a href="tel:+19542529980" class="hover:text-blue-500 hover:underline">(954) 252-9980</a>
        </div>
        <div class="flex items-center">
          <i class="pi pi-envelope text-green-500 mr-3"></i>
          <a
            href="mailto:office@diversifiedhomeinspections.com"
            class="hover:text-blue-500 hover:underline break-all text-base"
          >
            office@diversifiedhomeinspections.com
          </a>
        </div>
        <div class="flex items-center">
          <i class="pi pi-map-marker text-green-500 mr-3"></i>
          <span>16201 S.W. 49th Street, Southwest Ranches, FL 33331</span>
        </div>
      </div>
    </div>

    <!-- Form Section -->
    <div class="relative z-10 bg-white rounded-lg shadow-lg p-6 md:p-10 w-full md:w-1/2">
      <div class="flex flex-col lg:flex-row items-center gap-5 mb-5">
        <h3 class="text-2xl font-bold text-red-600">Contact Us Today</h3>
        <Button label="OR, Click Here to Get a FREE Quote!" class="!text-white !font-bold !text-xl" raised  severity="success" @click="requestQuoteClick('request_quote_click', 'cta', 'form_cta')" />
      </div>
      <form class="space-y-6" @submit.prevent="submitForm">
        <!-- Name Field -->
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">Your Name</label>
          <input
            v-model="formData.name"
            @focus="trackFormStart"
            type="text"
            id="name"
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-slate-50 text-slate-800"
            placeholder="Enter your name"
          />
        </div>

        <div class="flex flex-col md:flex-row gap-6">
          <!-- Email Field -->
          <div class="flex-1">
            <label for="email" class="block text-sm font-medium text-gray-700 flex-wrap">Email Address</label>
            <input
              v-model="formData.email"
              @focus="trackFormStart"
              type="email"
              id="email"
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-slate-50 text-slate-800"
              placeholder="Enter your email"
            />
          </div>
          <!-- Phone Field -->
          <div class="flex-1">
            <label for="phone" class="block text-sm font-medium text-gray-700">Phone #</label>
            <input
              v-model="formData.phone"
              @focus="trackFormStart"
              type="tel"
              id="phone"
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-slate-50 text-slate-800"
              placeholder="Enter your phone #"
            />
          </div>
        </div>

        <!-- Message Field -->
        <div>
          <label for="message" class="block text-sm font-medium text-gray-700">Message</label>
          <textarea
            v-model="formData.message"
            @focus="trackFormStart"
            id="message"
            rows="4"
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-slate-50 text-slate-800"
            placeholder="Enter your message"
          ></textarea>
        </div>

        <!-- Submit Button -->
        <Button
          type="submit"
          class="w-full !text-white"
        >
          Send Message
        </Button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useAppStore } from '@/stores/appStore';
import { reactive } from 'vue';
import { Button } from 'primevue';
import { useRouter } from 'vue-router';

const appStore = useAppStore();
const router = useRouter();
const formData = reactive({
  name: '',
  email: '',
  phone: '',
  message: '',
  date: '',
  utm_parameters: ''
});

let formStarted = false; // Prevent multiple triggers of form_start

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

const trackFormStart = () => {
  if (!formStarted) {
    formStarted = true; // Set the flag to prevent duplicate tracking
    
    // Send events
    if (window.gtag) {
      window.gtag('event', 'form_start', {
        event_category: 'Form Interaction',
        event_label: 'User started filling out the form',
        form_name: 'Form CTA',
        page_location: window.location.href,
      });
    }
    if (window.fbq) {
      window.fbq('trackCustom', 'form_start', {
        form_name: 'contact_form',
        page_location: window.location.href,
      });
    }
  }
};

const submitForm = async () => {

  formData.date = new Date().toISOString(); // Add a date in ISO format
  formData.utm_parameters =  JSON.stringify(appStore.utmParams); // Include UTM params as a string

  try {
    const response = await fetch('https://hooks.zapier.com/hooks/catch/5555872/2sxd8wt/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      if (window.gtag) {
          window.gtag('event', 'form_submit', {
              event_category: 'Engagement',
              form_name: 'Contact Form',
              page_location: window.location.href, // Include the current page URL
              utm_source: appStore.utm_source || 'N/A',
              utm_medium: appStore.utm_medium || 'N/A',
              utm_campaign: appStore.utm_campaign || 'N/A',
              utm_term: appStore.utm_term || 'N/A',
              utm_content: appStore.utm_medium || 'N/A',
          });
      }

      window.location.href = 'https://diversifiedhomeinspections.com/thank-you-contact-us/'
    }

  } catch (error) {
    console.error('Error submitting form:', error);

  }
};
</script>
