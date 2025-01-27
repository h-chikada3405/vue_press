<script setup>
import CategoryNav from "@/components/common/CategoryNav.vue";
import Pagination from "@/components/common/Pagination.vue";
import { getPosts, getTotalPostCount } from "@/utils";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { perPage } from "../index.vue";

const route = useRoute();
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

watch(
	() => route.query.page,
	(newPage) => {
		currentPage.value = Number.parseInt(newPage) || 1;
	},
);
</script>

<template>
  <div class="news">
    <div>
      <CategoryNav basePath="news" />
      <template v-for="post in Posts" :key="post.id">
        <router-link :to="`/news/${post.id}`">
          <h2>{{ post.title.rendered }}</h2>
        </router-link>
      </template>
    </div>
    <Pagination
      :current-page="currentPage"
      :total-pages="totalPages"
      v-if="totalPages"
    />
  </div>
</template>
