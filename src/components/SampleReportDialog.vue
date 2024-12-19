<template>
    <Dialog v-model:visible="internalVisible" pt:root:class="!border-0 !bg-transparent" pt:mask:class="backdrop-blur-sm" class="px-5">
        <template #container="{ closeCallback }">
                <form @submit.prevent="handleSubmit">
                <div class="flex flex-col px-8 py-8 gap-6 rounded-2xl" style="background-image: radial-gradient(circle at left top, var(--p-primary-400), var(--p-primary-700))">
                    <p class="text-2xl text-slate-50">Sign up to get <span class="text-3xl font-bold text-blue-300">exclusive access</span> to a live demo of our inspection report!</p>
                        <div class="inline-flex flex-col gap-2">
                            <label for="email" class="text-slate-50 font-semibold">Enter your email</label>
                            <InputText fluid id="email" class="!bg-white/20 !border-0 !p-4 !text-slate-50 w-80"></InputText>
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
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Define props
const props = defineProps({
    visible: Boolean,
});
const emits = defineEmits(['update:visible']);

// Local state for dialog visibility
const internalVisible = ref(props.visible);

const handleSubmit = () => {
    router.push('/sample-report')
}

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