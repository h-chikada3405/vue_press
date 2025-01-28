<script setup>
import { nextTick, onMounted } from "vue";
import { initPageAnimations } from "./assets/animations/index.js";
import LayoutFooter from "./components/layout/Footer.vue";
import LayoutHeader from "./components/layout/Header.vue";
import LayoutMainimg from "./components/layout/Mainimg.vue";
import { useRouter } from "vue-router";

const router = useRouter();

onMounted(() => {
  initPageAnimations();

  router.afterEach(async () => {
    await nextTick();
    initPageAnimations();
  });
});
</script>

<template>
  <LayoutHeader />
  <LayoutMainimg />
  <main>
    <router-view />
  </main>
  <LayoutFooter />
</template>
