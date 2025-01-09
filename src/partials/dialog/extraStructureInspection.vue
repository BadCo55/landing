<template>
    <div class="flex flex-col dark:text-surface-400">
        <div>
            <p>
                Our Extra Structure Inspection provides a thorough evaluation of additional structures on your property, ensuring they are safe, functional, and compliant with building standards. 
            </p>
            <p class="mt-3">
                Whether it's a detached garage, guest house, storage shed, or other standalone structure, our team assesses its overall condition and identifies any potential concerns.
            </p>
        </div>
        <Card class="mt-5 !bg-surface-100 dark:!bg-surface-700 dark:!text-surface-200">
            <template #content>
                <p class="font-bold mb-3">Why Include Extra Structure Inspections?</p>
                <ul class="leading-relaxed">
                    <li>
                        <div class="flex items-start">
                            <i class="pi pi-check-circle text-green-500 pe-2 mt-[0.4rem]"></i>
                            <p>
                                <span>Ensure the safety and usability of all property assets.</span>
                            </p>
                        </div>
                    </li>
                    <li>
                        <div class="flex items-start">
                            <i class="pi pi-check-circle text-green-500 pe-2 mt-[0.4rem]"></i>
                            <p>
                                <span>Identify potential issues that could affect the value of your property.</span>
                            </p>
                        </div>
                    </li>
                    <li>
                        <div class="flex items-start">
                            <i class="pi pi-check-circle text-green-500 pe-2 mt-[0.4rem]"></i>
                            <p>
                                <span>Plan maintenance or upgrades with confidence.</span>
                            </p>
                        </div>
                    </li>
                </ul>
            </template>
        </Card>
        <div class="my-5">
            <p>
                Whether the structure is for storage, living, or recreational use, our detailed inspection provides peace of mind and a clear understanding of its condition.
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