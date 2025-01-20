<script setup>
import LayoutHeader from './components/layout/Header.vue';
import LayoutFooter from './components/layout/Footer.vue';
import { onMounted } from 'vue';
import { MountedAnimation } from './assets/animations/index.js';

onMounted(() => {
  MountedAnimation();
});
</script>

<template>
  <div id="app">
    <LayoutHeader />
    <main>
      <router-view />
    </main>
    <LayoutFooter />
  </div>
</template>
