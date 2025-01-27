<script setup>
import CategoryNav from "@/components/common/CategoryNav.vue";
import SinglePager from "@/components/common/SinglePager.vue";
import { getPost } from "@/utils";

const post = getPost();
</script>

<template>
  <div>
    <CategoryNav basePath="news" />
    <div class="news wp-post_content" v-bind="$attrs">
      <h1>{{ post?.title.rendered }}</h1>
      <div v-html="post?.content.rendered"></div>
    </div>
  </div>
  <SinglePager />
</template>
