<script setup>
import { getPost } from "@/utils";

const office = getPost();
</script>

<template>
  <div>
    <h1>{{ office?.title.rendered }}</h1>
    <div v-html="office?.content.rendered"></div>
  </div>
</template>
