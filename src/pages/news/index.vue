<script setup>
import { ref, onMounted } from 'vue';
import { getPosts } from '@/utils/api';

const newsData = ref([]);
onMounted(async () => {
  newsData.value = await getPosts();
});
</script>

<template>
  <div class="news wp-post_content">
    <div v-if="newsData.length">
      <div v-for="news in newsData" :key="news.id">
        <h2>{{ news.title.rendered }}</h2>
        <div v-html="news.content.rendered"></div>
      </div>
    </div>
  </div>
</template>
