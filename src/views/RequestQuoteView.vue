<template>
  <div class="px-3 pb-20 mt-5 lg:py-20 md:px-12 lg:px-20" id="form-container">
    <div
      class="py-10 px-5 lg:p-14 rounded-3xl bg-slate-100 dark:bg-slate-800 flex items-start lg:flex-row flex-col gap-10 lg:gap-[4.5rem]"
      v-if="step < 7"
    >
      <div class="flex-1 flex flex-col justify-between">
        <div v-if="step < 3" class="mb-5">
          <h2 class="text-3xl lg:text-4xl font-bold text-slate-700 dark:text-slate-50">
            Requesting a Quote is Easy
          </h2>
          <p class="mt-6 text-lg lg:text-xl leading-6 text-slate-600 dark:text-slate-400">
            Complete the form and get instant access to your home inspection quote!
          </p>
        </div>
        <div class="dark:text-slate-400 mb-5" v-if="step > 1">
          <p class="font-bold dark:text-slate-300 text-lg">
            {{ form.step1.first_name }} {{ form.step1.last_name }}
          </p>
          <p>
            <span class="font-bold dark:text-slate-300">Phone #: </span
            >{{ form.step1.phone_number }}
          </p>
          <p><span class="font-bold dark:text-slate-300">Email: </span> {{ form.step1.email }}</p>
        </div>
        <div class="flex flex-col lg:flex-row lg:gap-10">
          <div class="flex">
            <div class="dark:text-slate-400 mb-5" v-if="step > 2">
              <p class="dark:text-slate-300 text-lg">{{ form.step2.street_address }}</p>
              <p>{{ form.step2.city }}, {{ form.step2.state }} {{ form.step2.zip_code }}</p>
              <p>{{ form.step2.county }}</p>
              <p v-if="step > 2">
                <span class="font-bold">Type: </span>{{ form.step2.property_type.value }}
              </p>
              <p>
                <span class="font-bold">Feet²: </span>{{ number_format(form.step2.square_footage) }}
              </p>
              <p><span class="font-bold">Year: </span>{{ form.step2.year_built }}</p>
            </div>
          </div>
          <div class="flex flex-col" v-if="step > 3">
            <div v-if="form.step3.pool">
              <Checkbox binary disabled v-model="form.step3.pool" />
              <label class="dark:text-slate-400 ms-2">Pool</label>
            </div>
            <div v-if="form.step3.extra_structure">
              <Checkbox binary disabled v-model="form.step3.extra_structure" />
              <label class="dark:text-slate-400 ms-2">Extra Structure</label>
            </div>
            <div v-if="form.step3.outdoor_kitchen">
              <Checkbox binary disabled v-model="form.step3.outdoor_kitchen" />
              <label class="dark:text-slate-400 ms-2">Outdoor Kitchen</label>
            </div>
            <div v-if="form.step3.seawall">
              <Checkbox binary disabled v-model="form.step3.seawall" />
              <label class="dark:text-slate-400 ms-2">Seawall</label>
            </div>
            <div v-if="form.step3.crawlspace">
              <Checkbox binary disabled v-model="form.step3.crawlspace" />
              <label class="dark:text-slate-400 ms-2">Crawlspace</label>
            </div>
          </div>
        </div>
        <div
          v-if="Object.keys(form.step5.selected_services).length && step >= 5"
          class="dark:text-slate-400"
        >
          <p class="font-bold mb-3 text-xl dark:text-slate-300 mt-5 lg:mt-0">Selected Services</p>
          <ul class="ms-5">
            <div class="flex flex-col">
              <li
                v-for="(value, service, index) in form.step5.selected_services"
                :key="index"
                class=""
              >
                <div class="inline-flex items-center" v-if="value">
                  <i class="pi pi-check-circle text-xl text-green-500 pe-1"></i>
                  <p class="text-medium font-light">{{ snakeToNormal(service) }}</p>
                </div>
              </li>
            </div>
          </ul>
        </div>
        <div class="mt-5 hidden lg:block">
          <div class="text-lg lg:text-2xl leading-6 font-medium text-slate-500 dark:text-slate-50">
            Prefer speaking to someone? Click below to call our office!
          </div>
          <div class="text-base lg:text-xl leading-6 font-medium text-blue-500">(954) 252-9980</div>
          <div class="text-base lg:text-xl leading-6 font-medium text-blue-500 dark:text-slate-0">
            office@diversifiedhomeinspections.com
          </div>
          <div class="flex items-center gap-3 mt-3.5">
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
      <div class="flex flex-col flex-1 w-full mt-5" id="progress-bar">
        <ProgressBar :value="progress" class="!bg-slate-200 mb-6" />
        <template v-if="step === 1">
          <p class="my-6 text-lg lg:text-xl leading-6 text-slate-600 dark:text-slate-400">
            Enter your contact info so we know where to send the quote.
          </p>
          <Form v-slot="$form" :resolver :initialValues="form.step1" @submit="onSubmitStep1">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 mb-6">
              <div class="flex flex-col">
                <FloatLabel>
                  <InputText
                    fluid
                    type="text"
                    id="first_name"
                    name="first_name"
                    v-model="form.step1.first_name"
                  />
                  <label for="first_name">First Name</label>
                </FloatLabel>
                <Message
                  v-if="$form.first_name?.invalid"
                  severity="error"
                  size="small"
                  variant="simple"
                  >{{ $form.first_name.error?.message }}</Message
                >
              </div>
              <div class="flex flex-col">
                <FloatLabel>
                  <InputText
                    fluid
                    type="text"
                    id="last_name"
                    name="last_name"
                    v-model="form.step1.last_name"
                  />
                  <label for="last_name">Last Name</label>
                </FloatLabel>
                <Message
                  v-if="$form.last_name?.invalid"
                  severity="error"
                  size="small"
                  variant="simple"
                  >{{ $form.last_name.error?.message }}</Message
                >
              </div>
              <div class="flex flex-col">
                <FloatLabel>
                  <InputText fluid type="text" name="email" id="email" v-model="form.step1.email" />
                  <label for="email">Email</label>
                </FloatLabel>
                <Message
                  v-if="$form.email?.invalid"
                  severity="error"
                  size="small"
                  variant="simple"
                  >{{ $form.email.error?.message }}</Message
                >
              </div>
              <div class="flex flex-col">
                <FloatLabel>
                  <InputMask
                    fluid
                    type="text"
                    autocomplete="tel"
                    name="phone_number"
                    mask="999-999-9999"
                    v-model="form.step1.phone_number"
                  />
                  <label for="phone_number">Phone #</label>
                </FloatLabel>
                <Message
                  v-if="$form.phone_number?.invalid"
                  severity="error"
                  size="small"
                  variant="simple"
                  >{{ $form.phone_number.error?.message }}</Message
                >
              </div>
            </div>
            <div class="flex justify-center">
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
          <p class="my-6 text-lg lg:text-xl leading-6 text-slate-600 dark:text-slate-400">
            Great! Now, enter some information about the property.
          </p>
          <Form v-slot="$form" :resolver :initialValues="form.step2" @submit="onSubmitStep2">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4 mb-6">
              <div class="flex flex-col">
                <label for="" class="text-sm dark:text-slate-400">Street Address</label>
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
                <label for="" class="text-sm dark:text-slate-400">City</label>
                <InputText
                  fluid
                  class="dark:!text-slate-300"
                  type="text"
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
                <label for="" class="text-sm dark:text-slate-400">Zip Code</label>
                <InputText
                  fluid
                  class="dark:!text-slate-300"
                  type="number"
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
                <label for="" class="text-sm dark:text-slate-400"
                  >Total Square Footage (not under-air)</label
                >
                <InputNumber
                  fluid
                  class="dark:!text-slate-300"
                  :useGrouping="true"
                  type="number"
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
                <label for="" class="text-sm dark:text-slate-400">Year Built</label>
                <InputNumber
                  fluid
                  class="dark:!text-slate-300"
                  :useGrouping="false"
                  type="number"
                  :min="1850"
                  :max="currentYear"
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
                <label for="" class="text-sm dark:text-slate-400">Property Type</label>
                <Select
                  fluid
                  v-model="form.step2.property_type"
                  :options="propertyTypes"
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
            <div class="flex gap-5 justify-center">
              <Button label="Back" icon="pi pi-arrow-left" @click="goBack" />
              <Button label="Next" type="submit" icon="pi pi-arrow-right" iconPos="right" />
            </div>
          </Form>
        </template>
        <template v-if="step === 3">
          <p class="my-6 text-lg lg:text-xl leading-6 text-slate-600 dark:text-slate-400">
            Awesome! Now, does the property have any of these features?
          </p>
          <Form
            v-slot="$form"
            :resolver="resolver"
            :initialValues="form.step3"
            @submit="onSubmitStep3"
          >
            <div class="flex gap-5">
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <div class="flex flex-col">
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
                <div v-if="form.step3.extra_structure || form.step3.seawall">
                  <div class="" v-if="form.step3.extra_structure">
                    <label for="" class="dark:text-slate-400"
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
                    <label for="" class="dark:text-slate-400"
                      >What is the seawall length in feet?</label
                    >
                    <InputNumber
                      fluid
                      class="dark:!text-slate-300"
                      type="number"
                      :min="0"
                      placeholder="Seawall Length (ft.)"
                      v-model="form.step3.seawall_length"
                    />
                    <p class="text-red-500 text-xs mt-1">
                      Not required, but improves quote accuracy.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex gap-5 justify-center mt-5">
              <Button label="Back" icon="pi pi-arrow-left" @click="goBack" />
              <Button label="Next" icon="pi pi-arrow-right" iconPos="right" type="submit" />
            </div>
          </Form>
        </template>
        <template v-if="step === 4">
          <p class="my-6 text-lg lg:text-xl leading-6 text-slate-600 dark:text-slate-400">
            You're doing great! Now, tell us which services you would like...
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
          <div class="grid grid-cols-1 xl:grid-cols-2 gap-5 my-5">
            <Card class="dark:!bg-slate-900 flex-1 mb-auto border border-slate-400">
              <template #content>
                <div class="flex flex-col text-center items-center mb-3 dark:text-slate-300">
                  <h3 class="text-xl font-bold">Basic</h3>
                  <div class="gray-badge mt-3">Essentials Only</div>
                  <Divider />
                  <p class="text-sm">This is the base package, good for most people's needs.</p>
                  <Button
                    label="Select this Package"
                    class="my-3 !bg-slate-400 !text-slate-50 lg:!text-sm"
                    severity="secondary"
                    @click="onSubmitStep4('basic')"
                  />
                </div>
                <div class="flex justify-center leading-relaxed">
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
            <Card class="dark:!bg-slate-900 flex-1 mb-auto border border-green-500">
              <template #content>
                <div class="flex flex-col text-center items-center mb-3 dark:text-slate-300">
                  <h3 class="text-xl font-bold">Premium</h3>
                  <div class="green-badge mt-3">Most Popular</div>
                  <Divider />
                  <p class="text-sm">
                    Our all-inclusive package, featuring mold inspection and advanced services.
                  </p>
                  <Button
                    label="Select this Package"
                    class="my-3 lg:!text-sm"
                    severity="success"
                    @click="onSubmitStep4('premium')"
                  />
                </div>
                <div class="flex justify-center leading-relaxed">
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
            <Card class="dark:!bg-slate-900 flex-1 mb-auto border-blue-500 border">
              <template #content>
                <div class="flex flex-col text-center items-center mb-3 dark:text-slate-300">
                  <p class="text-xl font-bold">Pre-Listing Inspection</p>
                  <div class="blue-badge mt-3">Seller's Choice</div>
                  <Divider />
                  <p class="text-sm">Selling your home? This package is for you.</p>
                  <Button
                    label="Select this Package"
                    class="my-3 !text-slate-50 lg:!text-sm"
                    severity="info"
                    @click="onSubmitStep4('pre_listing')"
                  />
                </div>
                <div class="flex justify-center leading-relaxed">
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
            <Card class="dark:!bg-slate-900 flex-1 mb-auto border border-yellow-500">
              <template #content>
                <div class="flex flex-col text-center items-center mb-3 dark:text-slate-300">
                  <p class="text-xl font-bold">Insurance Only</p>
                  <div class="gold-badge mt-3">Insurance-Ready</div>
                  <Divider />
                  <p class="text-sm">Shopping new insurance? Choose this package!</p>
                  <Button
                    label="Select this Package"
                    class="my-3 !bg-yellow-400 !text-slate-50 lg:!text-sm"
                    severity="secondary"
                    @click="onSubmitStep4('insurance_only')"
                  />
                </div>
                <div class="flex justify-center leading-relaxed">
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
            <Card class="dark:!bg-slate-900 flex-1 mb-auto" v-if="newConstructionEligible">
              <template #content>
                <div class="flex flex-col text-center items-center mb-3 dark:text-slate-300">
                  <p class="text-xl font-bold">New Construction Inspection</p>
                  <Divider />
                  <p class="text-sm">Purchasing a brand new house? Choose this package!</p>
                  <Button
                    label="Select this Package"
                    class="my-3 !bg-slate-400 !text-slate-50 lg:!text-sm"
                    severity="secondary"
                    @click="onSubmitStep4('new_construction')"
                  />
                </div>
                <div class="flex justify-center leading-relaxed">
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
          <div class="flex gap-5 justify-center">
            <Button label="Back" class="!text-white" icon="pi pi-arrow-left" @click="goBack" />
            <!-- <Button label="Next" type="submit" icon="pi pi-arrow-right" iconPos="right" /> -->
          </div>
        </template>
        <template v-if="step === 5">
          <p class="my-6 text-lg lg:text-xl leading-6 text-slate-600 dark:text-slate-400">
            You're almost done! See the services you've selected below and make any changes you
            would like.
          </p>
          <Message severity="warn" class="mb-5"
            >If you would like more information on any single service, click the question mark next
            to it.</Message
          >
          <div v-for="(value, service, index) in form.step5.selected_services" :key="index">
            <div class="flex flex-row items-center">
              <div class="flex w-full justify-center flex-col">
                <label
                  :for="service"
                  class="border px-2 py-2 lg:py-2 rounded dark:border-surface-600 flex-1 items-center hover:cursor-pointer hover:border-red-400 dark:bg-slate-900 bg-slate-200 mt-3"
                >
                  <Checkbox
                    binary
                    :inputId="service"
                    v-model="form.step5.selected_services[service]"
                  />
                  <span class="ms-2 dark:text-gray-400">{{ snakeToNormal(service) }}</span>
                </label>
                <Message
                  v-if="form.step2.year_built < 1973 && service === 'drain_pipe_inspection'"
                  severity="error"
                  class="mt-2"
                >
                  <div class="inline-flex items-center">
                    <i class="pi pi-exclamation-triangle me-3"></i>
                    <div>
                      <p class="text-xs mb-2">
                        This property was built before 1973 and may have cast-iron drain pipes.
                      </p>
                      <p class="text-xs">We recommend a cast-iron drainpipe camera inspection.</p>
                    </div>
                  </div>
                </Message>
                <Message
                  v-if="form.step2.year_built < 1980 && service === 'asbestos_inspection'"
                  severity="error"
                  class="mt-2"
                >
                  <div class="inline-flex items-center">
                    <i class="pi pi-exclamation-triangle me-3"></i>
                    <div>
                      <p class="text-xs mb-2">
                        This property was built before 1980 and may have asbestos-containing
                        building materials.
                      </p>
                      <p class="text-xs">
                        We recommend a asbestos inspection, but it may be better to wait for your
                        inspector's recommendation.
                      </p>
                    </div>
                  </div>
                </Message>
                <Message
                  v-if="form.step2.year_built < 1978 && service === 'lead_based_paint_inspection'"
                  severity="error"
                  class="mt-2"
                >
                  <div class="inline-flex items-center">
                    <i class="pi pi-exclamation-triangle me-3"></i>
                    <div>
                      <p class="text-xs mb-2">
                        This property was built before 1978 and may have lead-based paint.
                      </p>
                      <p class="text-xs">
                        We recommend a lead-based paint inspection, but it may be better to wait for
                        your inspector's recommendation.
                      </p>
                    </div>
                  </div>
                </Message>
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
                      <p class="text-xs mb-2">You indicated that this property has a crawlspace.</p>
                      <p class="text-xs">Select this service if you would like it inspected.</p>
                    </div>
                  </div>
                </Message>
              </div>
              <span class="hidden lg:block" @click="showServiceInfoDialog(service)">
                <i
                  class="pi pi-question-circle text-blue-500 ms-2 hover:cursor-pointer mt-4"
                  style="font-size: 2rem"
                ></i>
              </span>
              <span class="block lg:hidden" @click="showServiceInfoDialog(service)">
                <i
                  class="pi pi-question-circle text-blue-500 ms-2 hover:cursor-pointer mt-4"
                  style="font-size: 2rem"
                ></i>
              </span>
            </div>
          </div>
          <div class="flex gap-5 justify-center mt-5">
            <Button label="Back" icon="pi pi-arrow-left" @click="goBack" />
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
          <p class="my-6 text-lg lg:text-xl leading-6 text-slate-600 dark:text-slate-400">
            The last step! Select a couple of dates that may work for the inspection.
          </p>
          <Message severity="info" class="mb-5">
            <div class="flex items-center">
              <i class="pi pi-info-circle me-2"></i>
              Not sure? Don't worry! You can skip this step by clicking 'Get Your Quote' below.
            </div>
          </Message>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
            <DatePicker
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
              placeholder="Date 1"
            />
            <DatePicker
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
              placeholder="Date 2"
            />
            <DatePicker
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
              placeholder="Date 3"
            />
            <DatePicker
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
              placeholder="Date 4"
            />
          </div>
          <div class="flex justify-center gap-5">
            <Button label="Back" icon="pi pi-arrow-left" @click="goBack" />
            <Button
              label="Get Your Quote"
              icon="pi pi-check-circle"
              iconPos="right"
              type="submit"
              @click="onSubmitStep6"
            />
          </div>
        </template>
        <Divider />
        <div class="mt-5 lg:hidden text-center">
          <div class="text-lg lg:text-2xl leading-6 font-medium text-slate-400 dark:text-slate-0">
            Prefer speaking to someone? Click below to call our office!
          </div>
          <div class="text-base lg:text-xl leading-6 font-medium text-blue-500 dark:text-red-0">
            (954) 252-9980
          </div>
          <div class="text-base lg:text-xl leading-6 font-medium text-blue-500 dark:text-slate-0">
            office@diversifiedhomeinspections.com
          </div>
          <div class="flex items-center justify-center gap-3 mt-3.5">
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
    <div
      v-else
      class="py-10 px-5 lg:p-14 rounded-3xl bg-slate-100 dark:bg-slate-800 flex items-start lg:flex-row flex-col gap-10 lg:gap-[4.5rem]"
    >
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
        <h1 class="text-5xl font-extrabold mb-5">Thank You!</h1>
        <p class="text-xl">Your inspection quote request has been submitted.</p>
        <p class="text-xl">Check your email inbox to find your quote now!</p>

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

  <Dialog
    v-model:visible="serviceInfoDialogVisible"
    modal
    :header="serviceInfoHeader"
    class="w-[40rem]"
  >
    <GeneralInspection
      v-if="selectedInfoService === 'general_inspection'"
      @closeModal="serviceInfoDialogVisible = false"
    />
    <PoolInspection
      v-if="selectedInfoService === 'pool_inspection'"
      @closeModal="serviceInfoDialogVisible = false"
    />
    <RoofInspection
      v-if="selectedInfoService === 'roof_inspection'"
      @closeModal="serviceInfoDialogVisible = false"
    />
    <TermiteInspection
      v-if="selectedInfoService === 'termite_inspection'"
      @closeModal="serviceInfoDialogVisible = false"
    />
    <WindMitigationInspection
      v-if="selectedInfoService === 'wind_mitigation'"
      @closeModal="serviceInfoDialogVisible = false"
    />
    <FourPointInspection
      v-if="selectedInfoService === 'four_point'"
      @closeModal="serviceInfoDialogVisible = false"
    />
    <MoldAirSamples
      v-if="selectedInfoService === 'mold_air_samples'"
      @closeModal="serviceInfoDialogVisible = false"
    />
    <ThermalImagingInspection
      v-if="selectedInfoService === 'thermal_imaging'"
      @closeModal="serviceInfoDialogVisible = false"
    />
    <ExtraStructureInspection
      v-if="selectedInfoService === 'extra_structure_inspection'"
      @closeModal="serviceInfoDialogVisible = false"
    />
    <CrawlspaceInspection
      v-if="selectedInfoService === 'crawlspace_inspection'"
      @closeModal="serviceInfoDialogVisible = false"
    />
    <SeawallInspection
      v-if="selectedInfoService === 'seawall_inspection'"
      @closeModal="serviceInfoDialogVisible = false"
    />
    <DrainPipeInspection
      v-if="selectedInfoService === 'drain_pipe_inspection'"
      @closeModal="serviceInfoDialogVisible = false"
    />
    <AsbestosInspection
      v-if="selectedInfoService === 'asbestos_inspection'"
      @closeModal="serviceInfoDialogVisible = false"
    />
    <LeadBasedPaintInspection
      v-if="selectedInfoService === 'lead_based_paint_inspection'"
      @closeModal="serviceInfoDialogVisible = false"
    />
    <WellWaterInspection
      v-if="selectedInfoService === 'well_water_inspection'"
      @closeModal="serviceInfoDialogVisible = false"
    />
    <CosmeticConditionsInspection
      v-if="selectedInfoService === 'cosmetic_conditions'"
      @closeModal="serviceInfoDialogVisible = false"
    />
  </Dialog>
</template>
<script setup>
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import {
  ProgressBar,
  Message,
  FloatLabel,
  InputMask,
  Checkbox,
  Dialog,
  Textarea,
  Divider,
  Card,
  InputNumber,
  DatePicker,
  Select,
  ProgressSpinner,
} from 'primevue'
import { Form } from '@primevue/forms'
import { onMounted, reactive, ref, computed, nextTick, watch } from 'vue'
import { useAppStore } from '@/stores/appStore'
import { calculateInspectionPrice } from '@/utils/inspectionPriceCalculator.js'

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

const appStore = useAppStore()
const serviceInfoDialogVisible = ref(false)
const selectedInfoService = ref(null)
const serviceInfoHeader = ref(null)
const minDate = ref(new Date())
const today = new Date()
const minTime = ref(new Date(today.setHours(8, 0, 0, 0))) // 8:00 AM
const maxTime = ref(new Date(today.setHours(6, 0, 0, 0))) // 6:00 PM

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

  if (form.step4.selected_package !== 'insurance_only') {
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

const step = ref(1)
const propertySelected = ref(false)
const totalSteps = 6

const progress = computed(() => {
  return Math.round((step.value / totalSteps) * 100)
})

const onSubmitStep1 = ({ valid }) => {
  if (valid) {
    step.value++
    scrollTo('#form-container')
  }
}

const onSubmitStep2 = ({ valid }) => {
  if (valid) {
    step.value++
    nextTick(() => scrollTo('#form-container'))
  }
}

const onSubmitStep3 = ({ valid }) => {
  if (valid) {
    step.value++
    nextTick(() => scrollTo('#progress-bar'))
  }
}

const onSubmitStep4 = (selectedPackage) => {
  form.step4.selected_package = selectedPackage

  // Recalculate selected services based on package and dynamic conditions
  step5Services.value // This triggers the `computed` logic to update `step5.selected_services`.

  step.value++
  nextTick(() => scrollTo('#progress-bar'))
}

const onSubmitStep5 = () => {
  step.value++
  nextTick(() => scrollTo('#progress-bar'))
}

// Generate HTML for team email
function generateContactInformation(step1) {
  return `
        <table border="1" cellspacing="0" cellpadding="5" style="border-collapse: collapse; width: 100%;">
            <tr><th colspan="2" style="text-align: left; background-color: #f2f2f2;">Contact Information</th></tr>
            <tr><td>First Name</td><td>${step1.first_name || 'N/A'}</td></tr>
            <tr><td>Last Name</td><td>${step1.last_name || 'N/A'}</td></tr>
            <tr><td>Email</td><td>${step1.email || 'N/A'}</td></tr>
            <tr><td>Phone Number</td><td>${step1.phone_number || 'N/A'}</td></tr>
        </table>
    `
}

function generatePropertyInformation(step2) {
  return `
        <table border="1" cellspacing="0" cellpadding="5" style="border-collapse: collapse; width: 100%;">
            <tr><th colspan="2" style="text-align: left; background-color: #f2f2f2;">Property Information</th></tr>
            <tr><td>Street Address</td><td>${step2.street_address || 'N/A'}</td></tr>
            <tr><td>Unit Number</td><td>${step2.unit_number || 'N/A'}</td></tr>
            <tr><td>City</td><td>${step2.city || 'N/A'}</td></tr>
            <tr><td>State</td><td>${step2.state || 'N/A'}</td></tr>
            <tr><td>County</td><td>${step2.county || 'N/A'}</td></tr>
            <tr><td>Zip Code</td><td>${step2.zip_code || 'N/A'}</td></tr>
            <tr><td>Property Type</td><td>${step2.property_type.value || 'N/A'}</td></tr>
            <tr><td>Year Built</td><td>${step2.year_built || 'N/A'}</td></tr>
            <tr><td>Square Footage</td><td>${step2.square_footage || 'N/A'}</td></tr>
        </table>
    `
}

function generateExtraFeatures(step3) {
  const features = Object.entries(step3)
    .filter(([key, value]) => value === true)
    .map(([key]) => `<tr><td>${snakeToNormal(key)}</td><td>Yes</td></tr>`)
    .join('')
  return `
        <table border="1" cellspacing="0" cellpadding="5" style="border-collapse: collapse; width: 100%;">
            <tr><th colspan="2" style="text-align: left; background-color: #f2f2f2;">Extra Property Features</th></tr>
            ${features || '<tr><td colspan="2">None</td></tr>'}
        </table>
    `
}

function generateSelectedPackage(step4) {
  return `
        <table border="1" cellspacing="0" cellpadding="5" style="border-collapse: collapse; width: 100%;">
            <tr><th style="text-align: left; background-color: #f2f2f2;">Selected Package</th></tr>
            <tr><td>${step4.selected_package || 'N/A'}</td></tr>
        </table>
    `
}

function generateSelectedServices(step5) {
  const services = Object.entries(step5.selected_services)
    .filter(([key, value]) => value === true)
    .map(([key]) => `<tr><td>${snakeToNormal(key)}</td></tr>`)
    .join('')
  return `
        <table border="1" cellspacing="0" cellpadding="5" style="border-collapse: collapse; width: 100%;">
            <tr><th style="text-align: left; background-color: #f2f2f2;">Selected Services</th></tr>
            ${services || '<tr><td>None</td></tr>'}
        </table>
    `
}

function formatDateTime(dateString) {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)

  // Extract date components
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0') // Months are zero-indexed
  const year = date.getFullYear()

  // Extract time components
  let hours = date.getHours()
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const ampm = hours >= 12 ? 'PM' : 'AM'
  hours = hours % 12 || 12 // Convert 24-hour time to 12-hour time

  // Combine date and time
  return `${month}/${day}/${year} ${hours}:${minutes} ${ampm}`
}

function generatePreferredDates(step6) {
  return `
        <table border="1" cellspacing="0" cellpadding="5" style="border-collapse: collapse; width: 100%;">
            <tr><th colspan="2" style="text-align: left; background-color: #f2f2f2;">Preferred Dates</th></tr>
            <tr><td>Date 1</td><td>${formatDateTime(step6.date_1)}</td></tr>
            <tr><td>Date 2</td><td>${formatDateTime(step6.date_2)}</td></tr>
            <tr><td>Date 3</td><td>${formatDateTime(step6.date_3)}</td></tr>
            <tr><td>Date 4</td><td>${formatDateTime(step6.date_4)}</td></tr>
        </table>
    `
}

function generatePriceQuoted(pricing) {
  const baseBreakdownRows = pricing.breakdown.baseInspection
    .map((item) => `<tr><td>${item.description}</td><td>${item.amount || 'N/A'}</td></tr>`)
    .join('')

  const addOnBreakdownRows = pricing.breakdown.addOns
    .map((item) => `<tr><td>${item.description}</td><td>${item.amount || 'N/A'}</td></tr>`)
    .join('')

  return `
        <table border="1" cellspacing="0" cellpadding="5" style="border-collapse: collapse; width: 100%;">
            <tr><th colspan="2" style="text-align: left; background-color: #f2f2f2;">Price Quoted</th></tr>
            <tr><td style="background-color: #f2f2f2;"><strong>Base Inspection Fee</strong></td><td style="background-color: #f2f2f2;">${pricing.baseInspectionFee || 'N/A'}</td></tr>
            ${baseBreakdownRows}
            <tr><td style="background-color: #f2f2f2;"><strong>Add On Service Cost</strong></td><td style="background-color: #f2f2f2;">${pricing.addOnServiceCost || 'N/A'}</td></tr>
            ${addOnBreakdownRows}
            <tr><td style="background-color: #f2f2f2;"><strong>Total Fee</strong></td><td style="background-color: #f2f2f2;">${pricing.totalFee || 'N/A'}</td></tr>
        </table>
    `
}

// 1) Put near the top of <script setup>
const THANK_YOU_URL = 'https://landing.diversifiedhomeinspections.com/thank-you'

function buildRedirectUrl() {
  const url = new URL(THANK_YOU_URL)
  // Preserve UTM params if you have them in appStore
  ;['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach((k) => {
    if (appStore?.[k]) url.searchParams.set(k, appStore[k])
  })
  return url.toString()
}

function redirectNow() {
  // replace() prevents the user from re-submitting by pressing Back
  window.location.replace(buildRedirectUrl())
}

const onSubmitStep6 = () => {
  step.value++ // Increment the step initially

  const isCommercial = form.step2.property_type === 'commercial' ? true : false

  const inspectionFee = calculateInspectionPrice({
    propertyType: form.step2.property_type.key,
    squareFootage: form.step2.square_footage,
    seawallLength: form.step3.seawall_length,
    bundle: form.step4.selected_package,
    services: form.step5.selected_services,
    zipCode: form.step2.zip_code,
    isCommercial: isCommercial,
  })

  const fullAddress =
    form.step2.street_address +
    (form.step2.unit_number ? ' Unit # ' + form.step2.unit_number : '') +
    ', ' +
    form.step2.city +
    ', ' +
    form.step2.state +
    ' ' +
    form.step2.zip_code

  const filteredServices = Object.keys(form.step5.selected_services)
    .filter((serviceKey) => form.step5.selected_services[serviceKey])
    .map((serviceKey) => snakeToNormal(serviceKey))

  const servicesListHTML = `<ul>${filteredServices.map((service) => `<li>${service}</li>`).join('')}</ul>`

  // Generate HTML for team email
  const htmlContent = `
        <div style="margin-bottom: 20px;">
            ${generateContactInformation(form.step1)}
        </div>
        <div style="margin-bottom: 20px;">
            ${generatePropertyInformation(form.step2)}
        </div>
        <div style="margin-bottom: 20px;">
            ${generateExtraFeatures(form.step3)}
        </div>
        <div style="margin-bottom: 20px;">
            ${generateSelectedPackage(form.step4)}
        </div>
        <div style="margin-bottom: 20px;">
            ${generateSelectedServices(form.step5)}
        </div>
        <div style="margin-bottom: 20px;">
            ${generatePreferredDates(form.step6)}
        </div>
        <div style="margin-bottom: 20px;">
            ${generatePriceQuoted(inspectionFee)}
        </div>
    `

  // Wait for 3 seconds before moving to the next step
  setTimeout(async () => {
    step.value++

    const emailVariables = [
      {
        email: form.step1.email,
        substitutions: {
          first_name: form.step1.first_name,
          property_address: fullAddress,
          square_footage: Number(form.step2.square_footage).toLocaleString(),
          services: servicesListHTML,
          quote: '$' + Number(inspectionFee.totalFee).toFixed(2),
        },
      },
    ]

    const payload = {
      teamEmail: htmlContent,
      mailersend: emailVariables,
      inspectionFee: inspectionFee,
    }

    // THIS ONE
    try {
      const response = await fetch('https://hooks.zapier.com/hooks/catch/5555872/2zr4pdb/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        // Send event to Google Analytics if available
        if (window.gtag) {
          window.gtag('event', 'form_submit', {
            event_category: 'Engagement',
            form_name: 'Request Quote Form',
            page_location: window.location.href, // Include the current page URL
            utm_source: appStore.utm_source || 'N/A',
            utm_medium: appStore.utm_medium || 'N/A',
            utm_campaign: appStore.utm_campaign || 'N/A',
            utm_term: appStore.utm_term || 'N/A',
            utm_content: appStore.utm_content || 'N/A',
            transport_type: 'beacon', // ensure send on unload
            event_callback: () => redirectNow(),
          })
        }
        // Facebook (Meta) pixel
        if (window.fbq) {
          // fbq doesn't reliably support a completion callback, so use a tiny timeout fallback.
          window.fbq('trackCustom', 'form_submit', {
            form_name: 'Request Quote',
            url: window.location.href,
          })
          setTimeout(() => redirectNow(), 150)
        } else {
          // If no fbq, redirect after GA tries; also add a safety fallback
          setTimeout(() => redirectNow(), 150)
        }
      } else {
        // Handle non-OK responses
        const errorText = await response.text()
        console.error('Server responded with an error:', response.status, errorText)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }, 3000)
}

const goBack = () => {
  step.value--
  nextTick(() => scrollTo('#form-container'))
}

const resolver = ({ values }) => {
  const errors = {}

  if (!values.first_name) {
    errors.first_name = [{ message: 'First name is required.' }]
  }
  if (!values.last_name) {
    errors.last_name = [{ message: 'Last name is required.' }]
  }
  if (!values.email) {
    errors.email = [{ message: 'Email is required.' }]
  }
  if (!values.phone_number) {
    errors.phone_number = [{ message: 'Phone number is required.' }]
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
  if (!values.year_built) {
    errors.year_built = [{ message: 'Year built is required.' }]
  }
  if (!values.square_footage) {
    errors.square_footage = [{ message: 'Square footage is required.' }]
  }
  if (!values.square_footage) {
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

watch(step, (newStep) => {
  if (newStep === 2) {
    nextTick(() => {
      if (typeof google === 'undefined' || typeof google.maps === 'undefined') {
        console.error('Google Maps API is not loaded.')
        return
      }

      const input = document.getElementById('street_address')
      if (!input) {
        console.error('Input element is not rendered in the DOM.')
        return
      }

      // Initialize Autocomplete
      autocomplete = new google.maps.places.Autocomplete(input, {
        types: ['address'],
        componentRestrictions: { country: 'us' },
      })

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace()
        extractAddressComponents(place.address_components)
      })
    })
  }
})

onMounted(() => {
  if (form.step1.first_name === '') {
    step.value = 1
  }
})

// Computed property to check eligibility
const newConstructionEligible = computed(() => {
  const currentYear = new Date().getFullYear()
  return form.step2.year_built >= currentYear - 2
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
