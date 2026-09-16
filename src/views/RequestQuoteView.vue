<template>
  <div class="quote-builder" id="form-container">
    <p v-if="isPreview" class="preview-note quote-preview">
      Preview mode: this tool will not send a real request.
    </p>
    <div v-if="submissionError" class="form-error" role="alert">
      {{ submissionError }} <a href="tel:+19542529980">(954) 252-9980</a>
    </div>
    <details v-if="step > 1 && step < 7" :key="step" class="quote-summary quote-summary--pinned">
      <summary>
        <span class="quote-summary-mark"><i class="pi pi-file" aria-hidden="true"></i></span>
        <span class="quote-summary-overview"
          ><strong>Your quote so far</strong
          ><span
            >{{
              step > 2
                ? form.step2.street_address
                : `${form.step1.first_name} ${form.step1.last_name}`
            }}<template v-if="step > 2 && form.step2.city"> · {{ form.step2.city }}</template></span
          ></span
        >
        <span v-if="step >= 5" class="quote-summary-count"
          >{{ Object.values(form.step5.selected_services).filter(Boolean).length }} services
          selected</span
        >
        <span class="quote-summary-toggle"
          ><span class="when-closed">View details</span><span class="when-open">Hide details</span
          ><i class="pi pi-chevron-down" aria-hidden="true"></i
        ></span>
      </summary>
      <div class="quote-summary-content">
        <div class="quote-summary-group">
          <span class="quote-summary-label">CONTACT</span>
          <strong>{{ form.step1.first_name }} {{ form.step1.last_name }}</strong>
          <span>{{ form.step1.email }}</span>
          <span>{{ form.step1.phone_number }}</span>
        </div>
        <div v-if="step > 2" class="quote-summary-group">
          <span class="quote-summary-label">PROPERTY</span>
          <strong>{{ form.step2.street_address }}</strong>
          <span>{{ form.step2.city }}, {{ form.step2.state }} {{ form.step2.zip_code }}</span>
          <span v-if="form.step2.county">{{ form.step2.county }}</span>
          <span>{{ form.step2.property_type.value }}</span>
          <div class="quote-property-facts">
            <span>{{ number_format(form.step2.square_footage) }} sq ft</span
            ><span>Built {{ form.step2.year_built }}</span>
          </div>
        </div>
        <div
          v-if="step > 3 && propertyFeatures.some((feature) => form.step3[feature.key])"
          class="quote-summary-group"
        >
          <span class="quote-summary-label">FEATURES</span>
          <ul>
            <template v-for="feature in propertyFeatures" :key="feature.key"
              ><li v-if="form.step3[feature.key]">
                <i class="pi pi-check" aria-hidden="true"></i>{{ feature.name }}
              </li></template
            >
          </ul>
        </div>
        <div
          v-if="step >= 5 && Object.values(form.step5.selected_services).some(Boolean)"
          class="quote-summary-group"
        >
          <span class="quote-summary-label">SELECTED SERVICES</span>
          <ul>
            <template v-for="(value, service) in form.step5.selected_services" :key="service"
              ><li v-if="value">
                <i class="pi pi-check" aria-hidden="true"></i>{{ snakeToNormal(service) }}
              </li></template
            >
          </ul>
        </div>
      </div>
    </details>
    <BasicDetailsOption
      v-show="step < 7"
      :inspection-intent="inspectionIntent"
      :initial-details="{
        name: `${form.step1.first_name} ${form.step1.last_name}`.trim(),
        email: form.step1.email,
        phone: form.step1.phone_number,
        address: [form.step2.street_address, form.step2.city, form.step2.zip_code]
          .filter(Boolean)
          .join(', '),
      }"
    />
    <div v-if="step < 7" class="quote-layout">
      <aside class="quote-sidebar" aria-label="Your quote overview">
        <div class="quote-rail">
          <p class="quote-kicker">MADE FOR YOUR PROPERTY</p>
          <h2>Your inspection,<br />step by step.</h2>
          <ol
            :style="{ '--quote-step-count': totalSteps }"
            class="quote-steps"
            aria-label="Quote steps"
          >
            <li
              v-for="(item, index) in quoteSteps"
              :key="item.title"
              :class="{ 'is-current': step === item.id, 'is-complete': step > item.id }"
              :aria-current="step === item.id ? 'step' : undefined"
            >
              <span class="quote-step-number" aria-hidden="true"
                ><i v-if="step > item.id" class="pi pi-check"></i
                ><template v-else>{{ String(index + 1).padStart(2, '0') }}</template></span
              >
              <div>
                <strong>{{ item.short }}</strong
                ><span>{{ item.detail }}</span>
              </div>
            </li>
          </ol>
          <p class="quote-rail-note">A detailed request, reviewed by our office team.</p>
        </div>

        <div class="quote-support">
          <span class="quote-support-icon"><i class="pi pi-phone" aria-hidden="true"></i></span>
          <div>
            <strong>A little help along the way?</strong>
            <p>Our team is here for you.</p>
            <a href="tel:+19542529980"
              >(954) 252-9980 <i class="pi pi-arrow-up-right" aria-hidden="true"></i></a
            ><a class="quote-support-email" href="mailto:office@diversifiedhomeinspections.com"
              >Email our office</a
            >
          </div>
        </div>
      </aside>
      <section
        class="quote-panel"
        id="progress-bar"
        :data-step="step"
        aria-labelledby="quote-step-title"
      >
        <div class="quote-progress-heading">
          <span
            >STEP {{ String(currentStepIndex + 1).padStart(2, '0') }}
            <span class="quote-step-total">/ {{ String(totalSteps).padStart(2, '0') }}</span></span
          ><strong>{{ progress }}<span>%</span></strong>
        </div>
        <ProgressBar
          :value="progress"
          :showValue="false"
          aria-label="Inspection quote progress"
          class="quote-progress-track"
        />
        <h2 id="quote-step-title">{{ currentStep.title }}</h2>
        <template v-if="step === 1">
          <p class="quote-step-description">
            Tell us how our office can reach you about your inspection request.
          </p>
          <Form v-slot="$form" :resolver :initialValues="form.step1" @submit="onSubmitStep1">
            <div class="quote-fields quote-contact-fields">
              <div class="flex flex-col">
                <div class="quote-field">
                  <label for="first_name">First Name</label>
                  <InputText
                    fluid
                    type="text"
                    id="first_name"
                    name="first_name"
                    v-model="form.step1.first_name"
                  />
                </div>
                <Message
                  v-if="$form.first_name?.invalid"
                  severity="error"
                  size="small"
                  variant="simple"
                  >{{ $form.first_name.error?.message }}</Message
                >
              </div>
              <div class="flex flex-col">
                <div class="quote-field">
                  <label for="last_name">Last Name</label>
                  <InputText
                    fluid
                    type="text"
                    id="last_name"
                    name="last_name"
                    v-model="form.step1.last_name"
                  />
                </div>
                <Message
                  v-if="$form.last_name?.invalid"
                  severity="error"
                  size="small"
                  variant="simple"
                  >{{ $form.last_name.error?.message }}</Message
                >
              </div>
              <div class="flex flex-col">
                <div class="quote-field">
                  <label for="email">Email</label>
                  <InputText
                    fluid
                    type="email"
                    name="email"
                    id="email"
                    v-model="form.step1.email"
                  />
                </div>
                <Message
                  v-if="$form.email?.invalid"
                  severity="error"
                  size="small"
                  variant="simple"
                  >{{ $form.email.error?.message }}</Message
                >
              </div>
              <div class="flex flex-col">
                <div class="quote-field">
                  <label for="phone_number">Phone #</label>
                  <InputMask
                    fluid
                    type="text"
                    autocomplete="tel"
                    name="phone_number"
                    id="phone_number"
                    mask="999-999-9999"
                    v-model="form.step1.phone_number"
                  />
                </div>
                <Message
                  v-if="$form.phone_number?.invalid"
                  severity="error"
                  size="small"
                  variant="simple"
                  >{{ $form.phone_number.error?.message }}</Message
                >
              </div>
            </div>
            <div class="quote-actions">
              <Button
                label="Next Step"
                icon="pi pi-arrow-right"
                type="submit"
                iconPos="right"
                class="py-4"
              />
            </div>
          </Form>
        </template>
        <template v-if="step === 2">
          <p class="quote-step-description">
            Add the address and details of the property you’d like inspected.
          </p>
          <Form v-slot="$form" :resolver :initialValues="form.step2" @submit="onSubmitStep2">
            <div class="quote-fields quote-property-fields">
              <div class="flex flex-col">
                <label for="street_address" class="text-sm dark:text-slate-400"
                  >Street Address</label
                >
                <InputText
                  class="dark:!text-slate-300"
                  fluid
                  type="text"
                  id="street_address"
                  name="street_address"
                  ref="autocompleteInput"
                  v-model="form.step2.street_address"
                  placeholder="Street Address"
                />
                <Message
                  v-if="$form.street_address?.invalid"
                  severity="error"
                  size="small"
                  variant="simple"
                  >{{ $form.street_address.error?.message }}</Message
                >
              </div>
              <div class="flex flex-col">
                <label for="city" class="text-sm dark:text-slate-400">City</label>
                <InputText
                  fluid
                  class="dark:!text-slate-300"
                  type="text"
                  id="city"
                  name="city"
                  v-model="form.step2.city"
                  placeholder="City"
                />
                <Message
                  v-if="$form.city?.invalid"
                  severity="error"
                  size="small"
                  variant="simple"
                  >{{ $form.city.error?.message }}</Message
                >
              </div>
              <!-- <div class="flex flex-col">
                                <label for="" class="text-sm dark:text-slate-400">County</label>
                                <InputText fluid class="dark:!text-slate-300" type="text" name="county" v-model="form.step2.county" placeholder="County" />
                                <Message v-if="$form.county?.invalid" severity="error" size="small" variant="simple">{{ $form.county.error?.message }}</Message>
                            </div> -->
              <div class="flex flex-col">
                <label for="zip_code" class="text-sm dark:text-slate-400">Zip Code</label>
                <InputText
                  fluid
                  class="dark:!text-slate-300"
                  type="number"
                  id="zip_code"
                  name="zip_code"
                  v-model="form.step2.zip_code"
                  placeholder="Zip Code"
                />
                <Message
                  v-if="$form.zip_code?.invalid"
                  severity="error"
                  size="small"
                  variant="simple"
                  >{{ $form.zip_code.error?.message }}</Message
                >
              </div>
              <div class="flex flex-col">
                <label for="square_footage" class="text-sm dark:text-slate-400"
                  >Total Square Footage (not under-air)</label
                >
                <InputNumber
                  fluid
                  class="dark:!text-slate-300"
                  :useGrouping="true"
                  type="number"
                  inputId="square_footage"
                  name="square_footage"
                  v-model="form.step2.square_footage"
                  placeholder="Total Square Feet"
                />
                <Message
                  v-if="$form.square_footage?.invalid"
                  severity="error"
                  size="small"
                  variant="simple"
                  >{{ $form.square_footage.error?.message }}</Message
                >
              </div>
              <div class="flex flex-col">
                <label for="year_built" class="text-sm dark:text-slate-400">Year Built</label>
                <InputNumber
                  fluid
                  class="dark:!text-slate-300"
                  :useGrouping="false"
                  type="number"
                  :min="1850"
                  :max="currentYear"
                  inputId="year_built"
                  name="year_built"
                  v-model="form.step2.year_built"
                  placeholder="Year Built"
                />
                <Message
                  v-if="$form.year_built?.invalid"
                  severity="error"
                  size="small"
                  variant="simple"
                  >{{ $form.year_built.error?.message }}</Message
                >
              </div>
              <div class="flex flex-col">
                <label for="property_type" class="text-sm dark:text-slate-400">Property Type</label>
                <Select
                  fluid
                  v-model="form.step2.property_type"
                  :options="propertyTypes"
                  inputId="property_type"
                  name="property_type"
                  :value="propertyTypes.key"
                  optionLabel="value"
                  placeholder="Select a Property Type (scroll for more!)"
                />
                <Message
                  v-if="$form.property_type?.invalid"
                  severity="error"
                  size="small"
                  variant="simple"
                  >{{ $form.property_type.error?.message }}</Message
                >
              </div>
              <!-- <template v-if="propertySelected">
                            </template> -->
            </div>
            <div class="quote-actions">
              <Button label="Back" class="quote-back" icon="pi pi-arrow-left" @click="goBack" />
              <Button label="Next" type="submit" icon="pi pi-arrow-right" iconPos="right" />
            </div>
          </Form>
        </template>
        <template v-if="step === 3">
          <p class="quote-step-description">Select any features that apply to this property.</p>
          <Form
            v-slot="$form"
            :resolver="resolver"
            :initialValues="form.step3"
            @submit="onSubmitStep3"
          >
            <div class="quote-features">
              <div class="quote-features-layout">
                <div v-if="inspectionIntent === 'maintenance'" class="maintenance-priorities">
                  <label for="maintenance_priority">What brings you in for a yearly check?</label>
                  <select id="maintenance_priority" v-model="form.step3.maintenance_priority">
                    <option value="">Choose a priority (optional)</option>
                    <option>Routine yearly condition check</option>
                    <option>I have noticed a change or concern</option>
                    <option>I am planning repairs or improvements</option>
                  </select>
                  <label for="maintenance_notes"
                    >Any areas you’d like us to focus on? (optional)</label
                  >
                  <textarea
                    id="maintenance_notes"
                    v-model="form.step3.maintenance_notes"
                    maxlength="2000"
                    rows="3"
                    placeholder="Recent leaks, aging systems, repairs, or questions about the home"
                  ></textarea>
                </div>
                <div class="quote-feature-choices">
                  <div>
                    <Checkbox binary inputId="pool" v-model="form.step3.pool" />
                    <label for="pool" class="dark:text-slate-400 ms-2">Pool</label>
                  </div>
                  <div>
                    <Checkbox
                      binary
                      inputId="extra_structure"
                      v-model="form.step3.extra_structure"
                    />
                    <label for="extra_structure" class="dark:text-slate-400 ms-2"
                      >Extra Structure</label
                    >
                  </div>
                  <div>
                    <Checkbox
                      binary
                      inputId="outdoor_kitchen"
                      v-model="form.step3.outdoor_kitchen"
                    />
                    <label for="outdoor_kitchen" class="dark:text-slate-400 ms-2"
                      >Outdoor Kitchen</label
                    >
                  </div>
                  <div>
                    <Checkbox binary inputId="seawall" v-model="form.step3.seawall" />
                    <label for="seawall" class="dark:text-slate-400 ms-2">Seawall</label>
                  </div>
                  <div>
                    <Checkbox binary inputId="crawlspace" v-model="form.step3.crawlspace" />
                    <label for="crawlspace" class="dark:text-slate-400 ms-2"
                      >Crawlspace (below the building)</label
                    >
                  </div>
                  <div>
                    <Checkbox binary inputId="well_water" v-model="form.step3.well_water" />
                    <label for="well_water" class="dark:text-slate-400 ms-2">Well Water</label>
                  </div>
                </div>
                <div
                  class="quote-feature-details"
                  v-if="form.step3.extra_structure || form.step3.seawall"
                >
                  <div class="" v-if="form.step3.extra_structure">
                    <label for="extra_structure_details" class="dark:text-slate-400"
                      >Tell us more about the extra structure</label
                    >
                    <Textarea
                      fluid
                      rows="3"
                      class="mt-1"
                      name="extra_structure_details"
                      id="extra_structure_details"
                      v-model="form.step3.extra_structure_details"
                      placeholder="Enter details here..."
                    />
                    <Message
                      v-if="$form.extra_structure_details?.invalid"
                      severity="error"
                      size="small"
                      variant="simple"
                      >{{ $form.extra_structure_details.error?.message }}</Message
                    >
                  </div>
                  <div v-if="form.step3.seawall">
                    <label for="seawall_length" class="dark:text-slate-400"
                      >What is the seawall length in feet?</label
                    >
                    <InputNumber
                      fluid
                      class="dark:!text-slate-300"
                      type="number"
                      :min="0"
                      placeholder="Seawall Length (ft.)"
                      inputId="seawall_length"
                      v-model="form.step3.seawall_length"
                    />
                    <p class="text-red-500 text-xs mt-1">
                      Not required, but improves quote accuracy.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="quote-actions">
              <Button label="Back" class="quote-back" icon="pi pi-arrow-left" @click="goBack" />
              <Button label="Next" icon="pi pi-arrow-right" iconPos="right" type="submit" />
            </div>
          </Form>
        </template>
        <template v-if="step === 4">
          <p class="quote-step-description">
            Choose the inspection package that best fits your needs.
          </p>
          <Message severity="info">
            <div class="inline-flex items-center">
              <i class="pi pi-info-circle pe-2"></i>
              <p>
                <strong>P.S. </strong>Don't worry, you'll be able to make changes to this in the
                next step.
              </p>
            </div>
          </Message>
          <div v-if="intentContext" class="context-package-list">
            <button
              v-for="item in contextualPackages"
              :key="item.key"
              type="button"
              @click="onSubmitStep4(item.key)"
            >
              <span
                ><strong>{{ item.label }}</strong
                ><span>{{ item.description }}</span></span
              ><i class="pi pi-arrow-right" aria-hidden="true"></i>
            </button>
          </div>
          <div v-else class="quote-packages">
            <Card class="quote-package">
              <template #content>
                <div class="quote-package-heading">
                  <h3 class="text-xl font-bold">Basic</h3>
                  <div class="gray-badge mt-3">Essentials Only</div>
                  <Divider />
                  <p class="text-sm">This is the base package, good for most people's needs.</p>
                  <Button
                    label="Select this Package"
                    class="quote-package-select"
                    severity="secondary"
                    @click="onSubmitStep4('basic')"
                  />
                </div>
                <div class="quote-package-services">
                  <ul>
                    <li class="flex items-center">
                      <i class="pi pi-check-circle text-green-500 me-2"></i>
                      <span>General Inspection</span>
                    </li>
                    <template v-if="form.step3.pool">
                      <li class="flex items-center">
                        <i class="pi pi-check-circle text-green-500 me-2"></i>
                        <span>Pool Inspection</span>
                      </li>
                    </template>
                    <template v-if="form.step3.crawlspace">
                      <li class="flex items-center">
                        <i class="pi pi-check-circle text-green-500 me-2"></i>
                        <span>Crawlspace Inspection</span>
                      </li>
                    </template>
                    <li class="flex items-center">
                      <i class="pi pi-check-circle text-green-500 me-2"></i>
                      <span> Roof Inspection </span>
                    </li>
                    <li class="flex items-center">
                      <i class="pi pi-check-circle text-green-500 me-2"></i>
                      <span> Termite Inspection </span>
                    </li>
                    <li class="flex items-center">
                      <i class="pi pi-check-circle text-green-500 me-2"></i>
                      <span> Wind Mitigation </span>
                    </li>
                    <li class="flex items-center">
                      <i class="pi pi-check-circle text-green-500 me-2"></i>
                      <span> 4-Point </span>
                    </li>
                    <template v-if="form.step3.well_water">
                      <li class="flex items-center">
                        <i class="pi pi-times-circle text-slate-600 me-2"></i>
                        <span class="line-through text-slate-600"> Well Water Inspection </span>
                      </li>
                    </template>
                    <li class="flex items-center text-slate-600">
                      <i class="pi pi-times-circle text-slate-600 me-2"></i>
                      <span class="line-through"> Mold Air Samples </span>
                    </li>
                    <li class="flex items-center text-slate-600">
                      <i class="pi pi-times-circle text-slate-600 me-2"></i>
                      <span class="line-through"> Thermal Imaging </span>
                    </li>
                  </ul>
                </div>
              </template>
            </Card>
            <Card class="quote-package quote-package--premium">
              <template #content>
                <div class="quote-package-heading">
                  <h3 class="text-xl font-bold">Premium</h3>
                  <div class="green-badge mt-3">Most Popular</div>
                  <Divider />
                  <p class="text-sm">
                    Our all-inclusive package, featuring mold inspection and advanced services.
                  </p>
                  <Button
                    label="Select this Package"
                    class="quote-package-select"
                    severity="success"
                    @click="onSubmitStep4('premium')"
                  />
                </div>
                <div class="quote-package-services">
                  <ul>
                    <li class="flex items-center">
                      <i class="pi pi-check-circle text-green-500 me-2"></i>
                      <span>General Inspection</span>
                    </li>
                    <template v-if="form.step3.pool">
                      <li class="flex items-center">
                        <i class="pi pi-check-circle text-green-500 me-2"></i>
                        <span>Pool Inspection</span>
                      </li>
                    </template>
                    <template v-if="form.step3.crawlspace">
                      <li class="flex items-center">
                        <i class="pi pi-check-circle text-green-500 me-2"></i>
                        <span>Crawlspace Inspection</span>
                      </li>
                    </template>
                    <li class="flex items-center">
                      <i class="pi pi-check-circle text-green-500 me-2"></i>
                      <span> Roof Inspection </span>
                    </li>
                    <li class="flex items-center">
                      <i class="pi pi-check-circle text-green-500 me-2"></i>
                      <span> Termite Inspection </span>
                    </li>
                    <li class="flex items-center">
                      <i class="pi pi-check-circle text-green-500 me-2"></i>
                      <span> Wind Mitigation </span>
                    </li>
                    <li class="flex items-center">
                      <i class="pi pi-check-circle text-green-500 me-2"></i>
                      <span> 4-Point </span>
                    </li>
                    <template v-if="form.step3.well_water">
                      <li class="flex items-center">
                        <i class="pi pi-check-circle text-green-500 me-2"></i>
                        <span>Well Water Inspection</span>
                      </li>
                    </template>
                    <li class="flex items-center">
                      <i class="pi pi-check-circle text-green-500 me-2"></i>
                      <span> Mold Air Samples </span>
                    </li>
                    <li class="flex items-center">
                      <i class="pi pi-check-circle text-green-500 me-2"></i>
                      <span> Thermal Imaging </span>
                    </li>
                  </ul>
                </div>
              </template>
            </Card>
            <Card class="quote-package">
              <template #content>
                <div class="quote-package-heading">
                  <p class="text-xl font-bold">Pre-Listing Inspection</p>
                  <div class="blue-badge mt-3">Seller's Choice</div>
                  <Divider />
                  <p class="text-sm">Selling your home? This package is for you.</p>
                  <Button
                    label="Select this Package"
                    class="quote-package-select"
                    severity="info"
                    @click="onSubmitStep4('pre_listing')"
                  />
                </div>
                <div class="quote-package-services">
                  <ul>
                    <li class="flex items-center">
                      <i class="pi pi-check-circle text-green-500 me-2"></i>
                      <span>General Inspection</span>
                    </li>
                    <template v-if="form.step3.pool">
                      <li class="flex items-center">
                        <i class="pi pi-check-circle text-green-500 me-2"></i>
                        <span>Pool Inspection</span>
                      </li>
                    </template>
                    <template v-if="form.step3.crawlspace">
                      <li class="flex items-center">
                        <i class="pi pi-check-circle text-green-500 me-2"></i>
                        <span>Crawlspace Inspection</span>
                      </li>
                    </template>
                    <li class="flex items-center">
                      <i class="pi pi-check-circle text-green-500 me-2"></i>
                      <span> Roof Inspection </span>
                    </li>
                    <li class="flex items-center">
                      <i class="pi pi-check-circle text-green-500 me-2"></i>
                      <span> Termite Inspection </span>
                    </li>
                    <li class="flex items-center text-slate-600">
                      <i class="pi pi-times-circle text-slate-600 me-2"></i>
                      <span class="line-through"> Wind Mitigation </span>
                    </li>
                    <li class="flex items-center text-slate-600">
                      <i class="pi pi-times-circle text-slate-600 me-2"></i>
                      <span class="line-through"> 4-Point </span>
                    </li>
                    <template v-if="form.step3.well_water">
                      <li class="flex items-center">
                        <i class="pi pi-times-circle text-slate-600 me-2"></i>
                        <span class="line-through text-slate-600"> Well Water Inspection </span>
                      </li>
                    </template>
                    <li class="flex items-center text-slate-600">
                      <i class="pi pi-times-circle text-slate-600 me-2"></i>
                      <span class="line-through"> Mold Air Samples </span>
                    </li>
                    <li class="flex items-center text-slate-600">
                      <i class="pi pi-times-circle text-slate-600 me-2"></i>
                      <span class="line-through"> Thermal Imaging </span>
                    </li>
                  </ul>
                </div>
              </template>
            </Card>
            <Card class="quote-package">
              <template #content>
                <div class="quote-package-heading">
                  <p class="text-xl font-bold">Insurance Only</p>
                  <div class="gold-badge mt-3">Insurance-Ready</div>
                  <Divider />
                  <p class="text-sm">Shopping new insurance? Choose this package!</p>
                  <Button
                    label="Select this Package"
                    class="quote-package-select"
                    severity="secondary"
                    @click="onSubmitStep4('insurance_only')"
                  />
                </div>
                <div class="quote-package-services">
                  <ul>
                    <li class="flex items-center">
                      <i class="pi pi-check-circle text-green-500 me-2"></i>
                      <span> Wind Mitigation </span>
                    </li>
                    <li class="flex items-center">
                      <i class="pi pi-check-circle text-green-500 me-2"></i>
                      <span> 4-Point </span>
                    </li>
                    <li class="flex items-center">
                      <i class="pi pi-check-circle text-green-500 me-2"></i>
                      <span> Roof Inspection </span>
                    </li>
                    <li class="flex items-center">
                      <i class="pi pi-times-circle text-slate-600 me-2"></i>
                      <span class="line-through text-slate-600">General Inspection</span>
                    </li>
                    <template v-if="form.step3.pool">
                      <li class="flex items-center">
                        <i class="pi pi-times-circle text-slate-600 me-2"></i>
                        <span class="line-through text-slate-600">Pool Inspection</span>
                      </li>
                    </template>
                    <template v-if="form.step3.crawlspace">
                      <li class="flex items-center">
                        <i class="pi pi-times-circle text-slate-600 me-2"></i>
                        <span class="line-through">Crawlspace Inspection</span>
                      </li>
                    </template>
                    <li class="flex items-center">
                      <i class="pi pi-times-circle text-slate-600 me-2"></i>
                      <span class="line-through text-slate-600"> Termite Inspection </span>
                    </li>
                    <template v-if="form.step3.well_water">
                      <li class="flex items-center">
                        <i class="pi pi-times-circle text-slate-600 me-2"></i>
                        <span class="line-through text-slate-600"> Well Water Inspection </span>
                      </li>
                    </template>
                    <li class="flex items-center text-slate-600">
                      <i class="pi pi-times-circle text-slate-600 me-2"></i>
                      <span class="line-through"> Mold Air Samples </span>
                    </li>
                    <li class="flex items-center text-slate-600">
                      <i class="pi pi-times-circle text-slate-600 me-2"></i>
                      <span class="line-through"> Thermal Imaging </span>
                    </li>
                  </ul>
                </div>
              </template>
            </Card>
            <Card class="quote-package" v-if="newConstructionEligible">
              <template #content>
                <div class="quote-package-heading">
                  <p class="text-xl font-bold">New Construction Inspection</p>
                  <Divider />
                  <p class="text-sm">Purchasing a brand new house? Choose this package!</p>
                  <Button
                    label="Select this Package"
                    class="quote-package-select"
                    severity="secondary"
                    @click="onSubmitStep4('new_construction')"
                  />
                </div>
                <div class="quote-package-services">
                  <ul>
                    <li class="flex items-center">
                      <i class="pi pi-check-circle text-green-500 me-2"></i>
                      <span>General Inspection</span>
                    </li>
                    <li class="flex items-center">
                      <i class="pi pi-check-circle text-green-500 me-2"></i>
                      <span>Cosmetic Conditions</span>
                    </li>

                    <template v-if="form.step3.pool">
                      <li class="flex items-center">
                        <i class="pi pi-check-circle text-green-500 me-2"></i>
                        <span>Pool Inspection</span>
                      </li>
                    </template>
                    <li class="flex items-center">
                      <i class="pi pi-check-circle text-green-500 me-2"></i>
                      <span> Roof Inspection (w/ Drone) </span>
                    </li>
                    <li class="flex items-center">
                      <i class="pi pi-check-circle text-green-500 me-2"></i>
                      <span> Termite Inspection </span>
                    </li>
                    <li class="flex items-center text-slate-600">
                      <i class="pi pi-check-circle text-green-500 me-2"></i>
                      <span> Wind Mitigation </span>
                    </li>
                    <li class="flex items-center text-slate-600">
                      <i class="pi pi-check-circle text-green-500 me-2"></i>
                      <span> 4-Point </span>
                    </li>
                  </ul>
                </div>
              </template>
            </Card>
          </div>
          <div class="quote-actions">
            <Button label="Back" class="quote-back" icon="pi pi-arrow-left" @click="goBack" />
            <!-- <Button label="Next" type="submit" icon="pi pi-arrow-right" iconPos="right" /> -->
          </div>
        </template>
        <template v-if="step === 5">
          <p class="quote-step-description">
            Review your inspections and any optional recommendations. Our office will review your
            request and confirm the scope and price with you.
          </p>
          <Message severity="warn" class="mb-5"
            >If you would like more information on any single service, click the question mark next
            to it.</Message
          >
          <AgeRecommendations
            :year-built="form.step2.year_built"
            :intent="inspectionIntent"
            :selected="form.step5.selected_services"
            @toggle="toggleRecommended"
            @info="showServiceInfoDialog"
          />
          <p v-if="insuranceFlow" class="quote-scope-note">
            Choose the reports your insurer requested. These reports are separate services; a
            general home inspection is a different scope.
          </p>
          <p v-if="serviceSelectionError" class="form-error" role="alert">
            {{ serviceSelectionError }}
          </p>
          <div class="quote-services">
            <div
              class="quote-service"
              :class="{ 'is-selected': form.step5.selected_services[service] }"
              v-for="service in visibleServiceKeys"
              :key="service"
            >
              <div class="quote-service-row">
                <div class="quote-service-content">
                  <label :for="service" class="quote-service-label">
                    <Checkbox
                      binary
                      :inputId="service"
                      v-model="form.step5.selected_services[service]"
                    />
                    <span class="ms-2 dark:text-gray-400">{{ snakeToNormal(service) }}</span>
                  </label>
                  <Message
                    v-if="form.step3.extra_structure && service === 'extra_structure_inspection'"
                    severity="info"
                    class="mt-2"
                  >
                    <div class="inline-flex items-center">
                      <i class="pi pi-info-circle me-3"></i>
                      <div>
                        <p class="text-xs mb-2">
                          You indicated that this property has an extra structure.
                        </p>
                        <p class="text-xs">Select this service if you would like it inspected.</p>
                      </div>
                    </div>
                  </Message>
                  <Message
                    v-if="form.step3.seawall && service === 'seawall_inspection'"
                    severity="info"
                    class="mt-2"
                  >
                    <div class="inline-flex items-center">
                      <i class="pi pi-info-circle me-3"></i>
                      <div>
                        <p class="text-xs mb-2">You indicated that this property has a seawall.</p>
                        <p class="text-xs">Select this service if you would like it inspected.</p>
                      </div>
                    </div>
                  </Message>
                  <Message
                    v-if="form.step3.crawlspace && service === 'crawlspace_inspection'"
                    severity="info"
                    class="mt-2"
                  >
                    <div class="inline-flex items-center">
                      <i class="pi pi-info-circle me-3"></i>
                      <div>
                        <p class="text-xs mb-2">
                          You indicated that this property has a crawlspace.
                        </p>
                        <p class="text-xs">Select this service if you would like it inspected.</p>
                      </div>
                    </div>
                  </Message>
                </div>
                <button
                  type="button"
                  class="quote-service-help"
                  :aria-label="`About ${snakeToNormal(service)}`"
                  @click="showServiceInfoDialog(service)"
                >
                  <i class="pi pi-question-circle" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          </div>
          <div class="quote-actions">
            <Button label="Back" class="quote-back" icon="pi pi-arrow-left" @click="goBack" />
            <Button
              label="Next"
              icon="pi pi-arrow-right"
              iconPos="right"
              type="submit"
              @click="onSubmitStep5"
            />
          </div>
        </template>
        <template v-if="step === 6">
          <p class="quote-step-description">
            Share a few dates that work for you. Our team will confirm availability.
          </p>
          <Message severity="info" class="mb-5">
            <div class="flex items-center">
              <i class="pi pi-info-circle me-2"></i>
              Dates are optional. Our office will confirm timing with you after reviewing the
              request.
            </div>
          </Message>
          <div class="quote-fields quote-date-fields">
            <div class="quote-field">
              <label for="quote-date-1">Preferred date 1 <span>(optional)</span></label
              ><DatePicker
                inputId="quote-date-1"
                v-model="form.step6.date_1"
                showTime
                hourFormat="12"
                :stepMinute="30"
                :minTime="minTime"
                :maxTime="maxTime"
                :minDate="minDate"
                showIcon
                fluid
                iconDisplay="input"
                placeholder="Choose a date and time"
              />
            </div>
            <div class="quote-field">
              <label for="quote-date-2">Preferred date 2 <span>(optional)</span></label
              ><DatePicker
                inputId="quote-date-2"
                v-model="form.step6.date_2"
                showTime
                hourFormat="12"
                :stepMinute="30"
                :minTime="minTime"
                :maxTime="maxTime"
                :minDate="minDate"
                showIcon
                fluid
                iconDisplay="input"
                placeholder="Choose a date and time"
              />
            </div>
            <div class="quote-field">
              <label for="quote-date-3">Preferred date 3 <span>(optional)</span></label
              ><DatePicker
                inputId="quote-date-3"
                v-model="form.step6.date_3"
                showTime
                hourFormat="12"
                :stepMinute="30"
                :minTime="minTime"
                :maxTime="maxTime"
                :minDate="minDate"
                showIcon
                fluid
                iconDisplay="input"
                placeholder="Choose a date and time"
              />
            </div>
            <div class="quote-field">
              <label for="quote-date-4">Preferred date 4 <span>(optional)</span></label
              ><DatePicker
                inputId="quote-date-4"
                v-model="form.step6.date_4"
                showTime
                hourFormat="12"
                :stepMinute="30"
                :minTime="minTime"
                :maxTime="maxTime"
                :minDate="minDate"
                showIcon
                fluid
                iconDisplay="input"
                placeholder="Choose a date and time"
              />
            </div>
          </div>
          <div class="quote-actions">
            <Button label="Back" class="quote-back" icon="pi pi-arrow-left" @click="goBack" />
            <Button
              label="Send request to our office"
              icon="pi pi-check-circle"
              iconPos="right"
              type="submit"
              @click="onSubmitStep6"
            />
          </div>
          <p class="quote-office-note">
            Your request goes to our office team. We’ll contact you to confirm scope, pricing and
            availability. No automatic quote email is sent to you.
          </p>
        </template>
      </section>
    </div>
    <div v-else class="quote-complete-panel">
      <div class="flex items-center gap-5 mx-auto" v-if="step === 7">
        <ProgressSpinner
          style="width: 50px; height: 50px"
          strokeWidth="8"
          fill="transparent"
          animationDuration=".5s"
          aria-label="Custom ProgressSpinner"
        />
        <p class="text-2xl font-bold">Loading...</p>
      </div>
      <div v-if="step === 8" class="flex justify-center mx-auto flex-col text-center">
        <img :src="appStore.logoSrc" alt="" class="w-64 mx-auto mb-10" />
        <h2 class="text-4xl font-semibold mb-5">
          {{ isPreview ? 'Preview complete' : 'Thank you!' }}
        </h2>
        <p class="text-xl">
          {{
            isPreview
              ? 'No request was sent and no conversion was recorded.'
              : 'Your detailed inspection request has been sent to our office.'
          }}
        </p>
        <p v-if="!isPreview" class="text-xl">
          Our team will review the details and contact you about scope, pricing and availability.
          Your inspection is not booked until confirmed.
        </p>

        <div class="mt-5 dark:text-surface-400">
          <p class="text-medium font-light">Diversified Home Inspections, Inc.</p>
          <p class="text-medium font-light">
            <a href="mailto:office@diversifiedhomeinspections.com"
              >office@diversifiedhomeinspections.com</a
            >
          </p>
          <p class="text-medium font-light">
            <a href="tel:+19542529980">(954) 252-9980</a>
          </p>
        </div>

        <div class="flex flex-row justify-center mx-auto mt-5 gap-3">
          <a
            href="https://www.instagram.com/diversified_home_inspections/"
            class="text-slate-400 text-base lg:text-lg dark:text-slate-0 bg-slate-0 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-700 transition-all border border-slate-300 dark:border-slate-800 rounded-full w-12 h-12 lg:w-9 lg:h-9 flex items-center justify-center"
          >
            <i class="pi pi-instagram" style="font-size: 1.5rem" />
          </a>
          <a
            href="https://www.facebook.com/diversifiedhomeinspections/"
            class="text-slate-400 text-base lg:text-lg dark:text-slate-0 bg-slate-0 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-700 transition-all border border-slate-300 dark:border-slate-800 rounded-full w-12 h-12 lg:w-9 lg:h-9 flex items-center justify-center"
          >
            <i class="pi pi-facebook" style="font-size: 1.5rem" />
          </a>
          <a
            href="https://x.com/divhomeinsp"
            class="text-slate-400 text-base lg:text-lg dark:text-slate-0 bg-slate-0 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-700 transition-all border border-slate-300 dark:border-slate-800 rounded-full w-12 h-12 lg:w-9 lg:h-9 flex items-center justify-center"
          >
            <i class="pi pi-twitter" style="font-size: 1.5rem" />
          </a>
          <a
            href="https://www.linkedin.com/company/diversified-home-inspections"
            class="text-slate-400 text-base lg:text-lg dark:text-slate-0 bg-slate-0 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-700 transition-all border border-slate-300 dark:border-slate-800 rounded-full w-12 h-12 lg:w-9 lg:h-9 flex items-center justify-center"
          >
            <i class="pi pi-linkedin" style="font-size: 1.5rem" />
          </a>
          <a
            href="https://www.youtube.com/@diversifiedhomeinspections"
            class="text-slate-400 text-base lg:text-lg dark:text-slate-0 bg-slate-0 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-700 transition-all border border-slate-300 dark:border-slate-800 rounded-full w-12 h-12 lg:w-9 lg:h-9 flex items-center justify-center"
          >
            <i class="pi pi-youtube" style="font-size: 1.5rem" />
          </a>
          <a
            href="https://www.google.com/search?q=diversified+home+inspections+southwest+ranches+fl"
            class="text-slate-400 text-base lg:text-lg dark:text-slate-0 bg-slate-0 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-700 transition-all border border-slate-300 dark:border-slate-800 rounded-full w-12 h-12 lg:w-9 lg:h-9 flex items-center justify-center"
          >
            <i class="pi pi-google" style="font-size: 1.5rem" />
          </a>
        </div>
      </div>
    </div>
  </div>

  <ServiceInfoDialog
    v-model:visible="serviceInfoDialogVisible"
    :service="selectedInfoService"
    :title="serviceInfoHeader"
  />
</template>
<script setup>
import Button from 'primevue/button'
import ServiceInfoDialog from '@/components/campaign/ServiceInfoDialog.vue'
import BasicDetailsOption from '@/components/campaign/BasicDetailsOption.vue'
import AgeRecommendations from '@/components/campaign/AgeRecommendations.vue'
import {
  getQuoteStepIds,
  isInsuranceIntent,
  validPropertyYear,
  createScopeReviewPayload,
} from '@/utils/inspectionRecommendations'
import InputText from 'primevue/inputtext'
import {
  ProgressBar,
  Message,
  InputMask,
  Checkbox,
  Textarea,
  Divider,
  Card,
  InputNumber,
  DatePicker,
  Select,
  ProgressSpinner,
  Tag,
} from 'primevue'
import { Form } from '@primevue/forms'
import { onMounted, onUnmounted, reactive, ref, computed, nextTick, watch } from 'vue'
import { isProductionHost, sendLead, trackLead } from '@/utils/campaign'
import { loadGoogleMaps } from '@/utils/maps'
import { useAppStore } from '@/stores/appStore'
import {
  inspectionContext,
  singleServicePackages,
  isInsurancePackage,
} from '@/utils/inspectionIntent'
const props = defineProps({ inspectionIntent: { type: String, default: '' } })
const intentContext = computed(() => inspectionContext(props.inspectionIntent))

const appStore = useAppStore()
const serviceInfoDialogVisible = ref(false)
const selectedInfoService = ref(null)
const serviceInfoHeader = ref(null)
const minDate = ref(new Date())
const today = new Date()
const minTime = ref(new Date(today.setHours(8, 0, 0, 0))) // 8:00 AM
const maxTime = ref(new Date(today.setHours(18, 0, 0, 0))) // 6:00 PM

// Get current year for year built input
const currentYear = new Date().getFullYear()

function scrollTo(refName) {
  const element = document.querySelector(refName)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

function snakeToNormal(snakeString) {
  if (!snakeString) return ''
  return snakeString
    .split('_') // Split the string at underscores
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
    .join(' ') // Join the words with spaces
}

function number_format(value) {
  if (!value) return ''
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const showServiceInfoDialog = (service) => {
  serviceInfoDialogVisible.value = true
  selectedInfoService.value = service
  serviceInfoHeader.value = snakeToNormal(service)
}

const services = [
  { key: 'general_inspection', value: 'General Inspection' },
  { key: 'cosmetic_conditions', value: 'Cosmetic Conditions' },
  { key: 'pool_inspection', value: 'Pool Inspection' },
  { key: 'roof_inspection', value: 'Roof Inspection' },
  { key: 'termite_inspection', value: 'Termite Inspection' },
  { key: 'wind_mitigation', value: 'Wind Mitigation' },
  { key: 'four_point', value: '4-Point' },
  { key: 'mold_air_samples', value: 'Mold Air Samples' },
  { key: 'thermal_imaging', value: 'Thermal Imaging' },
  { key: 'extra_structure_inspection', value: 'Extra Structure Inspection' },
  { key: 'crawlspace_inspection', value: 'Crawlspace Inspection' },
  { key: 'seawall_inspection', value: 'Seawall Inspection' },
  { key: 'drain_pipe_inspection', value: 'Drain Pipe Camera Inspection' },
  { key: 'asbestos_inspection', value: 'Asbestos Inspection' },
  { key: 'lead_based_paint_inspection', value: 'Lead-Based Paint Inspection' },
  { key: 'well_water_inspection', value: 'Well Water Inspection' },
]

const packages = {
  maintenance: ['general_inspection'],
  commercial: ['general_inspection', 'roof_inspection', 'termite_inspection'],
  ...singleServicePackages,
  basic: [
    'general_inspection',
    'roof_inspection',
    'termite_inspection',
    'wind_mitigation',
    'four_point',
    'dynamic:pool_inspection',
    'dynamic:crawlspace_inspection',
  ],
  premium: [
    'general_inspection',
    'roof_inspection',
    'termite_inspection',
    'wind_mitigation',
    'four_point',
    'mold_air_samples',
    'thermal_imaging',
    'dynamic:pool_inspection', // Dynamic services
    'dynamic:crawlspace_inspection',
    'dynamic:well_water_inspection',
  ],
  pre_listing: [
    'general_inspection',
    'roof_inspection',
    'termite_inspection',
    'dynamic:pool_inspection',
    'dynamic:crawlspace_inspection',
  ],
  new_construction: [
    'general_inspection',
    'cosmetic_conditions',
    'roof_inspection',
    'termite_inspection',
    'wind_mitigation',
    'dynamic:pool_inspection',
  ],
  insurance_only: ['wind_mitigation', 'four_point', 'roof_inspection'],
}

const getDynamicServices = (step3Selections) => {
  const dynamicServices = []

  if (step3Selections.pool) {
    dynamicServices.push('pool_inspection')
  }
  if (step3Selections.crawlspace) {
    dynamicServices.push('crawlspace_inspection')
  }
  if (step3Selections.well_water) {
    dynamicServices.push('well_water_inspection')
  }

  return dynamicServices
}

const step5Services = computed(() => {
  const selectedPackage = packages[form.step4.selected_package] || []
  let dynamicServices = []

  if (!isInsurancePackage(form.step4.selected_package)) {
    dynamicServices = getDynamicServices(form.step3)
  }

  // Iterate over all services to update their selected status
  services.forEach((service) => {
    const isStatic = selectedPackage.includes(service.key)
    const isDynamic = dynamicServices.includes(service.key)

    // Update the `form.step5.selected_services` value
    form.step5.selected_services[service.key] = isStatic || isDynamic
  })

  // Return the services for rendering, with their current state
  return services.map((service) => ({
    ...service,
    selected: form.step5.selected_services[service.key] || false,
  }))
})

const form = reactive({
  step1: {
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
  },
  step2: {
    street_address: '',
    unit_number: '',
    city: '',
    state: 'FL',
    county: '',
    zip_code: '',
    property_type: '',
    year_built: null,
    square_footage: null,
  },
  step3: {
    pool: false,
    extra_structure: false,
    outdoor_kitchen: false,
    seawall: false,
    crawlspace: false,
    well_water: false,
    maintenance_priority: '',
    maintenance_notes: '',
    extra_structure_details: '',
    seawall_length: '',
  },
  step4: {
    selected_package: '',
  },
  step5: {
    selected_services: {
      general_inspection: false,
      cosmetic_conditions: false,
      pool_inspection: false,
      roof_inspection: false,
      termite_inspection: false,
      wind_mitigation: false,
      four_point: false,
      mold_air_samples: false,
      thermal_imaging: false,
      extra_structure_inspection: false,
      crawlspace_inspection: false,
      seawall_inspection: false,
      drain_pipe_inspection: false,
      asbestos_inspection: false,
      lead_based_paint_inspection: false,
      well_water_inspection: false,
    },
  },
  step6: {
    date_1: '',
    date_2: '',
    date_3: '',
    date_4: '',
  },
})

const propertyFeatures = [
  { key: 'pool', name: 'Pool' },
  { key: 'extra_structure', name: 'Extra Structure' },
  { key: 'outdoor_kitchen', name: 'Outdoor Kitchen' },
  { key: 'seawall', name: 'Seawall' },
  { key: 'crawlspace', name: 'Crawlspace (below the building)' },
]

const propertyTypes = [
  { key: 'single_family', value: 'Single Family Home' },
  { key: 'condo', value: 'Condominium' },
  { key: 'townhouse', value: 'Townhouse/Villa' },
  { key: 'duplex', value: 'Duplex' },
  { key: 'triplex', value: 'Tri-Plex' },
  { key: 'fourplex', value: 'Four-Plex' },
  { key: 'multi_unit', value: 'Multi-Unit Building' },
  { key: 'commercial', value: 'Commercial Property' },
]

const baseQuoteSteps = [
  { short: 'Contact', title: 'Let’s start with you.', detail: 'How our office can reach you' },
  { short: 'Property', title: 'Tell us about the property.', detail: 'Address, size and age' },
  {
    short: 'Features',
    title: 'Every home is different.',
    detail: 'The details that make it yours',
  },
  {
    short: 'Package',
    title: 'Choose your starting point.',
    detail: 'Find the right inspection package',
  },
  { short: 'Services', title: 'Make it your own.', detail: 'Review and refine your inspections' },
  { short: 'Dates', title: 'When works for you?', detail: 'Share your preferred dates' },
]

const insuranceFlow = computed(() => isInsuranceIntent(props.inspectionIntent))
const stepIds = computed(() => getQuoteStepIds(props.inspectionIntent))
const quoteSteps = computed(() =>
  stepIds.value.map((id) => ({
    ...baseQuoteSteps[id - 1],
    id,
    ...(id === 3 && props.inspectionIntent === 'maintenance'
      ? { title: 'Your home, year after year.', detail: 'Features and maintenance priorities' }
      : {}),
    ...(id === 3 && props.inspectionIntent === 'commercial'
      ? { title: 'Property features and access.' }
      : {}),
    ...(id === 5 && insuranceFlow.value
      ? { title: 'The reports your insurer needs.', detail: 'Choose and review your reports' }
      : {}),
  })),
)
const currentStepIndex = computed(() => stepIds.value.indexOf(step.value))
const currentStep = computed(() => quoteSteps.value[currentStepIndex.value] || baseQuoteSteps[5])
const visibleServiceKeys = computed(() =>
  insuranceFlow.value
    ? ['wind_mitigation', 'four_point', 'roof_inspection']
    : Object.keys(form.step5.selected_services),
)
const serviceSelectionError = ref('')
const contextualPackages = computed(() => {
  if (props.inspectionIntent === 'maintenance')
    return [
      {
        key: 'maintenance',
        label: 'Yearly maintenance review',
        description:
          'Start with a general condition review. Add the features and services you want the team to assess. Scope and pricing are confirmed by the office.',
      },
    ]
  if (props.inspectionIntent === 'commercial')
    return [
      {
        key: 'commercial',
        label: 'Commercial property inspection',
        description:
          'General, roof and termite inspection services. Confirm the property type and total area, then review any additional scope.',
      },
    ]
  if (props.inspectionIntent === 'new-construction' && newConstructionEligible.value)
    return [
      {
        key: 'new_construction',
        label: 'Completed new-home inspection',
        description:
          'General and cosmetic conditions, roof, termite and wind mitigation. Review the selected services in the next step.',
      },
    ]
  return [
    {
      key: 'basic',
      label: 'General inspection',
      description:
        'Start with a broad property assessment, including roof, termite and insurance inspection services. Adjust your choices next.',
    },
    {
      key: 'premium',
      label: 'General + additional testing',
      description:
        'The general package plus mold air samples and thermal imaging. Confirm the testing you want in the next step.',
    },
    {
      key: 'pre_listing',
      label: 'Pre-listing inspection',
      description: 'General, roof and termite inspection services for a property you plan to sell.',
    },
  ]
})
function nextStep() {
  step.value = stepIds.value[currentStepIndex.value + 1] ?? 6
  nextTick(() => scrollTo('#progress-bar'))
}
function toggleRecommended(service) {
  form.step5.selected_services[service] = !form.step5.selected_services[service]
}

const step = ref(1)
const propertySelected = ref(false)
const totalSteps = computed(() => stepIds.value.length)

const progress = computed(() => {
  return Math.round(((currentStepIndex.value + 1) / totalSteps.value) * 100)
})

const onSubmitStep1 = ({ valid }) => {
  if (valid) {
    nextStep()
    scrollTo('#form-container')
  }
}

const onSubmitStep2 = ({ valid }) => {
  if (valid) {
    if (insuranceFlow.value && !form.step4.selected_package) {
      form.step4.selected_package = 'insurance_request'
      if (props.inspectionIntent === 'wind') form.step5.selected_services.wind_mitigation = true
      if (props.inspectionIntent === 'four-point') form.step5.selected_services.four_point = true
    }
    nextStep()
    nextTick(() => scrollTo('#form-container'))
  }
}

const onSubmitStep3 = ({ valid }) => {
  if (valid) {
    nextStep()
    nextTick(() => scrollTo('#progress-bar'))
  }
}

const onSubmitStep4 = (selectedPackage) => {
  if (form.step4.selected_package !== selectedPackage) {
    form.step4.selected_package = selectedPackage
    step5Services.value
  }
  nextStep()
}
const onSubmitStep5 = () => {
  if (!Object.values(form.step5.selected_services).some(Boolean)) {
    serviceSelectionError.value = 'Choose at least one inspection service to continue.'
    return
  }
  serviceSelectionError.value = ''
  nextStep()
}

const submissionError = ref('')
const isSubmitting = ref(false)
const isPreview = !isProductionHost(window.location.hostname)

const onSubmitStep6 = async () => {
  if (isSubmitting.value) return
  if (!Object.values(form.step5.selected_services).some(Boolean)) {
    step.value = 5
    serviceSelectionError.value = 'Choose at least one inspection service to continue.'
    return
  }
  isSubmitting.value = true
  submissionError.value = ''
  step.value = 7
  try {
    if (!isPreview) {
      // All detailed requests use the office contact workflow. Never invoke the client quote-email Zap.
      const payload = createScopeReviewPayload(form, props.inspectionIntent, appStore.utmParams)
      await sendLead(payload)
      trackLead(
        'Request Quote Form',
        intentContext.value?.label || 'Detailed inspection request',
        appStore.utmParams,
        { inspection: props.inspectionIntent },
      )
    }
    step.value = 8
    nextTick(() => scrollTo('#form-container'))
  } catch {
    step.value = 6
    submissionError.value =
      'We could not confirm delivery. Please call our office before trying again so we can check your request:'
    nextTick(() => scrollTo('#form-container'))
  } finally {
    isSubmitting.value = false
  }
}

const goBack = () => {
  step.value = stepIds.value[Math.max(0, currentStepIndex.value - 1)]
  nextTick(() => scrollTo('#form-container'))
}

const resolver = ({ values }) => {
  const errors = {}

  if (!values.first_name?.trim()) {
    errors.first_name = [{ message: 'First name is required.' }]
  }
  if (!values.last_name?.trim()) {
    errors.last_name = [{ message: 'Last name is required.' }]
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email?.trim() || '')) {
    errors.email = [{ message: 'Enter a valid email address.' }]
  }
  if ((values.phone_number || '').replace(/\D/g, '').length !== 10) {
    errors.phone_number = [{ message: 'Enter a 10-digit phone number.' }]
  }
  if (!form.step2.street_address) {
    errors.street_address = [{ message: 'Street address is required.' }]
  }
  if (!form.step2.city) {
    errors.city = [{ message: 'City is required.' }]
  }
  if (!form.step2.county) {
    errors.county = [{ message: 'County is required.' }]
  }
  if (!form.step2.zip_code) {
    errors.zip_code = [{ message: 'Zip code is required.' }]
  }
  if (!validPropertyYear(values.year_built)) {
    errors.year_built = [{ message: 'Enter a valid year built, no later than the current year.' }]
  }
  if (!(Number(values.square_footage) > 0 && Number.isFinite(Number(values.square_footage)))) {
    errors.square_footage = [{ message: 'Enter a total square footage greater than zero.' }]
  }
  if (!form.step2.property_type?.key) {
    errors.property_type = [{ message: 'Property type is required.' }]
  }

  if (form.step3.extra_structure) {
    if (!values.extra_structure_details) {
      errors.extra_structure_details = [{ message: 'Extra structure details are required.' }]
    }
  }

  return {
    errors,
  }
}

const autocompleteInput = ref(null)
let autocomplete

watch(step, async (newStep) => {
  if (newStep === 2) {
    const ready = await loadGoogleMaps()
    if (!ready || step.value !== 2) return
    nextTick(() => {
      const input = document.getElementById('street_address')
      if (!input) {
        console.error('Input element is not rendered in the DOM.')
        return
      }

      // Initialize Autocomplete
      autocomplete = new window.google.maps.places.Autocomplete(input, {
        types: ['address'],
        componentRestrictions: { country: 'us' },
      })

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace()
        if (place.address_components) extractAddressComponents(place.address_components)
      })
    })
  }
})

onUnmounted(() => {
  if (autocomplete && window.google?.maps?.event)
    window.google.maps.event.clearInstanceListeners(autocomplete)
  document.body.classList.remove('no-scroll')
})

onMounted(() => {
  if (form.step1.first_name === '') {
    step.value = 1
  }
})

// Computed property to check eligibility
const newConstructionEligible = computed(() => {
  const currentYear = new Date().getFullYear()
  return (
    validPropertyYear(form.step2.year_built, currentYear) &&
    form.step2.year_built >= currentYear - 2
  )
})

// Extract individual address components
const extractAddressComponents = (components) => {
  const componentForm = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name', // City
    administrative_area_level_1: 'short_name', // State
    postal_code: 'short_name', // ZIP Code
    administrative_area_level_2: 'long_name',
  }

  // Initialize empty fields
  form.step2.street_address = ''
  form.step2.city = ''
  form.step2.state = ''
  form.step2.zip_code = ''
  form.step2.county = ''

  components.forEach((component) => {
    const addressType = component.types[0]
    if (componentForm[addressType]) {
      const value = component[componentForm[addressType]]
      switch (addressType) {
        case 'street_number':
          form.step2.street_address = value + ' ' + form.step2.street_address
          break
        case 'route':
          form.step2.street_address += value
          break
        case 'locality':
          form.step2.city = value
          break
        case 'administrative_area_level_1':
          form.step2.state = value
          break
        case 'postal_code':
          form.step2.zip_code = value
          break
        case 'administrative_area_level_2':
          form.step2.county = value
          break
      }
    }
  })
}

// Watch dialog visibility
watch(serviceInfoDialogVisible, (isVisible) => {
  const body = document.body
  if (isVisible) {
    body.classList.add('no-scroll') // Add class to disable scrolling
  } else {
    body.classList.remove('no-scroll') // Remove class to re-enable scrolling
  }
})
</script>

<style>
.gold-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #ffd700, #ffb700);
  color: #fff;
  font-size: 0.9rem;
  font-weight: bold;
  padding: 0.4rem 0.8rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  white-space: nowrap;
}
.green-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #32cd32, #228b22); /* Vibrant green gradient */
  color: #fff;
  font-size: 0.9rem;
  font-weight: bold;
  padding: 0.4rem 0.8rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  white-space: nowrap;
}
.gray-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #d3d3d3, #a9a9a9); /* Neutral gray gradient */
  color: #fff;
  font-size: 0.9rem;
  font-weight: bold;
  padding: 0.4rem 0.8rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  white-space: nowrap;
}
.blue-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #007bff, #4682b4); /* Professional blue gradient */
  color: #fff;
  font-size: 0.9rem;
  font-weight: bold;
  padding: 0.4rem 0.8rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  white-space: nowrap;
}

.no-scroll {
  overflow: hidden;
}
</style>
