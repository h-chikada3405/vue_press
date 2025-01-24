<style lang="scss" scoped>
@use '@/assets/scss/components/common/SinglePager.scss';
</style>

<script setup>
import { defineProps, markRaw } from 'vue'
import { getPrevPost, getNextPost } from '@/utils';
import ArrowBackIOS from '../svg/ArrowBackIOS.vue';
import ArrowForwardIOS from '../svg/ArrowForwardIOS.vue';
import { getSlug } from '../../utils';

const props = defineProps({
  archive: {
    default: '一覧へ',
  },
  prev: {
    default: () => markRaw(ArrowBackIOS)
  },
  next: {
    default: () => markRaw(ArrowForwardIOS)
  }
})

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
      <i v-if="typeof prev === 'object'"><component :is="prev" :fill="'#222222'" /></i>
      <span v-else>{{ prev }}</span>
    </router-link>
    <router-link :to="`/${slug}`" class="single-pager_archive">{{ archive }}</router-link>
    <router-link
      :to="nextPost ? `/news/${nextPost.id}` : ''"
      class="single-pager_next"
      :class="{ 'is-disabled': !nextPost }"
      :disabled="!nextPost"
    >
      <i v-if="typeof next === 'object'"><component :is="next" :fill="'#222222'" /></i>
      <span v-else>{{ next }}</span>
    </router-link>
  </div>
</template>
