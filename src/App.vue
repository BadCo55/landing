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
        <!-- Add mode="out-in" to ensure proper transition sequence -->
        <RouterView />

    </div>
</template>

<style>
/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>