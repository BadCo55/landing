<script setup>
import { RouterView } from 'vue-router'
import { onMounted, onUnmounted } from 'vue';
import { useAppStore } from './stores/appStore';
const appStore = useAppStore();

onMounted(() => {
    appStore.initThemeAndLogo();
});

onUnmounted(() => {
    appStore.cleanupThemeAndLogoListener();
});
</script>

<template>
    <div class="bg-surface-0 dark:bg-surface-900 h-dvh">
        <RouterView />
    </div>
</template>

<style scoped>

</style>
