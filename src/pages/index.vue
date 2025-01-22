<style lang="scss" scoped>
@use "@/assets/scss/pages/index.scss";
</style>

<script setup>
import { getId, getSlug, getTitle } from "@/utils";

const id = getId();
const slug = getSlug();
const title = getTitle();
</script>

<template>
  <div class="home">
    <h1>{{ slug }} {{ title }} {{ id }}</h1>
    <p>This is the home page where you can find the latest updates.</p>
    <router-link to="/company">Learn more about us</router-link>
  </div>
</template>
