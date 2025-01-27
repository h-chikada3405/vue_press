import { type Ref, ref, watch, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { fetchCategories, fetchTotalPostCount } from "../api";
import type { Category } from "../types";

const getTotalPostCount = ({
	postType,
	categoryName,
}: {
	postType?: string;
	categoryName?: string;
} = {}): Ref<number | null> => {
	const route = useRoute();
	const totalPostCount = ref<number | null>(null);
	const categoryId = ref<number | null>(null);
	const slug = ref(categoryName || (route.params.slug as string));
	const categories = ref<Category[] | null>(null);

	const updateTotalPostCount = async () => {
		if (slug.value) {
			const fetchedCategories = await fetchCategories({ slug: slug.value });
			categories.value = fetchedCategories;
			categoryId.value =
				fetchedCategories.length > 0 ? fetchedCategories[0].id : null;
		} else {
			categories.value = null;
			categoryId.value = null;
		}

		try {
			const data = await fetchTotalPostCount({
				postType,
				categories: categoryId.value ? [categoryId.value] : undefined,
			});
			totalPostCount.value = data;
		} catch (error) {
			console.error("Failed to fetch total post count:", error);
			totalPostCount.value = null;
		}
	};

	watchEffect(updateTotalPostCount);

	watch(
		() => route.params.slug,
		async (newSlug) => {
			slug.value = newSlug as string;
			await updateTotalPostCount();
		},
	);

	return totalPostCount;
};

export default getTotalPostCount;
