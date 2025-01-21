<script setup>
import { getPosts } from "@/utils/api.ts";
import { ref } from "vue";
import getSlug from "@/utils/composables/getSlug";

const newsData = ref([]);
const getData = async () => {
	newsData.value = await getPosts();
};
getData();
console.log(getSlug());
</script>

<template>
  <div class="news wp-post_content">
    <div v-for="news in newsData" :key="news.id">
      <h2>{{ news.title.rendered }}</h2>
      <div v-html="news.content.rendered"></div>
    </div>
  </div>
</template>
