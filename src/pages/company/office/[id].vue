<script setup>
import { getPost } from "@/utils";

const office = getPost();
</script>

<template>
  <div class="office wp-post_content" v-bind="$attrs">
    <h1>{{ office?.title.rendered }}</h1>
    <div v-html="office?.content.rendered"></div>
  </div>
</template>
