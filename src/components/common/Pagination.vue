<style lang="scss" scoped>
@use '@/assets/scss/components/common/Pagination.scss';
</style>

<script setup>
import iconArrowBack from "@/assets/images/icon-arrow_back.svg";
import iconArrowForward from "@/assets/images/icon-arrow_forward.svg";
import { h, markRaw } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
	currentPage: {
		default: 1,
	},
	totalPages: {
		required: true,
	},
	range: {
		default: 2,
	},
	prev: {
		default: () => markRaw(h("img", { src: iconArrowBack, alt: "Previous" })),
	},
	next: {
		default: () => markRaw(h("img", { src: iconArrowForward, alt: "Next" })),
	},
	dots: {
		default: "...",
	},
});

const router = useRouter();

const handlePrevClick = () => {
	if (props.currentPage > 1) {
		const newPage = props.currentPage - 1;
		router.push({ query: { page: newPage } });
	}
};

const handleNextClick = () => {
	if (props.currentPage < props.totalPages) {
		const newPage = props.currentPage + 1;
		router.push({ query: { page: newPage } });
	}
};

const getPaginationPages = () => {
	const { currentPage, totalPages, range, dots } = props;
	const pageNumbers = [];
	const visiblePages = range * 2 + 1;

	if (totalPages <= visiblePages) {
		for (let i = 1; i <= totalPages; i++) {
			pageNumbers.push(i);
		}
	} else {
		if (currentPage <= range + 1) {
			for (let i = 1; i <= visiblePages; i++) {
				pageNumbers.push(i);
			}
			if (totalPages > visiblePages) {
				pageNumbers.push(dots);
				pageNumbers.push(totalPages);
			}
		} else if (currentPage >= totalPages - range) {
			pageNumbers.push(1);
			pageNumbers.push(dots);
			for (let i = totalPages - visiblePages + 1; i <= totalPages; i++) {
				pageNumbers.push(i);
			}
		} else {
			pageNumbers.push(1);
			pageNumbers.push(dots);
			for (let i = currentPage - range; i <= currentPage + range; i++) {
				pageNumbers.push(i);
			}
			pageNumbers.push(dots);
			pageNumbers.push(totalPages);
		}
	}

	return pageNumbers;
};
</script>

<template>
  <div class="pagination">
    <button
      class="pagination_prev"
      :class="{ 'is-disabled': currentPage === 1 }"
      :disabled="currentPage === 1"
      @click="handlePrevClick"
    >
			<i v-if="typeof prev === 'object'">
        <component :is="prev" />
      </i>
      <span v-else>{{ prev }}</span>
    </button>
    <ul>
      <li v-for="(page, index) in getPaginationPages()" :key="index" class="pagination_number">
        <span v-if="typeof page === 'number' && page === currentPage" class="is-active is-disabled">
          <span>
            {{ page }}
          </span>
        </span>
        <router-link
          v-else-if="typeof page === 'number'"
          :to="{ query: { page: page } }"
        >
          <span>
            {{ page }}
          </span>
        </router-link>
        <span v-else class="pagination_dots"><span>{{ page }}</span></span>
      </li>
    </ul>
    <button
      class="pagination_next"
      :class="{ 'is-disabled': currentPage === totalPages }"
      :disabled="currentPage === totalPages"
      @click="handleNextClick"
    >
			<i v-if="typeof next === 'object'">
        <component :is="next" />
      </i>
      <span v-else>{{ next }}</span>
    </button>
  </div>
</template>
