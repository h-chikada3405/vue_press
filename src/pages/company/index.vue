<style lang="scss" scoped>
@use '@/assets/scss/pages/company/index';
</style>

<script setup>
import { getField } from "@/utils";

const overviewLoop = getField("overview-loop");
</script>

<template>
  <div class="company">
    <h1>company</h1>
    <div
      v-for="(item, index) in overviewLoop"
      :key="index"
    >
      {{ item.title }}
      {{ item.content }}
    </div>
  </div>
</template>
