<template>
    <div class="py-20 flex flex-col items-center bg-surface-0 dark:bg-slate-950">
        <img
            class="max-w-[24rem] lg:max-w-[32rem] h-auto"
            :src="
                isDarkMode
                    ? 'https://fqjltiegiezfetthbags.supabase.co/storage/v1/render/image/public/block.images/blocks/feedback/not-found-12-dark.png'
                    : 'https://fqjltiegiezfetthbags.supabase.co/storage/v1/render/image/public/block.images/blocks/feedback/not-found-12.png'
            "
            alt="404 Image"
        />
        <img class="mt-16 w-full max-w-[2000px]" src="https://fqjltiegiezfetthbags.supabase.co/storage/v1/render/image/public/block.images/blocks/feedback/not-found-12-plug.png" alt="Image" />
        <RouterLink to="/">
            <Button class="mt-24 !px-16" label="Back to Home " rounded />
        </RouterLink>
    </div>
</template>

<script setup>
import Button from 'primevue/button';
import { useAppStore } from '@/stores/appStore';

const appStore = useAppStore();

const { isDarkMode } = appStore.isDarkMode;
</script>
