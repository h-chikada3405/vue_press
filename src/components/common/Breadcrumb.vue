<style lang="scss" scoped>
@use '@/assets/scss/components/common/Breadcrumb.scss';
</style>

<script setup>
import { getCategories, getPages, getPost } from "@/utils";
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const pages = getPages();
const post = getPost();
const categories = getCategories();

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

	if (matchingPage?.title?.rendered) {
		return { name: matchingPage.title.rendered, path: currentPath };
	}

	if (pathArray.includes("category") && categories.value) {
		const matchingCategory = categories.value.find(
			(category) => category.slug === segment,
		);
		if (matchingCategory) {
			return { name: matchingCategory.name, path: currentPath };
		}
	}

	if (post.value?.title?.rendered) {
		const breadcrumbs = [];

		if (categories.value) {
			const matchingCategory = categories.value.find(
				(category) => category.id === post.value.categories[0],
			);
			if (matchingCategory) {
				breadcrumbs.push({
					name: matchingCategory.name,
					path: `/${pathArray.slice(0, index).join("/")}/category/${matchingCategory.slug}`,
				});
			}
		}

		breadcrumbs.push({ name: post.value.title.rendered, path: currentPath });

		return breadcrumbs;
	}

	return null;
};

const breadcrumbs = computed(() => {
	const pathArray = route.path.split("/").filter(Boolean);

	return [
		{ name: "HOME", path: "/" },
		...pathArray
			.map((segment, index) => getBreadcrumb(segment, index, pathArray))
			.filter(Boolean)
			.flat(),
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
