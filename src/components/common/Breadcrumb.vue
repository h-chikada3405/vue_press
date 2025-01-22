<style lang="scss" scoped>
@use '@/assets/scss/components/common/Breadcrumb.scss';
</style>

<script setup>
import { getPages, getPost } from "@/utils";
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const pages = getPages();
const post = getPost();

/**
 * パンくずリストに表示するページを取得
 * @param {string} segment
 * @param {number} index
 * @param {string[]} pathArray
 * @return {{ name: string, path: string } | null}
 */
const getBreadcrumb = (segment, index, pathArray) => {
	const currentPath = `/${pathArray.slice(0, index + 1).join("/")}`;
	const matchingPage = pages.value.find((page) => page.slug === segment);

	if (matchingPage) {
		return { name: matchingPage.title.rendered, path: currentPath };
	}

	if (post.value) {
		return { name: post.value.title.rendered, path: currentPath };
	}

	return null;
};

const breadcrumbs = computed(() => {
	const pathArray = route.path.split("/").filter(Boolean);

	return [
		{ name: "HOME", path: "/" },
		...pathArray
			.map((segment, index) => getBreadcrumb(segment, index, pathArray))
			.filter(Boolean),
	];
});
</script>

<template>
  <ul v-if="breadcrumbs.length > 1" class="breadcrumb">
    <li v-for="(crumb, index) in breadcrumbs" :key="index">
      <router-link v-if="index < breadcrumbs.length - 1" :to="crumb.path">
        {{ crumb.name }}
      </router-link>
      <span v-else>{{ crumb.name }}</span>
    </li>
  </ul>
</template>
