<style lang="scss" scoped>
@use '@/assets/scss/components/layout/Header.scss';
</style>

<script setup>
import { AnimateGlobalNav, InitGlobalNav } from "@/assets/animations/globalNav";
import { onMounted, ref } from "vue";
import { useIsPage } from "../../utils";
import Breadcrumb from "../common/Breadcrumb.vue";

const isHome = useIsPage("index");
const isOpen = ref(false);

const toggleNav = () => {
	isOpen.value = !isOpen.value;
	AnimateGlobalNav(isOpen.value);
};
onMounted(() => {
	InitGlobalNav();
});
</script>

<template>
  <header>
    <!-- ハンバーガーメニューボタン -->
    <button @click="toggleNav">
      <span>=</span>
      <span>=</span>
      <span>=</span>
    </button>

    <!-- メニュー -->
    <nav class="global-nav">
      <router-link to="/">Home</router-link>
      <router-link to="/company">Company</router-link>
      <router-link to="/company/greeting">Greeting</router-link>
      <router-link to="/company/office">Office</router-link>
      <router-link to="/news">News</router-link>
    </nav>

    <template v-if="!isHome">
      <Breadcrumb />
    </template>
  </header>
</template>
