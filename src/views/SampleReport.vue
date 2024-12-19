<template>
    <div class="flex flex-col min-h-screen p-5 lg:p-10">
        <div class="flex flex-col-reverse lg:flex-col xl:flex-row gap-5 lg:gap-10 mb-10">
            <!-- First two pages side-by-side -->
            <div class="flex-1 justify-center gap-5 mx-auto">
                <div class="flex gap-5">
                    <div>
                        <p class="text-center font-medium text-2xl mb-3 bg-slate-100 dark:bg-slate-800 rounded-lg">Page 1</p>
                        <img src="/img/report/asset1.svg" alt="Page 01" class="w-full rounded-lg shadow-lg bg-white border" />
                    </div>
                    <div>
                        <p class="text-center font-medium text-2xl mb-3 bg-slate-100 dark:bg-slate-800 rounded-lg">Page 2</p>
                        <img src="/img/report/asset2.svg" alt="Page 02" class="w-full rounded-lg shadow-lg bg-white border" />
                    </div>
                    <div>
                        <p class="text-center font-medium text-2xl mb-3 bg-slate-100 dark:bg-slate-800 rounded-lg">Page 3</p>
                        <img src="/img/report/asset3.svg" alt="Page 02" class="w-full rounded-lg shadow-lg bg-white border" />
                    </div>
                </div>
            </div>
            <!-- Remaining content -->
            <div class="flex-1 bg-white dark:bg-slate-800 rounded-xl mb-auto">
                <div class="flex flex-col p-5">
                    <Skeleton height="2rem" width="100%" class="mb-2"></Skeleton>
                    <Skeleton width="100%" class="mb-2"></Skeleton>
                    <Skeleton width="100%" class="mb-2"></Skeleton>
                    <Skeleton width="100%" class="mb-2"></Skeleton>
                    <Skeleton width="100%" height="4rem" class="mb-2"></Skeleton>
                    <Skeleton width="100%" class="mb-2"></Skeleton>
                    <Skeleton width="100%" class="mb-2"></Skeleton>
                    <Skeleton width="100%" class="mb-2"></Skeleton>
                </div>
            </div>
        </div>
        <p class="text-center font-medium text-2xl mb-5 bg-slate-100 dark:bg-slate-800 rounded-xl p-2">The Next 10-15 Pages: <span class="font-extralight">What Matters Most</span></p>
        <div class="flex flex-col xl:flex-row gap-5 lg:gap-10 mb-10">
            <!-- Remaining content -->
            <div class="flex-1 bg-white dark:bg-slate-800 rounded-xl mb-auto">
                <div class="flex flex-col p-5">
                    <Skeleton height="2rem" width="100%" class="mb-2"></Skeleton>
                    <Skeleton width="100%" class="mb-2"></Skeleton>
                    <Skeleton width="100%" class="mb-2"></Skeleton>
                    <Skeleton width="100%" class="mb-2"></Skeleton>
                    <Skeleton width="100%" height="4rem" class="mb-2"></Skeleton>
                    <Skeleton width="100%" class="mb-2"></Skeleton>
                    <Skeleton width="100%" class="mb-2"></Skeleton>
                    <Skeleton width="100%" class="mb-2"></Skeleton>
                </div>
            </div>
            <!-- Images Container -->
            <div class="flex-1 justify-center mx-auto w-full bg-gray-200 dark:bg-slate-800 rounded-xl p-5">
                <!-- PrimeVue Carousel for mobile devices -->
                <div class="w-full lg:w-1/2 overflow-hidden justify-center mx-auto">
                    <Galleria
                        :value="galleryData"
                        :circular="true"
                        :numVisible="3"
                    >
                        <template #item="slotProps">
                            <img :src="slotProps.item.image" alt="" class="border rounded-t-lg bg-white ">
                        </template>
                        <template #thumbnail="slotProps">
                            <img :src="slotProps.item.image" width="80%" class="bg-white space-y-5 rounded-xs" alt="">
                        </template>
                    </Galleria>
                </div>
            </div>
        </div>
        <p class="text-center font-medium text-2xl mb-5 bg-slate-100 dark:bg-slate-800 rounded-xl p-2">Then: <span class="font-extralight">Deficiency Photos</span></p>
        <div class="flex flex-col-reverse lg:flex-col xl:flex-row gap-5 lg:gap-10 mb-10">
            <!-- Images Container -->
            <div class="flex-1 justify-center mx-auto w-full bg-gray-200 dark:bg-slate-800 rounded-xl p-5">
                <!-- PrimeVue Carousel for mobile devices -->
                <div class="w-full lg:w-1/2 overflow-hidden justify-center mx-auto">
                    <Galleria
                    :value="imagePagePaths"
                    :circular="true"
                    :numVisible="3"
                    >
                    <template #item="slotProps">
                        <img :src="slotProps.item" alt="" class="border rounded-t-lg bg-white ">
                    </template>
                    <template #thumbnail="slotProps">
                        <img :src="slotProps.item" width="80%" class="bg-white space-y-5 rounded-xs" alt="">
                    </template>
                </Galleria>
            </div>
        </div>
        <!-- Remaining content -->
        <div class="flex-1 bg-white dark:bg-slate-800 rounded-xl mb-auto">
            <div class="flex flex-col p-5">
                <Skeleton height="2rem" width="100%" class="mb-2"></Skeleton>
                <Skeleton width="100%" class="mb-2"></Skeleton>
                <Skeleton width="100%" class="mb-2"></Skeleton>
                <Skeleton width="100%" class="mb-2"></Skeleton>
                <Skeleton width="100%" height="4rem" class="mb-2"></Skeleton>
                <Skeleton width="100%" class="mb-2"></Skeleton>
                <Skeleton width="100%" class="mb-2"></Skeleton>
                <Skeleton width="100%" class="mb-2"></Skeleton>
            </div>
        </div>
        </div>

        <p class="text-center font-medium text-2xl mb-5 bg-slate-100 dark:bg-slate-800 rounded-xl p-2">Finally: <span class="font-extralight">Vendor Reports</span></p>

    </div>
</template>

<script setup>
import { Skeleton, Galleria } from 'primevue';
// import asset4 from '@/assets/img/report/asset4.svg';
// import asset5 from '@/assets/img/report/asset5.svg';
// import asset6 from '@/assets/img/report/asset6.svg';
// import asset7 from '@/assets/img/report/asset7.svg';
// import asset8 from '@/assets/img/report/asset8.svg';
// import asset9 from '@/assets/img/report/asset9.svg';
// import asset10 from '@/assets/img/report/asset10.svg';
// import asset11 from '@/assets/img/report/asset11.svg';
// import asset12 from '@/assets/img/report/asset12.svg';
// import asset13 from '@/assets/img/report/asset13.svg';

// import image1 from '@/assets/img/report/report-images-01.png';
// import image2 from '@/assets/img/report/report-images-02.png';
// import image3 from '@/assets/img/report/report-images-03.png';
// import image4 from '@/assets/img/report/report-images-04.png';
// import image5 from '@/assets/img/report/report-images-05.png';
// import image6 from '@/assets/img/report/report-images-06.png';
// import image7 from '@/assets/img/report/report-images-07.png';
// import image8 from '@/assets/img/report/report-images-08.png';
// import image9 from '@/assets/img/report/report-images-09.png';
// import image10 from '@/assets/img/report/report-images-10.png';
// import image11 from '@/assets/img/report/report-images-11.png';

const imagePaths = [
  "/img/report/asset4.svg",
  "/img/report/asset5.svg",
  "/img/report/asset6.svg",
  "/img/report/asset7.svg",
  "/img/report/asset8.svg",
  "/img/report/asset9.svg",
  "/img/report/asset10.svg",
  "/img/report/asset11.svg",
  "/img/report/asset12.svg",
  "/img/report/asset13.svg",
];
// const imagePaths = [
//     asset4,
//     asset5,
//     asset6,
//     asset7,
//     asset8,
//     asset9,
//     asset10,
//     asset11,
//     asset12,
//     asset13,
// ];

const imagePagePaths = [
  "/img/report/report-images-01.png",
  "/img/report/report-images-02.png",
  "/img/report/report-images-03.png",
  "/img/report/report-images-04.png",
  "/img/report/report-images-05.png",
  "/img/report/report-images-06.png",
  "/img/report/report-images-07.png",
  "/img/report/report-images-08.png",
  "/img/report/report-images-09.png",
  "/img/report/report-images-10.png",
  "/img/report/report-images-11.png",
];
// const imagePagePaths = [
//     image1,
//     image2,
//     image3,
//     image4,
//     image5,
//     image6,
//     image7,
//     image8,
//     image9,
//     image10,
//     image11,
// ];

const captions = [
  "Page 4 - Grounds & Sprinklers",
  "Page 5 - General Roof & Attic",
  "Page 6 - Electrical",
  "Page 7 - HVAC, Heat & Fireplace",
  "Page 8 - Plumbing",
  "Page 9 - Plumbing (continued)",
  "Page 10 - Appliances",
  "Page 11 - Structural",
  "Page 12 - Structural (continued)",
  "Page 13 - Estimate Totals",
];

const galleryData = imagePaths.map((image, index) => ({
  image,
  caption: captions[index],
}));

</script>