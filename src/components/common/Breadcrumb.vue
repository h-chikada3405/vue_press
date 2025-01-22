<style lang="scss" scoped>
@use '@/assets/scss/components/common/Breadcrumb.scss';
</style>

<script setup>
import { getPages } from "@/utils";
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const pages = getPages();

const breadcrumbs = computed(() => {
	const pathArray = route.path.split("/").filter(Boolean);
	return [
		{ name: "HOME", path: "/" },
		...pathArray.map((segment, index) => {
			const currentPath = `/${pathArray.slice(0, index + 1).join("/")}`;
			const matchingPage = pages.value.find((page) => page.slug === segment);

			return {
				name: matchingPage
					? matchingPage.title.rendered
					: segment.charAt(0).toUpperCase() + segment.slice(1),
				path: currentPath,
			};
		}),
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
