<template>
    <div class="flex flex-col dark:text-surface-400">
        <div>
            <p>
                Our Lead-Based Paint Inspection, conducted by a licensed environmentalist, is essential for homes and buildings constructed before 1978, when lead-based paint was commonly used. 
            </p>
            <p class="mt-3">
                This inspection is designed to identify the presence of lead in painted surfaces and ensure the safety of the occupants, especially young children and pregnant women who are more vulnerable to lead exposure.
            </p>
        </div>
        <p class="mt-3 font-bold">
            Key areas evaluated during the Lead-Based Paint Inspection include:
        </p>
        <ul class="mt-5">
            <li class="mb-2">
                <div class="flex items-start">
                    <i class="pi pi-check-circle text-green-500 pe-2 mt-[0.4rem]"></i>
                    <p>
                        <span><strong>Interior Walls and Ceilings:</strong> Inspection of painted surfaces for lead content.</span>
                    </p>
                </div>
            </li>
            <li class="mb-2">
                <div class="flex items-start">
                    <i class="pi pi-check-circle text-green-500 pe-2 mt-[0.4rem]"></i>
                    <p>
                        <span><strong>Windows and Doors:</strong> Assessment of painted frames, sills, and trims.</span>
                    </p>
                </div>
            </li>
            <li class="mb-2">
                <div class="flex items-start">
                    <i class="pi pi-check-circle text-green-500 pe-2 mt-[0.4rem]"></i>
                    <p>
                        <span><strong>Exterior Surfaces:</strong> Examination of siding, porches, and fences.</span>
                    </p>
                </div>
            </li>
        </ul>
        <Card class="mt-5 !bg-surface-100 dark:!bg-surface-700 dark:!text-surface-200">
            <template #content>
                <p class="font-bold mb-3">Why Include a Lead-Based Paint Inspection?</p>
                <ul class="leading-relaxed">
                    <li>
                        <div class="flex items-start">
                            <i class="pi pi-check-circle text-green-500 pe-2 mt-[0.4rem]"></i>
                            <p>
                                <span>Protect your family from the harmful effects of lead exposure.</span>
                            </p>
                        </div>
                    </li>
                    <li>
                        <div class="flex items-start">
                            <i class="pi pi-check-circle text-green-500 pe-2 mt-[0.4rem]"></i>
                            <p>
                                <span>Ensure compliance with safety regulations during renovations or property sales.</span>
                            </p>
                        </div>
                    </li>
                    <li>
                        <div class="flex items-start">
                            <i class="pi pi-check-circle text-green-500 pe-2 mt-[0.4rem]"></i>
                            <p>
                                <span>Receive expert advice on managing and mitigating lead hazards.</span>
                            </p>
                        </div>
                    </li>
                </ul>
            </template>
        </Card>
        <div class="my-5">
            <p>
                Our detailed Lead-Based Paint Inspection includes advanced testing methods and a comprehensive report of findings. 
            </p>
            <p class="mt-3">
                Conducted by a licensed environmentalist, this service ensures accuracy and reliability, giving you peace of mind and a safer living environment.
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