<template>
    <Dialog v-model:visible="internalVisible" pt:root:class="!border-0 !bg-transparent" pt:mask:class="backdrop-blur-sm" class="px-5">
        <template #container="{ closeCallback }">
                <form @submit.prevent="handleSubmit">
                <div class="flex flex-col px-8 py-8 gap-6 rounded-2xl" style="background-image: radial-gradient(circle at left top, var(--p-primary-400), var(--p-primary-700))">
                    <p class="text-2xl text-slate-50">Sign up to get <span class="text-3xl font-bold text-blue-300">exclusive access</span> to a live demo of our inspection report!</p>
                        <div class="inline-flex flex-col gap-2">
                            <label for="email" class="text-slate-50 font-semibold">Enter your email</label>
                            <InputText fluid id="email" v-model="form.email" class="!bg-white/20 !border-0 !p-4 !text-slate-50 w-80"></InputText>
                            <small v-if="errors.email" class="text-slate-50">{{ errors.email }}</small>
                        </div>
                        <div class="flex items-center gap-4">
                            <Button label="Cancel" @click="closeCallback" type="button" text class="!p-4 w-full !text-red-200 !border !border-white/30 hover:!bg-white/10"></Button>
                            <Button label="Submit" type="submit" text class="!p-4 w-full !text-red-200 !border !border-white/30 hover:!bg-white/10"></Button>
                        </div>
                    </div>
                </form>
            </template>
        </Dialog>
</template>

<script setup>
import { Dialog, InputText, Button } from 'primevue';
import { reactive, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useAppStore } from '@/stores/appStore';

const appStore = useAppStore();
const router = useRouter();

const form = reactive({
    email: ''
});

const errors = reactive({
    email: '',
});

const validateForm = () => {
    errors.email = '';

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.email) {
        errors.email = 'Email is required.';
    } else if (!emailRegex.test(form.email)) {
        errors.email = 'Please enter a valid email address.';
    }

    return !errors.email; // Return true if no errors
};

const handleSubmit = async () => {
    if (!validateForm()) return;
    form.date = new Date().toISOString(); // Add a date in ISO format
    form.utm_parameters = JSON.stringify(appStore.utmParams); // Include UTM params as a string

    try {
        const response = await fetch('https://hooks.zapier.com/hooks/catch/5555872/282nv9n/', {
            method: 'POST',
            body: JSON.stringify(form),
        });

        if (response.ok) {
            if (window.gtag) {
                window.gtag('event', 'form_submit', {
                    event_category: 'Engagement',
                    form_name: 'Sample Report Form',
                    page_location: window.location.href, // Include the current page URL
                    utm_source: appStore.utm_source || 'N/A',
                    utm_medium: appStore.utm_medium || 'N/A',
                    utm_campaign: appStore.utm_campaign || 'N/A',
                    utm_term: appStore.utm_term || 'N/A',
                    utm_content: appStore.utm_medium || 'N/A',
                });
            }
            if (window.fbq) {
                window.fbq('trackCustom', `form_submit`, {
                    form_name: 'Sample Report Form',
                    url: window.location.href,
                })
            }
            router.push('/sample-report');
        } else {
            console.error('Failed to submit the form');
        }
    } catch (error) {
        console.error(error);
    }
};

// Define props
const props = defineProps({
    visible: Boolean,
});
const emits = defineEmits(['update:visible']);

// Local state for dialog visibility
const internalVisible = ref(props.visible);

// Watch for prop changes to sync state
watch(
    () => props.visible,
    (newVal) => (internalVisible.value = newVal)
);

// Emit updates when visibility changes
watch(
    () => internalVisible.value,
    (newVal) => emits('update:visible', newVal)
);
</script>