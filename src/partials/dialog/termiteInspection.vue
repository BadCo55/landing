<template>
    <div class="flex flex-col dark:text-surface-400">
        <div>
            <p>
                Our termite inspection is conducted by a licensed WDO contractor who specializes in identifying wood-destroying organisms, including:
            </p>
        </div>
        <Card class="mt-3 !bg-surface-100 dark:!bg-surface-700 dark:!text-surface-200">
            <template #content>
                <ul class="leading-relaxed">
                    <li>
                        <div class="flex items-start">
                            <i class="pi pi-check-circle text-green-500 pe-2 mt-[0.4rem]"></i>
                            <p>
                                <span class="font-bold">
                                    Termites
                                </span>
                            </p>
                        </div>
                    </li>
                    <li>
                        <div class="flex items-start">
                            <i class="pi pi-check-circle text-green-500 pe-2 mt-[0.4rem]"></i>
                            <p>
                                <span class="font-bold">
                                    Beetles
                                </span>
                            </p>
                        </div>
                    </li>
                    <li>
                        <div class="flex items-start">
                            <i class="pi pi-check-circle text-green-500 pe-2 mt-[0.4rem]"></i>
                            <p>
                                <span class="font-bold">
                                    Wood-Destroying Fungi
                                </span>
                            </p>
                        </div>
                    </li>
                </ul>
            </template>
        </Card>
        <div>
            <p class="my-3">
                The inspection covers the entire structure, focusing on areas susceptible to infestation, such as:
            </p>
            <Card class="my-3 !bg-surface-100 dark:!bg-surface-700 dark:!text-surface-200">
                <template #content>
                    <ul class="leading-relaxed">
                        <li>
                            <div class="flex items-start">
                                <i class="pi pi-check-circle text-green-500 pe-2 mt-[0.4rem]"></i>
                                <p>
                                    <span class="font-bold">
                                        Wood Framing
                                    </span>
                                </p>
                            </div>
                        </li>
                        <li>
                            <div class="flex items-start">
                                <i class="pi pi-check-circle text-green-500 pe-2 mt-[0.4rem]"></i>
                                <p>
                                    <span class="font-bold">
                                        Attics
                                    </span>
                                </p>
                            </div>
                        </li>
                        <li>
                            <div class="flex items-start">
                                <i class="pi pi-check-circle text-green-500 pe-2 mt-[0.4rem]"></i>
                                <p>
                                    <span class="font-bold">
                                        Crawlspaces
                                    </span>
                                </p>
                            </div>
                        </li>
                        <li>
                            <div class="flex items-start">
                                <i class="pi pi-check-circle text-green-500 pe-2 mt-[0.4rem]"></i>
                                <p>
                                    <span class="font-bold">
                                        Exterior Wooden Elements
                                    </span>
                                </p>
                            </div>
                        </li>
                    </ul>
                </template>
            </Card>
            <p class="my-3">
                By utilizing specialized tools and expertise, we provide a thorough evaluation of the property’s condition and identify any signs of active infestation, previous damage, or conditions conducive to wood-destroying organisms. 
            </p>
            <p>
                Our licensed contractor can also offer recommendations for treatment and preventative measures.
            </p>
        </div>
        <div class="flex justify-end my-3">
            <Button label="Close" severity="contrast" @click="$emit('closeModal')" />
        </div>
    </div>
</template>

<script setup>
import { Card, Button } from 'primevue';
</script>