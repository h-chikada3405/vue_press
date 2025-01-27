<style lang="scss" scoped>
@use '@/assets/scss/components/common/CategoryNav.scss';
</style>

<script setup>
import { getCategories } from "@/utils";

const props = defineProps({
	all: {
		default: "全ての記事",
	},
	showAll: {
		default: true,
	},
	basePath: {
		default: "",
	},
});

const categories = getCategories();
</script>

<template>
  <div class="category-nav">
    <div class="category-nav_head">
      <h2>Category</h2>
    </div>
    <div class="category-nav_content">
      <ul class="category-nav_list">
        <li class="category-nav_item" v-if="showAll">
          <router-link :to="`/${props.basePath}`">{{ all }}</router-link>
        </li>
        <li class="category-nav_item" v-for="category in categories" :key="category.id">
          <router-link :to="`/${props.basePath}/category/${category.slug}`">{{ category.name }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
