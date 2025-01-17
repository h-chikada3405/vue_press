<template>
  <div id="app">
    <LayoutHeader />
    <main>
      <router-view />
    </main>
    <LayoutFooter />
  </div>
</template>

<script setup>
import LayoutHeader from './components/layout/Header.vue';
import LayoutFooter from './components/layout/Footer.vue';
import { onMounted } from 'vue';
import { MountedAnimation } from './animations/index.js';

onMounted(() => {
  MountedAnimation();
});
</script>
