<script setup>
import { computed } from 'vue'
import { Dialog, Button } from 'primevue'
import Icon from './Icon.vue'
import GeneralInspection from '@/partials/dialog/generalInspection.vue'
import PoolInspection from '@/partials/dialog/poolInspection.vue'
import RoofInspection from '@/partials/dialog/roofInspection.vue'
import TermiteInspection from '@/partials/dialog/termiteInspection.vue'
import WindMitigationInspection from '@/partials/dialog/windMitigationInspection.vue'
import FourPointInspection from '@/partials/dialog/fourPointInspection.vue'
import MoldAirSamples from '@/partials/dialog/moldAirSamples.vue'
import ThermalImagingInspection from '@/partials/dialog/thermalImagingInspection.vue'
import ExtraStructureInspection from '@/partials/dialog/extraStructureInspection.vue'
import CrawlspaceInspection from '@/partials/dialog/crawlspaceInspection.vue'
import SeawallInspection from '@/partials/dialog/seawallInspection.vue'
import DrainPipeInspection from '@/partials/dialog/drainPipeInspection.vue'
import AsbestosInspection from '@/partials/dialog/asbestosInspection.vue'
import LeadBasedPaintInspection from '@/partials/dialog/leadBasedPaintInspection.vue'
import WellWaterInspection from '@/partials/dialog/wellWaterInspection.vue'
import CosmeticConditionsInspection from '@/partials/dialog/cosmeticConditionsInspection.vue'
import '@/assets/styles/service-dialog.css'

const props = defineProps({ service: String, title: String })
const visible = defineModel('visible', { type: Boolean, default: false })
const serviceDetails = {
  general_inspection: { component: GeneralInspection, icon: 'home' },
  pool_inspection: { component: PoolInspection, icon: 'home' },
  roof_inspection: { component: RoofInspection, icon: 'home' },
  termite_inspection: { component: TermiteInspection, icon: 'shield' },
  wind_mitigation: { component: WindMitigationInspection, icon: 'wind' },
  four_point: { component: FourPointInspection, icon: 'report', title: '4-Point Inspection' },
  mold_air_samples: { component: MoldAirSamples, icon: 'wind', title: 'Mold Air Sampling' },
  thermal_imaging: { component: ThermalImagingInspection, icon: 'home' },
  extra_structure_inspection: { component: ExtraStructureInspection, icon: 'building' },
  crawlspace_inspection: { component: CrawlspaceInspection, icon: 'home' },
  seawall_inspection: { component: SeawallInspection, icon: 'shield' },
  drain_pipe_inspection: {
    component: DrainPipeInspection,
    icon: 'home',
    title: 'Drain Pipe Camera Inspection',
  },
  asbestos_inspection: { component: AsbestosInspection, icon: 'shield' },
  lead_based_paint_inspection: { component: LeadBasedPaintInspection, icon: 'shield' },
  well_water_inspection: { component: WellWaterInspection, icon: 'report' },
  cosmetic_conditions: {
    component: CosmeticConditionsInspection,
    icon: 'building',
    title: 'Cosmetic Conditions Inspection',
  },
}
const detail = computed(() => serviceDetails[props.service])
const displayTitle = computed(() => detail.value?.title || props.title)
</script>

<template>
  <Dialog
    id="inspection-service-dialog"
    v-model:visible="visible"
    modal
    :header="displayTitle"
    class="service-dialog"
    :pt="{ mask: { class: 'service-dialog-mask' } }"
    :closeButtonProps="{ class: 'service-dialog-close', 'aria-label': 'Close service details' }"
  >
    <template #header>
      <div class="service-dialog-heading">
        <span class="service-dialog-symbol"><Icon :name="detail?.icon || 'report'" /></span>
        <div>
          <p class="service-dialog-eyebrow">YOUR INSPECTION, EXPLAINED</p>
          <h2 id="inspection-service-dialog_header">{{ displayTitle }}</h2>
        </div>
      </div>
    </template>
    <component :is="detail.component" v-if="detail" :key="service" />
    <template #footer>
      <p class="service-dialog-footnote">
        <Icon name="check" />Your selections stay as you left them.
      </p>
      <Button
        type="button"
        label="Back to your quote"
        icon="pi pi-arrow-left"
        class="service-dialog-return"
        @click="visible = false"
      />
    </template>
  </Dialog>
</template>
