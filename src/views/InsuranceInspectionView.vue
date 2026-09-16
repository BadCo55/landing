<template>
  <div class="p-6 lg:p-20 !pb-10 text-center bg-gradient-to-t from-blue-500/10 dark:from-blue-500/0 from-10% to-transparent flex flex-col items-center">
    <div class="bg-blue-100 dark:bg-blue-400/20 text-blue-700 dark:text-blue-100 p-2 mx-auto mb-6 rounded-full border border-blue-200 dark:border-blue-500/30 px-4 backdrop-blur-sm">
        🔥 Save BIG Now
    </div>
    <div class="mb-5">
      <img :src="appStore.logoSrc" class="w-64" alt="">
    </div>
    <div class="text-4xl lg:text-5xl text-slate-700 dark:text-slate-200 dark:text-slate-0 font-bold mb-1 leading-tight">Save <span class="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">thousands</span> on Home Insurance</div>
    <div class="text-2xl lg:text-4xl text-blue-500 font-bold leading-tight italic">Fast, Reliable & Approved By All Providers!</div>
    <div class="text-lg lg:text-xl text-slate-700 dark:text-slate-200 font-light my-5 leading-tight ">Whether you're renewing your policy or shopping for better insurance rates, most providers require a Wind Mitigation or 4-Point Inspection.</div>
    <div class="text-lg lg:text-xl text-slate-700 dark:text-slate-200 font-light mb-6 leading-tight ">We provide fast, certified reports accepted by all insurers.</div>
    <Button type="button" label="Get Your Report Now" icon="pi pi-arrow-right" icon-pos="right" @click="router.push('/request-quote')" />
    <div class="w-full grow flex items-start justify-center rounded-t-3xl mt-12 overflow-hidden">
        <div class="overflow-hidden w-full aspect-[720/295] max-w-[720px] rounded-t-3xl shadow-2xl border border-b-0 border-primary-100 dark:border-primary-400/30">
            <img src="@/assets/img/four-point.png" alt="Image" class="block w-full object-cover object-top rounded-t-3xl" />
        </div>
    </div>
  </div>

  <div class="bg-surface-0">
        <div class="shadow flex items-center gap-4 lg:gap-6 justify-between content-center flex-col lg:flex-row py-4 px-12 bg-[#DC2626]">
            <div class="relative order-1 flex items-center justify-center sm:justify-between gap-6 flex-wrap w-full lg:w-auto">
                <span class="font-semibold text-3xl text-surface-0"> $25 Off Sale Ends </span>
                <div class="flex lg:hidden items-center gap-6 min-w-40">
                    <Button label="Schedule Now" icon="pi pi-arrow-right" icon-pos="right" rounded severity="secondary" class="sm:!w-auto !w-full" />
                    <!-- <Button icon="pi pi-times" text rounded severity="secondary" class="absolute -right-5 top-0 sm:relative" /> -->
                </div>
            </div>

            <div id="flipclock-1" class="flex justify-center box-border order-2 lg:order-2 p-3 pb-4 [>*]:box-inherit">
                <div
                    v-for="(unit, index) in units"
                    :key="index"
                    class="flex flex-col mx-[0.37rem] text-[1.75rem] [perspective:300px;] font-bold after:content-[attr(data-label)] after:absolute after:top-full after:left-1/2 after:mt-1 after:w-full after:text-center after:text-[0.75rem] after:font-medium after:text-surface-0 after:uppercase after:-translate-x-1/2 [&.flip_:nth-child(3)]:[transform:rotateX(-180deg)] [&.flip_:nth-child(4)]:[transform:rotateX(0)] [&.flip_:nth-child(4)]:!delay-150 [&:not(.flip)_:nth-child(3)]:!transition-none [&:not(.flip)_:nth-child(4)]:!transition-none [&:not(.flip)_:nth-child(4)]:[transform:rotateX(90deg)]"
                    :class="{ flip: unit.flip }"
                    :data-label="unit.label"
                >
                    <div class="rounded-tl-[0.285rem] rounded-tr-[0.285rem] mb-[.5px] relative block h-[1.35rem] w-[3.28rem] bg-surface-100 text-surface-900 overflow-hidden border-surface-400/20">
                        <span class="absolute top-0 left-1/2 w-full h-[2.7rem] text-center text-2xl leading-[2.7rem] -translate-x-1/2">{{ unit.value }}</span>
                    </div>
                    <div class="rounded-bl-[0.285rem] rounded-br-[0.285rem] border-t-[.5px] relative block h-[1.35rem] w-[3.28rem] bg-surface-100 text-surface-900 overflow-hidden border-surface-400/20">
                        <span class="absolute bottom-0 left-1/2 w-full h-[2.7rem] text-center text-2xl leading-[2.7rem] -translate-x-1/2">{{ unit.value }}</span>
                    </div>
                    <div
                        class="rounded-tl-[0.285rem] rounded-tr-[0.285rem] mb-px absolute origin-bottom rotate-x-0 preserve-3d transition-transform duration-300 backface-hidden ease-in-out block h-[1.35rem] w-[3.28rem] bg-surface-100 text-surface-900 overflow-hidden border-surface-400/20"
                    >
                        <span class="absolute top-0 left-1/2 w-full h-[2.7rem] text-center text-2xl leading-[2.7rem] -translate-x-1/2">{{ unit.value }}</span>
                    </div>
                    <div
                        class="rounded-bl-[0.285rem] rounded-br-[0.285rem] border-t-[.5px] absolute top-[1.35rem] origin-top rotate-x-90 preserve-3d transition-transform duration-300 ease-in-out backface-hidden block h-[1.35rem] w-[3.28rem] bg-surface-100 text-surface-900 overflow-hidden border-surface-400/20"
                    >
                        <span class="absolute bottom-0 left-1/2 w-full h-[2.7rem] text-center text-2xl leading-[2.7rem] -translate-x-1/2">{{ unit.nextValue }}</span>
                    </div>
                </div>
            </div>
            <div class="hidden lg:flex items-center gap-12 order-3">
                <Button label="Schedule Now" icon="pi pi-arrow-right" icon-pos="right" rounded severity="secondary" />
                <!-- <Button icon="pi pi-times" text rounded severity="secondary" class="!text-surface-0 hover:!bg-surface-500/20" /> -->
            </div>
        </div>
    </div>


  <div class="text-center flex flex-col bg-gradient-to-b from-blue-500/10 dark:from-blue-500/0 from-10% to-transparent items-center pt-10 mb-5">
    <div class="text-xl lg:text-2xl text-slate-700 dark:text-slate-0 font-bold mx-8 gap-2 bg-white p-2 rounded-lg shadow flex flex-row items-center">
      <i class="fa-solid fa-lightbulb text-yellow-500" style="font-size: 2rem"></i>
      <p>
        What Are These Inspections & Why Do You Need Them?
      </p>
    </div>
    <div class="mt-5  p-5">
      <div class="inline-flex items-center gap-2">
        <div class="border rounded-lg bg-white p-2 my-auto flex">
          <i class="fa-solid fa-shield text-blue-500" style="font-size: 1.2rem" />
        </div>
        <p class="text-2xl font-bold text-slate-700">Wind Mitigation</p>
      </div>
      <div class="my-5">
        <i class="pi pi-arrow-down text-blue-500" style="font-size: 1.5rem; font-weight: bold"></i>
      </div>
      <p class="font-light italic">Can lower your insurance costs by providing your home is hurricane-ready.</p>
    </div>
    <div class="mt-5  p-5">
      <div class="inline-flex items-center gap-2">
        <div class="border rounded-lg bg-white p-2 my-auto flex">
          <i class="fa-solid fa-wrench text-blue-500" style="font-size: 1.2rem" />
        </div>
        <p class="text-2xl font-bold text-slate-700">4-Point</p>
      </div>
      <div class="my-5">
        <i class="pi pi-arrow-down text-blue-500" style="font-size: 1.5rem; font-weight: bold"></i>
      </div>
      <p class="font-light italic">Required for older homes and to qualify for insurance coverage <span class="font-medium">(Roof, HVAC, Plumbing, Electrical)</span></p>
    </div>
  </div>

  <div
      class="bg-red-900 p-5 flex justify-center md:justify-end bg-no-repeat bg-cover md:bg-contain bg-[url('/src/assets/img/cta-fade.png')] h-[400px] items-center"
  >
      <div class="px-2 text-center lg:text-start">
          <div class="text-white font-bold text-3xl">Not Sure If Your Home Qualifies?</div>
          <div class="text-white font-medium text-2xl mb-5">Check Out our <span class="italic">FREE</span> Insurance Inspection Guide</div>
          <!-- <div class="mt-4 mb-8 text-gray-200 font-medium leading-normal">{{ tagline }}</div> -->
          <div class="flex flex-col lg:flex-row gap-5">
                <Button label="Get My Guide Now!" class="w-full lg:w-auto dark:!text-white" severity="info" as="a" href="https://diversifiedhomeinspections.com/services/insurance-inspections/" />
                <Button
                  as="a"
                  href="tel:+19542529980"
                  class="w-full lg:w-auto dark:!text-white"
                >
                    <div class="flex flex-col items-center">
                        <p>Call Now:</p>
                        <p>(954) 252-9980</p>
                    </div>
                </Button>
                <Button severity="success" label="Schedule My Inspection!" class="dark:!text-white font-bold !text-xl" raised @click="router.push({name: 'request-quote', query: { discount: '25off' }})" />
          </div>
      </div>
  </div>

  <div class="bg-surface-50 dark:bg-surface-950 px-6 pb-12 pt-10 lg:pt-[121px] lg:pb-20 lg:px-20">
        <div class="flex flex-col lg:flex-row gap-16 lg:gap-10">
            <div v-for="(testimonial, index) in testimonials" :key="index" class="flex flex-1 relative pt-12 lg:pt-0">
                <div class="bg-surface-0 dark:bg-surface-900 rounded-xl shadow-sm w-full">
                    <i
                      class="fa-solid fa-quote-right absolute w-[98px] h-[98px] rounded-full border-4 border-slate-100 bg-white p-2 text-slate-200 dark:border-surface-900 shadow-sm left-1/2 -translate-x-1/2 -translate-y-1/2"
                    />
                    <div class="flex flex-col gap-8 p-8 pt-[70px]">
                        <p class="text-lg text-surface-700 dark:text-surface-0/70 leading-normal">{{ testimonial.text }}</p>

                        <div class="flex flex-col items-center gap-2">
                            <h3 class="text-base font-medium text-surface-900 dark:text-surface-0 leading-tight">{{ testimonial.name }}</h3>
                            <p class="text-base text-surface-500 dark:text-surface-400 leading-tight">{{ testimonial.title }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="bg-surface-50 dark:bg-surface-950 px-6 py-20 md:px-12 lg:px-20">
        <div class="flex flex-col gap-4 items-center justify-center mb-12">
            <div class="text-surface-900 dark:text-surface-0 font-bold text-4xl lg:text-5xl text-center leading-tight">Pricing Plans</div>
            <div class="text-surface-500 dark:text-surface-400 text-lg text-center leading-normal">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit numquam eligendi quos.</div>
        </div>

        <div class="flex lg:flex-row flex-col gap-8 max-w-7xl mx-auto">
            <div class="w-full flex-1 p-8 flex rounded-2xl flex-col bg-surface-0 dark:bg-surface-800 shadow-sm gap-6">
                <div class="flex flex-col gap-2">
                    <h4 class="text-surface-900 dark:text-surface-0 font-medium text-xl leading-tight">Insurance Package</h4>
                    <p class="text-surface-500 dark:text-surface-400 leading-normal">Everything you need to update or obtain your insurance coverage!</p>
                </div>

                <div class="w-full h-px bg-surface-200 dark:bg-surface-700" />
                <div class="flex items-center gap-2">
                    <span class="font-semibold text-2xl text-surface-400 dark:text-surface-0 line-through decoration-2 decoration-rose-500 leading-tight">$300.00</span>
                    <span class="text-3xl font-bold text-emerald-600">$275.00</span>

                </div>
                <div class="w-full h-px bg-surface-200 dark:bg-surface-600" />
                <ul class="list-none flex flex-col gap-4 flex-1">
                    <li class="flex items-center gap-2">
                        <i class="pi pi-check-circle !text-lg text-green-500" />
                        <span class="text-surface-800 dark:text-surface-100 leading-tight"> Wind Mitigation Inspection </span>
                    </li>
                    <li class="flex items-center gap-2">
                        <i class="pi pi-check-circle !text-lg text-green-500" />
                        <span class="text-surface-800 dark:text-surface-100 leading-tight"> 4-Point Inspection </span>
                    </li>
                    <li class="flex items-center gap-2">
                        <i class="pi pi-check-circle !text-lg text-green-500" />
                        <span class="text-surface-800 dark:text-surface-100 leading-tight"> FREE Report Updates </span>
                    </li>
                </ul>
                <Button label="Buy Now" rounded class="w-full" />
            </div>
            <div class="w-full flex-1 p-8 flex rounded-2xl flex-col bg-surface-0 dark:bg-surface-800 shadow-sm gap-6">
                <div class="flex flex-col gap-2">
                    <h4 class="text-surface-900 dark:text-surface-0 font-medium text-xl leading-tight"> Wind Mitigation Only </h4>
                    <p class="text-surface-500 dark:text-surface-400 leading-normal">New roof or impact windows? Get your insurance discount with this inspection!</p>
                </div>

                <div class="w-full h-px bg-surface-200 dark:bg-surface-700" />
                <div class="flex items-center gap-2">
                    <span class="font-semibold text-2xl text-surface-400 dark:text-surface-0 line-through decoration-2 decoration-rose-500 leading-tight">$150.00</span>
                    <span class="text-3xl font-bold text-emerald-600">$125.00</span>
                </div>
                <div class="w-full h-px bg-surface-200 dark:bg-surface-600" />
                <ul class="list-none flex flex-col gap-4 flex-1">
                    <li class="flex items-center gap-2">
                        <i class="pi pi-check-circle !text-lg text-green-500" />
                        <span class="text-surface-800 dark:text-surface-100 leading-tight"> Code Compliance </span>
                    </li>
                    <li class="flex items-center gap-2">
                        <i class="pi pi-check-circle !text-lg text-green-500" />
                        <span class="text-surface-800 dark:text-surface-100 leading-tight"> Secondary Water Resistance </span>
                    </li>
                    <li class="flex items-center gap-2">
                        <i class="pi pi-check-circle !text-lg text-green-500" />
                        <span class="text-surface-800 dark:text-surface-100 leading-tight"> Roof-to-Wall Attachment </span>
                    </li>
                    <li class="flex items-center gap-2">
                        <i class="pi pi-check-circle !text-lg text-green-500" />
                        <span class="text-surface-800 dark:text-surface-100 leading-tight"> Opening Protection </span>
                    </li>
                </ul>
                <Button label="Buy Now" rounded class="w-full" />
            </div>
            <div class="w-full flex-1 p-8 flex rounded-2xl flex-col bg-surface-0 dark:bg-surface-800 shadow-sm gap-6">
                <div class="flex flex-col gap-2">
                    <h4 class="text-surface-900 dark:text-surface-0 font-medium text-xl leading-tight">4-Point Only</h4>
                    <p class="text-surface-500 dark:text-surface-400 leading-normal">Shopping a new insurance carrier? Get this inspection to show your home qualifies!</p>
                </div>

                <div class="w-full h-px bg-surface-200 dark:bg-surface-700" />
                <div class="flex items-center gap-3">
                    <span class="font-semibold text-2xl text-surface-400 dark:text-surface-0 line-through decoration-2 decoration-rose-500 leading-tight">$150.00</span>
                    <span class="text-3xl font-bold text-emerald-600">$125.00</span>
                </div>
                <div class="w-full h-px bg-surface-200 dark:bg-surface-600" />
                <ul class="list-none flex flex-col gap-4 flex-1">
                    <li class="flex items-center gap-2">
                        <i class="pi pi-check-circle !text-lg text-green-500" />
                        <span class="text-surface-800 dark:text-surface-100 leading-tight"> Roof System </span>
                    </li>
                    <li class="flex items-center gap-2">
                        <i class="pi pi-check-circle !text-lg text-green-500" />
                        <span class="text-surface-800 dark:text-surface-100 leading-tight"> HVAC System </span>
                    </li>
                    <li class="flex items-center gap-2">
                        <i class="pi pi-check-circle !text-lg text-green-500" />
                        <span class="text-surface-800 dark:text-surface-100 leading-tight"> Plumbing System </span>
                    </li>
                    <li class="flex items-center gap-2">
                        <i class="pi pi-check-circle !text-lg text-green-500" />
                        <span class="text-surface-800 dark:text-surface-100 leading-tight"> Appliances </span>
                    </li>
                </ul>
                <Button label="Buy Now" rounded class="w-full" />
            </div>
        </div>
    </div>

</template>
<script setup>
import { Button } from 'primevue';
import { ref, onMounted, onUnmounted } from 'vue';
import { useAppStore } from '@/stores/appStore';
import { useRouter, useRoute } from 'vue-router';

const appStore = useAppStore();

const testimonials = [
  {
    text: 'Great people to work with. I used them about 4 times now. They are timely, quick and efficient. The insurance companies in Florida are always asking for inspections either a 4pt - roof certification or some other type of thing about every year now it seems. Every time I call Diversified. Natalie answers the phone, gets me an appointment ASAP and we get all the documentation I need quickly. Thanks again guys ! I will probably be calling you again next year ...',
    name: 'Brendan N',
    title: 'Homeowner'
  },
  {
    text: 'As a Mortgage Advisor many of my clients often have a need for inspections. I find Chris at Diversified Home Inspection to be knowledge, prompt and professional. His reports are well organized and to the point. I never hesitate in recommending Chris at Diversified.',
    name: 'Brad Greenleaf',
    title: 'Mortgage Advisor'
  },
  {
    text: 'Amazing Company, professional, on-time, answered all of my questions. Report was easy to read. Best Home Inspection Company out there. Chris is a great guy and knows his stuff. Highly recommend them.',
    name: 'Nicholas Wolfsy',
    title: 'Homeowner'
  }
]

const SECONDS_PER_DAY = 24 * 60 * 60;
const SECONDS_PER_HOUR = 60 * 60;
const SECONDS_PER_MINUTE = 60;

const router = useRouter();

const units = ref([
    { label: 'Hour', value: '00', nextValue: '00', flip: false },
    { label: 'Min', value: '00', nextValue: '00', flip: false },
    { label: 'Sec', value: '00', nextValue: '00', flip: false }
]);

const getStoredEndDate = () => {
    const storedTime = localStorage.getItem("countdownEndTime");
    return storedTime ? new Date(parseInt(storedTime)) : null;
};

const setStoredEndDate = (date) => {
    localStorage.setItem("countdownEndTime", date.getTime().toString());
};

let endDate = ref(getStoredEndDate());

if (!endDate.value || endDate.value <= new Date()) {
    // Set a new countdown only if there's no stored endDate or it has expired
    const newEndDate = new Date();
    newEndDate.setTime(newEndDate.getTime() + 3 * SECONDS_PER_HOUR * 1000);
    endDate.value = newEndDate;
    setStoredEndDate(newEndDate);
}

let timer;

const updateCountdown = () => {
    const now = new Date();
    let diff = Math.floor((endDate.value - now) / 1000); // Get time difference in seconds

    if (diff <= 0) {
        clearInterval(timer);
        diff = 0; // Stop at 0, don’t reset
    }

    const timeUnits = [
        Math.floor(diff / SECONDS_PER_HOUR),
        Math.floor((diff % SECONDS_PER_HOUR) / SECONDS_PER_MINUTE),
        diff % SECONDS_PER_MINUTE
    ].map(value => value.toString().padStart(2, '0'));

    timeUnits.forEach((newValue, index) => updateUnit(index, newValue));
};

const updateUnit = (index, newValue) => {
    const unit = units.value[index];

    if (unit.value === newValue) return; // Only update when value actually changes

    unit.nextValue = unit.value;
    unit.flip = true;

    setTimeout(() => {
        unit.value = newValue;
        unit.flip = false;
    }, 250);
};

onMounted(() => {
    updateCountdown();
    timer = setInterval(updateCountdown, 1000);
});

onUnmounted(() => {
    clearInterval(timer);
});

const requestQuoteClick = (action, label, page) => {
    if (window.gtag) {
        window.gtag('event', action, {
            category: 'Button Click',
            label: label,
            page_location: window.location.href,
            page: page,
        });
    }
    if (window.fbq) {
        window.fbq('trackCustom', `${action}_click`, {
            button_label: label,
            page_name: page,
            url: window.location.href,
        })
    }
    router.push('/request-quote');
}

</script>
