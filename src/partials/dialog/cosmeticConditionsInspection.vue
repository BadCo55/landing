<template>
    <div class="flex flex-col dark:text-surface-400">
        <div>
            <p>
                Our Cosmetic Conditions Inspection, available exclusively for new construction properties, ensures your home meets the highest standards of craftsmanship and finish. 
            </p>
            <p class="mt-3">
                This service is designed to identify surface-level issues that may impact the overall aesthetic appeal of your property.
            </p>
        </div>
        <p class="mt-3 font-bold">
            Key areas of focus during the Cosmetic Conditions Inspection include:
        </p>
        <ul class="mt-5">
            <li class="mb-2">
                <div class="flex items-start">
                    <i class="pi pi-check-circle text-green-500 pe-2 mt-[0.4rem]"></i>
                    <p>
                        <span><strong>Walls and Ceilings:</strong> Identifying cracks, uneven surfaces, and paint imperfections.</span>
                    </p>
                </div>
            </li>
            <li class="mb-2">
                <div class="flex items-start">
                    <i class="pi pi-check-circle text-green-500 pe-2 mt-[0.4rem]"></i>
                    <p>
                        <span><strong>Flooring:</strong> Assessing for scratches, warping, and improper installation.</span>
                    </p>
                </div>
            </li>
            <li class="mb-2">
                <div class="flex items-start">
                    <i class="pi pi-check-circle text-green-500 pe-2 mt-[0.4rem]"></i>
                    <p>
                        <span><strong>Cabinets and Fixtures:</strong> Ensuring proper alignment, finishes, and functionality.</span>
                    </p>
                </div>
            </li>
            <li class="mb-2">
                <div class="flex items-start">
                    <i class="pi pi-check-circle text-green-500 pe-2 mt-[0.4rem]"></i>
                    <p>
                        <span><strong>Windows and Doors:</strong> Verifying smooth operation, seal integrity, and alignment.</span>
                    </p>
                </div>
            </li>
            <li class="mb-2">
                <div class="flex items-start">
                    <i class="pi pi-check-circle text-green-500 pe-2 mt-[0.4rem]"></i>
                    <p>
                        <span><strong>Exterior Features:</strong> Examining siding, paint, and trim for inconsistencies.</span>
                    </p>
                </div>
            </li>
        </ul>
        <Card class="mt-5 !bg-surface-100 dark:!bg-surface-700 dark:!text-surface-200">
            <template #content>
                <p class="font-bold mb-3">Why Include a Cosmetic Conditions Inspection??</p>
                <ul class="leading-relaxed">
                    <li>
                        <div class="flex items-start">
                            <i class="pi pi-check-circle text-green-500 pe-2 mt-[0.4rem]"></i>
                            <p>
                                <span>Ensure your new construction home is finished to perfection before move-in.</span>
                            </p>
                        </div>
                    </li>
                    <li>
                        <div class="flex items-start">
                            <i class="pi pi-check-circle text-green-500 pe-2 mt-[0.4rem]"></i>
                            <p>
                                <span>Address cosmetic concerns with your builder before warranty periods expire.</span>
                            </p>
                        </div>
                    </li>
                    <li>
                        <div class="flex items-start">
                            <i class="pi pi-check-circle text-green-500 pe-2 mt-[0.4rem]"></i>
                            <p>
                                <span>Gain peace of mind knowing your new home meets your expectations.</span>
                            </p>
                        </div>
                    </li>
                </ul>
            </template>
        </Card>
        <div class="my-5">
            <p>
                Our detailed inspection report highlights all cosmetic concerns, giving you the confidence to request necessary corrections and enjoy your new home at its best.
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