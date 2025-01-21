<script setup>
import { onMounted } from "vue";
import { MountedAnimation } from "./assets/animations/index.js";
import LayoutFooter from "./components/layout/Footer.vue";
import LayoutHeader from "./components/layout/Header.vue";

onMounted(() => {
	MountedAnimation();
});
</script>

<template>
  <LayoutHeader />
  <main>
    <router-view />
  </main>
  <LayoutFooter />
</template>
