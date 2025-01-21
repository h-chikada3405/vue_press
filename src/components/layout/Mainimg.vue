<style lang="scss" scoped>
@use '@/assets/scss/components/layout/Mainimg.scss';
</style>

<script setup>
import { getTitle } from "@/utils";
import { isPage } from "@/utils/helpers";

const title = getTitle();
const isHome = isPage("index");
</script>

<template>
  <div class="mainimg">{{ title }} {{ isHome }}</div>
  <template v-if="isHome">
    <h1>mainimg</h1>
  </template>
</template>
