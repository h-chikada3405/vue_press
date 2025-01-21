<script setup>
import { onMounted } from "vue";
import { MountedAnimation } from "./assets/animations/index.js";
import LayoutHeader from "./components/layout/Header.vue";
import LayoutMainimg from "./components/layout/Mainimg.vue";
import LayoutFooter from "./components/layout/Footer.vue";

onMounted(() => {
	MountedAnimation();
});
</script>

<template>
  <LayoutHeader />
  <LayoutMainimg />
  <main>
    <router-view />
  </main>
  <!-- <LayoutFooter /> -->
</template>
