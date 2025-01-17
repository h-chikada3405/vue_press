<template>
  <div class="home">
    <h1>Welcome to Our Website!</h1>
    <p>This is the home page where you can find the latest updates.</p>

    <div v-if="pagesData.length > 0">
      <div v-for="(page, index) in pagesData" :key="index">
        <h2>{{ page.title.rendered }}</h2>
      </div>
    </div>

    <router-link to="/about">Learn more about us</router-link>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getPages } from '../utils/api';

const pagesData = ref([]);
onMounted(async () => {
  pagesData.value = await getPages();
});
</script>
