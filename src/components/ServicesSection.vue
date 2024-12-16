<template>
    <div class="bg-slate-100 dark:bg-slate-800 px-6 pt-20 pb-10 md:px-12 lg:px-20 text-center">
      <div class="mb-4 font-bold text-3xl">
            <span class="text-slate-900 dark:text-slate-50">Our Services</span>
            <!-- <span class="text-red-600 dark:text-red-400">Consistently</span> -->
      </div>
      <div class="text-slate-700 dark:text-slate-50/70 mb-[3rem]">
        We send <span class="font-bold text-red-500">3 licensed professionals</span> to each of our inspections, providing dedicated focus to all main areas.
      </div>
      <div class="flex justify-center mb-10">
        <Card>
          <template #content>
            <h4 class="text-lg font-bold mb-4 text-blue-600">Inspected Areas Include:</h4>
            <div class="grid grid-cols-2 gap-y-3 gap-10">
              <div class="flex items-center">
                <i class="pi pi-check-circle text-green-500 mr-3"></i> Roof
              </div>
              <div class="flex items-center">
                <i class="pi pi-check-circle text-green-500 mr-3"></i> Termite
              </div>
              <div class="flex items-center">
                <i class="pi pi-check-circle text-green-500 mr-3"></i> Grounds
              </div>
              <div class="flex items-center">
                <i class="pi pi-check-circle text-green-500 mr-3"></i> Sprinklers
              </div>
              <div class="flex items-center">
                <i class="pi pi-check-circle text-green-500 mr-3"></i> Attic
              </div>
              <div class="flex items-center">
                <i class="pi pi-check-circle text-green-500 mr-3"></i> Electrical
              </div>
              <div class="flex items-center">
                <i class="pi pi-check-circle text-green-500 mr-3"></i> A/C & Heat
              </div>
              <div class="flex items-center">
                <i class="pi pi-check-circle text-green-500 mr-3"></i> Fireplace
              </div>
              <div class="flex items-center">
                <i class="pi pi-check-circle text-green-500 mr-3"></i> Plumbing
              </div>
              <div class="flex items-center">
                <i class="pi pi-check-circle text-green-500 mr-3"></i> Appliances
              </div>
              <div class="flex items-center">
                <i class="pi pi-check-circle text-green-500 mr-3"></i> Structural
              </div>
              <div class="flex items-center">
                <i class="pi pi-check-circle text-green-500 mr-3"></i> Pool
              </div>
            </div>
          </template>
        </Card>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-2 lg:mx-20 gap-10">
        <Card v-for="(service, index) in services" :key="index">
          <template #content>
            <div class="flex items-center p-3 lg:p-6">
              <div class="flex-shrink-0 text-blue-600">
                <!-- Icon -->
                <div class="hidden lg:block">
                  <i :class="service.icon" :style="{ fontSize: getIconSize() }"></i>
                </div>
              </div>
              <div class="lg:ml-10">
                <div class="block lg:hidden">
                  <i :class="service.icon" :style="{ fontSize: getIconSize() }"></i>
                </div>
                <h3 class="text-lg font-bold text-blue-500 dark:text-blue-400 lg:text-start">{{ service.title }}</h3>
                <p class="text-slate-600 lg:text-start dark:text-slate-200">{{ service.description }}</p>
              </div>
            </div>
          </template>
        </Card>
      </div>
    </div>
  </template>
  
  <script setup>
  import { Card } from 'primevue';
  
  const services = [
    {
      title: 'Comprehensive Home Inspections',
      description: 'A detailed evaluation of all major systems and components, providing clients with actionable insights for confident decisions.',
      icon: 'pi pi-home',
    },
    {
      title: 'Listing Inspections',
      description: 'Help sellers avoid surprises by identifying potential issues upfront, ensuring smoother transactions and buyer confidence.',
      icon: 'pi pi-clipboard',
    },
    {
      title: 'Commercial Property Inspections',
      description: 'Ensure safety and compliance with a thorough inspection tailored to the unique needs of commercial properties.',
      icon: 'pi pi-briefcase',
    },
    {
      title: 'New Construction & Progressive Inspections',
      description: 'Monitor construction progress with phased inspections, catching issues early to avoid costly repairs after completion.',
      icon: 'pi pi-cog',
    },
    {
      title: 'Insurance Inspections',
      description: 'Simplify the insurance process with Wind Mitigation, 4-Point, and other specialized inspections designed to meet carrier requirements.',
      icon: 'pi pi-shield',
    },
    {
      title: 'Specialized Inspections',
      description: 'From termite and mold testing to seawall evaluations, our specialized services address unique property challenges.',
      icon: 'pi pi-search',
    },
    {
      title: 'Advanced Testing & Technology',
      description: 'Leverage cutting-edge tools like drones and thermal imaging for deeper insights into property conditions.',
      icon: 'pi pi-camera',
    },
  ];
  
  function getIconSize() {
    const width = window.innerWidth;
  
    if (width >= 1024) return '5rem'; // Large screens
    if (width >= 768) return '2.5rem'; // Medium screens
    return '2rem'; // Small screens
  }
  
  </script>
  
  <style></style>
  