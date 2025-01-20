<script setup>
import { getPosts } from "@/utils/api";
import { ref } from "vue";

const newsData = ref([]);
const getData = async () => {
	newsData.value = await getPosts();
};
getData();
</script>

<template>
  <div class="news wp-post_content">
    <div v-for="news in newsData" :key="news.id">
      <h2>{{ news.title.rendered }}</h2>
      <div v-html="news.content.rendered"></div>
    </div>
  </div>
</template>
