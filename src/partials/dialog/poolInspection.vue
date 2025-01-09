<template>
    <div class="flex flex-col dark:text-surface-400">
        <div>
            <p>
                Our comprehensive pool inspection evaluates the condition and functionality of all visible and accessible components of the pool and spa systems. Including:
            </p>
        </div>
        <Card class="mt-5 !bg-surface-100 dark:!bg-surface-700 dark:!text-surface-200">
            <template #content>
                <ul class="leading-relaxed">
                    <li>
                        <div class="flex items-start">
                            <i class="pi pi-check-circle text-green-500 pe-2 mt-[0.4rem]"></i>
                            <p>
                                <span class="font-bold">
                                    Surface Condition
                                </span>
                            </p>
                        </div>
                    </li>
                    <li>
                        <div class="flex items-start">
                            <i class="pi pi-check-circle text-green-500 pe-2 mt-[0.4rem]"></i>
                            <p>
                                <span class="font-bold">
                                    Pool Deck & Surrounding Areas
                                </span>
                            </p>
                        </div>
                    </li>
                    <li>
                        <div class="flex items-start">
                            <i class="pi pi-check-circle text-green-500 pe-2 mt-[0.4rem]"></i>
                            <p>
                                <span class="font-bold">
                                    Coping Conditions
                                </span>
                            </p>
                        </div>
                    </li>
                    <li>
                        <div class="flex items-start">
                            <i class="pi pi-check-circle text-green-500 pe-2 mt-[0.4rem]"></i>
                            <p>
                                <span class="font-bold">
                                    Plumbing & Circulation Systems
                                </span>
                            </p>
                        </div>
                    </li>
                    <li>
                        <div class="flex items-start">
                            <i class="pi pi-check-circle text-green-500 pe-2 mt-[0.4rem]"></i>
                            <p>
                                <span class="font-bold">
                                    All Pool Equipment:
                                </span>
                                pumps, heaters and timers
                            </p>
                        </div>
                    </li>
                    <li>
                        <div class="flex items-start">
                            <i class="pi pi-check-circle text-green-500 pe-2 mt-[0.4rem]"></i>
                            <p>
                                <span class="font-bold">
                                    Safety Equipment:
                                </span>
                                pool barriers, gates and covers
                            </p>
                        </div>
                    </li>
                </ul>
            </template>
        </Card>
        <div class="mt-5">
            <p class="mb-5">
                Our goal is to provide a thorough analysis of your pool’s current condition and highlight any potential maintenance or repair needs.
            </p>
            <Message severity="info">
                <span class="font-bold">NOTE: </span>
                <span>Our pool inspection is not a leak test, but our inspector will recommend one if they think it's necessary.</span>
            </Message>
        </div>
        <div class="flex justify-end mt-5">
            <Button label="Close" severity="contrast" @click="$emit('closeModal')" />
        </div>
    </div>
</template>

<script setup>
import { Card, Button, Message } from 'primevue';
</script>