<template>
    <div class="flex flex-col dark:text-surface-400">
        <div>
            <p>
                Our Drain Pipe Camera Inspection, conducted by a licensed plumber, utilizes advanced camera technology to visually inspect the interior condition of your property's drain and sewer pipes. 
            </p>
            <p class="mt-3">
                This inspection identifies hidden issues within your plumbing system that can lead to costly repairs if left untreated.
            </p>
        </div>
        <p class="mt-3 font-bold">
            Key areas assessed during the Drain Pipe Camera Inspection include:
        </p>
        <ul class="mt-5">
            <li class="mb-2">
                <div class="flex items-start">
                    <i class="pi pi-check-circle text-green-500 pe-2 mt-[0.4rem]"></i>
                    <p>
                        <span><strong>Blockages:</strong> Detection of clogs caused by grease, debris, or foreign objects obstructing water flow.</span>
                    </p>
                </div>
            </li>
            <li class="mb-2">
                <div class="flex items-start">
                    <i class="pi pi-check-circle text-green-500 pe-2 mt-[0.4rem]"></i>
                    <p>
                        <span><strong>Leaks and Cracks:</strong> Identification of fractures, leaks, or misalignments in the pipe system.</span>
                    </p>
                </div>
            </li>
            <li class="mb-2">
                <div class="flex items-start">
                    <i class="pi pi-check-circle text-green-500 pe-2 mt-[0.4rem]"></i>
                    <p>
                        <span><strong>Root Intrusion:</strong> Assessment of tree roots penetrating pipes, which can cause significant damage over time.</span>
                    </p>
                </div>
            </li>
            <li class="mb-2">
                <div class="flex items-start">
                    <i class="pi pi-check-circle text-green-500 pe-2 mt-[0.4rem]"></i>
                    <p>
                        <span><strong>Material Degradation:</strong> Inspection for corrosion, scaling, or wear in cast iron, PVC, or other pipe materials.</span>
                    </p>
                </div>
            </li>
            <li class="mb-2">
                <div class="flex items-start">
                    <i class="pi pi-check-circle text-green-500 pe-2 mt-[0.4rem]"></i>
                    <p>
                        <span><strong>Joint Integrity:</strong> Verification of secure pipe connections and joints to ensure structural soundness.</span>
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
                                <span>Early detection of issues can prevent costly repairs or replacements.</span>
                            </p>
                        </div>
                    </li>
                    <li>
                        <div class="flex items-start">
                            <i class="pi pi-check-circle text-green-500 pe-2 mt-[0.4rem]"></i>
                            <p>
                                <span>Provides detailed insights into your plumbing system's condition.</span>
                            </p>
                        </div>
                    </li>
                    <li>
                        <div class="flex items-start">
                            <i class="pi pi-check-circle text-green-500 pe-2 mt-[0.4rem]"></i>
                            <p>
                                <span>Ensures proper water flow and functionality of your drainage system.</span>
                            </p>
                        </div>
                    </li>
                </ul>
            </template>
        </Card>
        <div class="my-5">
            <p>
                Our Drain Pipe Camera Inspection offers peace of mind by uncovering hidden issues and helping you address them proactively. 
            </p>
            <p class="mt-3">
                With clear visuals, expert analysis, and the oversight of a licensed plumber, you gain the confidence to make informed decisions about your property’s plumbing health.
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