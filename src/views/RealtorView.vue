<template>
    <HeroSection />
    <BenefitsSectionOne id="benefits-1" />
    <SocialProof />
    <ServicesSection />
    <CallToAction />
    <ExploreReportSection />
    <SocialCta />
    <FaqSection />
    <BenefitsSectionTwo />
    <FormCta id="form-cta" />
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
</script>
