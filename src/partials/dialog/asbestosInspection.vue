<template>
    <div class="flex flex-col dark:text-surface-400">
        <div>
            <p>
                Our Asbestos Inspection, conducted by a licensed environmentalist, is designed to identify and evaluate materials in your property that may contain asbestos, ensuring the safety and well-being of its occupants. 
            </p>
            <p class="mt-3">
                This inspection is essential for properties built before 1980, as asbestos was commonly used in construction materials during this time.
            </p>
        </div>
        <p class="mt-3 font-bold">
            Key areas assessed during the Asbestos Inspection include:
        </p>
        <ul class="mt-5">
            <li class="mb-2">
                <div class="flex items-start">
                    <i class="pi pi-check-circle text-green-500 pe-2 mt-[0.4rem]"></i>
                    <p>
                        <span><strong>Insulation:</strong> Evaluation of pipe, attic, and wall insulation materials for asbestos content.</span>
                    </p>
                </div>
            </li>
            <li class="mb-2">
                <div class="flex items-start">
                    <i class="pi pi-check-circle text-green-500 pe-2 mt-[0.4rem]"></i>
                    <p>
                        <span><strong>Flooring:</strong> Inspection of vinyl tiles, adhesives, and underlayments for potential asbestos.</span>
                    </p>
                </div>
            </li>
            <li class="mb-2">
                <div class="flex items-start">
                    <i class="pi pi-check-circle text-green-500 pe-2 mt-[0.4rem]"></i>
                    <p>
                        <span><strong>Ceilings and Walls:</strong> Assessment of textured ceilings, wallboards, and joint compounds.</span>
                    </p>
                </div>
            </li>
        </ul>
        <Card class="mt-5 !bg-surface-100 dark:!bg-surface-700 dark:!text-surface-200">
            <template #content>
                <p class="font-bold mb-3">Why Include an Asbestos Inspection?</p>
                <ul class="leading-relaxed">
                    <li>
                        <div class="flex items-start">
                            <i class="pi pi-check-circle text-green-500 pe-2 mt-[0.4rem]"></i>
                            <p>
                                <span>Identify potential health hazards in building materials.</span>
                            </p>
                        </div>
                    </li>
                    <li>
                        <div class="flex items-start">
                            <i class="pi pi-check-circle text-green-500 pe-2 mt-[0.4rem]"></i>
                            <p>
                                <span>Ensure compliance with local and federal safety regulations.</span>
                            </p>
                        </div>
                    </li>
                    <li>
                        <div class="flex items-start">
                            <i class="pi pi-check-circle text-green-500 pe-2 mt-[0.4rem]"></i>
                            <p>
                                <span>Protect occupants from exposure to airborne asbestos fibers.</span>
                            </p>
                        </div>
                    </li>
                </ul>
            </template>
        </Card>
        <div class="my-5">
            <p>
                Our Asbestos Inspection provides a detailed report of findings and expert guidance on the safe handling or removal of any asbestos-containing materials. 
            </p>
            <p class="mt-3">
                With a licensed environmentalist leading the inspection, you can trust in the thoroughness and reliability of our assessment.
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