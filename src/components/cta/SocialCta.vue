<template>
  <div
    class="bg-red-900 p-10 lg:p-20 flex flex-col md:flex-row justify-center md:justify-between bg-no-repeat bg-cover md:bg-contain bg-[url('/src/assets/img/cta-fade-2.png')]"
    style="background-position: right center;"
  >
    <!-- Content Section -->
    <div class="lg:px-8 md:w-1/2 text-left">
      <div class="text-white font-bold text-5xl md:text-6xl">
        Let's Stay Connected!
      </div>
      <div class="mt-4 mb-8 text-gray-200 font-medium leading-normal">
        Follow us on social media for the latest property insights, tips, and updates. Stay informed and inspired!
      </div>

      <!-- Social Media Icons -->
      <div class="flex space-x-6 mt-6">
        <a href="https://www.facebook.com" target="_blank" aria-label="Facebook">
          <i class="pi pi-facebook text-4xl text-white hover:text-blue-500"></i>
        </a>
        <a href="https://www.instagram.com" target="_blank" aria-label="Instagram">
          <i class="pi pi-instagram text-4xl text-white hover:text-pink-500"></i>
        </a>
        <a href="https://www.linkedin.com" target="_blank" aria-label="LinkedIn">
          <i class="pi pi-linkedin text-4xl text-white hover:text-blue-300"></i>
        </a>
        <a href="https://www.twitter.com" target="_blank" aria-label="Twitter">
          <i class="pi pi-twitter text-4xl text-white hover:text-blue-400"></i>
        </a>
      </div>

      <!-- Newsletter Signup -->
      <div class="mb-8 mt-5">
        <input
          type="email"
          placeholder="Enter your email"
          class="px-4 py-2 rounded-l-md rounded-r-none text-black focus:outline-none w-7/12 bg-slate-50"
        />
        <button class="bg-red-500 hover:bg-red-600 text-white px-2 py-2 rounded-r-md font-bold">
          Subscribe
        </button>
      </div>


      <!-- Call-to-Action Button -->
      <button class="bg-white text-blue-900 font-medium py-3 px-8 rounded-md hover:bg-gray-200">
        Connect With Us
      </button>
    </div>

    <!-- Spacer for the Image -->
    <div class="hidden md:block md:w-1/2"></div>
  </div>
</template>

<script setup>
import Button from 'primevue/button';
</script>
