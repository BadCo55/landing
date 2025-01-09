<template>
  <HeroSection @showSampleReport="showSampleReport" />
  <BenefitsSectionOne id="benefits-1" />
  <SocialProof />
  <ServicesSection />
  <CallToAction />
  <ExploreReportSection @showSampleReport="showSampleReport" />
  <SocialCta />
  <FaqSection />
  <BenefitsSectionTwo />
  <FormCta id="form-cta" />

  <SampleReportDialog :visible="visible" @update:visible="visible = $event" />
</template>

<script setup>
import HeroSection from '@/components/realtor/HeroSection.vue';
import BenefitsSectionOne from '@/components/realtor/BenefitsSectionOne.vue';
import SocialProof from '@/components/SocialProof.vue';
import ServicesSection from '@/components/ServicesSection.vue';
import CallToAction from '@/components/cta/BasicCta.vue';
import ExploreReportSection from '@/components/ExploreReportSection.vue';
import SocialCta from '@/components/cta/SocialCta.vue';
import FaqSection from '@/components/FaqSection.vue';
import BenefitsSectionTwo from '@/components/realtor/BenefitsSectionTwo.vue';
import FormCta from '@/components/cta/FormCta.vue';
import SampleReportDialog from '@/components/SampleReportDialog.vue';
import { ref } from 'vue';
import { useHead } from '@vueuse/head';

useHead({
    title: 'Inspections for Investors - Diversified Home Inspections, Inc.',
    meta: [
        { name: 'description', content: 'See why investors love having Diversified Home Inspections on their team.' },
    ]
})

const visible = ref(false);
const showSampleReport = () => {
  visible.value = true;
}
</script>
