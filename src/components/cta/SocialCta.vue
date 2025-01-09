<template>
  <div
    class="bg-red-900 p-5 lg:p-20 flex flex-col md:flex-row justify-center md:justify-between bg-no-repeat bg-cover md:bg-contain bg-[url('/src/assets/img/cta-fade-2.png')]"
    style="background-position: right center;"
  >
    <!-- Content Section -->
    <div class="px-0 lg:px-8 md:w-1/2 text-center lg:text-start">
      <div class="text-white font-bold text-5xl md:text-6xl">
        Let's Stay Connected!
      </div>
      <div class="mt-4 mb-8 text-gray-200 font-medium leading-normal">
        Follow us on social media for the latest property insights, tips, and updates. Stay informed and inspired!
      </div>

      <!-- Social Media Icons -->
      <div class="flex space-x-6 mt-6 justify-center lg:justify-start">
        <a href="https://www.facebook.com/diversifiedhomeinspecions/" target="_blank" aria-label="Facebook">
          <i class="pi pi-facebook text-white hover:text-blue-500" style="font-size: 3rem"></i>
        </a>
        <a href="https://www.instagram.com/diversified_home_inspections/" target="_blank" aria-label="Instagram">
          <i class="pi pi-instagram text-white hover:text-pink-500" style="font-size: 3rem"></i>
        </a>
        <a href="https://www.linkedin.com/company/diversified-home-inspections/" target="_blank" aria-label="LinkedIn">
          <i class="pi pi-linkedin text-white hover:text-blue-300" style="font-size: 3rem"></i>
        </a>
        <a href="https://x.com/divhomeinsp" target="_blank" aria-label="Twitter">
          <i class="pi pi-twitter text-white hover:text-blue-400" style="font-size: 3rem"></i>
        </a>
        <a href="https://www.google.com/search?q=Diversified+Home+Inspections+Southwest+Ranches+FL&oq=Diversified+Home+Inspections+Southwest+Ranches+FL" target="_blank" aria-label="Twitter">
          <i class="pi pi-google text-white hover:text-blue-400" style="font-size: 3rem"></i>
        </a>
      </div>

      <!-- Newsletter Signup -->
      <div class="mb-8 mt-5 text-center lg:text-start">
        <input
          type="email"
          placeholder="Enter your email"
          class="px-4 py-2 rounded-l-md rounded-r-none text-black focus:outline-none w-7/12 bg-slate-50"
        />
        <button class="bg-red-500 hover:bg-red-600 text-white px-2 py-2 rounded-r-md font-bold">
          Subscribe
        </button>
      </div>

      <div class="flex gap-5">
        <Button label="Get Started" class="w-full lg:w-auto dark:!text-white"></Button>
        <Button class="w-full lg:w-auto dark:!text-white">
          <div class="flex flex-col">
            <p>Call Now:</p>
            <p>(954) 252-9980</p>
          </div>
        </Button>

      </div>
    </div>

    <!-- Spacer for the Image -->
    <div class="hidden md:block md:w-1/2"></div>
  </div>
</template>

<script setup>
import Button from 'primevue/button';
</script>
