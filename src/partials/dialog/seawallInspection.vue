<template>
    <div class="flex flex-col dark:text-surface-400">
        <div>
            <p>
                Our Seawall Inspection is conducted by a licensed seawall contractor, ensuring expert evaluation of the structural integrity and functionality of your seawall. 
            </p>
            <p class="mt-3">
                As a critical barrier protecting your property from water damage and erosion, your seawall requires a professional assessment to identify potential issues and extend its lifespan. 
            </p>
        </div>
        <p class="mt-3 font-bold">
            Key areas inspected during the Seawall Inspection include:
        </p>
        <ul class="mt-5">
            <li class="mb-2">
                <div class="flex items-start">
                    <i class="pi pi-check-circle text-green-500 pe-2 mt-[0.4rem]"></i>
                    <p>
                        <span><strong>Structural Integrity:</strong> Assess the condition of support beams, floor joists, and other structural components.</span>
                    </p>
                </div>
            </li>
            <li class="mb-2">
                <div class="flex items-start">
                    <i class="pi pi-check-circle text-green-500 pe-2 mt-[0.4rem]"></i>
                    <p>
                        <span><strong>Erosion and Washout:</strong> Identification of soil loss or undermining behind or around the seawall.</span>
                    </p>
                </div>
            </li>
            <li class="mb-2">
                <div class="flex items-start">
                    <i class="pi pi-check-circle text-green-500 pe-2 mt-[0.4rem]"></i>
                    <p>
                        <span><strong>Drainage Systems:</strong> Inspection of weep holes, filters, and other drainage mechanisms to ensure proper water flow and pressure balance.</span>
                    </p>
                </div>
            </li>
            <li class="mb-2">
                <div class="flex items-start">
                    <i class="pi pi-check-circle text-green-500 pe-2 mt-[0.4rem]"></i>
                    <p>
                        <span><strong>Waterline and Cap:</strong> Evaluation of the area where the seawall meets the water and the cap for signs of wear, corrosion, or damage.</span>
                    </p>
                </div>
            </li>
            <li class="mb-2">
                <div class="flex items-start">
                    <i class="pi pi-check-circle text-green-500 pe-2 mt-[0.4rem]"></i>
                    <p>
                        <span><strong>Vegetation and Marine Growth:</strong> Check for overgrowth that may impact the seawall’s stability or cause premature wear.</span>
                    </p>
                </div>
            </li>
        </ul>
        <Card class="mt-5 !bg-surface-100 dark:!bg-surface-700 dark:!text-surface-200">
            <template #content>
                <p class="font-bold mb-3">Why Include a Seawall Inspection?</p>
                <ul class="leading-relaxed">
                    <li>
                        <div class="flex items-start">
                            <i class="pi pi-check-circle text-green-500 pe-2 mt-[0.4rem]"></i>
                            <p>
                                <span>Identify potential weaknesses before they lead to costly repairs or catastrophic failure.</span>
                            </p>
                        </div>
                    </li>
                    <li>
                        <div class="flex items-start">
                            <i class="pi pi-check-circle text-green-500 pe-2 mt-[0.4rem]"></i>
                            <p>
                                <span>Extend the lifespan of your seawall with timely maintenance and repairs.</span>
                            </p>
                        </div>
                    </li>
                    <li>
                        <div class="flex items-start">
                            <i class="pi pi-check-circle text-green-500 pe-2 mt-[0.4rem]"></i>
                            <p>
                                <span>Protect your property from erosion, flooding, and water intrusion.</span>
                            </p>
                        </div>
                    </li>
                </ul>
            </template>
        </Card>
        <div class="my-5">
            <p>
                Our licensed seawall contractor provides a detailed evaluation to safeguard your waterfront property, offering the expertise and insight needed to protect your investment and peace of mind.
            </p>
        </div>
        <div class="flex justify-end">
            <Button label="Close" severity="contrast" @click="$emit('closeModal')" />
        </div>
    </div>
</template>

<script setup>
import { Card, Button } from 'primevue';
</script>