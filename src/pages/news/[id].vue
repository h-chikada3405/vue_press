<script setup>
import { getPost } from "@/utils";

const news = getPost();
</script>

<template>
  <div>
    <h1>{{ news?.title.rendered }}</h1>
    <div v-html="news?.content.rendered"></div>
  </div>
</template>
