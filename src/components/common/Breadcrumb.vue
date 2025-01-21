<style lang="scss" scoped>
@use '@/assets/scss/components/common/Breadcrumb.scss';
</style>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const breadcrumbs = computed(() => {
	const pathArray = route.path.split("/").filter(Boolean);
	return [
		{ name: "Home", path: "/" },
		...pathArray.map((segment, index) => ({
			name: segment.charAt(0).toUpperCase() + segment.slice(1),
			path: `/${pathArray.slice(0, index + 1).join("/")}`,
		})),
	];
});
</script>

<template>
  <ul v-if="breadcrumbs.length > 1">
    <li v-for="(crumb, index) in breadcrumbs" :key="index">
      <router-link v-if="index < breadcrumbs.length - 1" :to="crumb.path">
        {{ crumb.name }}
      </router-link>
      <span v-else>{{ crumb.name }}</span>
    </li>
  </ul>
</template>
