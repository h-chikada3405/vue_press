<template>
  <div class="posts">
    <div v-if="postsData.length">
      <div v-for="post in postsData" :key="post.id">
        <h2>{{ post.title.rendered }}</h2>
        <div v-html="post.content.rendered"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getPosts } from '../../utils/api';

const postsData = ref([]);
onMounted(async () => {
  postsData.value = await getPosts();
  console.log(postsData);
});
</script>
