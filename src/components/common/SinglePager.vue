<style lang="scss" scoped>
@use '@/assets/scss/components/common/SinglePager.scss';
</style>

<script setup>
import iconArrowBack from "@/assets/images/icon-arrow_back.svg";
import iconArrowForward from "@/assets/images/icon-arrow_forward.svg";
import { getNextPost, getPrevPost, getSlug } from "@/utils";
import { h, markRaw } from "vue";

const props = defineProps({
	archive: {
		default: "一覧へ",
	},
	prev: {
		default: () => markRaw(h("img", { src: iconArrowBack, alt: "Previous" })),
	},
	next: {
		default: () => markRaw(h("img", { src: iconArrowForward, alt: "Next" })),
	},
});

const slug = getSlug();
const prevPost = getPrevPost();
const nextPost = getNextPost();
</script>

<template>
  <div class="single-pager">
    <router-link
      :to="prevPost ? `/news/${prevPost.id}` : ''"
      class="single-pager_prev"
      :class="{ 'is-disabled': !prevPost }"
      :disabled="!prevPost"
    >
      <i v-if="typeof prev === 'object'"><component :is="prev" /></i>
      <span v-else>{{ prev }}</span>
    </router-link>
    <router-link :to="`/${slug}`" class="single-pager_archive">{{ archive }}</router-link>
    <router-link
      :to="nextPost ? `/news/${nextPost.id}` : ''"
      class="single-pager_next"
      :class="{ 'is-disabled': !nextPost }"
      :disabled="!nextPost"
    >
      <i v-if="typeof next === 'object'"><component :is="next" /></i>
      <span v-else>{{ next }}</span>
    </router-link>
  </div>
</template>
