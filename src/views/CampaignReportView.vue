<script setup>
import { computed, ref } from 'vue'
import SiteHeader from '@/components/campaign/SiteHeader.vue'
import SiteFooter from '@/components/campaign/SiteFooter.vue'
import Icon from '@/components/campaign/Icon.vue'
import { trackEvent } from '@/utils/campaign'
const group = ref('report')
const page = ref(0)
const groups = [
  {
    key: 'report',
    name: 'General inspection',
    files: Array.from({ length: 13 }, (_, i) => '/img/report/asset' + (i + 1) + '.svg'),
  },
  {
    key: 'photos',
    name: 'Inspection photos',
    files: Array.from(
      { length: 11 },
      (_, i) => '/img/report/report-images-' + String(i + 1).padStart(2, '0') + '.png',
    ),
  },
  {
    key: 'roof',
    name: 'Roof report',
    files: Array.from({ length: 12 }, (_, i) => '/img/report/roof/sample_roof_' + (i + 1) + '.png'),
  },
  {
    key: 'termite',
    name: 'Termite report',
    files: Array.from(
      { length: 2 },
      (_, i) => '/img/report/termite/sample_termite_' + (i + 1) + '.png',
    ),
  },
]
const current = computed(() => groups.find((item) => item.key === group.value))
const file = computed(() => current.value.files[page.value])
function changeGroup(key) {
  group.value = key
  page.value = 0
  trackEvent('sample_report_section', { section: key })
}
</script>
<template>
  <div class="campaign">
    <SiteHeader />
    <main id="main-content">
      <section class="wrap utility-intro">
        <RouterLink class="text-link" to="/"
          ><Icon name="arrow" class="back-arrow" /> Back to the landing page</RouterLink
        >
        <p class="eyebrow"><span></span> SEE THE DIVERSIFIED DIFFERENCE</p>
        <h1>A clear picture.<br />Down to the details.</h1>
        <p>
          Explore our sample reports, photographs, and repair estimates. Actual reports vary with
          the property and the services ordered.
        </p>
      </section>
      <section class="wrap report-explorer" aria-label="Sample report viewer">
        <div class="report-toolbar">
          <div class="report-tabs" aria-label="Report sections">
            <button
              v-for="item in groups"
              :key="item.key"
              type="button"
              :aria-pressed="group === item.key"
              @click="changeGroup(item.key)"
            >
              {{ item.name }}
            </button>
          </div>
          <a :href="file" target="_blank" rel="noopener" class="text-link"
            >Open full-size page <Icon name="diagonal"
          /></a>
        </div>
        <div class="report-explorer-body">
          <aside>
            <p class="eyebrow">WHAT TO LOOK FOR</p>
            <h3>Useful information.<br />Clearly connected.</h3>
            <ul class="check-list">
              <li><Icon name="check" /> Property and system details</li>
              <li><Icon name="check" /> Written observations</li>
              <li><Icon name="check" /> Photos of identified concerns</li>
              <li><Icon name="check" /> Itemized repair estimates</li>
            </ul>
            <p>Sample pricing illustrates report format and is not a current repair quote.</p>
            <RouterLink to="/request-quote" class="button button-primary"
              >Build my inspection quote <Icon name="arrow"
            /></RouterLink>
          </aside>
          <div class="report-document">
            <div class="report-pagination">
              <button
                type="button"
                :disabled="page === 0"
                aria-label="Previous report page"
                @click="page--"
              >
                <Icon name="arrow" class="back-arrow" /></button
              ><label
                >Page
                <select v-model.number="page" aria-label="Choose report page">
                  <option v-for="(_, index) in current.files" :key="index" :value="index">
                    {{ index + 1 }}
                  </option>
                </select>
                of {{ current.files.length }}</label
              ><button
                type="button"
                :disabled="page === current.files.length - 1"
                aria-label="Next report page"
                @click="page++"
              >
                <Icon name="arrow" />
              </button>
            </div>
            <p class="visually-hidden" aria-live="polite">
              {{ current.name }} page {{ page + 1 }} of {{ current.files.length }}
            </p>
            <a
              :href="file"
              target="_blank"
              rel="noopener"
              :aria-label="'Open ' + current.name + ' page ' + (page + 1) + ' at full size'"
              ><img
                :key="file"
                :src="file"
                :alt="current.name + ', sample page ' + (page + 1)"
                width="612"
                height="792"
                decoding="async"
            /></a>
          </div>
        </div>
      </section>
    </main>
    <SiteFooter />
  </div>
</template>
