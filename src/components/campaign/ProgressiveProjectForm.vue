<script setup>
import { computed, nextTick, reactive, ref } from 'vue'
import { useAppStore } from '@/stores/appStore'
import {
  createProjectPayload,
  projectStages,
  projectTypes,
  validateProjectRequest,
} from '@/utils/projectRequest'
import { isProductionHost, sendLead, trackEvent, trackLead } from '@/utils/campaign'
import BasicDetailsOption from './BasicDetailsOption.vue'
import Icon from './Icon.vue'
const store = useAppStore()
const form = reactive({
  name: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  zip: '',
  propertyType: '',
  size: '',
  stage: '',
  scope: '',
  timing: '',
  notes: '',
  website: '',
})
const step = ref(1)
const status = ref('idle')
const errors = ref({})
const element = ref(null)
const preview = !isProductionHost(window.location.hostname)
const steps = ['Your details', 'The project', 'Review & request']
const contactFields = [
  { key: 'name', label: 'Full name', type: 'text', autocomplete: 'name', max: 120 },
  { key: 'email', label: 'Email address', type: 'email', autocomplete: 'email', max: 254 },
  { key: 'phone', label: 'Phone number', type: 'tel', autocomplete: 'tel', max: 25 },
]
const projectFields = [
  {
    key: 'address',
    label: 'Project street address',
    type: 'text',
    autocomplete: 'street-address',
    max: 250,
  },
  { key: 'city', label: 'City', type: 'text', autocomplete: 'address-level2', max: 100 },
  {
    key: 'zip',
    label: 'ZIP code',
    type: 'text',
    autocomplete: 'postal-code',
    max: 5,
    inputmode: 'numeric',
  },
  { key: 'propertyType', label: 'Project type', options: projectTypes },
  {
    key: 'size',
    label: 'Approximate total square footage',
    type: 'number',
    inputmode: 'numeric',
    min: 1,
    max: 10000000,
  },
  { key: 'stage', label: 'Current construction stage', options: projectStages },
  {
    key: 'scope',
    label: 'What work or visits would you like reviewed?',
    textarea: true,
    hint: 'Describe your priorities and whether you’re requesting one visit or ongoing visits.',
    max: 2000,
  },
  {
    key: 'timing',
    label: 'Requested timing or next milestone',
    type: 'text',
    hint: 'For example: framing is underway; the next milestone is in two weeks.',
    max: 300,
  },
  {
    key: 'notes',
    label: 'Builder, access or other notes',
    textarea: true,
    optional: true,
    max: 2000,
  },
]
const fields = computed(() => (step.value === 1 ? contactFields : projectFields))
async function focusHeading() {
  await nextTick()
  element.value?.querySelector('h2')?.focus()
}
async function resumePreview() {
  status.value = 'idle'
  await focusHeading()
}
async function edit(value) {
  step.value = value
  errors.value = {}
  await focusHeading()
}
async function advance() {
  errors.value = validateProjectRequest(form, step.value)
  if (Object.keys(errors.value).length) {
    await nextTick()
    element.value?.querySelector('.project-panel [aria-invalid="true"]')?.focus()
    return
  }
  step.value++
  await focusHeading()
}
async function submit() {
  if (status.value === 'pending' || status.value === 'success' || form.website) return
  errors.value = validateProjectRequest(form)
  if (Object.keys(errors.value).length) {
    step.value = Object.keys(errors.value).some((key) =>
      contactFields.some((field) => field.key === key),
    )
      ? 1
      : 2
    await nextTick()
    element.value?.querySelector('.project-panel [aria-invalid="true"]')?.focus()
    return
  }
  status.value = 'pending'
  try {
    if (!preview) await sendLead(createProjectPayload(form, store.utmParams))
    status.value = preview ? 'preview' : 'success'
    if (!preview)
      trackLead(
        'Progressive Project Request',
        'Progressive construction inspection',
        store.utmParams,
        { inspection: 'progressive' },
      )
    await focusHeading()
  } catch {
    status.value = 'error'
    await nextTick()
    element.value?.querySelector('.project-panel [role="alert"]')?.focus()
  }
}
let started = false
function start() {
  if (!started) {
    trackEvent('form_start', {
      form_name: 'Progressive Project Request',
      inspection_intent: 'progressive',
    })
    started = true
  }
}
</script>
<template>
  <div ref="element" class="project-request wrap">
    <p v-if="preview" class="preview-note">
      Preview mode: no request will be sent or conversion recorded.
    </p>
    <BasicDetailsOption
      v-show="!['success', 'preview'].includes(status)"
      inspection-intent="progressive"
      :initial-details="{
        name: form.name,
        email: form.email,
        phone: form.phone,
        address: form.address,
      }"
    />
    <section
      v-if="['success', 'preview'].includes(status)"
      class="project-panel project-confirmation"
      role="status"
    >
      <Icon name="check" />
      <p class="eyebrow">{{ preview ? 'PREVIEW COMPLETE' : 'PROJECT REQUEST RECEIVED' }}</p>
      <h2 tabindex="-1">
        {{ preview ? 'Your project request is ready.' : 'We’ll review the project with you.' }}
      </h2>
      <p>
        {{
          preview
            ? 'No request was sent and no conversion was recorded.'
            : 'Our team will review your scope, timing and property details, then contact you about pricing and availability. Your inspection is not booked until confirmed.'
        }}
      </p>
      <button v-if="preview" class="button button-primary" type="button" @click="resumePreview">
        Back to my request
      </button>
      <a v-else href="tel:+19542529980" class="text-link"
        >Questions? (954) 252-9980<Icon name="phone"
      /></a>
    </section>
    <template v-else>
      <div class="project-progress">
        <ol>
          <li
            v-for="(label, index) in steps"
            :key="label"
            :class="{ active: step === index + 1, complete: step > index + 1 }"
            :aria-current="step === index + 1 ? 'step' : undefined"
          >
            <span>{{ index + 1 }}</span
            >{{ label }}
          </li>
        </ol>
        <p>Step {{ step }} of 3</p>
      </div>
      <details v-if="step > 1" class="project-summary">
        <summary>
          <span
            ><strong>Your project so far</strong><span>{{ form.address || form.name }}</span></span
          ><Icon name="plus" />
        </summary>
        <p>{{ form.name }} · {{ form.email }} · {{ form.phone }}</p>
        <p v-if="form.address">{{ form.address }}, {{ form.city }} {{ form.zip }}</p>
        <p v-if="form.stage">{{ form.stage }} · {{ form.size }} sq ft</p>
      </details>
      <form
        class="project-panel"
        novalidate
        @submit.prevent="step < 3 ? advance() : submit()"
        @focusin="start"
      >
        <p class="eyebrow">PROGRESSIVE CONSTRUCTION INSPECTION</p>
        <h2 tabindex="-1">{{ steps[step - 1] }}</h2>
        <p class="project-description">
          {{
            step === 1
              ? 'Tell us who to contact about this project.'
              : step === 2
                ? 'Help us understand the work, the scope and the timing. Fields are required unless marked optional.'
                : 'Check the details before requesting a project review. Pricing and visits will be confirmed by our office.'
          }}
        </p>
        <fieldset :disabled="status === 'pending'">
          <div v-if="step < 3" class="project-fields">
            <div
              v-for="field in fields"
              :key="field.key"
              class="field"
              :class="{ wide: field.textarea || field.key === 'address' || field.key === 'timing' }"
            >
              <label :for="'project-' + field.key"
                >{{ field.label }} <span v-if="field.optional">(optional)</span
                ><span v-else aria-hidden="true">*</span></label
              >
              <p v-if="field.hint" :id="'hint-' + field.key" class="project-hint">
                {{ field.hint }}
              </p>
              <select
                v-if="field.options"
                :id="'project-' + field.key"
                v-model="form[field.key]"
                required
                :aria-invalid="!!errors[field.key]"
                :aria-describedby="errors[field.key] ? 'project-error-' + field.key : undefined"
              >
                <option disabled value="">Select an option</option>
                <option v-for="option in field.options" :key="option">{{ option }}</option></select
              ><textarea
                v-else-if="field.textarea"
                :id="'project-' + field.key"
                v-model="form[field.key]"
                rows="4"
                :maxlength="field.max"
                :required="!field.optional"
                :aria-invalid="!!errors[field.key]"
                :aria-describedby="
                  [
                    field.hint ? 'hint-' + field.key : '',
                    errors[field.key] ? 'project-error-' + field.key : '',
                  ]
                    .filter(Boolean)
                    .join(' ') || undefined
                "
              ></textarea
              ><input
                v-else
                :id="'project-' + field.key"
                v-model="form[field.key]"
                :type="field.type"
                :autocomplete="field.autocomplete"
                :inputmode="field.inputmode"
                :maxlength="field.type !== 'number' ? field.max : undefined"
                :min="field.min"
                :max="field.type === 'number' ? field.max : undefined"
                :required="!field.optional"
                :aria-invalid="!!errors[field.key]"
                :aria-describedby="
                  [
                    field.hint ? 'hint-' + field.key : '',
                    errors[field.key] ? 'project-error-' + field.key : '',
                  ]
                    .filter(Boolean)
                    .join(' ') || undefined
                "
              />
              <p v-if="errors[field.key]" :id="'project-error-' + field.key" class="field-error">
                {{ errors[field.key] }}
              </p>
            </div>
          </div>
          <div v-else class="project-review">
            <section>
              <div>
                <h3>Your contact details</h3>
                <button type="button" class="text-link" @click="edit(1)">Edit</button>
              </div>
              <p>{{ form.name }}<br />{{ form.email }}<br />{{ form.phone }}</p>
            </section>
            <section>
              <div>
                <h3>Your construction project</h3>
                <button type="button" class="text-link" @click="edit(2)">Edit</button>
              </div>
              <dl>
                <template v-for="field in projectFields" :key="field.key"
                  ><dt v-if="form[field.key]">{{ field.label }}</dt>
                  <dd v-if="form[field.key]">{{ form[field.key] }}</dd></template
                >
              </dl>
            </section>
          </div>
          <div class="honeypot" aria-hidden="true">
            <label for="project-website">Leave blank</label
            ><input id="project-website" v-model="form.website" tabindex="-1" autocomplete="off" />
          </div>
          <p v-if="status === 'error'" class="form-error" role="alert" tabindex="-1">
            We couldn’t confirm delivery. Please call
            <a href="tel:+19542529980">(954) 252-9980</a> before trying again so we can check your
            request.
          </p>
          <div class="project-actions">
            <button v-if="step > 1" type="button" class="text-link" @click="edit(step - 1)">
              <Icon name="arrow" class="back-arrow" />Back</button
            ><button type="submit" class="button button-primary" :aria-busy="status === 'pending'">
              {{
                status === 'pending'
                  ? 'Sending your request…'
                  : step < 3
                    ? 'Continue'
                    : 'Request project review'
              }}<Icon name="arrow" />
            </button>
          </div>
          <p v-if="step === 3" class="form-consent">
            By submitting, you’re asking Diversified Home Inspections to contact you about this
            project. No payment is required.
          </p>
        </fieldset>
      </form>
    </template>
  </div>
</template>
<style scoped>
.project-request {
  padding-bottom: 80px;
  max-width: 1060px;
}
.project-progress {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 34px 0 24px;
  gap: 20px;
}
.project-progress ol {
  display: flex;
  gap: 26px;
  padding: 0;
  list-style: none;
}
.project-progress li {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 650;
  font-size: 0.875rem;
  color: #616c77;
}
.project-progress li > span {
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #e9edf0;
  flex-shrink: 0;
}
.project-progress li.active {
  color: #b52222;
}
.project-progress li.active > span {
  background: #c92828;
  color: #fff;
}
.project-progress li.complete > span {
  background: #1c242b;
  color: #fff;
}
.project-progress > p {
  font-size: 0.875rem;
  white-space: nowrap;
}
.project-panel {
  padding: 44px;
  border: 1px solid #dde3e8;
  border-radius: 20px;
  background: #fff;
}
.project-panel h2 {
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 1.2;
}
.project-description {
  font-size: 1rem;
  color: #616c77;
  margin: 16px 0 30px;
  max-width: 660px;
}
.project-panel fieldset {
  border: 0;
  padding: 0;
  margin: 0;
  min-width: 0;
}
.project-fields {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}
.project-fields .wide {
  grid-column: 1 / -1;
}
.project-fields label {
  font-size: 0.9375rem;
}
.project-fields input,
.project-fields textarea,
.project-fields select {
  font-size: 1rem;
}
.project-hint {
  font-size: 0.875rem;
  color: #616c77;
  margin: 2px 0 10px;
}
.project-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 25px;
  margin-top: 32px;
}
.project-summary {
  position: sticky;
  top: 130px;
  z-index: 10;
  border: 1px solid #dde3e8;
  background: #fff;
  border-radius: 14px;
  padding: 16px 22px;
  box-shadow: 0 5px 20px #00000008;
  margin: 0 0 24px;
}
.project-summary summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  cursor: pointer;
  list-style: none;
}
.project-summary summary::-webkit-details-marker {
  display: none;
}
.project-summary summary strong {
  display: block;
  font-size: 1rem;
}
.project-summary summary span span {
  display: block;
  font-size: 0.875rem;
  color: #616c77;
}
.project-summary p {
  font-size: 0.9375rem;
  overflow-wrap: anywhere;
  margin-top: 10px;
}
.project-review section {
  border-top: 1px solid #dde3e8;
  padding-block: 24px;
}
.project-review section > div {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}
.project-review h3 {
  font-size: 1.15rem;
  font-weight: 700;
}
.project-review p,
.project-review dd {
  overflow-wrap: anywhere;
  white-space: pre-wrap;
}
.project-review dt {
  margin-top: 15px;
  color: #616c77;
  font-size: 0.875rem;
}
.project-review dd {
  font-size: 1rem;
  margin: 3px 0 0;
}
.project-confirmation {
  text-align: center;
}
.project-confirmation > .icon {
  width: 44px;
  height: 44px;
  margin: 0 auto 22px;
  color: #c92828;
}
.project-confirmation > p {
  margin: 20px auto;
  max-width: 660px;
}
@media (max-width: 700px) {
  .project-request {
    width: calc(100% - 32px);
  }
  .project-panel {
    padding: 26px 20px;
  }
  .project-fields {
    grid-template-columns: 1fr;
  }
  .project-progress {
    display: block;
  }
  .project-progress ol {
    gap: 10px;
    justify-content: space-between;
  }
  .project-progress li {
    flex: 1;
    flex-direction: column;
    text-align: center;
    font-size: 0.8rem;
  }
  .project-progress > p {
    margin-top: 14px;
  }
  .project-actions {
    flex-wrap: wrap;
  }
  .project-actions .button {
    font-size: 1rem;
  }
  .project-summary {
    top: 103px;
  }
  .project-panel .form-consent {
    font-size: 0.875rem;
  }
}
</style>
