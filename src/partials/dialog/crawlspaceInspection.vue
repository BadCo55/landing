<template>
    <div class="flex flex-col dark:text-surface-400">
        <div>
            <p>
                Our Crawlspace Inspection is designed to provide a comprehensive assessment of the often-overlooked area beneath your home. 
            </p>
            <p class="mt-3">
                The crawlspace is a critical part of your property, serving as a foundation for your structure and housing vital systems such as plumbing, electrical wiring, and HVAC components.
            </p>
        </div>
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
                        <span><strong>Moisture and Drainage:</strong> Identify signs of water intrusion, standing water, or poor drainage that could lead to damage or mold growth.</span>
                    </p>
                </div>
            </li>
            <li class="mb-2">
                <div class="flex items-start">
                    <i class="pi pi-check-circle text-green-500 pe-2 mt-[0.4rem]"></i>
                    <p>
                        <span><strong>Pest Infestation:</strong> Check for evidence of termites, rodents, or other pests that may harm the structure.</span>
                    </p>
                </div>
            </li>
            <li class="mb-2">
                <div class="flex items-start">
                    <i class="pi pi-check-circle text-green-500 pe-2 mt-[0.4rem]"></i>
                    <p>
                        <span><strong>Ventilation:</strong> Ensure proper airflow to prevent moisture buildup and improve air quality.</span>
                    </p>
                </div>
            </li>
            <li class="mb-2">
                <div class="flex items-start">
                    <i class="pi pi-check-circle text-green-500 pe-2 mt-[0.4rem]"></i>
                    <p>
                        <span><strong>Insulation:</strong> Inspect insulation for damage or deterioration that could impact energy efficiency.</span>
                    </p>
                </div>
            </li>
            <li class="mb-2">
                <div class="flex items-start">
                    <i class="pi pi-check-circle text-green-500 pe-2 mt-[0.4rem]"></i>
                    <p>
                        <span><strong>Plumbing and Electrical Systems:</strong> Verify the condition and functionality of plumbing lines and electrical components in the crawlspace.</span>
                    </p>
                </div>
            </li>
        </ul>
        <Card class="mt-5 !bg-surface-100 dark:!bg-surface-700 dark:!text-surface-200">
            <template #content>
                <p class="font-bold mb-3">Why Include a Crawlspace Inspection?</p>
                <ul class="leading-relaxed">
                    <li>
                        <div class="flex items-start">
                            <i class="pi pi-check-circle text-green-500 pe-2 mt-[0.4rem]"></i>
                            <p>
                                <span>Identify potential structural or system issues before they escalate.</span>
                            </p>
                        </div>
                    </li>
                    <li>
                        <div class="flex items-start">
                            <i class="pi pi-check-circle text-green-500 pe-2 mt-[0.4rem]"></i>
                            <p>
                                <span>Prevent costly repairs by addressing moisture and drainage concerns early.</span>
                            </p>
                        </div>
                    </li>
                    <li>
                        <div class="flex items-start">
                            <i class="pi pi-check-circle text-green-500 pe-2 mt-[0.4rem]"></i>
                            <p>
                                <span>Ensure the health and safety of your property by identifying pests or mold risks.</span>
                            </p>
                        </div>
                    </li>
                </ul>
            </template>
        </Card>
        <div class="my-5">
            <p>
                A well-maintained crawlspace contributes significantly to the overall health and value of your home. Let us help you ensure this vital area is in excellent condition.
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