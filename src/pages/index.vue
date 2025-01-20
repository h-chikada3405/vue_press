<script setup>
import { ref } from "vue";
import { getPages } from "../utils/api";
import "../assets/scss/pages/index.scss";

const pagesData = ref([]);
const getData = async () => {
	pagesData.value = await getPages();
};
getData();
</script>

<template>
  <div class="home">
    <h1>Welcome to Our Website!</h1>
    <p>This is the home page where you can find the latest updates.</p>
    <template v-for="page in pagesData" :key="page.id">
      <h2>{{ page.title.rendered }}</h2>
    </template>
    <router-link to="/company">Learn more about us</router-link>
  </div>
</template>
