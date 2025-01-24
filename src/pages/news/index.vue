<script setup>
import Pagination from "@/components/common/Pagination.vue";
import { getPosts, getTotalPostCount } from "@/utils";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const perPage = 1;
const currentPage = ref(Number(route.query.page) || 1);
const totalPostCount = getTotalPostCount();
const totalPages = ref(null);
const Posts = getPosts({
  perPage: perPage,
  page: currentPage.value,
});

watch(totalPostCount, (newTotalPostCount) => {
  if (newTotalPostCount !== null) {
    totalPages.value = Math.ceil(newTotalPostCount / perPage);
  }
});

watch(() => route.query.page, (newPage) => {
  currentPage.value = parseInt(newPage) || 1;
});
</script>

<template>
  <div class="news">
    {{ totalPages }}
    <template v-for="post in Posts" :key="post.id">
      <router-link :to="`/news/${post.id}`">
        <h2>{{ post.title.rendered }}</h2>
      </router-link>
    </template>
    <Pagination
      :current-page="currentPage"
      :total-pages="totalPages"
      v-if="totalPages"
    />
  </div>
</template>
