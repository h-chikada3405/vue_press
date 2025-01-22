<style lang="scss" scoped>
@use '@/assets/scss/components/layout/Mainimg.scss';
</style>

<script setup>
import { getTitle } from "@/utils";

const title = getTitle();
</script>

<template>
  <div class="mainimg">{{ title }}</div>
</template>
