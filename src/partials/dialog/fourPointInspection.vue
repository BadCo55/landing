<template>
    <div class="flex flex-col dark:text-surface-400">
        <div>
            <p class="mb-5">
                A 4-Point Inspection focuses on evaluating the key systems of your home to ensure their functionality, safety, and overall condition. 
            </p>
            <Message severity="info">
                <div class="inline-flex items-center">
                    <i class="pi pi-info-circle me-2 text-blue-500"></i>
                    <span>
                        Many insurance companies require this inspection for older homes to assess their insurability.
                    </span>
                </div>
            </Message>
            <p class="mt-5">
                During the inspection, we provide a detailed evaluation of the following critical systems:
            </p>
        </div>
        <Card class="mt-5 !bg-surface-100 dark:!bg-surface-700 dark:!text-surface-200">
            <template #content>
                <ul class="leading-relaxed">
                    <li>
                        <div class="flex items-start">
                            <i class="pi pi-check-circle text-green-500 pe-2 mt-[0.4rem]"></i>
                            <p>
                                <span class="font-bold">Roof:</span> Inspected for age, condition, and potential issues such as leaks or damage.
                            </p>
                        </div>
                    </li>
                    <li>
                        <div class="flex items-start">
                            <i class="pi pi-check-circle text-green-500 pe-2 mt-[0.4rem]"></i>
                            <p>
                                <span class="font-bold">Electrical System:</span> Assessed for safety, including panel type, wiring methods, and potential hazards.
                            </p>
                        </div>
                    </li>
                    <li>
                        <div class="flex items-start">
                            <i class="pi pi-check-circle text-green-500 pe-2 mt-[0.4rem]"></i>
                            <p>
                                <span class="font-bold">Plumbing System:</span> Evaluated for material type, leaks, and overall functionality.
                            </p>
                        </div>
                    </li>
                    <li>
                        <div class="flex items-start">
                            <i class="pi pi-check-circle text-green-500 pe-2 mt-[0.4rem]"></i>
                            <p>
                                <span class="font-bold">HVAC (Heating, Ventilation, and Air Conditioning):</span> Checked for age, condition, and proper operation.
                            </p>
                        </div>
                    </li>
                </ul>
            </template>
        </Card>
        <div class="my-5">
            <p>
                Our 4-Point Inspection ensures you have a clear understanding of these essential systems, providing the documentation needed for insurance purposes. 
            </p>
            <p class="mt-3">
                This inspection is a valuable step in maintaining your home's safety and compliance with insurance requirements.
            </p>
        </div>
        <div class="flex justify-end">
            <Button label="Close" severity="contrast" @click="$emit('closeModal')" />
        </div>
    </div>
</template>

<script setup>
import { Card, Button, Message } from 'primevue';
</script>