<template>
    <div class="flex flex-col dark:text-surface-400">
        <div>
            <p>
                Our general inspection is a comprehensive inspection of all areas of the building including:
            </p>
        </div>
        <Card class="mt-5 !bg-surface-100 dark:!bg-surface-700 dark:!text-surface-200">
            <template #content>
                <ul class="leading-relaxed">
                    <li>
                        <div class="flex items-start">
                            <i class="pi pi-check-circle text-green-500 pe-2 mt-[0.4rem]"></i>
                            <span class="font-bold">
                                Grounds
                            </span>
                        </div>
                    </li>
                    <li>
                        <div class="flex items-start">
                            <i class="pi pi-check-circle text-green-500 pe-2 mt-[0.4rem]"></i>
                            <span class="font-bold">
                                Sprinklers
                            </span>
                        </div>
                    </li>
                    <li>
                        <div class="flex items-start">
                            <i class="pi pi-check-circle text-green-500 pe-2 mt-[0.4rem]"></i>
                            <span class="font-bold">
                                Attic
                            </span>
                        </div>
                    </li>
                    <li>
                        <div class="flex items-start">
                            <i class="pi pi-check-circle text-green-500 pe-2 mt-[0.4rem]"></i>
                            <p>
                                <span class="font-bold">
                                    Electrical System 
                                </span>
                                (Interior & Exterior)
                            </p>
                        </div>
                    </li>
                    <li>
                        <div class="flex items-start">
                            <i class="pi pi-check-circle text-green-500 pe-2 mt-[0.4rem]"></i>
                            <span class="font-bold">
                                HVAC, Heat & Fireplace Systems
                            </span>
                        </div>
                    </li>
                    <li>
                        <div class="flex items-start">
                            <i class="pi pi-check-circle text-green-500 pe-2 mt-[0.4rem]"></i>
                            <span class="font-bold">
                                Plumbing & Gas Systems
                            </span>
                        </div>
                    </li>
                    <li>
                        <div class="flex items-start">
                            <i class="pi pi-check-circle text-green-500 pe-2 mt-[0.4rem]"></i>
                            <span class="font-bold">
                                Appliances
                            </span>
                        </div>
                    </li>
                    <li>
                        <div class="flex items-start">
                            <i class="pi pi-check-circle text-green-500 pe-2 mt-[0.4rem]"></i>
                            <p>
                                <span class="font-bold">
                                    Interior & Exterior Structural Systems 
                                </span>
                                (gutters, siding, walls, floors, ceilings, windows & doors)
                            </p>
                        </div>
                    </li>
                </ul>
            </template>
        </Card>
        <div class="flex justify-end mt-5">
            <Button label="Close" severity="contrast" @click="$emit('closeModal')" />
        </div>
    </div>
</template>

<script setup>
import { Card, Button } from 'primevue';
</script>