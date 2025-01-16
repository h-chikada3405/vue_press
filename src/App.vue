<template>
  <div id="app">
    <LayoutHeader />
    <main>
      <button @click="animation">アニメーション開始</button>
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
