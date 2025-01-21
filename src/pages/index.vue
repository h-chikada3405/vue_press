<style lang="scss" scoped>
@use "@/assets/scss/pages/index.scss";
</style>
<script setup>
import { getTitle, getId } from "../utils";

const title = getTitle();
const id = getId();
</script>


<template>
  <div class="home">
    <h1>{{ title }}{{ id }}</h1>
    <p>This is the home page where you can find the latest updates.</p>
    <router-link to="/company">Learn more about us</router-link>
  </div>
</template>
