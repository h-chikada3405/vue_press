<script setup>
import { getPost } from "@/utils";
import SinglePager from "@/components/common/SinglePager.vue";

const post = getPost();
</script>

<template>
  <div class="news wp-post_content" v-bind="$attrs">
    <h1>{{ post?.title.rendered }}</h1>
    <div v-html="post?.content.rendered"></div>
  </div>
  <SinglePager />
</template>
