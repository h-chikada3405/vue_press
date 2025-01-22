<script setup>
import { getPosts } from "@/utils";

const newsData = getPosts();
</script>

<template>
  <div class="news wp-post_content">
    <template v-for="news in newsData" :key="news.id">
      <router-link :to="`/news/${news.id}`">
        <h2>{{ news.title.rendered }}</h2>
      </router-link>
    </template>
  </div>
</template>
