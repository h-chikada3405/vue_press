<script setup>
import { onAsyncMounted } from "@/utils";
import { nextTick, onMounted } from "vue";
import { useRouter } from "vue-router";
import {
	initPageAnimations,
	resizedAnimations,
} from "./assets/animations/index.js";
import LayoutFooter from "./components/layout/Footer.vue";
import LayoutHeader from "./components/layout/Header.vue";
import LayoutMainimg from "./components/layout/Mainimg.vue";

const router = useRouter();

onMounted(() => {
	initPageAnimations();

	router.afterEach(async () => {
		await nextTick();
		initPageAnimations();
	});
});

onAsyncMounted(() => {
	resizedAnimations();
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
