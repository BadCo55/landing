<template>
    <div class="bg-white dark:bg-slate-900 px-6 py-20 md:px-12 lg:px-20 text-center">
      <div class="mb-24 font-bold text-3xl">
          <span class="text-slate-900 dark:text-slate-200">What Clients Are Saying About Us</span>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10">
        <Card v-for="(testimonial, index) in testimonials" :key="index" class="bg-slate-200">
          <template #content>
              <div class="flex gap-10 py-5 ps-5">
                
                <div class="w-full text-start">
                  <div>
                    <div class="flex items-center gap-5 mb-5 justify-between">
                      <img src="/src/assets/quotes2.png" class="w-8">
                      <Rating v-model="stars" disabled class="me-5" />
                    </div>
                    <div class="dark:text-slate-300">
                      {{ testimonial.text }}
                    </div>
                  </div>
                  <div class="mt-5">
                    <p class="text-lg font-bold dark:text-slate-400">
                      {{ testimonial.name }}
                    </p>
                    <p class="text-medium font-light dark:text-slate-300">
                      {{ testimonial.title }}
                    </p>
                  </div>
                </div>
              </div>
          </template>
        </Card>
      </div>
    </div>
  </template>
  
  <script setup>
  import { Card, Rating } from 'primevue';
  import { ref } from 'vue';
  
  const stars = ref(5);
  const testimonials = ref([
      {
          text: 'I have been using Diversified for the last 12 years and they are the most thorough and professional inspection company I’ve come across. Honest and informative for my clients and never cut corners. As a broker in Miami where it’s rehab central and you always have to be concerned with quality of work, it helps that my buyers feel safe knowing everything has been inspected fully. I would highly recommend them.',
          name: 'Alive Sherman',
          title: 'One Sotheby\'s International Realty',
      },
      {
          text: 'I want to express my sincere gratitude to Natalie and Rick for their exceptional service. Their responsiveness and communication exceeded my expectations. I was particularly impressed with how quickly they expedited my request and their overall professionalism. Rick is truly knowledgeable and demonstrates honesty, integrity, and accountability. Working with them has been a pleasure. Thank you both for your outstanding support!',
          name: 'Justin Lafond',
          title: 'Homeowner',
      },
      {
          text: 'Diversified home inspections was a very thorough inspection company. They went over every single nook and cranny in the house. Christopher was the name of my inspector, and he was very professional, funny, polite, friendly, and he did a phenomenal job. I would totally recommend this company if you need any type of inspections.',
          name: 'Bridget Madero',
          title: 'Homeowner',
      },
      {
          text: 'Chris with Diversified Home Inspection consistently provides exceptional service for my clients. His reports are thorough and easily understandable. I trust Chris to deliver accurate, reliable reports, giving both buyers and sellers\' confidence in the transaction. I highly recommend Diversified Home Inspection.',
          name: 'Debbie DeVito Flynn',
          title: 'One Sotheby\'s International Realty',
      },
      {
          text: 'I cannot recommend Diversified Home Inspections enough! From the moment I called, the customer service was excellent. Natali helped us schedule an inspection quickly and efficiently, and her team was dispatched to our home the very same day! Additionally, the inspectors were polite, conscientious, and kept us very well-informed. Alfredo even pointed out something that would be a potential problem for us and informed us how to quickly (and inexpensively!) fix it. Finally, their online payment process was super easy and secure. I will absolutely be using this team in the future and have told all of my friends about them. Thank you Diversified!',
          name: 'Bridget Farrell',
          title: 'Homeowner',
      },
      {
          text: 'Diversified Home Inspections is a family-run business that I have leaned on for rock-solid inspection services since 2001. Thorough, Honest, Reliable and Consistent. Add them to your preferred vendor list today.',
          name: 'Erik Cavanaugh',
          title: 'Re/Max',
      },
  
  ]);
  
  </script>
  