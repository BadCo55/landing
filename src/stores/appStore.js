import { defineStore } from "pinia";
import { locationConfig } from '@/config/location';

export const useAppStore = defineStore('appStore', {
    state: () => ({
        isDarkMode: false,
        logoSrc: locationConfig.logoLight,
        mediaQuery: null, // Store media query reference for cleanup
        logoLight: '/src/assets/logo-light.svg',
        logoDark: '/src/assets/logo-dark.svg',
        utmParams: {},
    }),
    actions: {
        initThemeAndLogo() {
            this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            this.updateLogo(this.mediaQuery.matches);
            this.mediaQuery.addEventListener('change', this.handleMediaQueryChange);
        },
        handleMediaQueryChange(e) {
            this.updateLogo(e.matches);
        },
        updateLogo(isDarkMode) {
            this.isDarkMode = isDarkMode;
            this.logoSrc = isDarkMode
                ? locationConfig.logoDark
                : locationConfig.logoLight;
        },
        cleanupThemeAndLogoListener() {
            if (this.mediaQuery) {
                this.mediaQuery.removeEventListener('change', this.handleMediaQueryChange);
            }
        },
        // New Action: Scroll to a specific section
        scrollToSection(refName) {
            const target = document.querySelector(refName);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            } else {
                console.warn(`Element with selector "${refName}" not found.`);
            }
        },
        setUTMParams(params) {
            this.utmParams = params;
        },
    },
    getters: {

    },
});
